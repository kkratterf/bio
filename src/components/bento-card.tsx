import Image from "next/image";
import type { Card, CardSize, MapCard, MediaCard, WebsiteCard } from "@/lib/profile";

const sizeClass: Record<CardSize, string> = {
  "1x1": "col-span-1 row-span-1",
  "2x1": "col-span-2 row-span-1",
  "1x2": "col-span-1 row-span-2",
  "2x2": "col-span-2 row-span-2",
};

/** Rendered width of a card on the 820px desktop grid, used for `sizes`. */
const desktopWidth: Record<CardSize, number> = {
  "1x1": 187,
  "2x1": 398,
  "1x2": 187,
  "2x2": 398,
};

function imageSizes(size: CardSize) {
  const span = size.startsWith("2") ? "380px" : "180px";
  return `(min-width: 1280px) ${desktopWidth[size]}px, ${span}`;
}

const cardSurface =
  "relative h-full w-full overflow-hidden rounded-card border border-border bg-content text-fg shadow-card";

/** Full-card link placed on top, so the whole tile is clickable. */
function CardLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer me"
      aria-label={label}
      className="absolute inset-0 z-40 rounded-[inherit] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-inset md:cursor-pointer"
    />
  );
}

function ArrowUpRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="size-3.5"
    >
      <path
        fillRule="evenodd"
        d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function Media({ card }: { card: MediaCard }) {
  return (
    <div className={cardSurface}>
      <Image
        src={card.image.src}
        alt={card.image.alt}
        fill
        sizes={imageSizes(card.size)}
        className="animate-reveal object-cover select-none"
        draggable={false}
      />
      <span
        aria-hidden="true"
        className="absolute top-3 right-3 z-30 flex size-6 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 backdrop-blur-md"
      >
        <ArrowUpRight />
      </span>
      <CardLink href={card.href} label={card.label} />
    </div>
  );
}

function MapTile({ card }: { card: MapCard }) {
  return (
    <div className={`${cardSurface} group flex flex-col`}>
      <Image
        src={card.image.src}
        alt=""
        fill
        sizes={imageSizes(card.size)}
        className="object-cover select-none"
        draggable={false}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-neutral-500/5 transition-opacity group-hover:opacity-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 z-10 size-12 -translate-x-1/2 -translate-y-1/2"
      >
        <span className="absolute top-1/2 left-1/2 size-full animate-marker-pulse rounded-full bg-(--marker-pulse)" />
        <span className="absolute inset-0 m-auto flex size-7 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-black/5">
          <span className="size-5 rounded-full bg-(--marker)" />
        </span>
      </div>
      <div className="relative z-20 mt-auto p-4">
        <p className="w-fit rounded-[10px] border border-(--pill-border) bg-(--label-bg) px-2.5 py-1.5 text-[13px] font-medium text-fg shadow-sm backdrop-blur-[20px]">
          <span className="line-clamp-1">{card.place}</span>
        </p>
      </div>
      <CardLink href={card.href} label={card.label} />
    </div>
  );
}

function Website({ card }: { card: WebsiteCard }) {
  return (
    <div className={`${cardSurface} flex flex-col justify-between p-4`}>
      <div className="relative z-10 flex min-w-0 flex-col">
        <div className="flex size-10 items-center justify-center overflow-hidden rounded-xl bg-content">
          {card.icon && (
            <Image
              src={card.icon.src}
              alt=""
              width={40}
              height={40}
              className="size-full animate-reveal object-contain"
              draggable={false}
            />
          )}
        </div>
        <div className="mt-3 flex flex-col">
          <h3 className="line-clamp-1 text-sm font-normal text-fg" title={card.title}>
            {card.title}
          </h3>
          <p className="line-clamp-1 text-xs text-muted-fg">{card.domain}</p>
        </div>
      </div>
      {card.preview && (
        <div className="relative z-10 mt-4 w-full overflow-hidden rounded-xl bg-muted">
          <Image
            src={card.preview.src}
            alt={card.preview.alt}
            width={card.preview.width}
            height={card.preview.height}
            sizes="(min-width: 1280px) 366px, 348px"
            className="h-auto w-full animate-reveal object-cover"
            draggable={false}
          />
        </div>
      )}
      <CardLink href={card.href} label={card.label} />
    </div>
  );
}

export function BentoCard({ card }: { card: Card }) {
  return (
    <li className={sizeClass[card.size]}>
      {card.kind === "media" && <Media card={card} />}
      {card.kind === "map" && <MapTile card={card} />}
      {card.kind === "website" && <Website card={card} />}
    </li>
  );
}
