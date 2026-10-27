import { profile, sameAs, sections } from "@/lib/profile";
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
      itemListElement: sections
        .filter((s) => s.id !== "about")
        .flatMap((s) => s.cards)
        .map((card, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: card.kind === "website" ? card.title : card.label,
            url: card.href,
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
