const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || "playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const fixture = JSON.parse(fs.readFileSync("../cp-art-qa-session.json", "utf8"));
if (fixture.base !== "http://127.0.0.1:5190") throw new Error("This check requires the isolated localhost API.");
const checks = [], errors = [];
const check = (name, result) => { assert.ok(result, name); checks.push(name); };
async function works() { const response = await fetch(fixture.base + "/api/art/admin/artworks", { headers: { authorization: `Bearer ${fixture.adminToken}` } }); assert.equal(response.status, 200); return (await response.json()).artworks; }
(async () => {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  try {
    const seed = (await works()).find(work => work._id === fixture.artworkId);
    if (!seed.details.length) {
      const response = await fetch(fixture.base + `/api/art/admin/artworks/${seed._id}`, { method: "PATCH", headers: { authorization: `Bearer ${fixture.adminToken}`, "content-type": "application/json" }, body: JSON.stringify({ ...seed, version: seed.__v, details: [{ title: { fr: "Le bateau", en: "", nl: "" }, text: { fr: "Un détail réservé aux tests locaux.", en: "", nl: "" } }] }) });
      assert.equal(response.status, 200);
    }
    const context = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
    await context.addInitScript(({ token, user }) => { if (location.origin !== "http://127.0.0.1:5185") return; localStorage.setItem("token", token); localStorage.setItem("user", JSON.stringify(user)); }, { token: fixture.adminToken, user: fixture.adminUser });
    await context.route("https://res.cloudinary.com/cp-art-qa/**", route => route.fulfill({ path: path.resolve("public/art/studies/le-passage.webp"), contentType: "image/webp" }));
    const page = await context.newPage(); page.on("pageerror", error => errors.push(error.message));
    await page.goto("http://127.0.0.1:5185/secure-admin-dashboard-2024/cp-art");
    await page.getByRole("heading", { name: "Catalogue des œuvres", exact: true }).waitFor();
    const open = async () => {
      const card = page.locator(".MuiPaper-root").filter({ has: page.getByText("Œuvre de vérification QA", { exact: true }) }).last();
      await card.getByRole("button", { name: "Modifier la fiche", exact: true }).click();
      await page.getByRole("dialog").waitFor();
    };
    await open();
    check("Display ordering explains that lower numbers appear first", await page.getByText("Les petits nombres apparaissent d’abord : 0, 1, 2… Vous pouvez laisser 0.", { exact: true }).isVisible());
    check("Artwork title, introduction and story have distinct explanations", await page.getByText("Le nom de l’œuvre. Exemple : L’autre rive.", { exact: true }).isVisible() && await page.getByText("Facultatif : une courte accroche pour présenter l’œuvre en une phrase.", { exact: true }).isVisible());
    await page.getByRole("heading", { name: "Les détails qui parlent (facultatif)", exact: true }).scrollIntoViewIfNeeded();
    check("Symbolic details are explicitly marked optional", await page.getByText("Ajoutez un détail seulement", { exact: false }).isVisible());
    const original = (await works()).find(work => work._id === fixture.artworkId);
    await page.getByRole("button", { name: "Ajouter un détail", exact: true }).click();
    await page.getByRole("button", { name: "Enregistrer la fiche", exact: true }).click();
    await page.getByRole("dialog").waitFor({ state: "hidden" });
    let saved = (await works()).find(work => work._id === fixture.artworkId);
    check("Saving a published artwork ignores an accidentally added empty detail", saved.status === "published" && saved.details.length === original.details.length);
    check("Completed details and artwork story remain intact", saved.details[0].text.fr === original.details[0].text.fr && saved.story.fr === original.story.fr);
    await open();
    while (await page.getByRole("button", { name: "Retirer ce détail", exact: true }).count()) await page.getByRole("button", { name: "Retirer ce détail", exact: true }).first().click();
    await page.getByRole("button", { name: "Ajouter un détail", exact: true }).click();
    await page.getByLabel("Nom du détail 1 (FR)", { exact: true }).fill("Le bateau");
    await page.getByRole("button", { name: "Enregistrer la fiche", exact: true }).click();
    await page.getByText("Complétez le nom et l’explication en français du détail 1, ou retirez ce détail facultatif.", { exact: true }).waitFor();
    check("A partial detail prompts a clear correction without losing the form", await page.getByLabel("Nom du détail 1 (FR)", { exact: true }).inputValue() === "Le bateau");
    await page.getByRole("button", { name: "Retirer ce détail", exact: true }).click();
    await page.getByRole("button", { name: "Enregistrer la fiche", exact: true }).click();
    await page.getByRole("dialog").waitFor({ state: "hidden" });
    saved = (await works()).find(work => work._id === fixture.artworkId);
    check("A published artwork can be saved with no symbolic details", saved.status === "published" && saved.details.length === 0);
    await open();
    await page.getByLabel("Ordre d’affichage", { exact: true }).fill("2");
    await page.getByRole("button", { name: "Enregistrer la fiche", exact: true }).click();
    await page.getByRole("dialog").waitFor({ state: "hidden" });
    check("Display order is saved through the real API", (await works()).find(work => work._id === fixture.artworkId).displayOrder === 2);
    await open();
    await page.getByLabel("Adresse de l’œuvre (ex. lumiere-du-matin)").scrollIntoViewIfNeeded();
    await page.screenshot({ path: "../cp-art-editor-help-desktop.png", fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: "../cp-art-editor-help-mobile.png", fullPage: true });
    check("Editor explanations fit the mobile dialog", await page.getByRole("dialog").evaluate(element => element.scrollWidth <= element.clientWidth + 1));
    check("No uncaught browser errors", errors.length === 0);
    fs.writeFileSync("../cp-art-editor-verification.json", JSON.stringify({ checkedAt: new Date().toISOString(), isolatedDatabase: true, checks, count: checks.length }, null, 2) + "\n");
    console.log(`${checks.length} artwork editor checks passed on isolated data.`);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
