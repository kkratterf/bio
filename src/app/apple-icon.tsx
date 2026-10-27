import { avatarIcon } from "@/lib/avatar-icon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS applies its own rounded mask, so the source stays square.
export default function AppleIcon() {
  return avatarIcon(size.width, false);
}
