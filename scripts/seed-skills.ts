/**
 * Seed / upsert Skills into the database.
 *
 * Run with:  npm run seed        (uses tsx, see package.json)
 *
 * Idempotent: each skill is upserted on its unique `slug`, so re-running only
 * updates existing rows and inserts new ones (never duplicates). Add real
 * skills to the SKILLS array below.
 */
import { readFileSync } from "node:fs";
import { PrismaClient } from "@prisma/client";

// The Prisma CLI loads .env, but this project keeps secrets in .env.local
// (Next.js convention). Make sure DATABASE_URL is present before connecting.
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

type SeedSkill = {
  title: string;
  slug: string;
  category: string;
  tags: string[];
  description: string;
  content: string;
  usageNotes: string;
  published?: boolean;
};

const SKILLS: SeedSkill[] = [
  {
    title: "Changelog Writer",
    slug: "changelog-writer",
    category: "Writing",
    tags: ["git", "changelog", "release-notes", "automation"],
    description:
      "Turns a range of git commits into a clean, human-readable changelog grouped by type (Features, Fixes, Chores).",
    usageNotes: [
      "## When to use",
      "Invoke this skill before cutting a release, when you want a readable",
      "changelog instead of a raw commit dump.",
      "",
      "## Inputs",
      "- A git commit range (e.g. `v1.2.0..HEAD`).",
      "",
      "## Behaviour",
      "It groups commits by Conventional Commit type and rewrites terse commit",
      "subjects into user-facing lines. It never invents changes that are not in",
      "the commits.",
    ].join("\n"),
    content: [
      "# Changelog Writer",
      "",
      "You generate a clean changelog from a range of git commits.",
      "",
      "## Instructions",
      "",
      "1. Read the commits in the given range.",
      "2. Group them into **Features**, **Fixes**, and **Chores** using the",
      "   Conventional Commit prefixes (`feat`, `fix`, `chore`, ...).",
      "3. Rewrite each subject line so it reads for a human, not a developer.",
      "4. Drop merge commits and purely internal noise.",
      "5. Output Markdown only.",
      "",
      "## Output format",
      "",
      "```markdown",
      "## <version> - <date>",
      "",
      "### Features",
      "- ...",
      "",
      "### Fixes",
      "- ...",
      "```",
      "",
      "Never fabricate entries that are not present in the commit range.",
    ].join("\n"),
  },
  {
    title: "PR Description Generator",
    slug: "pr-description-generator",
    category: "Engineering",
    tags: ["git", "pull-request", "review", "documentation"],
    description:
      "Reads a diff and drafts a structured pull request description: summary, changes, testing, and risks.",
    usageNotes: [
      "## When to use",
      "Right before opening a pull request, once your changes are staged or",
      "committed on a branch.",
      "",
      "## Behaviour",
      "It summarises intent first, then lists concrete changes grouped by area,",
      "and flags anything a reviewer should look at closely. It asks for the",
      "linked issue if one is not obvious.",
    ].join("\n"),
    content: [
      "# PR Description Generator",
      "",
      "You write a clear pull request description from a code diff.",
      "",
      "## Instructions",
      "",
      "1. Infer the intent of the change from the diff and commit messages.",
      "2. Produce the sections below, in order.",
      "3. Keep the summary to 1-3 sentences; be specific, not generic.",
      "4. Under **Risks**, call out migrations, breaking changes, or perf concerns.",
      "",
      "## Output format",
      "",
      "```markdown",
      "## Summary",
      "<what and why>",
      "",
      "## Changes",
      "- <area>: <change>",
      "",
      "## Testing",
      "- <how it was verified>",
      "",
      "## Risks",
      "- <anything a reviewer should scrutinise, or 'None'>",
      "```",
    ].join("\n"),
  },
];

async function main() {
  for (const skill of SKILLS) {
    const { slug, ...rest } = skill;
    await prisma.skill.upsert({
      where: { slug },
      update: rest,
      create: { slug, ...rest },
    });
    console.log(`upserted: ${slug}`);
  }
  const total = await prisma.skill.count();
  console.log(`Done. ${SKILLS.length} skill(s) seeded; ${total} total in DB.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
