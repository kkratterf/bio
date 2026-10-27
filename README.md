# bio

Personal bio page of Federico Kratter Thaler. It started as a rebuild of
[avely.me/kkratter](https://avely.me/kkratter); the look now follows
[coss.com](https://coss.com): one ruled sheet, hairline cells, a dotted
drafting grid behind the icons.

## Stack

- Next.js 16 (App Router, static prerender) + React 19
- Tailwind CSS v4
- Inter and Geist Mono via `next/font` (self-hosted, no layout shift)
- `next/image` for every picture (AVIF/WebP, responsive `sizes`)

## Content

All content lives in [`src/lib/profile.ts`](src/lib/profile.ts): name, bio,
profile links, project sections and the Writing section (newsletter and latest
posts). Images are in `public/images`.

## SEO

- Full metadata (title, description, canonical, robots, Open Graph `profile`,
  Twitter `summary_large_image`) in `src/app/layout.tsx`
- Generated OG/Twitter image (`opengraph-image.tsx`, `twitter-image.tsx`)
- Favicon and Apple touch icon generated from the avatar
- JSON-LD `ProfilePage` + `Person` (with `sameAs`) + `ItemList` of projects
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`
- Semantic HTML: one `h1`, one `section` + `h2` per group, project titles as `h3`,
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
