import Image from "next/image";
import type { Card, CardSize, MapCard, MediaCard } from "@/lib/profile";

// Class names are spelled out in full so Tailwind can find them.
const mobileSize: Record<CardSize, string> = {
  "1x1": "col-span-1 row-span-1",
  "2x1": "col-span-2 row-span-1",
  "1x2": "col-span-1 row-span-2",
  "2x2": "col-span-2 row-span-2",
};

const desktopSize: Record<CardSize, string> = {
  "1x1": "xl:col-span-1 xl:row-span-1",
  "2x1": "xl:col-span-2 xl:row-span-1",
  "1x2": "xl:col-span-1 xl:row-span-2",
  "2x2": "xl:col-span-2 xl:row-span-2",
};

const mobileOrder: Record<number, string> = {
  1: "order-1",
  2: "order-2",
  3: "order-3",
  4: "order-4",
  5: "order-5",
};

/** Rendered width of a card on the 820px desktop grid, used for `sizes`. */
const desktopWidth: Record<CardSize, number> = {
  "1x1": 187,
  "2x1": 398,
  "1x2": 187,
  "2x2": 398,
};

function imageSizes(card: Card) {
  const small = card.mobile?.size ?? card.size;
  const span = small.startsWith("2") ? "380px" : "180px";
  return `(min-width: 1280px) ${desktopWidth[card.size]}px, ${span}`;
}

const cardSurface =
  "relative h-full w-full overflow-hidden rounded-card border border-border bg-content text-fg shadow-card";

/** Full-card link placed on top, so the whole tile is clickable. */
export function CardLink({ href, label }: { href: string; label: string }) {
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
        sizes={imageSizes(card)}
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
  // The map snapshot already carries the marker dot and, in its tall desktop
  // shape, the place label; the wide mobile crop hides the label, so it is
  // drawn again there.
  return (
    <div className={`${cardSurface} group flex flex-col`}>
      <Image
        src={card.image.src}
        alt=""
        fill
        sizes={imageSizes(card)}
        className="object-cover select-none"
        draggable={false}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-neutral-500/5 transition-opacity group-hover:opacity-0"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 z-10 size-12 animate-marker-pulse rounded-full bg-(--marker-pulse)"
      />
      <div className="relative z-20 mt-auto p-4 xl:sr-only">
        <p className="w-fit rounded-[10px] border border-(--pill-border) bg-(--label-bg) px-2.5 py-1.5 text-[13px] font-medium text-fg shadow-sm backdrop-blur-[20px]">
          <span className="line-clamp-1">{card.place}</span>
        </p>
      </div>
      <CardLink href={card.href} label={card.label} />
    </div>
  );
}

export function BentoCard({ card }: { card: Card }) {
  return (
    <li
      className={[
        mobileSize[card.mobile?.size ?? card.size],
        desktopSize[card.size],
        card.mobile?.order ? `${mobileOrder[card.mobile.order]} xl:order-none` : "",
      ].join(" ")}
    >
      {card.kind === "media" && <Media card={card} />}
      {card.kind === "map" && <MapTile card={card} />}
    </li>
  );
}
