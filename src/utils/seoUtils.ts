// SEO utility functions and constants

export const SEO_CONSTANTS = {
  SITE_NAME: "Creativa Poeta",
  SITE_URL: "https://creativapoeta.com",
  DEFAULT_IMAGE: "https://creativapoeta.com/poeta.jpeg",
  TWITTER_HANDLE: "@creativapoeta",
  FACEBOOK_APP_ID: "", // Add when available
  GOOGLE_SITE_VERIFICATION: "", // Add when available

  // Primary keywords for the business
  PRIMARY_KEYWORDS: [
    "web development Rwanda",
    "graphic design services",
    "digital marketing Rwanda",
    "content writing services",
    "creative solutions",
    "business growth Rwanda",
    "professional web design",
    "Kigali web development",
  ],

  // Business categories for local SEO
  BUSINESS_CATEGORIES: [
    "Web Development Company",
    "Graphic Design Agency",
    "Digital Marketing Agency",
    "Creative Services Provider",
    "Technology Consulting",
  ],

  // Supported languages
  SUPPORTED_LANGUAGES: [
    { code: "en", name: "English", locale: "en_US" },
    { code: "fr", name: "French", locale: "fr_FR" },
    { code: "kiny", name: "Kinyarwanda", locale: "rw_RW" },
    { code: "nl", name: "Dutch", locale: "nl_NL" },
  ],
};

// Generate structured data for different content types
export const generateStructuredData = {
  organization: () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SEO_CONSTANTS.SITE_NAME,
    url: SEO_CONSTANTS.SITE_URL,
    logo: SEO_CONSTANTS.DEFAULT_IMAGE,
    description:
      "Professional creative digital solutions including web development, graphic design, content writing, and digital marketing services.",
    foundingDate: "2023",
    address: {
      "@type": "PostalAddress",
      addressCountry: "RW",
      addressRegion: "Kigali",
      addressLocality: "Kigali",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${SEO_CONSTANTS.SITE_URL}/contact`,
      availableLanguage: SEO_CONSTANTS.SUPPORTED_LANGUAGES.map(
        (lang) => lang.name
      ),
    },
    sameAs: [
      "https://www.facebook.com/creativapoeta",
      "https://www.instagram.com/creativapoeta",
      "https://www.linkedin.com/company/creativapoeta",
      "https://twitter.com/creativapoeta",
    ],
  }),

  service: (serviceName: string, description: string, serviceType: string) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: description,
    provider: {
      "@type": "Organization",
      name: SEO_CONSTANTS.SITE_NAME,
      url: SEO_CONSTANTS.SITE_URL,
    },
    serviceType: serviceType,
    areaServed: {
      "@type": "Country",
      name: "Rwanda",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${serviceName} Services`,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: serviceName,
          },
        },
      ],
    },
  }),

  webpage: (title: string, description: string, url: string) => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: description,
    url: url,
    isPartOf: {
      "@type": "WebSite",
      name: SEO_CONSTANTS.SITE_NAME,
      url: SEO_CONSTANTS.SITE_URL,
    },
    about: {
      "@type": "Organization",
      name: SEO_CONSTANTS.SITE_NAME,
    },
  }),

  breadcrumb: (items: Array<{ name: string; url: string }>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }),
};

// SEO validation helpers
export const validateSEO = {
  titleLength: (title: string) => ({
    isValid: title.length >= 30 && title.length <= 60,
    length: title.length,
    message:
      title.length < 30
        ? "Title too short (recommended: 30-60 chars)"
        : title.length > 60
        ? "Title too long (recommended: 30-60 chars)"
        : "Title length is good",
  }),

  descriptionLength: (description: string) => ({
    isValid: description.length >= 120 && description.length <= 160,
    length: description.length,
    message:
      description.length < 120
        ? "Description too short (recommended: 120-160 chars)"
        : description.length > 160
        ? "Description too long (recommended: 120-160 chars)"
        : "Description length is good",
  }),

  keywordDensity: (content: string, keyword: string) => {
    const words = content.toLowerCase().split(/\s+/);
    const keywordCount = words.filter((word) =>
      word.includes(keyword.toLowerCase())
    ).length;
    const density = (keywordCount / words.length) * 100;

    return {
      density: density.toFixed(2),
      isOptimal: density >= 1 && density <= 3,
      message:
        density < 1
          ? "Keyword density too low (recommended: 1-3%)"
          : density > 3
          ? "Keyword density too high (recommended: 1-3%)"
          : "Keyword density is optimal",
    };
  },
};

export default {
  SEO_CONSTANTS,
  generateStructuredData,
  validateSEO,
};
