import Image from "next/image";
import { CardLink } from "@/components/bento-card";
import type { Project } from "@/lib/profile";

// The dot colour says how far along each project is.
const statusDot: Record<Project["status"], string> = {
  Building: "bg-amber-500",
  Live: "bg-emerald-500",
  Newsletter: "bg-sky-500",
};

function GithubMark() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-5 text-fg" fill="currentColor">
      <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
    </svg>
  );
}

/**
 * A square project card built like the coss ui Frame used across M63: a
 * tinted outer shell holds the header, and a white inner panel with its own
 * border holds the description and the link preview, so every card reads as
 * a double border.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <li>
      <article className="group relative flex aspect-square flex-col rounded-[1.25rem] bg-black/[0.035] p-1 transition-colors hover:bg-black/[0.055]">
        <header className="flex min-w-0 items-center gap-3 px-3 pt-2.5 pb-3.5">
          <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-border bg-content shadow-card">
            {project.icon === "github" ? (
              <GithubMark />
            ) : (
              <Image
                src={project.icon.src}
                alt=""
                width={36}
                height={36}
                className="size-full animate-reveal object-contain"
                draggable={false}
              />
            )}
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="line-clamp-1 text-sm font-semibold text-fg">{project.title}</h3>
            <p className="line-clamp-1 text-xs text-muted-fg">{project.domain}</p>
          </div>
          <span className="inline-flex h-6 shrink-0 items-center gap-1.5 rounded-md border border-border bg-content px-2 text-xs font-medium text-fg shadow-card">
            <span aria-hidden="true" className={`size-1.5 rounded-full ${statusDot[project.status]}`} />
            {project.status}
          </span>
        </header>
        <div className="relative flex min-h-0 flex-1 flex-col gap-4 rounded-2xl border border-border bg-content bg-clip-padding p-4 shadow-card before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(1rem-1px)] before:shadow-[0_1px_rgb(0_0_0/0.04)] xl:p-5">
          <p className="line-clamp-3 text-sm leading-6 text-muted-fg">{project.description}</p>
          <div className="relative mt-auto aspect-[1200/630] w-full shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
            <Image
              src={project.preview.src}
              alt={project.preview.alt}
              fill
              sizes="(min-width: 1280px) 356px, 340px"
              className="animate-reveal object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              draggable={false}
            />
          </div>
        </div>
        <CardLink href={project.href} label={project.label} />
      </article>
    </li>
  );
}
