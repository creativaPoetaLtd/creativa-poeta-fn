const hostToMarket = {
  "be.creativapoeta.com": "be",
  "fr.creativapoeta.com": "fr",
  "rw.creativapoeta.com": "rw",
  "nl.creativapoeta.com": "nl",
};

const hostRedirects = {
  "creativapoeta.be": "be.creativapoeta.com",
  "www.creativapoeta.be": "be.creativapoeta.com",
  "www.creativapoeta.com": "creativapoeta.com",
};

const globalHosts = new Set(["creativapoeta.com"]);

const globalLocaleRedirectHosts = {
  fr: "fr.creativapoeta.com",
  nl: "nl.creativapoeta.com",
  rw: "rw.creativapoeta.com",
};

const legacyPathRedirects = {
  "/services/audit-visibilite": "/tester-visibilite",
  "/services/site-officiel": "/services/web-app",
  "/services/contenus-utiles": "/services/content-writing",
};

const countryToHost = {
  BE: "be.creativapoeta.com",
  FR: "fr.creativapoeta.com",
  RW: "rw.creativapoeta.com",
  NL: "nl.creativapoeta.com",
};

const marketLocales = {
  be: { defaultLocale: "fr", locales: new Set(["fr", "nl"]) },
  fr: { defaultLocale: "fr", locales: new Set(["fr"]) },
  rw: { defaultLocale: "rw", locales: new Set(["rw", "fr", "en"]) },
  nl: { defaultLocale: "nl", locales: new Set(["nl"]) },
};

const botPattern =
  /bot|crawler|spider|crawling|google|bing|slurp|duckduck|baidu|yandex|sogou|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegram|discord|openai|chatgpt|gptbot|perplexity|claude|anthropic|ccbot/i;

const ignoredPrefixes = [
  "/__markets/",
  "/assets/",
  "/sitemaps/",
  "/secure-admin-",
  "/admin/",
  "/dashboard/",
];

const ignoredFiles = [
  "/robots.txt",
  "/sitemap.xml",
  "/favicon.png",
  "/favicon.ico",
  "/site.webmanifest",
  "/apple-touch-icon.png",
  "/browserconfig.xml",
];

function isIgnoredPath(pathname) {
  if (ignoredFiles.includes(pathname)) return true;
  if (ignoredPrefixes.some((prefix) => pathname.startsWith(prefix))) return true;
  if (pathname.includes(".")) return true;
  return false;
}

function normalizePathForMarket(pathname, market) {
  const config = marketLocales[market];
  if (!config) return pathname;

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return "/";

  const first = segments[0] === "kiny" ? "rw" : segments[0];
  if (!["en", "fr", "nl", "rw"].includes(first)) return pathname;

  const rest = segments.slice(1).join("/");
  if (!config.locales.has(first)) return rest ? `/${rest}` : "/";
  if (first === config.defaultLocale) return rest ? `/${rest}` : "/";

  return rest ? `/${first}/${rest}` : `/${first}`;
}

function canonicalPath(pathname) {
  const cleanPath = pathname.replace(/\/+$/, "");
  return cleanPath || "/";
}

function redirectLegacyPath(url) {
  if (isIgnoredPath(url.pathname)) return;

  const segments = url.pathname.split("/").filter(Boolean);
  const locale = ["en", "fr", "nl", "rw"].includes(segments[0]) ? segments[0] : null;
  const pathWithoutLocale = canonicalPath(`/${segments.slice(locale ? 1 : 0).join("/")}`);
  const targetPath = legacyPathRedirects[pathWithoutLocale];

  if (!targetPath) return;

  const targetUrl = new URL(url.toString());
  targetUrl.pathname = locale ? `/${locale}${targetPath}` : targetPath;
  return Response.redirect(targetUrl.toString(), 301);
}

