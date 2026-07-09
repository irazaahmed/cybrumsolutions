import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { BlogNav } from "@/components/blog/BlogNav";

// TODO: protect this route. It is currently UNPROTECTED and must not be linked
// publicly or shipped as-is with real controls. Add authentication (e.g. an
// admin session / middleware check) before building any create/edit/publish
// actions here. Scaffold only.
export const metadata = { title: "Admin · Skills", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminSkillsPage() {
  const skills = await prisma.skill.findMany({
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      published: true,
      downloadCount: true,
      updatedAt: true,
    },
  });

  return (
    <>
      <BlogNav />
      <main className="relative z-10 mx-auto max-w-5xl px-5 pb-24 pt-32 sm:px-8">
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-500">
          Unprotected admin stub. TODO: add auth before using in production.
        </div>

        <h1 className="mt-8 font-heading text-3xl font-semibold tracking-tight">
          Skills ({skills.length})
        </h1>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-border bg-surface/60 text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Downloads</th>
                <th className="px-4 py-3 font-medium">Updated</th>
              </tr>
            </thead>
            <tbody>
              {skills.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted">
                    No skills yet. Seed some with{" "}
                    <code className="text-accent-bright">npm run seed</code>.
                  </td>
                </tr>
              ) : (
                skills.map((s) => (
                  <tr key={s.id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3">
                      <Link
                        href={`/skills/${s.slug}`}
                        className="font-medium text-foreground hover:text-accent-bright"
                      >
                        {s.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted">{s.category}</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          s.published ? "text-emerald-500" : "text-muted"
                        }
                      >
                        {s.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted">{s.downloadCount}</td>
                    <td className="px-4 py-3 text-muted">
                      {s.updatedAt.toISOString().slice(0, 10)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
