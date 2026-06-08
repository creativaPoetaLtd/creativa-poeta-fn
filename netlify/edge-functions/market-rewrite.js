const hostToMarket = {
  "be.creativapoeta.com": "be",
  "fr.creativapoeta.com": "fr",
  "rw.creativapoeta.com": "rw",
  "nl.creativapoeta.com": "nl",
};

const globalHosts = new Set(["creativapoeta.com", "www.creativapoeta.com"]);

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

function redirectVisibleMarketPath(url) {
  const match = url.pathname.match(/^\/_{1,2}markets\/([^/]+)(?:\/(.*))?$/);
  if (!match) return;

  const [, market, rest = ""] = match;
  if (!marketLocales[market]) return;

  const cleanRest = rest
    .replace(/\/?index\.html$/, "")
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");

  const targetUrl = new URL(url.toString());
  targetUrl.pathname = cleanRest ? `/${cleanRest}` : "/";

  return Response.redirect(targetUrl.toString(), 308);
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
  const cleanVisibleMarketPath = redirectVisibleMarketPath(url);
  if (cleanVisibleMarketPath) return cleanVisibleMarketPath;

  const geoRedirect = redirectByCountry(request, context, url);
  if (geoRedirect) return geoRedirect;

  const market = hostToMarket[url.hostname.toLowerCase()];

  if (!market) return;
  if (isIgnoredPath(url.pathname)) return;

  const cleanPath = url.pathname.replace(/\/$/, "");
  const marketPath = cleanPath === "" ? "" : cleanPath;
  return new URL(
    `/__markets/${market}${marketPath}/index.html${url.search}`,
    request.url
  );
};
