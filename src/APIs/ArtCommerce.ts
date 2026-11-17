import { authRequest, publicRequest } from "./client";
import type { ArtCartItem, ArtQuote } from "./Art";
export type ArtShippingMethod = { id: string; label: string; active: boolean; firstCents: number | null; additionalCents: number | null; transitMin: number | null; transitMax: number | null };
export type ArtShippingZone = { id: string; label: string; countries: string[]; methods: ArtShippingMethod[] };
export type ArtShippingProfile = { id: string; label: string; fulfillment: "studio" | "print_on_demand"; zones: ArtShippingZone[] };
export type ArtCommerceConfig = { mode: "disabled" | "test" | "live"; pricesIncludeVat: boolean; taxConfigured: boolean; taxCode: string; termsUrl: string; termsVersion: string; salesConfirmed: boolean; profiles: ArtShippingProfile[] };
export type ArtSettingsResponse = { config: ArtCommerceConfig; version: number; readiness: { enabled: boolean; mode: string; reasons: string[] } };
export const fetchArtSettings = () => authRequest<ArtSettingsResponse>({ url: "/api/art/admin/settings" });
export const saveArtSettings = (config: ArtCommerceConfig, version: number) => authRequest<ArtSettingsResponse>({ method: "PUT", url: "/api/art/admin/settings", data: { config, version } });
export const beginArtCheckout = (data: { country: string; items: ArtCartItem[]; shippingMethods: Record<string, string>; digest: string; locale: string; termsVersion: string; acceptTerms: boolean; accessToken: string; idempotencyKey: string }) => publicRequest<{ reference: string; url: string; mode: string }>({ method: "POST", url: "/api/art/checkout", data }, "Le paiement ne peut pas être préparé. Réessayez après vérification de votre sélection.");
export type ArtOrderStatus = { reference: string; paymentStatus: "pending" | "paid" | "failed" | "expired" | "review_required" | "refunded" | "partially_refunded"; mode: "test" | "live"; fulfillmentStatus: string; totalCents: number; currency: "EUR"; trackingUrl: string };
export const fetchArtOrderStatus = (reference: string, accessToken: string) => publicRequest<ArtOrderStatus>({ method: "POST", url: "/api/art/orders/status", data: { reference, accessToken } }, "Impossible de vérifier cette commande.");
export type ArtOrder = Omit<ArtOrderStatus, "totalCents" | "currency"> & { _id: string; __v: number; createdAt: string; paidAt?: string; quote: ArtQuote; customer?: { email?: string; name?: string; phone?: string; address?: { line1?: string; line2?: string; postal_code?: string; city?: string; state?: string; country?: string } }; internalNote: string; refundedCents: number };
export const fetchArtOrders = () => authRequest<{ orders: ArtOrder[] }>({ url: "/api/art/admin/orders" });
export const saveArtOrder = (order: ArtOrder, fulfillmentStatus: string, trackingUrl: string, internalNote: string) => authRequest<{ order: ArtOrder }>({ method: "PATCH", url: `/api/art/admin/orders/${order._id}`, data: { version: order.__v, fulfillmentStatus, trackingUrl, internalNote } });

export const fetchArtShippingProfiles = () => authRequest<{ profiles: Pick<ArtShippingProfile, "id" | "label" | "fulfillment">[] }>({ url: "/api/art/admin/shipping-profiles" });
