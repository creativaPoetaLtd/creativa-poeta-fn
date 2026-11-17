import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { artMoney, type ArtCartItem, type ArtQuote } from "../../APIs/Art";
import { beginArtCheckout, fetchArtOrderStatus, type ArtOrderStatus } from "../../APIs/ArtCommerce";
import { useArtSelection } from "../../contexts/ArtContext";
import type { ArtLanguage } from "../../data/artCatalog";
import { artCheckoutLocale } from "../../i18n/ArtCheckoutLocale";

type PendingCheckout = { fingerprint: string; key: string; token: string; cart: string; startedAt: number };
const pendingStorage = "cp_art_pending_checkout";
export function ArtPaymentPanel({ quote, items, language, shippingMethods, onRefresh }: { quote: ArtQuote; items: ArtCartItem[]; language: ArtLanguage; shippingMethods: Record<string, string>; onRefresh: () => void }) {
  const copy = artCheckoutLocale[language];
  const [accepted, setAccepted] = useState(false), [busy, setBusy] = useState(false), [error, setError] = useState("");
  const pending = useRef<PendingCheckout | null>(null);
  useEffect(() => { setAccepted(false); }, [quote.digest]);
  const pay = async () => {
    if (!accepted) { setError(copy.termsRequired); return; }
    setBusy(true); setError("");
    try {
      const fingerprint = `${quote.digest}:${language}`;
      if (!pending.current) { try { pending.current = JSON.parse(sessionStorage.getItem(pendingStorage) || "null"); } catch { /* Storage is optional. */ } }
      if (pending.current?.fingerprint !== fingerprint || !pending.current.startedAt || Date.now() - pending.current.startedAt > 60 * 60_000) {
        const token = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
        pending.current = { fingerprint, key: crypto.randomUUID(), token, cart: JSON.stringify(items), startedAt: Date.now() };
      }
      try { sessionStorage.setItem(pendingStorage, JSON.stringify(pending.current)); } catch { /* In-memory retries remain available. */ }
      const result = await beginArtCheckout({ country: quote.country, items, shippingMethods, digest: quote.digest, locale: language, termsVersion: quote.termsVersion, acceptTerms: accepted, accessToken: pending.current.token, idempotencyKey: pending.current.key });
      if (new URL(result.url).origin !== "https://checkout.stripe.com") throw new Error(copy.error);
      window.location.assign(result.url);
    } catch (error) { setError(error instanceof Error ? error.message : copy.error); setBusy(false); }
  };
  return <section className="art-payment-panel"><h2>{copy.payment}</h2>{quote.paymentMode === "test" && <p className="art-test-notice" role="note">{copy.test}</p>}<p>{copy.secure}</p><a href={quote.termsUrl} target="_blank" rel="noopener noreferrer" className="art-text-link">{copy.readTerms}</a><label className="art-consent"><input type="checkbox" checked={accepted} onChange={event => { setAccepted(event.target.checked); setError(""); }} disabled={busy} /><span>{copy.terms}</span></label>{error && <><p role="alert" className="art-form-error">{error}</p><button type="button" className="art-text-link" onClick={onRefresh}>{copy.refresh}</button></>}<button type="button" className="art-button" disabled={busy || !accepted} onClick={() => void pay()}>{busy ? copy.sending : copy.pay}</button></section>;
}
export function ArtOrderReceipt({ language, selectionPath }: { language: ArtLanguage; selectionPath: string }) {
  const copy = artCheckoutLocale[language];
  const location = useLocation();
  const { items, clear } = useArtSelection();
  const readCredentials = () => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const reference = params.get("reference"), token = params.get("token"), cancelled = params.get("cancelled") === "1";
    if (reference && token) {
      const value = { reference, token, cancelled };
      try { sessionStorage.setItem("cp_art_receipt", JSON.stringify(value)); } catch { /* Private credentials remain in memory. */ }
      window.history.replaceState(window.history.state, "", window.location.pathname);
      return value;
    }
    try { return JSON.parse(sessionStorage.getItem("cp_art_receipt") || "null") as { reference: string; token: string; cancelled: boolean } | null; } catch { return null; }
  };
  const [credentials, setCredentials] = useState(readCredentials);
  const [status, setStatus] = useState<ArtOrderStatus | null>(null), [error, setError] = useState("");
  const [checking, setChecking] = useState(false), [attempt, setAttempt] = useState(0);
  const cleared = useRef(false);
  useEffect(() => {
    const readNewLink = () => {
      if (!window.location.hash) return;
      const next = readCredentials();
      if (!next) return;
      cleared.current = false; setStatus(null); setAttempt(0); setCredentials(next);
    };
    readNewLink();
    window.addEventListener("hashchange", readNewLink);
    return () => window.removeEventListener("hashchange", readNewLink);
  }, [location.hash, location.key]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!credentials) return;
    let active = true;
    setChecking(true); setError("");
    fetchArtOrderStatus(credentials.reference, credentials.token).then(result => { if (active) setStatus(result); }).catch(error => { if (active) setError(error instanceof Error ? error.message : copy.error); }).finally(() => { if (active) setChecking(false); });
    return () => { active = false; };
  }, [credentials, attempt, copy.error]);
  useEffect(() => { if (status?.paymentStatus !== "pending" || credentials?.cancelled || attempt >= 5) return; const timer = setTimeout(() => setAttempt(value => value + 1), 4000); return () => clearTimeout(timer); }, [status, attempt, credentials]);
  useEffect(() => {
    if (!status || !["failed", "expired"].includes(status.paymentStatus)) return;
    try { const pending = JSON.parse(sessionStorage.getItem(pendingStorage) || "null") as PendingCheckout | null; if (pending && credentials && pending.token === credentials.token) sessionStorage.removeItem(pendingStorage); } catch { /* The next attempt can create a fresh payment reference. */ }
  }, [status, credentials]);
  useEffect(() => {
    if (status?.paymentStatus !== "paid" || cleared.current) return;
    cleared.current = true;
    try { const pending = JSON.parse(sessionStorage.getItem(pendingStorage) || "null") as PendingCheckout | null; if (pending && credentials && pending.token === credentials.token) { if (pending.cart === JSON.stringify(items)) clear(); sessionStorage.removeItem(pendingStorage); } } catch { /* Do not clear a selection that cannot be matched to this order. */ }
  }, [status, credentials, items, clear]);
  return <div className="art-order-receipt"><h1>{copy.receipt}</h1>{!credentials ? <p>{copy.missing}</p> : <><p>{copy.reference} : <strong>{credentials.reference}</strong></p>{status?.mode === "test" && <p className="art-test-notice">{copy.test}</p>}{status ? <><p role="status">{status.paymentStatus === "pending" && credentials.cancelled ? copy.cancelled : copy[status.paymentStatus]}</p><p className="art-real-price">{artMoney(status.totalCents, language)} {copy.vat}</p>{status.trackingUrl && <a href={status.trackingUrl} target="_blank" rel="noopener noreferrer" className="art-text-link">{copy.tracking}</a>}</> : checking && <p role="status">{copy.checking}</p>}{error && <p role="alert" className="art-form-error">{error}</p>}<button className="art-button art-button--outline" type="button" disabled={checking} onClick={() => setAttempt(value => value + 1)}>{copy.retry}</button></>}<Link className="art-text-link" to={selectionPath}>{copy.selection}</Link></div>;
}
