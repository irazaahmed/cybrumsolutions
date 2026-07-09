import { getPublishedSkills } from "@/lib/skills";

/**
 * GET /api/skills
 * Returns all published skills (summary shape) as JSON. Powers external
 * consumers and any client that wants the raw dataset; the /skills page itself
 * renders server-side.
 */
export async function GET() {
  try {
    const skills = await getPublishedSkills();
    return Response.json({ skills });
  } catch {
    return Response.json({ error: "failed_to_load" }, { status: 500 });
  }
}
