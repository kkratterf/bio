# Agent instructions

Personal bio site of Federico Kratter Thaler (GitHub `kkratterf`), deployed on
Vercel at https://kkratter.com. Read `README.md` first.

## Rules

- **Commit as the owner.** Author every commit as
  `kkratterf <70836137+kkratterf@users.noreply.github.com>`. An agent goes
  only in a `Co-Authored-By:` trailer, never as author.
- **Work on a branch and open a PR.** Never push to `main`: it deploys to
  production. Every PR gets a Vercel preview URL; share it.
- **Run `npm run check` before pushing** (lint, typecheck, build). CI runs the
  same steps.
- **Design changes need approval.** Show screenshots of the real build
  (desktop 1440px and mobile 390px) before and after. Do not send rough
  mockups.
- **Keep the content in `src/lib/profile.ts`.** Do not hardcode copy in
  components.
- **Don't add dependencies** unless they are clearly needed; this is a static
  page.
- **The owner writes in Italian.** Reply in Italian, keep code, comments and
  commit messages in English.

## Design system

- Font Inter for everything, Mattone only for the name (34px desktop, 26px
  mobile). Do not swap fonts: Cal Sans and PP Radio Grotesk were rejected.
- Colours are the coss ui light tokens in `src/app/globals.css`.
- Every card is a square `FrameCard` (double border, M63 style). About is a
  four-column row of social cards (two per row below 1280px); project
  sections are two columns on desktop, one below 1280px.
- Status badges: Building = blue (work in progress), Live = green,
  Newsletter = violet, Archived = neutral.
- App icons are the apps' Apple touch icons (`public/images/icons`), not
  favicons.

## SEO checklist for any change

- Exactly one `h1`; each section has an `h2`, each card title an `h3`.
- Every image has `alt`, explicit `width`/`height` and `sizes`.
- New projects also appear in the JSON-LD `ItemList` (it reads from
  `projectSections`, so adding them to `profile.ts` is enough).
- Absolute URLs come from `siteUrl` in `src/lib/site.ts`; never hardcode the
  domain.
- Bump `lastUpdated` in `src/lib/site.ts` when content changes (sitemap and
  JSON-LD `dateModified`).
- Title stays about 60 characters, meta description about 150; both are built
  from `profile.roles` and `profile.description`.
- Each project needs a `schemaType` (WebApplication, SoftwareApplication,
  WebSite or Blog) so its JSON-LD node is typed correctly.
- `/llms.txt` is generated from `profile.ts`; check it after content changes.

## Layout

```
src/app         routes, metadata, OG image, icons, sitemap, robots, manifest
src/components  FrameCard, ProjectCard, SocialCard, BrandIcon, JsonLd
src/lib         profile.ts (content), site.ts (canonical origin)
src/fonts       Mattone (OFL)
public/images   avatar, previews (og/), app icons (icons/)
```

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
