// Run against an already running local preview. Playwright is a QA-only tool;
// set PLAYWRIGHT_MODULE_PATH when it is provided outside this repository.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || "playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const base = process.env.ART_PREVIEW_URL || "http://127.0.0.1:5184";
const output = path.resolve("docs/art-preview");
fs.mkdirSync(output, { recursive: true });

(async () => {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  const checks = [];
  const check = (name, condition) => { assert.ok(condition, name); checks.push(name); };
  const open = async route => {
    const response = await page.goto(base + route);
    assert.equal(response.status(), 200, route);
    await page.locator(".art-header").waitFor();
    const decline = page.getByRole("button", { name: "Refuser", exact: true });
    if (await decline.isVisible()) await decline.click();
  };
  const noOverflow = async label => {
    check(`${label}: no horizontal overflow`, await page.evaluate(() => {
      return [...document.querySelectorAll(".art-app *")].filter(el => {
        const style = getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return style.position !== "absolute" && style.position !== "fixed" && rect.width > 0 && rect.right > innerWidth + 2;
      }).length === 0;
    }));
  };
  const readableTypography = async label => {
    check(`${label}: typography fits its artwork`, await page.locator(".art-type").evaluateAll(artworks => artworks.every(artwork => {
      const box = artwork.getBoundingClientRect();
      return [...artwork.querySelectorAll("div > span")].every(line => {
        const rect = line.getBoundingClientRect();
        return rect.top >= box.top - 1 && rect.bottom <= box.bottom + 1 && line.scrollWidth <= line.clientWidth + 1;
      });
    })));
  };
  try {
    await open("/fr/art");
    check("French home and five collection links", await page.locator(".art-collection-card").count() === 5);
    check("Preview cannot be mistaken for a live store", (await page.locator(".art-preview").innerText()).includes("non proposés à la vente"));
    await noOverflow("Desktop home");
    await readableTypography("Desktop home");
    await page.screenshot({ path: path.join(output, "home-desktop.png") });
    await page.locator("#collections").scrollIntoViewIfNeeded();
    await page.screenshot({ path: path.join(output, "collections-desktop.png") });

    await open("/fr/art/galerie");
    check("Gallery initially shows all four studies", await page.locator(".art-work-card").count() === 4);
    await page.getByRole("searchbox").fill("passage");
    await page.waitForFunction(() => document.querySelectorAll(".art-work-card").length === 1);
    check("Search filters by title", (await page.locator(".art-work-card").innerText()).includes("Le Passage"));
    await page.getByRole("searchbox").fill("introuvable-1234");
    await page.locator(".art-empty").waitFor();
    await page.getByRole("button", { name: "Effacer les filtres" }).click();
    await page.locator(".art-filter-select select").selectOption("faith-and-hope");
    check("Collection filter", await page.locator(".art-work-card").count() === 1);

    await open("/fr/art/oeuvres/le-passage");
    check("Full artwork stays within its viewing area", await page.locator(".art-product__stage").evaluate(stage => {
      const image = stage.querySelector(".art-visual").getBoundingClientRect();
      const box = stage.getBoundingClientRect();
      return image.left >= box.left && image.right <= box.right + 1 && image.top >= box.top && image.bottom <= box.bottom + 1;
    }));
    await page.getByRole("button", { name: "Aluminium", exact: true }).click();
    check("Material selector updates", await page.getByRole("button", { name: "Aluminium", exact: true }).getAttribute("aria-pressed") === "true");
    await page.locator(".art-format select").selectOption("90 × 60 cm");
    await page.getByRole("button", { name: "Détail de composition", exact: true }).click();
    check("Detail view updates", await page.locator(".art-product__stage--1").count() === 1);
    await page.locator(".art-product__stage").click();
    check("Zoom dialog opens", await page.locator("dialog[open]").count() === 1);
    await page.keyboard.press("Escape");
    check("Escape closes zoom and restores focus", await page.locator("dialog[open]").count() === 0 && await page.locator(".art-product__stage").evaluate(el => el === document.activeElement));
    await page.getByRole("button", { name: "Vue complète", exact: true }).click();
    await page.screenshot({ path: path.join(output, "work-desktop.png") });
    await page.getByRole("link", { name: "Créer dans cet esprit", exact: true }).click();
    check("Selected options reach the custom request", await page.locator("#art-material").inputValue() === "metal" && page.url().includes("format="));
    await page.getByRole("button", { name: "Préparer mon message", exact: true }).click();
    check("Empty form is rejected", await page.locator(".art-form-error").isVisible());
    await page.locator("#art-name").fill("Test aperçu");
    await page.locator("#art-email").fill("preview@example.com");
    await page.locator("#art-idea").fill("Une création autour du passage et de la lumière.");
    await page.getByRole("button", { name: "Préparer mon message", exact: true }).click();
    await page.locator(".art-email-ready").waitFor();
    const emailLink = await page.getByRole("link", { name: "Ouvrir mon application email" }).getAttribute("href");
    check("Message is prepared without sending or ordering", emailLink.startsWith("mailto:") && decodeURIComponent(emailLink).includes("90 × 60 cm"));

    for (const [locale, title] of [["en", "The art of"], ["nl", "De kunst van"]]) {
      await open(`/${locale}/art`);
      check(`${locale}: localized home`, (await page.locator("h1").innerText()).includes(title));
    }
    await open("/fr/art/oeuvres/inconnue");
    check("Unknown artwork has a recovery link", await page.locator(".art-missing .art-button").isVisible());

    await page.setViewportSize({ width: 390, height: 844 });
    await open("/fr/art");
    await noOverflow("Mobile home");
    await readableTypography("Mobile home");
    await page.screenshot({ path: path.join(output, "home-mobile.png"), fullPage: true });
    await page.getByRole("button", { name: "Ouvrir le menu", exact: true }).click();
    await page.locator("#art-navigation").getByRole("link", { name: "La galerie", exact: true }).click();
    check("Mobile menu navigates and closes", page.url().endsWith("/fr/art/galerie") && await page.locator(".art-menu-toggle").getAttribute("aria-expanded") === "false");
    await open("/fr/art/oeuvres/memoire-des-lieux");
    await noOverflow("Mobile portrait artwork");
    await readableTypography("Mobile related artworks");
    await page.screenshot({ path: path.join(output, "work-mobile.png"), fullPage: true });
    await open("/fr/art/collections");
    await noOverflow("Mobile collections");
    check("All image assets loaded", await page.locator(".art-visual").evaluateAll(images => images.filter(img => img.getBoundingClientRect().top < innerHeight).every(img => img.complete && img.naturalWidth > 0)));
    check("No uncaught browser errors", errors.length === 0);
    fs.writeFileSync(path.join(output, "verification.json"), JSON.stringify({ checks, errors }, null, 2));
    console.log(JSON.stringify({ passed: checks.length, checks, output }, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
