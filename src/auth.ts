import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// Two ways in: email+password (Credentials, verified against Student
// directly) or Google (upserts a Student by email in the jwt callback,
// passwordHash stays null for those accounts). JWT session only — no
// database adapter, so the schema stays exactly as prisma/schema.prisma
// defines it (no NextAuth Account/Session tables needed).
export const { handlers, auth, signIn, signOut } = NextAuth({
  // Behind Coolify's Traefik + Cloudflare reverse proxies, so NextAuth must
  // trust the forwarded Host header rather than rejecting it as untrusted.
  trustHost: true,
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "")
          .trim()
          .toLowerCase();
        const password = String(credentials?.password ?? "");
        if (!email || !password) return null;

        const student = await prisma.student.findUnique({ where: { email } });
        if (!student || !student.passwordHash) return null;

        const valid = await bcrypt.compare(password, student.passwordHash);
        if (!valid) return null;

        return { id: student.id, name: student.name, email: student.email };
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 180 * 24 * 60 * 60 },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "google" && user?.email) {
        const student = await prisma.student.upsert({
          where: { email: user.email },
          create: { email: user.email, name: user.name ?? user.email },
          update: {},
        });
        token.studentId = student.id;
      } else if (user?.id) {
        token.studentId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.studentId && typeof token.studentId === "string") {
        session.user.id = token.studentId;
        // Looked up fresh (not cached in the JWT) so an avatar upload shows
        // up immediately in the Navbar without forcing a re-login.
        const student = await prisma.student.findUnique({
          where: { id: token.studentId },
          select: { avatarFilename: true },
        });
        session.user.image = student?.avatarFilename ? `/avatar/${student.avatarFilename}` : null;
      }
      return session;
    },
  },
});
