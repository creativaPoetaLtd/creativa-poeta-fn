import type { ArtArtworkPayload, ArtTranslationEntry } from "../APIs/Art";
import type { ArtText } from "../data/artCatalog";

function visitTexts(draft: ArtArtworkPayload, visit: (key: string, text: ArtText) => void) {
  for (const key of ["title", "sentence", "story"] as const) visit(key, draft[key]);
  draft.details.forEach((detail, index) => { visit(`detail.${index}.title`, detail.title); visit(`detail.${index}.text`, detail.text); });
  draft.images.forEach((image, index) => visit(`image.${index}.alt`, image.alt));
}
export function collectArtTranslationEntries(draft: ArtArtworkPayload, language: "en" | "nl"): ArtTranslationEntry[] {
  const entries: ArtTranslationEntry[] = [];
  visitTexts(draft, (key, text) => { if (text.fr.trim() && !text[language].trim()) entries.push({ key, text: text.fr.trim() }); });
  return entries;
}
export function applyArtTranslations(draft: ArtArtworkPayload, language: "en" | "nl", requested: ArtTranslationEntry[], translations: ArtTranslationEntry[]): ArtArtworkPayload {
  const result = structuredClone(draft);
  const sources = new Map(requested.map(entry => [entry.key, entry.text]));
  const values = new Map(translations.map(entry => [entry.key, entry.text]));
  visitTexts(result, (key, text) => {
    const value = values.get(key);
    if (value && !text[language].trim() && text.fr.trim() === sources.get(key)) text[language] = value;
  });
  return result;
}
