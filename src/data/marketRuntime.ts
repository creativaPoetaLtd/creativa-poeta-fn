import {
  buildMarketUrl,
  getPublishedMarketLocales,
  getMarketByHost,
  isLocaleAllowed,
  localeHreflang,
  LocaleCode,
  MarketConfig,
  markets,
} from "./markets";

export type AlternateLink = {
  hrefLang: string;
  href: string;
};

const fallbackMarket = markets.global;

export function getCurrentMarket(hostname?: string): MarketConfig {
  if (hostname) return getMarketByHost(hostname);
  if (typeof window === "undefined") return fallbackMarket;
  return getMarketByHost(window.location.hostname);
}

export function normalizeLocale(locale: string | null | undefined): LocaleCode | null {
  if (!locale) return null;
  if (locale === "rw") return "kiny";
  if (["en", "fr", "nl", "kiny"].includes(locale)) return locale as LocaleCode;
  return null;
}

export function getLocaleFromPathname(pathname: string): LocaleCode | null {
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  return normalizeLocale(firstSegment);
}

export function getPathWithoutLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return "/";

  const firstLocale = normalizeLocale(segments[0]);
  if (!firstLocale) return pathname || "/";

  const rest = segments.slice(1).join("/");
  return rest ? `/${rest}` : "/";
}

export function getCurrentLocale(market = getCurrentMarket()): LocaleCode {
  if (typeof window === "undefined") return market.defaultLocale;

  const pathLocale = getLocaleFromPathname(window.location.pathname);
  if (pathLocale && isLocaleAllowed(market, pathLocale)) {
    window.localStorage.setItem("selectedLang", pathLocale);
    return pathLocale;
  }

  const stored = normalizeLocale(window.localStorage.getItem("selectedLang"));
  if (stored && isLocaleAllowed(market, stored)) return stored;

  window.localStorage.setItem("selectedLang", market.defaultLocale);
  return market.defaultLocale;
}

export function getMarketAlternateLinks(
  market = getCurrentMarket(),
  path = "/"
): AlternateLink[] {
  const marketLinks = getPublishedMarketLocales(market).map((locale) => ({
    hrefLang:
      market.countryCode
        ? `${localeHreflang[locale]}-${market.countryCode}`
        : localeHreflang[locale],
    href: buildMarketUrl(market, locale, path),
  }));

  return [
    ...marketLinks,
    {
      hrefLang: "x-default",
      href: buildMarketUrl(markets.global, markets.global.defaultLocale, path),
    },
  ];
}

export function getCanonicalUrl(
  market = getCurrentMarket(),
  locale = getCurrentLocale(market),
  path = "/"
): string {
  return buildMarketUrl(market, locale, path);
}

export function buildLocalLocalePath(
  market: MarketConfig,
  locale: LocaleCode,
  currentPathname: string
): string {
  const pathWithoutLocale = getPathWithoutLocale(currentPathname);
  const localeSegment = localeHreflang[locale];
  const prefix = locale === market.defaultLocale ? "" : `/${localeSegment}`;
  return `${prefix}${pathWithoutLocale}` || "/";
}

export function localizePath(
  path: string,
  market = getCurrentMarket(),
  locale = getCurrentLocale(market)
): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const localeSegment = localeHreflang[locale];
  const prefix = locale === market.defaultLocale ? "" : `/${localeSegment}`;
  return `${prefix}${normalizedPath}` || "/";
}
