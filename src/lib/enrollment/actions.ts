"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { saveProofFile } from "@/lib/enrollment/proof-storage";
import { saveAvatarFile } from "@/lib/enrollment/avatar-storage";
import {
  sendPaymentSubmittedEmail,
  sendAdminPaymentSubmittedEmail,
} from "@/lib/enrollment/notify";

/**
 * Creates a Student account — no course tied. Signup is a one-time step
 * shared by every course; which course to enroll in is chosen afterwards
 * from the dashboard (see enrollInCourse below), so launching a second or
 * third course later needs no changes here.
 */
export async function signUp(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim().slice(0, 200);
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const phone = String(formData.get("phone") ?? "").trim() || undefined;

  if (!name || !email || password.length < 8) {
    redirect("/signup?error=validation");
  }

  const existing = await prisma.student.findUnique({ where: { email } });
  if (existing) redirect("/signup?error=exists");

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.student.create({
    data: { name, email, passwordHash, phone },
  });

  await signIn("credentials", { email, password, redirectTo: "/dashboard" });
}

/**
 * Enrolls the currently logged-in student in a course (pending_payment),
 * called from the course page or the dashboard's "available courses" list.
 * A student can only have one Enrollment per course (schema @@unique), so
 * this is a no-op if they're already enrolled.
 */
export async function enrollInCourse(formData: FormData) {
  const session = await auth();
  const studentId = session?.user?.id;
  if (!studentId) redirect("/signup");

  const courseId = String(formData.get("courseId") ?? "");
  const course = await prisma.course.findUnique({ where: { id: courseId, published: true } });
  if (!course) redirect("/dashboard");

  const existing = await prisma.enrollment.findUnique({
    where: { studentId_courseId: { studentId, courseId } },
  });
  if (!existing) {
    await prisma.enrollment.create({
      data: { studentId, courseId, status: "pending_payment" },
    });
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

/** Signs an existing student in. Wrong email/password redirects back with an error. */
export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  try {
    await signIn("credentials", { email, password, redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/login?error=1");
    }
    throw error; // re-throw NEXT_REDIRECT (the success case) and anything unexpected
  }
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}

/** Used by the "Continue with Google" button on both /login and /signup. */
export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/dashboard" });
}

/** Updates the logged-in student's own name/phone, and optionally their avatar. */
export async function updateProfile(formData: FormData) {
  const session = await auth();
  const studentId = session?.user?.id;
  if (!studentId) redirect("/login");

  const name = String(formData.get("name") ?? "").trim().slice(0, 200);
  const phone = String(formData.get("phone") ?? "").trim() || null;
  const avatar = formData.get("avatar") as File | null;

  const data: { name?: string; phone?: string | null; avatarFilename?: string } = {};
  if (name) data.name = name;
  data.phone = phone;

  if (avatar && avatar.size > 0) {
    try {
      data.avatarFilename = await saveAvatarFile(studentId, avatar);
    } catch {
      redirect("/dashboard/profile?error=avatar");
    }
  }

  await prisma.student.update({ where: { id: studentId }, data });

  revalidatePath("/dashboard/profile");
  redirect("/dashboard/profile?saved=1");
}

/**
 * Submits a payment proof for the student's own pending enrollment. Mirrors
 * cs-chatbot's lib/billing/actions.ts#submitPayment: the amount is always
 * the course's listed price, never taken from the client.
 */
export async function submitPayment(formData: FormData) {
  const session = await auth();
  const studentId = session?.user?.id;
  if (!studentId) redirect("/login");

  const enrollmentId = String(formData.get("enrollmentId") ?? "");
  const method = String(formData.get("method") ?? "bank");
  const senderName = String(formData.get("senderName") ?? "").trim().slice(0, 200);
  const transactionRef = String(formData.get("transactionRef") ?? "").trim();
  const file = formData.get("screenshot") as File | null;

  const enrollment = await prisma.enrollment.findFirst({
    where: { id: enrollmentId, studentId },
    include: { course: true, student: true },
  });
  if (!enrollment) redirect("/dashboard");

  if (!senderName || !transactionRef || !file || file.size === 0) {
    redirect("/dashboard?error=validation");
  }

  const alreadyPending = await prisma.payment.findFirst({
    where: { enrollmentId: enrollment.id, status: "submitted" },
  });
  if (alreadyPending) redirect("/dashboard");

  const paymentId = randomUUID();
  let proofFilename: string;
  try {
    proofFilename = await saveProofFile(paymentId, file);
  } catch {
    redirect("/dashboard?error=file");
  }

  await prisma.payment.create({
    data: {
      id: paymentId,
      enrollmentId: enrollment.id,
      studentId,
      courseId: enrollment.courseId,
      amount: enrollment.course.priceAmount,
      method,
      senderName,
      transactionRef,
      proofFilename,
    },
  });
  await prisma.enrollment.update({
    where: { id: enrollment.id },
    data: { status: "pending_review" },
  });

  await sendPaymentSubmittedEmail(enrollment.student.email, enrollment.student.name, enrollment.course.title);
  await sendAdminPaymentSubmittedEmail(
    enrollment.student.name,
    enrollment.student.email,
    enrollment.course.title,
    enrollment.course.priceAmount,
    method,
  );

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
