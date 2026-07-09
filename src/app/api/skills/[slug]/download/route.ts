import { getSkillContent, incrementDownloadCount } from "@/lib/skills";

type Params = { params: Promise<{ slug: string }> };

/**
 * GET /api/skills/[slug]/download
 * Streams a published skill's Markdown as a downloadable .md file and bumps its
 * download counter.
 */
export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params;

  const skill = await getSkillContent(slug);
  if (!skill) {
    return new Response("Skill not found", { status: 404 });
  }

  // TODO(email-gate): optional email capture before download can be added here.
  // Read an email from the query/body, validate it, persist it as a lead via
  // saveLead() in src/lib/leads.ts, and only then stream the file below.
  // Intentionally NOT implemented yet, this is just the hook point.

  // Best-effort: a counter failure must never block the actual download.
  await incrementDownloadCount(slug).catch(() => {});

  return new Response(skill.content, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${slug}.md"`,
      "Cache-Control": "no-store",
    },
  });
}
