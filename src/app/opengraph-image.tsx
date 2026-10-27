import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/lib/profile";

export const alt = `${profile.name} — ${profile.bio}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = join(process.cwd(), "node_modules/@fontsource/inter/files");

export default async function OpengraphImage() {
  const [regular, semibold, avatar] = await Promise.all([
    readFile(join(fontDir, "inter-latin-400-normal.woff")),
    readFile(join(fontDir, "inter-latin-600-normal.woff")),
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
          fontFamily: "Inter",
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
            letterSpacing: -2.4,
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
        { name: "Inter", data: regular, weight: 400, style: "normal" },
        { name: "Inter", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
