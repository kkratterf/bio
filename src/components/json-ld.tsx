import { profile, projectSections, sameAs } from "@/lib/profile";
import { siteUrl } from "@/lib/site";

const personId = `${siteUrl}/#person`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: profile.name,
      description: profile.bio,
      inLanguage: "en",
      mainEntity: { "@id": personId },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${siteUrl}${profile.avatar.src}`,
      },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: profile.name,
      givenName: profile.givenName,
      familyName: profile.familyName,
      alternateName: profile.handle,
      description: profile.bio,
      jobTitle: profile.jobTitle,
      url: siteUrl,
      image: `${siteUrl}${profile.avatar.src}`,
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
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#projects`,
      name: "Building & Products",
      itemListElement: projectSections
        .flatMap((section) => section.projects)
        .map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: project.name,
            description: project.summary,
            url: project.href,
            creator: { "@id": personId },
          },
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
