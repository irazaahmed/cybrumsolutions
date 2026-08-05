import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// The course landing page itself is ISR-cached (revalidate: 300) and shared
// across every visitor, so it can never call auth() directly — that would
// bake one visitor's session into the cached HTML for everyone else. This
// route is the always-dynamic hop the "Enroll Now" link goes through
// instead: not logged in -> /signup, logged in -> create the Enrollment (if
// not already enrolled) and land on /dashboard where they see the payment
// step.
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const session = await auth();
  const studentId = session?.user?.id;
  if (!studentId) redirect("/signup");

  const course = await prisma.course.findUnique({ where: { slug, published: true } });
  if (!course) redirect("/");

  const existing = await prisma.enrollment.findUnique({
    where: { studentId_courseId: { studentId, courseId: course.id } },
  });
  if (!existing) {
    await prisma.enrollment.create({
      data: { studentId, courseId: course.id, status: "pending_payment" },
    });
  }

  redirect("/dashboard");
}
