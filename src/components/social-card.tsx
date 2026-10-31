import { BrandIcon } from "@/components/brand-icon";
import type { Social } from "@/lib/profile";

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="size-3.5 shrink-0 text-muted-fg transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path d="M5 11 11 5M6 5h5v5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * A compact square in the same Frame style as the project cards, sized for a
 * four-column row: the brand panel sits in the inner border, and the name
 * and handle sit in the tinted shell below it.
 */
export function SocialCard({ social }: { social: Social }) {
  return (
    <li>
      <article className="group relative flex aspect-square flex-col rounded-[1.25rem] bg-black/[0.035] p-1 transition-colors hover:bg-black/[0.055]">
        <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-black/10 shadow-card">
          <div
            className="absolute inset-0 text-white transition-transform duration-300 ease-out group-hover:scale-[1.04]"
            style={{ background: social.background }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_0%_0%,rgb(255_255_255/0.2),transparent_60%)]" />
            <BrandIcon
              brand={social.brand}
              className="absolute -right-5 -bottom-6 size-28 text-white/[0.09] xl:size-32"
            />
            <BrandIcon brand={social.brand} className="absolute top-3.5 left-3.5 size-6" />
          </div>
        </div>
        <div className="flex min-w-0 items-center gap-2 px-2.5 pt-2.5 pb-2">
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="line-clamp-1 text-sm font-semibold text-fg">{social.title}</h3>
            <p className="line-clamp-1 text-xs text-muted-fg">{social.handle}</p>
          </div>
          <ArrowUpRight />
        </div>
        <a
          href={social.href}
          target="_blank"
          rel="noopener noreferrer me"
          aria-label={social.label}
          className="absolute inset-0 z-40 rounded-[inherit] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:cursor-pointer"
        />
      </article>
    </li>
  );
}
