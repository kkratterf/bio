/**
 * Every piece of content shown on the page lives here, so the bio can be
 * edited without touching layout code.
 */

export type Link = {
  label: string;
  /** Handle or short form shown next to the label. */
  detail: string;
  href: string;
};

export type Project = {
  id: string;
  name: string;
  href: string;
  domain: string;
  summary: string;
  icon: { src: string; width: number; height: number } | "github";
};

export type Post = {
  title: string;
  /** ISO date, e.g. "2026-10-01". */
  date: string;
  href: string;
};

export type ProjectSection = {
  id: string;
  title: string;
  intro: string;
  projects: Project[];
};

export const profile = {
  name: "Federico Kratter Thaler",
  givenName: "Federico",
  familyName: "Kratter Thaler",
  handle: "kkratter",
  bio: "I design products. I build them too.",
  jobTitle: "Product designer & builder",
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

export const links: Link[] = [
  { label: "LinkedIn", detail: "@kkratter", href: "https://www.linkedin.com/in/kkratter/" },
  { label: "X", detail: "@kkratter", href: "https://x.com/kkratter" },
  { label: "GitHub", detail: "@kkratterf", href: "https://github.com/kkratterf" },
  { label: "Portfolio", detail: "kkratter.com", href: "https://www.kkratter.com/" },
];

export const projectSections: ProjectSection[] = [
  {
    id: "building",
    title: "Building",
    intro: "What I work on every day.",
    projects: [
      {
        id: "play2match",
        name: "play2match",
        href: "https://www.play2match.it/",
        domain: "play2match.it",
        summary: "Amateur football matches across Italy: find one near you, book your spot, play.",
        icon: { src: "/images/icons/play2match.png", width: 48, height: 48 },
      },
    ],
  },
  {
    id: "products",
    title: "Products",
    intro: "Things I designed and shipped, mostly open source.",
    projects: [
      {
        id: "m63",
        name: "M63",
        href: "https://m63.it/",
        domain: "m63.it",
        summary: "The open map of the Italian startup ecosystem, plus a private club where founders meet every week.",
        icon: { src: "/images/icons/m63.png", width: 192, height: 192 },
      },
      {
        id: "fratmscript",
        name: "FratmScript",
        href: "https://fratmscript.kkratter.com/",
        domain: "fratmscript.kkratter.com",
        summary: "JavaScript ma comme si deve 🤌 A transpiler from Neapolitan to JavaScript, written in Rust.",
        icon: "github",
      },
      {
        id: "maramao",
        name: "Maramao",
        href: "https://maramao.kkratter.com/",
        domain: "maramao.kkratter.com",
        summary: "The Pomodoro timer that stops you with cats. A native macOS menu bar app.",
        icon: { src: "/images/icons/maramao.png", width: 180, height: 180 },
      },
      {
        id: "f4",
        name: "F4",
        href: "https://f4.kkratter.com/",
        domain: "f4.kkratter.com",
        summary: "Spotlight, but for your memes. Press F4, type, and the GIF is on your clipboard.",
        icon: { src: "/images/icons/f4.png", width: 180, height: 180 },
      },
    ],
  },
];

export const writing = {
  title: "Writing",
  intro: "My newsletter on Substack.",
  newsletter: {
    name: "Building. Always.",
    href: "https://kkratter.substack.com/",
    domain: "kkratter.substack.com",
    cover: {
      src: "/images/substack.jpg",
      width: 920,
      height: 480,
      alt: "Building. Always. newsletter cover",
    },
  },
  /** Latest issues, newest first. */
  posts: [] as Post[],
};

/** Profiles that identify the same person, used for JSON-LD `sameAs`. */
export const sameAs = [
  ...links.map((link) => link.href),
  "https://kkratter.substack.com/",
  "https://avely.me/kkratter",
];
