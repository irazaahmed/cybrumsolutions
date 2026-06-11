import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { work } from "@/lib/content";

/** Homepage shows the three strongest projects; /work lists them all. */
export function Work() {
  const featured = work.projects.slice(0, 3);

  return (
    <Section id="work" divider>
      <SectionHeading
        eyebrow="Capabilities"
        title={
          <>
            What I&apos;ve <span className="text-gradient">built</span>
          </>
        }
        intro={work.intro}
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((project, i) => (
          <Reveal key={project.title} delay={(i % 3) * 0.08} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 flex justify-center">
        <Link
          href="/work"
          className="group inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface/60 px-7 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-accent hover:bg-surface hover:-translate-y-0.5 hover:shadow-[0_0_30px_-10px_var(--color-accent)]"
        >
          View all projects
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </Reveal>
    </Section>
  );
}
