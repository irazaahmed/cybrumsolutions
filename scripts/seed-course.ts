/**
 * Seed / upsert Courses into the database.
 *
 * Run with: npm run seed:course
 *
 * Idempotent: the course is upserted on its unique `slug`.
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

// Real curriculum for CS Academy's first course, "Earn With AI" — one week
// per module, each ending in a tangible output, matching the printed
// brochure (public/Earn-With-AI-CS-Academy-Brochure.pdf).
const modules = [
  {
    title: "Week 1 — Understand AI, Remove the Fear",
    lessons: [
      { title: "What AI actually is, with common myths and misconceptions cleared up" },
      { title: "How LLMs, image generation, video generation, and automation differ" },
      { title: "Free vs paid tools, and building your own personal AI toolkit" },
      { title: "Output: your personal AI tool stack, ready to use" },
    ],
  },
  {
    title: "Week 2 — Build Your First Skill",
    lessons: [
      { title: "Practical prompt engineering: getting real, usable output from AI" },
      { title: "Hands-on practice generating content and captions" },
      { title: "Producing your first real AI-assisted piece of work" },
      { title: "Output: your first real AI-generated piece of work" },
    ],
  },
  {
    title: "Week 3 — Deepen Your Content Skill",
    lessons: [
      { title: "AI copywriting for captions, offers, and a business's own voice" },
      { title: "AI image generation and design basics for social posts" },
      { title: "Planning a content calendar that runs itself" },
      { title: "Output: a working content system, ready to apply to a real business" },
    ],
  },
  {
    title: "Week 4 — Build Your Asset",
    lessons: [
      { title: "A sample content calendar plus 10-15 posts for a mock business" },
      { title: "A case study written up from the practice project" },
      { title: "A clear one-line pitch statement: \"here's what I offer\"" },
      { title: "Output: a showable asset, ready to present to a real client" },
    ],
  },
  {
    title: "Week 5 — Map Your Network & Target Businesses",
    lessons: [
      { title: "Building a personal network list: family, shopkeepers, community, college contacts" },
      { title: "Identifying the local business types that need this service most" },
      { title: "Matching the right package to the right business type" },
      { title: "Output: a 20-name outreach list and a target business type" },
    ],
  },
  {
    title: "Week 6 — Field Exercise (Mandatory)",
    lessons: [
      { title: "Mock pitch practice within the group before going into the field" },
      { title: "A ready-made WhatsApp outreach script" },
      {
        title:
          "A minimum of 3 real conversations, focused only on discovering the business's problem, no selling yet",
      },
      {
        title:
          "The golden rule: never leave a conversation without a number — \"how much time or money does this cost you today?\"",
      },
      { title: "Output: 3 verified conversations, each with a baseline number" },
    ],
  },
  {
    title: "Week 7 — Pitch & Close",
    lessons: [
      { title: "Handling objections: \"too expensive,\" \"we don't need this,\" \"we manage fine manually\"" },
      { title: "The boundary script: \"this session was free, the next step is priced\"" },
      { title: "Narrowing scope instead of discounting price" },
      { title: "Output: your first confirmed project, paid or trial" },
    ],
  },
  {
    title: "Week 8 — Delivery, Testimonial & Referral",
    lessons: [
      { title: "Professional delivery, even when the first project is small" },
      { title: "Collecting a testimonial from the client" },
      { title: "Starting the referral loop for the next client" },
      { title: "Output: a delivered project, a testimonial, and at least one referral request" },
    ],
  },
  {
    title: "Bonus — Beyond Content",
    lessons: [
      {
        title:
          "When a client needs something advanced — a chatbot, WhatsApp automation, lead capture — learn how to refer them to CS Chatbot as an optional extra income stream",
      },
    ],
  },
];

async function main() {
  const data = {
    title: "Earn With AI",
    description:
      "A 2-month practical program for people who only know AI as something that generates images or videos, but have no idea how to make money from it. Learn to land your first AI-powered client through your own personal network and local market — no Fiverr, no Upwork, no cold platforms.",
    priceAmount: 5499,
    priceCurrency: "PKR",
    published: true,
  };

  // The course previously lived under the placeholder slug
  // "how-to-earn-in-the-ai-era" with a live enrollment attached. Rename that
  // same row in place (by id) so the enrollment stays linked, instead of
  // upserting a fresh row under the new slug.
  const legacy = await prisma.course.findUnique({ where: { slug: "how-to-earn-in-the-ai-era" } });

  const course = legacy
    ? await prisma.course.update({ where: { id: legacy.id }, data: { slug: "earn-with-ai", ...data } })
    : await prisma.course.upsert({
        where: { slug: "earn-with-ai" },
        create: { slug: "earn-with-ai", ...data },
        update: data,
      });
  console.log(`Seeded course: ${course.title} (${course.slug})`);

  // Replace any existing (placeholder) curriculum with the real one.
  await prisma.module.deleteMany({ where: { courseId: course.id } });
  for (const [moduleIndex, mod] of modules.entries()) {
    await prisma.module.create({
      data: {
        courseId: course.id,
        title: mod.title,
        order: moduleIndex,
        lessons: {
          create: mod.lessons.map((lesson, lessonIndex) => ({
            title: lesson.title,
            order: lessonIndex,
          })),
        },
      },
    });
  }
  console.log(`Seeded ${modules.length} modules with real curriculum.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
