import { authRequest, publicRequest } from "./client";
import type { ArtImage, ArtText, ArtVariant } from "../data/artCatalog";
export type ArtArtwork = {
  _id: string; __v: number; slug: string; collection: string; title: ArtText; sentence: ArtText; story: ArtText;
  details: { title: ArtText; text: ArtText }[]; images: ArtImage[]; variants: ArtVariant[];
  artist: string; orientation: "landscape" | "portrait"; currency: "EUR"; status: "draft" | "published" | "archived"; displayOrder: number;
};
export type ArtArtworkPayload = Omit<ArtArtwork, "_id" | "__v">;
export type ArtCartItem = { artworkId: string; variantId: string; quantity: number };
export type ArtQuote = { country: string; currency: "EUR"; subtotalCents: number; shippingPending: boolean; paymentEnabled: boolean; pricesIncludeVat: true; shippingCents: number | null; totalCents: number | null; digest: string; paymentMode: "disabled" | "test" | "live"; termsUrl: string; termsVersion: string; shippingGroups: { profileId: string; label: string; fulfillment: string; quantity: number; selectedMethodId: string | null; amountCents: number | null; options: { id: string; label: string; amountCents: number; transitMin: number | null; transitMax: number | null }[] }[]; lines: Array<ArtCartItem & { title: ArtText; slug: string; image?: string; material: string; format: string; unitPriceCents: number; lineTotalCents: number; fulfillment: "studio" | "print_on_demand"; leadDaysMin: number; leadDaysMax: number }> };
export type ArtRequest = { _id: string; __v: number; reference: string; name: string; email: string; locale: string; message: string; status: "new" | "contacted" | "closed"; internalNote: string; paymentStatus: "not_requested"; quote: ArtQuote; createdAt: string };
export const ART_COUNTRIES = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE"];
export const artMoney = (cents: number, locale = "fr") => new Intl.NumberFormat(locale, { style: "currency", currency: "EUR" }).format(cents / 100);
export const artCountryName = (code: string, locale = "fr") => {
  const DisplayNames = (Intl as typeof Intl & { DisplayNames?: new (locales: string[], options: { type: "region" }) => { of: (code: string) => string | undefined } }).DisplayNames;
  return DisplayNames ? new DisplayNames([locale], { type: "region" }).of(code) || code : code;
};
export const fetchArtCatalog = () => publicRequest<{ artworks: Array<Omit<ArtArtwork, "_id"> & { id: string }>; paymentEnabled: false }>({ url: "/api/art/catalog" }, "Le catalogue est momentanément indisponible.");
export const fetchAdminArt = () => authRequest<{ artworks: ArtArtwork[]; paymentEnabled: false }>({ url: "/api/art/admin/artworks" });
export const saveArt = (payload: ArtArtworkPayload, existing?: ArtArtwork) => authRequest<{ artwork: ArtArtwork }>({ method: existing ? "PATCH" : "POST", url: `/api/art/admin/artworks${existing ? `/${existing._id}` : ""}`, data: { ...payload, ...(existing ? { version: existing.__v } : {}) } });
export const uploadArtImage = (file: File) => { const data = new FormData(); data.append("image", file); return authRequest<{ image: ArtImage }>({ method: "POST", url: "/api/art/admin/images", data }); };
export const fetchArtRequests = () => authRequest<{ requests: ArtRequest[] }>({ url: "/api/art/admin/requests" });
export const saveArtRequest = (request: ArtRequest, status: ArtRequest["status"], internalNote: string) => authRequest<{ request: ArtRequest }>({ method: "PATCH", url: `/api/art/admin/requests/${request._id}`, data: { version: request.__v, status, internalNote } });
export const fetchArtQuote = (country: string, items: ArtCartItem[], shippingMethods: Record<string, string> = {}) => publicRequest<{ quote: ArtQuote }>({ method: "POST", url: "/api/art/quote", data: { country, items, shippingMethods } }, "La sélection n’a pas pu être vérifiée.");
export const submitArtRequest = (data: { country: string; items: ArtCartItem[]; name: string; email: string; locale: string; message: string; consent: boolean; shippingMethods?: Record<string, string>; idempotencyKey: string }) => publicRequest<{ reference: string; status: "received"; paymentEnabled: false }>({ method: "POST", url: "/api/art/requests", data }, "La demande n’a pas pu être enregistrée.");