function redirectMarketLocalePath(url, market) {
  if (isIgnoredPath(url.pathname)) return;

  const targetPath = canonicalPath(normalizePathForMarket(url.pathname, market));
  const currentPath = canonicalPath(url.pathname);
  if (targetPath === currentPath) return;

  const targetUrl = new URL(url.toString());
  targetUrl.pathname = targetPath;
  return Response.redirect(targetUrl.toString(), 301);
}

function redirectTrailingSlash(url) {
  if (isIgnoredPath(url.pathname)) return;
  if (url.pathname === "/" || !url.pathname.endsWith("/")) return;

  const targetUrl = new URL(url.toString());
  targetUrl.pathname = canonicalPath(url.pathname);
  return Response.redirect(targetUrl.toString(), 301);
}

function redirectByCountry(request, context, url) {
  const hostname = url.hostname.toLowerCase();
  if (!globalHosts.has(hostname)) return;
  if (isIgnoredPath(url.pathname)) return;
  if (request.method !== "GET" && request.method !== "HEAD") return;
  if (url.searchParams.has("no_geo_redirect")) return;

  const userAgent = request.headers.get("user-agent") ?? "";
  if (botPattern.test(userAgent)) return;

  const marketChoiceCookie = context.cookies?.get("cp_market_choice");
  const marketChoice =
    typeof marketChoiceCookie === "string"
      ? marketChoiceCookie
      : marketChoiceCookie?.value;
  if (marketChoice === "global") return;

  const countryCode = context.geo?.country?.code;
  const targetHost = countryToHost[countryCode];
  if (!targetHost) return;

  const targetMarket = hostToMarket[targetHost];
  const targetUrl = new URL(request.url);
  targetUrl.hostname = targetHost;
  targetUrl.pathname = normalizePathForMarket(url.pathname, targetMarket);

  return Response.redirect(targetUrl.toString(), 302);
}

export default async (request, context) => {
  const url = new URL(request.url);
  const hostname = url.hostname.toLowerCase();
  const targetHost = hostRedirects[hostname];

  if (targetHost) {
    const targetUrl = new URL(request.url);
    targetUrl.hostname = targetHost;
    return Response.redirect(targetUrl.toString(), 301);
  }

  const legacyRedirect = redirectLegacyPath(url);
  if (legacyRedirect) return legacyRedirect;

  if (globalHosts.has(hostname) && !isIgnoredPath(url.pathname)) {
    const segments = url.pathname.split("/").filter(Boolean);
    const locale = segments[0];

    if (locale === "en") {
      const targetUrl = new URL(request.url);
      targetUrl.pathname = canonicalPath(`/${segments.slice(1).join("/")}`);
      return Response.redirect(targetUrl.toString(), 301);
    }

    const localeTargetHost = globalLocaleRedirectHosts[locale];
    if (localeTargetHost) {
      const targetUrl = new URL(request.url);
      targetUrl.hostname = localeTargetHost;
      targetUrl.pathname = canonicalPath(`/${segments.slice(1).join("/")}`);
      return Response.redirect(targetUrl.toString(), 301);
    }
  }

  const market = hostToMarket[hostname];

  if (market) {
    const localePathRedirect = redirectMarketLocalePath(url, market);
    if (localePathRedirect) return localePathRedirect;
  }

  const slashRedirect = redirectTrailingSlash(url);
  if (slashRedirect) return slashRedirect;

  const geoRedirect = redirectByCountry(request, context, url);
  if (geoRedirect) return geoRedirect;

  const isGlobalHost = globalHosts.has(hostname);
  if (!market && !isGlobalHost) return;
  if (isIgnoredPath(url.pathname)) return;

  const cleanPath = canonicalPath(url.pathname);
  if (isGlobalHost) {
    const globalPath = cleanPath === "/" ? "" : cleanPath;
    return new URL(`${globalPath}/index.html${url.search}`, request.url);
  }

  const marketPath = cleanPath === "/" ? "" : cleanPath;
  return new URL(
    `/__markets/${market}${marketPath}/index.html${url.search}`,
    request.url
  );
};
