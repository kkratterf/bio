# bio

Personal bio page of Federico Kratter Thaler, a Next.js rebuild of
[avely.me/kkratter](https://avely.me/kkratter).

## Stack

- Next.js 16 (App Router, static prerender) + React 19
- Tailwind CSS v4
- Cal Sans, the coss.com typeface (SIL OFL), via `next/font/local`; colours
  from the coss ui light theme
- `next/image` for every picture (AVIF/WebP, responsive `sizes`)

## Content

All content lives in [`src/lib/profile.ts`](src/lib/profile.ts): name, bio,
sections and cards. Images are in `public/images`.

Card sizes follow the Avely bento grid: `1x1`, `2x1`, `1x2`, `2x2`, where one
unit is one column of the 4-column desktop grid (187px cells, 24px gap, 820px
wide). Below 1280px the grid switches to 2 columns.

## SEO

- Full metadata (title, description, canonical, robots, Open Graph `profile`,
  Twitter `summary_large_image`) in `src/app/layout.tsx`
- Generated OG/Twitter image (`opengraph-image.tsx`, `twitter-image.tsx`)
- Favicon and Apple touch icon generated from the avatar
- JSON-LD `ProfilePage` + `Person` (with `sameAs`) + `ItemList` of projects
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`
- Semantic HTML: one `h1`, one `section` + `h2` per group, card titles as `h3`,
  descriptive link labels, `rel="me"` on profile links

## Configuration

Set the production origin so canonical URLs, sitemap and OG tags are absolute:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

On Vercel the production domain is picked up automatically when the variable is
not set.

## Development

```bash
npm install
npm run dev
```
