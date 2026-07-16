import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  locale?: string;
  twitterCard?: string;
  structuredData?: object;
  alternates?: Array<{
    hrefLang: string;
    href: string;
  }>;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Creativa Poeta | Visibility, websites, AI, design and digital tools",
  description = "Creativa Poeta helps businesses become easier to find, understand and contact with local visibility, clear websites, AI assistants, visual identity, content and digital assistance.",
  keywords = "Creativa Poeta, local visibility, Google Maps visibility, AI visibility, business website, AI assistants, graphic design, content writing, digital assistance",
  image = "https://creativapoeta.com/cp-logo.png",
  url = "https://creativapoeta.com/",
  type = "website",
  siteName = "Creativa Poeta",
  locale = "en_US",
  twitterCard = "summary_large_image",
  structuredData,
  alternates = [],
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />

      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      {alternates.map((alternate) => (
        <link
          key={`${alternate.hrefLang}-${alternate.href}`}
          rel="alternate"
          hrefLang={alternate.hrefLang}
          href={alternate.href}
        />
      ))}

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
