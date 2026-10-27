import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/lib/profile";

/** Round avatar on a transparent canvas, shared by the favicon and the Apple touch icon. */
export async function avatarIcon(px: number, rounded: boolean) {
  const avatar = await readFile(
    join(process.cwd(), "public", profile.avatar.src),
    "base64",
  );

  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`data:image/jpeg;base64,${avatar}`}
        alt=""
        width={px}
        height={px}
        style={{ borderRadius: rounded ? 9999 : 0, objectFit: "cover" }}
      />
    ),
    { width: px, height: px },
  );
}
