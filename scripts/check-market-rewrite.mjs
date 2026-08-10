import assert from "node:assert/strict";
import marketRewrite from "../netlify/edge-functions/market-rewrite.js";

const googlebotContext = {
  cookies: { get: () => undefined },
  geo: { country: { code: "BE" } },
};

async function run(url, userAgent = "Googlebot") {
  return marketRewrite(
    new Request(url, { headers: { "user-agent": userAgent } }),
    googlebotContext
  );
}

const globalAnswers = await run("https://creativapoeta.com/answers");
assert(globalAnswers instanceof URL);
assert.equal(globalAnswers.href, "https://creativapoeta.com/answers/index.html");

const globalQuery = await run("https://creativapoeta.com/contact?source=test");
assert(globalQuery instanceof URL);
assert.equal(globalQuery.href, "https://creativapoeta.com/contact/index.html?source=test");

const trailingSlash = await run("https://creativapoeta.com/answers/");
assert(trailingSlash instanceof Response);
assert.equal(trailingSlash.status, 301);
assert.equal(trailingSlash.headers.get("location"), "https://creativapoeta.com/answers");

const localeRedirect = await run("https://creativapoeta.com/fr/services/content-writing");
assert(localeRedirect instanceof Response);
assert.equal(localeRedirect.status, 301);
assert.equal(
  localeRedirect.headers.get("location"),
  "https://fr.creativapoeta.com/services/content-writing"
);

const marketPage = await run("https://fr.creativapoeta.com/services/content-writing");
assert(marketPage instanceof URL);
assert.equal(
  marketPage.href,
  "https://fr.creativapoeta.com/__markets/fr/services/content-writing/index.html"
);

const ignoredSitemap = await run("https://creativapoeta.com/sitemap.xml");
assert.equal(ignoredSitemap, undefined);

const previewPartnership = await run(
  "https://deploy-preview-35--creativapoeta.netlify.app/partnership"
);
assert(previewPartnership instanceof URL);
assert.equal(
  previewPartnership.href,
  "https://deploy-preview-35--creativapoeta.netlify.app/partnership/index.html"
);

const previewTrailingSlash = await run(
  "https://deploy-preview-35--creativapoeta.netlify.app/partnership/"
);
assert(previewTrailingSlash instanceof Response);
assert.equal(previewTrailingSlash.status, 301);
assert.equal(
  previewTrailingSlash.headers.get("location"),
  "https://deploy-preview-35--creativapoeta.netlify.app/partnership"
);

const humanGeoRedirect = await run("https://creativapoeta.com/answers", "Mozilla/5.0");
assert(humanGeoRedirect instanceof Response);
assert.equal(humanGeoRedirect.status, 302);
assert.equal(humanGeoRedirect.headers.get("location"), "https://be.creativapoeta.com/answers");

console.log("Market rewrite checks passed.");
