import { ExternalLink } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { ProjectVisual } from "@/components/visuals/ProjectVisual";
import type { Project } from "@/lib/content";

function GitHubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.28-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

/**
 * Work/project card shared by the homepage Work section and the /work page:
 * stylized preview header, category, description, stack chips, and Live +
 * GitHub buttons.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
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

      <span className="w-fit rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent-bright">
        {project.category}
      </span>

      <h3 className="mt-4 text-lg font-semibold tracking-tight">{project.title}</h3>
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

      <div className="mt-5 flex gap-2.5">
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sheen inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full bg-accent px-4 text-xs font-medium text-white transition-all duration-300 hover:bg-accent-bright hover:shadow-[0_0_24px_-6px_var(--color-accent)]"
          >
            <ExternalLink size={13} />
            Live Site
          </a>
        )}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full border border-border bg-surface/60 px-4 text-xs font-medium text-foreground transition-colors duration-300 hover:border-accent/60 hover:text-accent-bright"
          >
            <GitHubIcon />
            GitHub
          </a>
        )}
      </div>
    </GlowCard>
  );
}
