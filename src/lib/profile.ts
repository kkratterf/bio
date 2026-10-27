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

export type WebsiteCard = BaseCard & {
  kind: "website";
  title: string;
  domain: string;
  icon?: { src: string; width: number; height: number } | "github";
  preview?: { src: string; width: number; height: number; alt: string };
};

export type Card = MediaCard | MapCard | WebsiteCard;

export type Section = {
  id: string;
  title: string;
  cards: Card[];
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

export const sections: Section[] = [
  {
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
  },
  {
    id: "building",
    title: "Building",
    cards: [
      {
        kind: "website",
        id: "play2match",
        size: "2x2",
        href: "https://www.play2match.it/",
        label: "play2match",
        title: "play2match",
        domain: "play2match.it",
        icon: { src: "/images/icons/play2match.png", width: 48, height: 48 },
      },
      {
        kind: "website",
        id: "substack",
        size: "2x2",
        mobile: { size: "2x1" },
        href: "https://kkratter.substack.com/",
        label: "Building. Always. on Substack",
        title: "Building. Always.",
        domain: "kkratter.substack.com",
        icon: { src: "/images/icons/substack.jpg", width: 64, height: 64 },
        preview: {
          src: "/images/substack.jpg",
          width: 920,
          height: 480,
          alt: "Building. Always. newsletter cover",
        },
      },
    ],
  },
  {
    id: "products",
    title: "Products",
    cards: [
      {
        kind: "website",
        id: "c14",
        size: "2x2",
        href: "https://www.c14.so/",
        label: "C14, open-source startup database",
        title: "C14 — Open-source startup database",
        domain: "c14.so",
        icon: { src: "/images/icons/c14.png", width: 48, height: 48 },
      },
      {
        kind: "website",
        id: "m63",
        size: "2x2",
        href: "https://www.m63.club/",
        label: "M63 Club",
        title: "M63 Club — Keep the secret",
        domain: "m63.club",
        icon: { src: "/images/icons/m63.png", width: 48, height: 48 },
      },
      {
        kind: "website",
        id: "fratmscript",
        size: "2x2",
        mobile: { size: "2x1" },
        href: "https://kkratterf.github.io/fratmscript/",
        label: "FratmScript",
        title: "FratmScript - JavaScript ma comme si deve 🤌",
        domain: "kkratterf.github.io",
        icon: "github",
      },
    ],
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
