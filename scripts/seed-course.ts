/**
 * Seed / upsert Courses into the database.
 *
 * Run with: npm run seed:course
 *
 * Idempotent: each course is upserted on its unique `slug`. Placeholder copy
 * below — Ahmed will replace title/description/price with the real course
 * details later.
 */
import { readFileSync } from "node:fs";
import { PrismaClient } from "@prisma/client";

if (!process.env.DATABASE_URL) {
  try {
    const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
    const line = env.split(/\r?\n/).find((l) => l.startsWith("DATABASE_URL="));
    if (line) process.env.DATABASE_URL = line.slice("DATABASE_URL=".length).trim();
  } catch {
    // fall through: PrismaClient will throw a clear error if it is still unset
  }
}

const prisma = new PrismaClient();

async function main() {
  const data = {
    title: "How to Earn in the AI Era",
    description:
      "Placeholder description — full curriculum, modules, and pricing to be added by Ahmed.",
    priceAmount: 5000,
    priceCurrency: "PKR",
    published: true,
  };
  const course = await prisma.course.upsert({
    where: { slug: "how-to-earn-in-the-ai-era" },
    create: { slug: "how-to-earn-in-the-ai-era", ...data },
    update: data,
  });
  console.log(`Seeded course: ${course.title} (${course.slug})`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
