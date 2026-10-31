import type { ReactNode } from "react";

/**
 * A square card built like the coss ui Frame used across M63: a tinted outer
 * shell holds the header, and a white inner panel with its own border holds
 * the description and a preview, so every card reads as a double border.
 * The whole card is one link.
 */
export function FrameCard({
  href,
  label,
  icon,
  title,
  subtitle,
  badge,
  description,
  preview,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  title: string;
  subtitle: string;
  badge: ReactNode;
  description: string;
  preview: ReactNode;
}) {
  return (
    <li>
      <article className="group relative flex aspect-square flex-col rounded-[1.25rem] bg-black/[0.035] p-1 transition-colors hover:bg-black/[0.055]">
        <header className="flex min-w-0 items-center gap-3 px-3 pt-2.5 pb-3.5">
          {icon}
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="line-clamp-1 text-sm font-semibold text-fg">{title}</h3>
            <p className="line-clamp-1 text-xs text-muted-fg">{subtitle}</p>
          </div>
          <span className="inline-flex h-6 shrink-0 items-center gap-1.5 rounded-md border border-border bg-content px-2 text-xs font-medium text-fg shadow-card">
            {badge}
          </span>
        </header>
        <div className="relative flex min-h-0 flex-1 flex-col gap-4 rounded-2xl border border-border bg-content bg-clip-padding p-4 shadow-card before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(1rem-1px)] before:shadow-[0_1px_rgb(0_0_0/0.04)] xl:p-5">
          <p className="line-clamp-3 text-sm leading-6 text-muted-fg">{description}</p>
          <div className="relative mt-auto aspect-[1200/630] w-full shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
            {preview}
          </div>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer me"
          aria-label={label}
          className="absolute inset-0 z-40 rounded-[inherit] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:cursor-pointer"
        />
      </article>
    </li>
  );
}
