import { LocaleCode, MarketConfig } from "../data/markets";

const fallbackCityByLocale: Record<LocaleCode, string> = {
  fr: "Paris",
  en: "Brussels",
  nl: "Amsterdam",
  kiny: "Kigali",
};

export function getExampleCity(market: MarketConfig, locale: LocaleCode): string {
  return market.primaryCity || fallbackCityByLocale[locale] || "Bruxelles";
}

export function getExampleName(locale: LocaleCode): string {
  return locale === "fr" || locale === "nl" ? "Jane Doe" : "John Doe";
}

export function getExampleEmail(locale: LocaleCode): string {
  return locale === "nl" ? "jane.doe@example.com" : "john.doe@example.com";
}

export function getExamplePhone(market: MarketConfig): string {
  if (market.code === "rw") return "+250 ...";
  if (market.code === "fr") return "+33 ...";
  if (market.code === "nl") return "+31 ...";
  return "+32 ...";
}

export function getExampleLanguages(market: MarketConfig, locale: LocaleCode): string {
  if (market.code === "be") return locale === "nl" ? "Nederlands, Frans" : "francais, neerlandais";
  if (market.code === "fr") return "francais";
  if (market.code === "nl") return "Nederlands";
  if (market.code === "rw") return locale === "kiny" ? "Kinyarwanda, francais, English" : "Kinyarwanda, French, English";
  if (locale === "nl") return "Nederlands";
  if (locale === "kiny") return "Kinyarwanda";
  return locale === "fr" ? "francais" : "English";
}
