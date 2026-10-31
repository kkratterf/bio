import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { profile } from "@/lib/profile";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

// Mattone (OFL-1.1, see src/fonts/MATTONE-OFL.txt), the display face of M63,
// used only for the name.
const mattone = localFont({
  src: "../fonts/mattone.woff2",
  variable: "--font-mattone",
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
  themeColor: "#fafafa",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${mattone.variable} antialiased`}>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
