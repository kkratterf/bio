import Image from "next/image";
import { BentoCard } from "@/components/bento-card";
import { JsonLd } from "@/components/json-ld";
import { ProjectCard } from "@/components/project-card";
import { about, profile, projectSections } from "@/lib/profile";

export default function Home() {
  return (
    <>
      <JsonLd />
      <main className="relative mx-auto flex min-h-screen w-full max-w-[1728px] flex-col items-center pb-16 xl:flex-row xl:items-start xl:p-16">
        <header className="w-full max-w-[428px] animate-profile-in px-10 pt-12 xl:sticky xl:top-16 xl:mr-20 xl:max-w-none xl:min-w-0 xl:flex-1 xl:px-0 xl:pt-0">
          <div className="relative size-30 shrink-0 xl:size-46">
            <Image
              src={profile.avatar.src}
              alt={profile.avatar.alt}
              width={profile.avatar.width}
              height={profile.avatar.height}
              sizes="(min-width: 1280px) 184px, 120px"
              priority
              className="size-full rounded-full object-cover shadow-sm ring-1 ring-black/5"
              draggable={false}
            />
          </div>
          <div className="mt-8 ml-2 w-[calc(100%-8px)] max-w-[min(500px,100%-8px)] min-w-0 xl:max-w-[min(500px,calc(100vw-1028px))]">
            <h1 className="text-[32px] leading-[110%] font-semibold tracking-[-0.02em] wrap-break-word whitespace-pre-wrap text-fg xl:text-[44px]">
              {profile.name}
            </h1>
            <p className="mt-3 text-lg font-normal wrap-break-word whitespace-pre-wrap text-muted-fg lg:text-[20px] lg:leading-7">
              {profile.bio}
            </p>
          </div>
        </header>

        <div className="mt-10 flex w-full max-w-[428px] flex-col gap-10 px-6 xl:mt-0 xl:gap-12 xl:w-[820px] xl:max-w-none xl:flex-none xl:px-0">
          <section className="bento-section" aria-labelledby={`${about.id}-title`}>
            <SectionTitle id={about.id}>{about.title}</SectionTitle>
            <ul role="list" className="bento mt-3">
              {about.cards.map((card) => (
                <BentoCard key={card.id} card={card} />
              ))}
            </ul>
          </section>
          {projectSections.map((section) => (
            <section key={section.id} aria-labelledby={`${section.id}-title`}>
              <SectionTitle id={section.id}>{section.title}</SectionTitle>
              <ul role="list" className="mt-3 grid grid-cols-1 gap-5 xl:grid-cols-2 xl:gap-6">
                {section.projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </ul>
              {section.posts && section.posts.length > 0 && (
                <ol role="list" className="mt-3 flex flex-col">
                  {section.posts.map((post) => (
                    <li key={post.href}>
                      <a
                        href={post.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-baseline justify-between gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                      >
                        <span className="line-clamp-1 text-sm text-fg">{post.title}</span>
                        <time dateTime={post.date} className="shrink-0 text-xs text-muted-fg tabular-nums">
                          {new Date(post.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </time>
                      </a>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          ))}
        </div>
      </main>
      <footer className="mb-10 flex w-full justify-center text-xs text-muted-fg">
        <p>© {profile.name}</p>
      </footer>
    </>
  );
}

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={`${id}-title`} className="px-1 text-lg leading-6 font-semibold tracking-[-0.01em] text-fg">
      {children}
    </h2>
  );
}
