import { profile, projectSections, sameAs, socials } from "@/lib/profile";
import { siteUrl } from "@/lib/site";

// A plain-text summary for LLM crawlers and AI search (llmstxt.org).

export function GET() {
  const sections = projectSections
    .map((section) => {
      const items = section.projects
        .map((p) => `- [${p.title}](${p.href}): ${p.description} (${p.status})`)
        .join("\n");
      return `## ${section.title}\n\n${items}`;
    })
    .join("\n\n");

  const body = `# ${profile.name}

> ${profile.jobTitle}, based in ${profile.location.locality}, ${profile.location.country}. ${profile.bio}

${profile.summary}

- Website: ${siteUrl}
- Handle: ${profile.handle}
- Role: ${profile.worksFor.roleName} at [${profile.worksFor.name}](${profile.worksFor.url})
- Expertise: ${profile.knowsAbout.join(", ")}

${sections}

## Profiles

${socials.map((s) => `- [${s.title}](${s.href})`).join("\n")}
${sameAs
  .filter((url) => !socials.some((s) => s.href === url))
  .map((url) => `- ${url}`)
  .join("\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
