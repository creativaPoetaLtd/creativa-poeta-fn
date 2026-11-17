import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { artWorks, type ArtWork, type ArtText } from "../data/artCatalog";
import { fetchArtCatalog, type ArtCartItem } from "../APIs/Art";

const preview = import.meta.env.VITE_ART_CATALOG_MODE !== "live";
type CatalogState = { works: ArtWork[]; loading: boolean; error: string; preview: boolean; refresh: () => void };
const CatalogContext = createContext<CatalogState>({ works: [], loading: true, error: "", preview, refresh: () => {} });
const text = (value: ArtText): ArtText => ({ fr: value.fr, en: value.en || value.fr, nl: value.nl || value.fr });
export function ArtCatalogProvider({ children }: { children: ReactNode }) {
  const [works, setWorks] = useState<ArtWork[]>(preview ? artWorks : []);
  const [loading, setLoading] = useState(!preview);
  const [error, setError] = useState("");
  const [revision, setRevision] = useState(0);
  const refresh = useCallback(() => setRevision(value => value + 1), []);
  useEffect(() => {
    if (preview) return;
    let active = true;
    setLoading(true); setError("");
    fetchArtCatalog().then(({ artworks }) => {
      if (!active) return;
      setWorks(artworks.map(item => ({ id: item.id, slug: item.slug, collection: item.collection, title: text(item.title), sentence: text(item.sentence), story: text(item.story), details: item.details.map(detail => ({ title: text(detail.title), text: text(detail.text) })), images: item.images.map(image => ({ ...image, alt: text(image.alt) })), variants: item.variants, orientation: item.orientation, artist: item.artist, visual: "landscape", isDemo: false })));
    }).catch(error => { if (active) { setWorks([]); setError(error instanceof Error ? error.message : "Catalogue indisponible"); } }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [revision]);
  return <CatalogContext.Provider value={{ works, loading, error, preview, refresh }}>{children}</CatalogContext.Provider>;
}
export const useArtCatalog = () => useContext(CatalogContext);

const CART_KEY = "cp_art_selection_v1";
const readItems = (): ArtCartItem[] => {
  try {
    const value = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    if (!Array.isArray(value)) return [];
    const keys = new Set<string>();
    return value.slice(0, 20).filter(item => {
      if (!item || typeof item.artworkId !== "string" || !/^[a-f0-9]{24}$/i.test(item.artworkId) || typeof item.variantId !== "string" || item.variantId.length > 80 || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 20) return false;
      const key = `${item.artworkId}:${item.variantId}`;
      if (keys.has(key)) return false;
      keys.add(key); return true;
    }).map(({ artworkId, variantId, quantity }) => ({ artworkId, variantId, quantity }));
  } catch { return []; }
};
type SelectionState = { items: ArtCartItem[]; add: (artworkId: string, variantId: string) => boolean; quantity: (artworkId: string, variantId: string, value: number) => void; remove: (artworkId: string, variantId: string) => void; clear: () => void };
const SelectionContext = createContext<SelectionState | null>(null);
export function ArtSelectionProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ArtCartItem[]>(readItems);
  useEffect(() => { try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch { /* Selection still works in memory when storage is unavailable. */ } }, [items]);
  const value = useMemo<SelectionState>(() => ({ items,
    add: (artworkId, variantId) => {
      const existing = items.find(item => item.artworkId === artworkId && item.variantId === variantId);
      if ((existing?.quantity ?? 0) >= 20 || items.reduce((sum, item) => sum + item.quantity, 0) >= 50 || (!existing && items.length >= 20)) return false;
      setItems(current => existing ? current.map(item => item.artworkId === artworkId && item.variantId === variantId ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { artworkId, variantId, quantity: 1 }]); return true;
    },
    quantity: (artworkId, variantId, value) => { if (!Number.isInteger(value) || value < 1 || value > 20) return; setItems(current => current.map(item => item.artworkId === artworkId && item.variantId === variantId ? { ...item, quantity: value } : item)); },
    remove: (artworkId, variantId) => setItems(current => current.filter(item => item.artworkId !== artworkId || item.variantId !== variantId)), clear: () => setItems([]),
  }), [items]);
  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}
export const useArtSelection = () => { const value = useContext(SelectionContext); if (!value) throw new Error("Art selection provider missing"); return value; };
