/**
 * Every piece of content shown on the page lives here, so the bio can be
 * edited without touching layout code.
 */

import type { Brand } from "@/components/brand-icon";

/** A social profile, shown as a compact square in the four-column About row. */
export type Social = {
  id: string;
  brand: Brand;
  href: string;
  /** Accessible name of the card link, e.g. "Federico Kratter Thaler on LinkedIn". */
  label: string;
  title: string;
  handle: string;
  /** CSS background for the brand panel. */
  background: string;
};

export type Post = {
  title: string;
  /** ISO date, e.g. "2026-10-01". */
  date: string;
  href: string;
};

/** A product or a piece of writing, shown as a square card in a two-column grid. */
export type Project = {
  id: string;
  href: string;
  title: string;
  domain: string;
  /** Shown as a badge next to the title. */
  status: "Building" | "Live" | "Newsletter" | "Archived";
  /** schema.org type used for the project in JSON-LD. */
  schemaType: "WebApplication" | "SoftwareApplication" | "WebSite" | "Blog";
  /** For SoftwareApplication: e.g. "macOS". */
  operatingSystem?: string;
  /** For SoftwareApplication: schema.org applicationCategory. */
  applicationCategory?: string;
  description: string;
  icon: { src: string; width: number; height: number } | "github";
  preview: { src: string; width: number; height: number; alt: string };
};

export type ProjectSection = {
  id: string;
  title: string;
  projects: Project[];
  posts?: Post[];
};

export const profile = {
  name: "Federico Kratter Thaler",
  givenName: "Federico",
  familyName: "Kratter Thaler",
  handle: "kkratter",
  bio: "I design products. I build them too.",
  /** Roles, in the order people search for them. Used in titles and JSON-LD. */
  roles: ["Builder", "CPTO", "Product Designer", "Product Engineer"],
  jobTitle: "Builder, CPTO, Product Designer & Product Engineer",
  worksFor: {
    name: "play2match",
    url: "https://www.play2match.it/",
    roleName: "CPTO",
  },
  knowsAbout: [
    "Product design",
    "Product engineering",
    "Product management",
    "Design systems",
    "UX design",
    "Startups",
    "TypeScript",
    "React",
    "Next.js",
    "Rust",
    "macOS apps",
  ],
  location: {
    locality: "Milan",
    country: "Italy",
    countryCode: "IT",
    latitude: 45.46426590913465,
    longitude: 9.18814879103845,
  },
  avatar: {
    src: "/images/avatar.jpg",
    width: 600,
    height: 600,
    alt: "Federico Kratter Thaler",
  },
  locale: "en_US",
} as const;

export const socials: Social[] = [
  {
    id: "linkedin",
    brand: "linkedin",
    href: "https://www.linkedin.com/in/kkratter/",
    label: "Federico Kratter Thaler on LinkedIn",
    title: "LinkedIn",
    handle: "@kkratter",
    background: "linear-gradient(135deg, #0a66c2 0%, #004182 100%)",
  },
  {
    id: "github",
    brand: "github",
    href: "https://github.com/kkratterf",
    label: "Federico Kratter Thaler on GitHub",
    title: "GitHub",
    handle: "@kkratterf",
    background: "linear-gradient(135deg, #2b3137 0%, #0d1117 100%)",
  },
  {
    id: "x",
    brand: "x",
    href: "https://x.com/kkratter",
    label: "Federico Kratter Thaler on X (Twitter)",
    title: "X",
    handle: "@kkratter",
    background: "linear-gradient(135deg, #2a2a2a 0%, #000000 100%)",
  },
  {
    id: "instagram",
    brand: "instagram",
    href: "https://www.instagram.com/kkratter/",
    label: "Federico Kratter Thaler on Instagram",
    title: "Instagram",
    handle: "@kkratter",
    background:
      "radial-gradient(circle at 20% 110%, #feda75 0%, #fa7e1e 25%, #d62976 50%, #962fbf 75%, #4f5bd5 100%)",
  },
];

