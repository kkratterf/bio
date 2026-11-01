import { profile, projectSections, sameAs, type Project } from "@/lib/profile";
import { lastUpdated, siteUrl } from "@/lib/site";

const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;
const avatarUrl = `${siteUrl}${profile.avatar.src}`;
const projects = projectSections.flatMap((s) => s.projects);

function projectNode(project: Project) {
  const base = {
    "@type": project.schemaType,
    "@id": `${project.href}#${project.id}`,
    name: project.title,
    description: project.description,
    url: project.href,
    image: `${siteUrl}${project.preview.src}`,
    inLanguage: project.id === "fratmscript" ? ["it", "en"] : "en",
  };
  switch (project.schemaType) {
    case "SoftwareApplication":
    case "WebApplication":
      return {
        ...base,
        applicationCategory: project.applicationCategory,
        ...(project.operatingSystem && { operatingSystem: project.operatingSystem }),
        author: { "@id": personId },
      };
    case "Blog":
      return { ...base, author: { "@id": personId }, publisher: { "@id": personId } };
    default:
      return { ...base, creator: { "@id": personId } };
  }
}

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteUrl,
      name: profile.name,
      alternateName: [profile.handle, "kkratter.com"],
      description: profile.bio,
      inLanguage: "en",
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: profile.name,
      description: profile.bio,
      inLanguage: "en",
      isPartOf: { "@id": websiteId },
      about: { "@id": personId },
      mainEntity: { "@id": personId },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: avatarUrl,
        width: profile.avatar.width,
        height: profile.avatar.height,
      },
      dateModified: lastUpdated,
    },
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      givenName: profile.givenName,
      familyName: profile.familyName,
      alternateName: [profile.handle, "Federico Kratter", "kkratterf"],
      description: profile.bio,
      jobTitle: [...profile.roles],
      worksFor: {
        "@type": "Organization",
        name: profile.worksFor.name,
        url: profile.worksFor.url,
      },
      hasOccupation: profile.roles.map((name) => ({
        "@type": "Occupation",
        name,
        occupationLocation: { "@type": "City", name: profile.location.locality },
      })),
      knowsAbout: [...profile.knowsAbout],
      url: siteUrl,
      mainEntityOfPage: { "@id": `${siteUrl}/#profilepage` },
      image: {
        "@type": "ImageObject",
        url: avatarUrl,
        width: profile.avatar.width,
        height: profile.avatar.height,
      },
      homeLocation: {
        "@type": "Place",
        name: `${profile.location.locality}, ${profile.location.country}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: profile.location.locality,
          addressCountry: profile.location.countryCode,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: profile.location.latitude,
          longitude: profile.location.longitude,
        },
      },
      sameAs,
      subjectOf: projects.map((p) => ({ "@id": `${p.href}#${p.id}` })),
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#projects`,
      name: `Products and writing by ${profile.name}`,
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: projectNode(project),
      })),
    },
  ],
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so the payload can never close the script tag early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
