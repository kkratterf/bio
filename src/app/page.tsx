import Image from "next/image";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/json-ld";
import {
  type Project,
  links,
  profile,
  projectSections,
  writing,
} from "@/lib/profile";

/** Page layout after coss.com: one ruled sheet between two rails. */
export default function Home() {
  return (
    <>
      <JsonLd />
      <div className="mx-auto flex min-h-screen w-full max-w-[1120px] flex-col border-x border-border bg-page">
        <SiteHeader />
        <main className="flex-1">
          <Hero />
          {projectSections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-title`}
              className="scroll-mt-14 border-b border-border"
            >
              <SectionHead id={`${section.id}-title`} title={section.title}>
                {section.intro}
              </SectionHead>
              <ul role="list" className="grid grid-cols-1 gap-px border-t border-border bg-border md:grid-cols-2">
                {section.projects.map((project, index) => (
                  <ProjectCell
                    key={project.id}
                    project={project}
                    index={index}
                    // A lone last cell takes the whole row.
                    wide={section.projects.length % 2 === 1 && index === section.projects.length - 1}
                  />
                ))}
              </ul>
            </section>
          ))}
          <Writing />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-border bg-page/90 px-4 backdrop-blur-md sm:px-8">
      <a href="#" className="font-semibold tracking-[-0.02em]">
        {profile.handle}
      </a>
      <nav aria-label="Sections">
        <ul role="list" className="flex gap-5 text-sm text-muted-foreground">
          {[...projectSections, { id: "writing", title: writing.title }].map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="transition-colors hover:text-foreground">
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="border-b border-border">
      <div className="flex flex-col gap-8 px-4 pt-12 pb-10 sm:px-8 sm:pt-16 lg:grid lg:grid-cols-12 lg:items-end lg:gap-10 lg:pb-12">
        <div className="flex flex-col gap-6 lg:col-span-8">
          <Image
            src={profile.avatar.src}
            alt={profile.avatar.alt}
            width={profile.avatar.width}
            height={profile.avatar.height}
            sizes="80px"
            priority
            className="size-20 rounded-full border border-border object-cover"
            draggable={false}
          />
          <h1
            id="hero-title"
            className="text-[clamp(2.75rem,6.5vw,5.25rem)] leading-[0.92] font-semibold tracking-[-0.035em] text-balance"
          >
            {profile.name}
          </h1>
        </div>
        <div className="flex flex-col gap-3 lg:col-span-4 lg:pb-2">
          <p className="max-w-md text-lg leading-snug text-muted-foreground">{profile.bio}</p>
          <p className="font-mono text-xs text-muted-foreground">
            {profile.location.locality}, {profile.location.country}
          </p>
        </div>
      </div>
      <ul role="list" className="grid grid-cols-2 gap-px border-t border-border bg-border md:grid-cols-4">
        {links.map((link) => (
          <li key={link.href} className="bg-background">
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer me"
              className="group flex items-center justify-between gap-3 px-4 py-5 transition-colors hover:bg-page focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring sm:px-8"
            >
              <span className="flex flex-col gap-0.5">
                <span className="font-medium">{link.label}</span>
                <span className="font-mono text-xs text-muted-foreground">{link.detail}</span>
              </span>
              <ArrowUpRight />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SectionHead({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <div className="grid gap-3 px-4 pt-14 pb-8 sm:px-8 sm:pt-16 lg:grid-cols-12 lg:gap-10">
      <h2 id={id} className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl lg:col-span-5">
        {title}
      </h2>
      <p className="max-w-xl text-lg leading-snug text-muted-foreground lg:col-span-6 lg:col-start-7 lg:pt-2">
        {children}
      </p>
    </div>
  );
}

function ProjectCell({ project, index, wide }: { project: Project; index: number; wide: boolean }) {
  return (
    <li className={wide ? "bg-background md:col-span-2" : "bg-background"}>
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.name}, ${project.domain}`}
        className="group flex h-full flex-col transition-colors hover:bg-page focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
      >
        <div className="drafting-grid relative flex h-44 items-center justify-center border-b border-border">
          <span className="absolute top-4 left-4 font-mono text-xs text-muted-foreground sm:left-8">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="absolute top-4 right-4 sm:right-8">
            <ArrowUpRight />
          </span>
          <span className="flex size-16 items-center justify-center overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
            {project.icon === "github" ? (
              <GithubMark />
            ) : (
              <Image
                src={project.icon.src}
                alt=""
                width={64}
                height={64}
                className="size-full object-cover"
                draggable={false}
              />
            )}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 px-4 py-7 sm:px-8">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-2xl font-semibold tracking-[-0.02em]">{project.name}</h3>
            <span className="font-mono text-sm text-muted-foreground">{project.domain}</span>
          </div>
          <p className="max-w-md leading-snug text-muted-foreground">{project.summary}</p>
        </div>
      </a>
    </li>
  );
}

function Writing() {
  const { newsletter, posts } = writing;
  return (
    <section id="writing" aria-labelledby="writing-title" className="scroll-mt-14">
      <SectionHead id="writing-title" title={writing.title}>
        {writing.intro}
      </SectionHead>
      <div className="grid grid-cols-1 gap-px border-t border-border bg-border lg:grid-cols-12">
        <a
          href={newsletter.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${newsletter.name}, the newsletter on Substack`}
          className="drafting-grid flex items-center justify-center bg-background px-4 py-10 sm:px-8 lg:col-span-7"
        >
          <Image
            src={newsletter.cover.src}
            alt={newsletter.cover.alt}
            width={newsletter.cover.width}
            height={newsletter.cover.height}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="w-full max-w-xl rounded-xl border border-border shadow-sm"
            draggable={false}
          />
        </a>
        <div className="flex flex-col gap-5 bg-background px-4 py-10 sm:px-8 lg:col-span-5">
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-semibold tracking-[-0.02em]">{newsletter.name}</h3>
            <span className="font-mono text-sm text-muted-foreground">{newsletter.domain}</span>
          </div>
          <a
            href={newsletter.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Subscribe
          </a>
          {posts.length > 0 && (
            <ol role="list" className="flex flex-col border-t border-border">
              {posts.map((post) => (
                <li key={post.href} className="border-b border-border last:border-b-0">
                  <a
                    href={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-baseline justify-between gap-4 py-3.5 hover:underline"
                  >
                    <span className="line-clamp-1">{post.title}</span>
                    <time dateTime={post.date} className="shrink-0 font-mono text-xs text-muted-foreground">
                      {post.date}
                    </time>
                  </a>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-border px-4 py-6 text-sm text-muted-foreground sm:px-8">
      <p>© {profile.name}</p>
      <p className="font-mono text-xs">
        {profile.location.locality}, {profile.location.country}
      </p>
    </footer>
  );
}

function ArrowUpRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
    >
      <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GithubMark() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-8 text-foreground" fill="currentColor">
      <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
    </svg>
  );
}
