import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { profile } from "@/lib/profile";
import { siteUrl } from "@/lib/site";
import "./globals.css";

// PP Radio Grotesk, the typeface of the 2023 portfolio (kkratterf/portfolio23).
const radioGrotesk = localFont({
  variable: "--font-radio-grotesk",
  src: [
    { path: "../fonts/PPRadioGrotesk-200.woff2", weight: "200", style: "normal" },
    { path: "../fonts/PPRadioGrotesk-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/PPRadioGrotesk-900.woff2", weight: "900", style: "normal" },
  ],
  display: "swap",
});

const title = profile.name;
const description = profile.bio;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s · ${title}`,
  },
  description,
  applicationName: title,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  keywords: [
    profile.name,
    "Federico Kratter",
    profile.handle,
    "product designer",
    "design engineer",
    "Milan",
    "play2match",
    "M63",
    "FratmScript",
    "Maramao",
    "F4",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: title,
    title,
    description,
    locale: profile.locale,
    firstName: profile.givenName,
    lastName: profile.familyName,
    username: profile.handle,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@kkratter",
    site: "@kkratter",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  category: "personal",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${radioGrotesk.variable} antialiased`}>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