export const projectSections: ProjectSection[] = [
  {
    id: "building",
    title: "Building",
    projects: [
      {
        id: "play2match",
        schemaType: "WebApplication",
        applicationCategory: "SportsApplication",
        href: "https://www.play2match.it/",
        title: "play2match",
        domain: "play2match.it",
        status: "Building",
        description:
          "Make new friends through sport. Mixed beach volley matches across Italy, with teams composed by level.",
        icon: { src: "/images/icons/play2match.png", width: 180, height: 180 },
        preview: {
          src: "/images/og/play2match.jpg",
          width: 1200,
          height: 630,
          alt: "play2match: Fai nuove amicizie attraverso lo sport",
        },
      },
      {
        id: "m63",
        schemaType: "WebSite",
        href: "https://m63.it/",
        title: "M63",
        domain: "m63.it",
        status: "Building",
        description:
          "The open map of the Italian startup ecosystem: startups, investors, founders and funding rounds, plus a club for founders.",
        icon: { src: "/images/icons/m63.png", width: 180, height: 180 },
        preview: {
          src: "/images/og/m63.jpg",
          width: 1200,
          height: 630,
          alt: "M63: Scopri le migliori startup italiane",
        },
      },
    ],
  },
  {
    id: "products",
    title: "Products",
    projects: [
      {
        id: "maramao",
        schemaType: "SoftwareApplication",
        operatingSystem: "macOS",
        applicationCategory: "ProductivityApplication",
        href: "https://maramao.kkratter.com/",
        title: "Maramao",
        domain: "maramao.kkratter.com",
        status: "Live",
        description:
          "A Pomodoro timer for the macOS menu bar. Work for 25 minutes, then a cat makes sure you take the break.",
        icon: { src: "/images/icons/maramao.png", width: 180, height: 180 },
        preview: {
          src: "/images/og/maramao.jpg",
          width: 1200,
          height: 630,
          alt: "Maramao: Work for 25 minutes. Then the cat takes over.",
        },
      },
      {
        id: "f4",
        schemaType: "SoftwareApplication",
        operatingSystem: "macOS",
        applicationCategory: "UtilitiesApplication",
        href: "https://f4.kkratter.com/",
        title: "F4",
        domain: "f4.kkratter.com",
        status: "Live",
        description:
          "Spotlight, but for your memes. Press F4, type a few letters and the meme is on your clipboard, GIFs included.",
        icon: { src: "/images/icons/f4.png", width: 180, height: 180 },
        preview: {
          src: "/images/og/f4.jpg",
          width: 1200,
          height: 630,
          alt: "F4: Your shortcut to every meme.",
        },
      },
      {
        id: "fratmscript",
        schemaType: "SoftwareApplication",
        applicationCategory: "DeveloperApplication",
        href: "https://fratmscript.kkratter.com/",
        title: "FratmScript",
        domain: "fratmscript.kkratter.com",
        status: "Live",
        description:
          "JavaScript ma comme si deve. A transpiler, written in Rust, that turns Neapolitan code into JavaScript.",
        icon: "github",
        preview: {
          src: "/images/og/fratmscript.jpg",
          width: 1200,
          height: 630,
          alt: "FratmScript: JavaScript ma comme si deve",
        },
      },
    ],
  },
  {
    id: "writing",
    title: "Writing",
    projects: [
      {
        id: "substack",
        schemaType: "Blog",
        href: "https://kkratter.substack.com/",
        title: "Building. Always.",
        domain: "kkratter.substack.com",
        status: "Newsletter",
        description:
          "Notes from building products: what I ship, what breaks and what I learn along the way.",
        icon: { src: "/images/icons/substack.jpg", width: 64, height: 64 },
        preview: {
          src: "/images/substack.jpg",
          width: 920,
          height: 480,
          alt: "Building. Always. newsletter cover",
        },
      },
    ],
    // Latest issues, newest first; listed under the newsletter card.
    posts: [],
  },
  {
    id: "archive",
    title: "Archive",
    projects: [
      {
        id: "portfolio",
        schemaType: "WebSite",
        href: "https://portfolio.kkratter.com/",
        title: "Portfolio",
        domain: "portfolio.kkratter.com",
        status: "Archived",
        description:
          "My previous portfolio, from before 2023: product and design system work, before I started shipping my own products.",
        icon: { src: "/images/icons/portfolio.png", width: 180, height: 180 },
        preview: {
          src: "/images/og/portfolio.jpg",
          width: 1200,
          height: 630,
          alt: "Federico Kratter Thaler, portfolio cover",
        },
      },
    ],
  },
];

/** Profiles that identify the same person, used for JSON-LD `sameAs`. */
export const sameAs = [
  "https://www.linkedin.com/in/kkratter/",
  "https://x.com/kkratter",
  "https://github.com/kkratterf",
  "https://kkratter.substack.com/",
  "https://www.instagram.com/kkratter/",
  "https://avely.me/kkratter",
];

/** Visit counter in the bottom-left corner (count from PostHog, see src/lib/visitors.ts). */
export const visitorCounter = {
  label: "visitor number:",
  /** The count is zero-padded to this many digits, like an old hit counter. */
  digits: 6,
};
