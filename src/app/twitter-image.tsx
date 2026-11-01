import OpengraphImage from "./opengraph-image";
import { profile } from "@/lib/profile";

export const alt = `${profile.name} — ${profile.bio}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default OpengraphImage;
