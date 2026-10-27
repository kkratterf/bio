import Image from "next/image";
import type { Card, CardSize, MapCard, MediaCard, WebsiteCard } from "@/lib/profile";

// Class names are spelled out in full so Tailwind can find them.
const mobileSize: Record<CardSize, string> = {
  "1x1": "col-span-1 row-span-1",
  "2x1": "col-span-2 row-span-1",
  "1x2": "col-span-1 row-span-2",
  "2x2": "col-span-2 row-span-2",
  // The mobile grid has two columns, so a full-width card is two wide.
  "4x1": "col-span-2 row-span-1",
};

const desktopSize: Record<CardSize, string> = {
  "1x1": "xl:col-span-1 xl:row-span-1",
  "2x1": "xl:col-span-2 xl:row-span-1",
  "1x2": "xl:col-span-1 xl:row-span-2",
  "2x2": "xl:col-span-2 xl:row-span-2",
  "4x1": "xl:col-span-4 xl:row-span-1",
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
  "4x1": 820,
};

function imageSizes(card: Card) {
  const small = card.mobile?.size ?? card.size;
  const span = small.startsWith("2") ? "380px" : "180px";
  return `(min-width: 1280px) ${desktopWidth[card.size]}px, ${span}`;
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

function GithubMark() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-7 text-fg" fill="currentColor">
      <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
    </svg>
  );
}

function Website({ card }: { card: WebsiteCard }) {
  return (
    <div className={`${cardSurface} flex flex-col justify-between p-4`}>
      <div className="relative z-10 flex min-w-0 flex-col">
        <div className="flex size-10 items-center justify-center overflow-hidden rounded-xl bg-content">
          {card.icon === "github" ? (
            <GithubMark />
          ) : (
            card.icon && (
              <Image
                src={card.icon.src}
              alt=""
                width={40}
                height={40}
                className="size-full animate-reveal object-contain"
                draggable={false}
              />
            )
          )}
        </div>
        <div className="mt-3 flex flex-col">
          <h3 className="line-clamp-1 text-sm font-medium text-fg" title={card.title}>
            {card.title}
          </h3>
          <p className="line-clamp-1 text-xs text-muted-fg">{card.domain}</p>
        </div>
      </div>
      {card.preview &&
        (card.size === "2x2" ? (
          // On the short mobile tile the preview sits on the right half.
          <div className="absolute inset-y-4 right-4 z-10 w-[45%] overflow-hidden rounded-xl bg-muted xl:relative xl:inset-auto xl:mt-4 xl:w-full">
            <Image
              src={card.preview.src}
              alt={card.preview.alt}
              width={card.preview.width}
              height={card.preview.height}
              sizes="(min-width: 1280px) 366px, 160px"
              className="size-full animate-reveal object-cover object-left xl:h-auto"
              draggable={false}
            />
          </div>
        ) : (
          // Short tiles keep the preview on the right at every size.
          <div className="absolute inset-y-4 right-4 z-10 w-[45%] overflow-hidden rounded-xl bg-muted xl:w-1/2">
            <Image
              src={card.preview.src}
              alt={card.preview.alt}
              width={card.preview.width}
              height={card.preview.height}
              sizes="(min-width: 1280px) 400px, 160px"
              className="size-full animate-reveal object-cover object-left"
              draggable={false}
            />
          </div>
        ))}
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
      {card.kind === "website" && <Website card={card} />}
    </li>
  );
}
