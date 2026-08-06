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

// Placeholder curriculum shape — Ahmed replaces titles/summaries with the
// real lessons later; the structure (modules -> lessons) is what matters now.
const modules = [
  {
    title: "Module 1: Foundations",
    lessons: [
      { title: "Why AI, why now", summary: "Curriculum coming soon." },
      { title: "Mapping AI skills to income streams", summary: "Curriculum coming soon." },
    ],
  },
  {
    title: "Module 2: Building Your First AI Offer",
    lessons: [
      { title: "Choosing a niche", summary: "Curriculum coming soon." },
      { title: "Packaging a service clients will pay for", summary: "Curriculum coming soon." },
    ],
  },
  {
    title: "Module 3: Getting Paid",
    lessons: [
      { title: "Pricing and proposals", summary: "Curriculum coming soon." },
      { title: "Delivering and scaling", summary: "Curriculum coming soon." },
    ],
  },
];

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

  const existingModules = await prisma.module.count({ where: { courseId: course.id } });
  if (existingModules === 0) {
    for (const [moduleIndex, mod] of modules.entries()) {
      await prisma.module.create({
        data: {
          courseId: course.id,
          title: mod.title,
          order: moduleIndex,
          lessons: {
            create: mod.lessons.map((lesson, lessonIndex) => ({
              title: lesson.title,
              summary: lesson.summary,
              order: lessonIndex,
            })),
          },
        },
      });
    }
    console.log(`Seeded ${modules.length} placeholder modules.`);
  } else {
    console.log("Modules already exist, skipped seeding curriculum.");
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
