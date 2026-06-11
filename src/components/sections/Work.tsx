import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectVisual } from "@/components/visuals/ProjectVisual";
import { work } from "@/lib/content";

export function Work() {
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
        {work.projects.map((project, i) => (
          <Reveal key={project.title} delay={(i % 3) * 0.08} className="h-full">
            <GlowCard className="flex h-full flex-col">
              {/* top accent line */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              {/* stylized preview, bleeding to the card edges */}
              <div className="-mx-6 -mt-6 mb-5 sm:-mx-8 sm:-mt-8">
                <ProjectVisual kind={project.visual} />
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent-bright">
                  {project.category}
                </span>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} on GitHub`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-accent/60 hover:text-accent-bright"
                  >
                    <ArrowUpRight size={16} />
                  </a>
                )}
              </div>

              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                {project.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border bg-surface/60 px-2.5 py-1 text-xs text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
