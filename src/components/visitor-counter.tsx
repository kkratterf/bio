import { visitorCounter } from "@/lib/profile";
import { getVisitorCount } from "@/lib/visitors";

/**
 * "Visitor number 000123" in a mono face. Pinned to the bottom-left corner on
 * desktop (under the sticky profile), at the end of the page on mobile.
 * Renders nothing when the count is not available.
 */
export async function VisitorCounter() {
  const count = await getVisitorCount();
  if (count === null) return null;

  const value = String(count).padStart(visitorCounter.digits, "0");

  return (
    <p
      data-reveal
      className="mx-auto mt-2 mb-8 flex w-full max-w-[428px] items-baseline gap-2 px-7 font-mono text-xs text-muted-fg xl:fixed xl:bottom-16 xl:left-[max(4.5rem,calc((100vw-1728px)/2+4.5rem))] xl:m-0 xl:w-auto xl:max-w-none xl:px-0"
    >
      <span>{visitorCounter.label}</span>
      <span className="text-fg tabular-nums">
        {value}
      </span>
    </p>
  );
}
