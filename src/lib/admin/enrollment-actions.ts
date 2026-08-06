"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/current";
import { prisma } from "@/lib/prisma";
import { sendEnrollmentApprovedEmail, sendPaymentRejectedEmail } from "@/lib/enrollment/notify";

/**
 * Shared by the admin "action needed" queue (/academy/admin) and a single
 * student's detail page (/academy/admin/students/[id]) — same action bound
 * to a form in both places, only the surrounding UI differs.
 */
export async function approvePayment(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const payment = await prisma.payment.findUnique({
    where: { id },
    include: { student: true, course: true },
  });
  if (!payment || payment.status !== "submitted") return;

  const now = new Date();
  await prisma.$transaction([
    prisma.payment.update({ where: { id }, data: { status: "approved", reviewedAt: now } }),
    prisma.enrollment.update({
      where: { id: payment.enrollmentId },
      data: { status: "active", activatedAt: now },
    }),
  ]);

  await sendEnrollmentApprovedEmail(payment.student.email, payment.student.name, payment.course.title);

  revalidatePath("/academy/admin");
  revalidatePath(`/academy/admin/students/${payment.enrollmentId}`);
}

export async function rejectPayment(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const payment = await prisma.payment.findUnique({
    where: { id },
    include: { student: true, course: true },
  });
  if (!payment || payment.status !== "submitted") return;

  await prisma.$transaction([
    prisma.payment.update({ where: { id }, data: { status: "rejected", reviewedAt: new Date() } }),
    prisma.enrollment.update({ where: { id: payment.enrollmentId }, data: { status: "pending_payment" } }),
  ]);

  await sendPaymentRejectedEmail(payment.student.email, payment.student.name, payment.course.title);

  revalidatePath("/academy/admin");
  revalidatePath(`/academy/admin/students/${payment.enrollmentId}`);
}
