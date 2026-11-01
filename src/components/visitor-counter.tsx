import { visitorCounter } from "@/lib/profile";
import { getVisitorCount } from "@/lib/visitors";

/**
 * "visitor number: 000123" in a mono face. Pinned to the bottom-left corner
 * on desktop (under the sticky profile), at the end of the page on mobile.
 * It rises in like every other block, and each digit rolls up to its value
 * like an odometer (see .digit-roll in globals.css). Renders nothing when the
 * count is not available.
 */
export async function VisitorCounter() {
  const count = await getVisitorCount();
  if (count === null) return null;

  const digits = String(count).padStart(visitorCounter.digits, "0").split("");

  return (
    <p
      data-reveal
      className="mx-auto mt-2 mb-8 flex w-full max-w-[428px] items-baseline gap-2 px-7 font-mono text-xs text-muted-fg xl:fixed xl:bottom-16 xl:left-[max(4.5rem,calc((100vw-1728px)/2+4.5rem))] xl:m-0 xl:w-auto xl:max-w-none xl:px-0"
    >
      <span>{visitorCounter.label}</span>
      <span className="sr-only">{count}</span>
      <span aria-hidden="true" className="flex text-fg tabular-nums">
        {digits.map((digit, i) => (
          <span key={i} className="digit-roll">
            <span style={{ "--digit": Number(digit), "--roll-delay": `${i * 70}ms` } as React.CSSProperties}>
              {"0123456789".split("").map((d) => (
                <span key={d}>{d}</span>
              ))}
            </span>
          </span>
        ))}
      </span>
    </p>
  );
}
