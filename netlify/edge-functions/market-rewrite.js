const hostToMarket = {
  "be.creativapoeta.com": "be",
  "fr.creativapoeta.com": "fr",
  "rw.creativapoeta.com": "rw",
  "nl.creativapoeta.com": "nl",
};

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

export default async (request) => {
  const url = new URL(request.url);
  const market = hostToMarket[url.hostname.toLowerCase()];

  if (!market) return;
  if (ignoredFiles.includes(url.pathname)) return;
  if (ignoredPrefixes.some((prefix) => url.pathname.startsWith(prefix))) return;
  if (url.pathname.includes(".")) return;

  const cleanPath = url.pathname.replace(/\/$/, "");
  const marketPath = cleanPath === "" ? "" : cleanPath;
  return new URL(
    `/__markets/${market}${marketPath}/index.html${url.search}`,
    request.url
  );
};
