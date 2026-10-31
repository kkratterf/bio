import Image from "next/image";
import { BrandIcon } from "@/components/brand-icon";
import { FrameCard } from "@/components/frame-card";
import type { Project } from "@/lib/profile";

// The dot colour says where each project stands: blue is work in progress.
const statusDot: Record<Project["status"], string> = {
  Building: "bg-blue-500",
  Live: "bg-emerald-500",
  Newsletter: "bg-violet-500",
  Archived: "bg-neutral-400",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <FrameCard
      href={project.href}
      label={project.label}
      title={project.title}
      subtitle={project.domain}
      description={project.description}
      icon={
        <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-border bg-content shadow-card">
          {project.icon === "github" ? (
            <BrandIcon brand="github" className="size-5 text-fg" />
          ) : (
            <Image
              src={project.icon.src}
              alt=""
              width={36}
              height={36}
              className="size-full animate-reveal object-cover"
              draggable={false}
            />
          )}
        </div>
      }
      badge={
        <>
          <span aria-hidden="true" className={`size-1.5 rounded-full ${statusDot[project.status]}`} />
          {project.status}
        </>
      }
      preview={
        <Image
          src={project.preview.src}
          alt={project.preview.alt}
          fill
          sizes="(min-width: 1280px) 356px, 340px"
          className="animate-reveal object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          draggable={false}
        />
      }
    />
  );
}
