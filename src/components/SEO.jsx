import React from "react";
import { Helmet } from "react-helmet-async";

export default function SEO({
  title,
  description,
  name = "Hack Heist 2.0",
  type = "website",
  url,
  image = "https://www.hackheist2.xyz/og-image.png",
  structuredData,
}) {
  const fullTitle = title ? `${title} | ${name}` : `${name} — 36-Hour Hackathon`;
  const defaultDesc =
    "Assemble your crew, crack the code, and pull off the perfect build. A 36-hour hackathon by GDG On Campus MIET, March 28–29, 2026.";
  const finalDescription = description || defaultDesc;
  const canonicalUrl = url ? `https://www.hackheist2.xyz${url}` : "https://www.hackheist2.xyz/";

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta
        name="keywords"
        content="hackheist, hack heist, gdg miet hackathon, meerut hackathon, 36 hour hackathon"
      />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={name} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter tags */}
      <meta name="twitter:creator" content="@gdgmiet" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  );
}
