import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/lib/profile";

export const alt = `${profile.name} — ${profile.bio}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = join(process.cwd(), "src/fonts");

export default async function OpengraphImage() {
  // Static cuts of Cal Sans: the image renderer can't read variable fonts.
  const [regular, semibold, avatar] = await Promise.all([
    readFile(join(fontDir, "CalSans-400.woff")),
    readFile(join(fontDir, "CalSans-600.woff")),
    readFile(join(process.cwd(), "public", profile.avatar.src), "base64"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#fafafa",
          fontFamily: "Cal Sans",
        }}
      >
        <img
          src={`data:image/jpeg;base64,${avatar}`}
          alt=""
          width={184}
          height={184}
          style={{ borderRadius: 9999, objectFit: "cover" }}
        />
        <div
          style={{
            marginTop: 48,
            fontSize: 80,
            fontWeight: 600,
            letterSpacing: -1.6,
            lineHeight: 1.2,
            color: "#262626",
          }}
        >
          {profile.name}
        </div>
        <div style={{ marginTop: 16, fontSize: 40, color: "#686868" }}>
          {profile.bio}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cal Sans", data: regular, weight: 400, style: "normal" },
        { name: "Cal Sans", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
