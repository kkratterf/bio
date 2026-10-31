/**
 * Every piece of content shown on the page lives here, so the bio can be
 * edited without touching layout code. Grid sizes mirror the Avely bento grid:
 * one unit is one column of the 4-column desktop grid.
 */

export type CardSize = "1x1" | "2x1" | "1x2" | "2x2";

type BaseCard = {
  id: string;
  /** Size on the 4-column desktop grid. */
  size: CardSize;
  /**
   * Avely keeps a separate 2-column layout for small screens: a card can take
   * another shape there and appear in another position.
   */
  mobile?: { size?: CardSize; order?: number };
  href: string;
  /** Accessible name for the whole card link. */
  label: string;
};

export type MediaCard = BaseCard & {
  kind: "media";
  image: { src: string; width: number; height: number; alt: string };
};

export type MapCard = BaseCard & {
  kind: "map";
  place: string;
  image: { src: string; width: number; height: number };
};


export type Card = MediaCard | MapCard;

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
  /** Accessible name for the whole card link. */
  label: string;
  title: string;
  domain: string;
  /** Shown as a badge next to the title. */
  status: "Building" | "Live" | "Newsletter";
  description: string;
  icon: { src: string; width: number; height: number } | "github";
  preview: { src: string; width: number; height: number; alt: string };
};

/** The bento grid of profiles at the top of the page. */
export type BentoSection = {
  id: string;
  title: string;
  cards: Card[];
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

export const about: BentoSection = {
  id: "about",
  title: "About",
  cards: [
    {
      kind: "map",
      id: "location",
      size: "1x2",
      mobile: { size: "2x1", order: 2 },
      place: "Milan, Italy",
      href: "https://www.google.com/maps/search/?api=1&query=45.46426590913465%2C9.18814879103845",
      label: "Milan, Italy on Google Maps",
      image: { src: "/images/map-milan.png", width: 370, height: 792 },
    },
    {
      kind: "media",
      id: "linkedin",
      size: "2x1",
      mobile: { order: 1 },
      href: "https://www.linkedin.com/in/kkratter/",
      label: "Federico Kratter Thaler on LinkedIn",
      image: {
        src: "/images/linkedin.png",
        width: 1170,
        height: 525,
        alt: "LinkedIn, @kkratter",
      },
    },
    {
      kind: "media",
      id: "x",
      size: "1x1",
      mobile: { order: 4 },
      href: "https://x.com/kkratter",
      label: "Federico Kratter Thaler on X (Twitter)",
      image: {
        src: "/images/twitter.png",
        width: 525,
        height: 525,
        alt: "Twitter, @kkratter",
      },
    },
    {
      kind: "media",
      id: "github",
      size: "1x1",
      mobile: { order: 5 },
      href: "https://github.com/kkratterf",
      label: "Federico Kratter Thaler on GitHub",
      image: {
        src: "/images/github.png",
        width: 525,
        height: 525,
        alt: "GitHub, @kkratterf",
      },
    },
    {
      kind: "media",
      id: "website",
      size: "2x1",
      mobile: { order: 3 },
      href: "https://www.kkratter.com/",
      label: "Portfolio 2023, kkratter.com",
      image: {
        src: "/images/portfolio.png",
        width: 1170,
        height: 525,
        alt: "Portfolio 2023, Product & Design System Designer",
      },
    },
  ],
};

export const projectSections: ProjectSection[] = [
  {
    id: "building",
    title: "Building",
    projects: [
      {
        id: "play2match",
        href: "https://www.play2match.it/",
        label: "play2match",
        title: "play2match",
        domain: "play2match.it",
        status: "Building",
        description:
          "Make new friends through sport. Mixed beach volley matches across Italy, with teams composed by level.",
        icon: { src: "/images/icons/play2match.png", width: 48, height: 48 },
        preview: {
          src: "/images/og/play2match.jpg",
          width: 1200,
          height: 630,
          alt: "play2match: Fai nuove amicizie attraverso lo sport",
        },
      },
      {
        id: "m63",
        href: "https://m63.it/",
        label: "M63, the open map of the Italian startup ecosystem",
        title: "M63",
        domain: "m63.it",
        status: "Building",
        description:
          "The open map of the Italian startup ecosystem: startups, investors, founders and funding rounds, plus a club for founders.",
        icon: { src: "/images/icons/m63.png", width: 192, height: 192 },
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
        href: "https://maramao.kkratter.com/",
        label: "Maramao, the Pomodoro timer that stops you with cats",
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
        href: "https://f4.kkratter.com/",
        label: "F4, Spotlight for your memes",
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
        href: "https://fratmscript.kkratter.com/",
        label: "FratmScript, JavaScript ma comme si deve",
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
        href: "https://kkratter.substack.com/",
        label: "Building. Always., the newsletter on Substack",
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
];

/** Profiles that identify the same person, used for JSON-LD `sameAs`. */
export const sameAs = [
  "https://www.linkedin.com/in/kkratter/",
  "https://x.com/kkratter",
  "https://github.com/kkratterf",
  "https://www.kkratter.com/",
  "https://kkratter.substack.com/",
  "https://avely.me/kkratter",
];
