export type LocaleCode = "en" | "fr" | "nl" | "kiny";

export type MarketCode = "global" | "be" | "fr" | "rw" | "nl";

export type MarketConfig = {
  code: MarketCode;
  label: string;
  defaultLocale: LocaleCode;
  locales: LocaleCode[];
  domains: string[];
  currency?: string;
  countryCode?: string;
  publicPositioning: string;
  primaryCity?: string;
  phone?: string;
  email?: string;
};

export const localeLabels: Record<LocaleCode, string> = {
  en: "English",
  fr: "Francais",
  nl: "Nederlands",
  kiny: "Kinyarwanda",
};

export const localeHreflang: Record<LocaleCode, string> = {
  en: "en",
  fr: "fr",
  nl: "nl",
  kiny: "rw",
};

export const markets: Record<MarketCode, MarketConfig> = {
  global: {
    code: "global",
    label: "Global",
    defaultLocale: "en",
    locales: ["en", "fr"],
    domains: ["creativapoeta.com", "www.creativapoeta.com"],
    email: "contact@creativapoeta.com",
    publicPositioning:
      "A clear digital presence for businesses that want to be easier to find, understand, and contact.",
  },
  be: {
    code: "be",
    label: "Belgium",
    defaultLocale: "fr",
    locales: ["fr", "nl"],
    domains: ["be.creativapoeta.com"],
    currency: "EUR",
    countryCode: "BE",
    primaryCity: "Bruxelles",
    email: "contact@creativapoeta.com",
    publicPositioning:
      "Une presence claire pour les clients qui cherchent en francais ou en neerlandais.",
  },
  fr: {
    code: "fr",
    label: "France",
    defaultLocale: "fr",
    locales: ["fr"],
    domains: ["fr.creativapoeta.com"],
    currency: "EUR",
    countryCode: "FR",
    primaryCity: "Paris",
    email: "contact@creativapoeta.com",
    publicPositioning:
      "Une presence claire pour etre mieux compris dans les recherches locales et modernes.",
  },
  rw: {
    code: "rw",
    label: "Rwanda",
    defaultLocale: "kiny",
    locales: ["kiny", "fr", "en"],
    domains: ["rw.creativapoeta.com"],
    currency: "RWF",
    countryCode: "RW",
    primaryCity: "Kigali",
    email: "contact@creativapoeta.com",
    publicPositioning:
      "Uburyo bworoshye bwo gusobanura serivisi no kuboneka aho abakiriya bashakira.",
  },
  nl: {
    code: "nl",
    label: "Netherlands",
    defaultLocale: "nl",
    locales: ["nl"],
    domains: ["nl.creativapoeta.com"],
    currency: "EUR",
    countryCode: "NL",
    primaryCity: "Amsterdam",
    email: "contact@creativapoeta.com",
    publicPositioning:
      "Een duidelijke online aanwezigheid voor klanten die lokaal en gericht zoeken.",
  },
};

export function getMarketByHost(hostname: string): MarketConfig {
  const normalizedHost = hostname.toLowerCase().replace(/^www\./, "");

  return (
    Object.values(markets).find((market) =>
      market.domains.some(
        (domain) => domain.toLowerCase().replace(/^www\./, "") === normalizedHost
      )
    ) ?? markets.global
  );
}

export function isLocaleAllowed(
  market: MarketConfig,
  locale: string
): locale is LocaleCode {
  return market.locales.includes(locale as LocaleCode);
}

export function getDefaultHost(market: MarketConfig): string {
  return market.domains[0];
}

export function getMarketBaseUrl(market: MarketConfig): string {
  return `https://${getDefaultHost(market)}`;
}

export function buildMarketUrl(
  market: MarketConfig,
  locale: LocaleCode,
  path = "/"
): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const localePrefix = locale === market.defaultLocale ? "" : `/${localeHreflang[locale]}`;
  return `${getMarketBaseUrl(market)}${localePrefix}${normalizedPath}`;
}
