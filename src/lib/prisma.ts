import { PrismaClient } from "@prisma/client";

/**
 * Singleton Prisma client. In dev, Next.js hot-reloading would otherwise spawn
 * a new client (and a new connection pool) on every reload, so we cache it on
 * globalThis. Introduced for the Skills Library; lead capture still uses the
 * raw Neon SQL driver in src/lib/db.ts.
 */
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
