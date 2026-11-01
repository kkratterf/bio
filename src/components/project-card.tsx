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

// The dot's motion says whether the project is moving: Live sends out a ring
// like an on-air light, Building breathes (coss ui's StatusDot pulse), the
// others stay still.
const statusMotion: Partial<Record<Project["status"], "ping" | "pulse">> = {
  Live: "ping",
  Building: "pulse",
};

function StatusDot({ status }: { status: Project["status"] }) {
  const motion = statusMotion[status];
  return (
    <span aria-hidden="true" className="relative flex size-1.5">
      {motion === "ping" && (
        <span
          className={`absolute inline-flex size-full rounded-full opacity-75 motion-safe:animate-status-ping ${statusDot[status]}`}
        />
      )}
      <span
        className={`relative inline-flex size-1.5 rounded-full ${statusDot[status]} ${motion === "pulse" ? "motion-safe:animate-status-pulse" : ""}`}
      />
    </span>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <FrameCard
      href={project.href}
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
          <StatusDot status={project.status} />
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
