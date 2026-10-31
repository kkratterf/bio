import { BrandIcon } from "@/components/brand-icon";
import { FrameCard } from "@/components/frame-card";
import type { Social } from "@/lib/profile";

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-3 text-muted-fg">
      <path d="M5 11 11 5M6 5h5v5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SocialCard({ social }: { social: Social }) {
  return (
    <FrameCard
      href={social.href}
      label={social.label}
      title={social.title}
      subtitle={social.handle}
      description={social.description}
      icon={
        <div
          className="flex size-9 shrink-0 items-center justify-center rounded-[10px] text-white shadow-card ring-1 ring-black/5 ring-inset"
          style={{ background: social.background }}
        >
          <BrandIcon brand={social.brand} className="size-4.5" />
        </div>
      }
      badge={
        <>
          {social.action}
          <ArrowUpRight />
        </>
      }
      preview={
        // The preview is drawn, not an image: a brand panel with the handle,
        // so the four profiles read as one set.
        <div
          className="absolute inset-0 text-white transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          style={{ background: social.background }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_0%_0%,rgb(255_255_255/0.18),transparent_60%)]" />
          <BrandIcon
            brand={social.brand}
            className="absolute -right-8 -bottom-10 size-52 text-white/[0.08]"
          />
          <BrandIcon brand={social.brand} className="absolute top-5 left-5 size-7" />
          <div className="absolute bottom-5 left-5 flex flex-col gap-0.5">
            <p className="text-xl font-semibold tracking-[-0.01em]">{social.handle}</p>
            <p className="text-xs text-white/70">{social.url}</p>
          </div>
        </div>
      }
    />
  );
}
