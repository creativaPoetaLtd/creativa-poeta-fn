import { getCurrentLocale, getCurrentMarket } from "../data/marketRuntime";

export type AnalyticsEventType =
  | "page_view"
  | "engagement"
  | "scroll"
  | "click"
  | "form"
  | "conversion"
  | "web_vital"
  | "error"
  | "api_error"
  | "not_found";

export type AnalyticsProperties = {
  label?: string;
  target?: string;
  form?: string;
  conversionType?: string;
  depth?: number;
  durationMs?: number;
  value?: number;
  metricName?: string;
  metricValue?: number;
  metricDelta?: number;
  metricRating?: string;
  metricId?: string;
  errorMessage?: string;
  errorSource?: string;
  line?: number;
  column?: number;
  statusCode?: number;
  endpoint?: string;
};

type StoredConsent = {
  analytics?: boolean;
};

type Attribution = {
  referrerHost?: string;
  trafficSource: string;
  trafficMedium: string;
  utm: {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
    term?: string;
  };
};

type StoredSession = {
  id: string;
  lastActivityAt: number;
  attribution: Attribution;
};

type QueuedEvent = {
  eventId: string;
  eventType: AnalyticsEventType;
  eventName: string;
  occurredAt: string;
  path: string;
  pageTitle: string;
  locale: string;
  market: string;
  referrerHost?: string;
  trafficSource: string;
  trafficMedium: string;
  utm: Attribution["utm"];
  device: {
    type: string;
    browser: string;
    os: string;
    viewportWidth: number;
    viewportHeight: number;
  };
  properties?: AnalyticsProperties;
};

const CONSENT_KEY = "cp_cookie_consent_v1";
const VISITOR_KEY = "cp_analytics_visitor_v1";
const SESSION_KEY = "cp_analytics_session_v1";
const SESSION_TIMEOUT_MS = 30 * 60 * 1_000;
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ||
  "https://creativa-poeta-bn-phi.vercel.app";
const COLLECT_URL = `${API_BASE_URL}/api/analytics/collect`;

let memoryVisitorId = "";
let memorySession: StoredSession | null = null;
let queue: QueuedEvent[] = [];
let flushTimer: number | undefined;

const makeId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}_${Math.random()
    .toString(36)
    .slice(2)}`;
};

const readJson = <T>(key: string): T | null => {
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch {
    return null;
  }
};

const writeJson = (key: string, value: unknown) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Analytics continues in memory when storage is unavailable.
  }
};

export const hasAnalyticsConsent = () => {
  if (typeof window === "undefined") return false;
  return readJson<StoredConsent>(CONSENT_KEY)?.analytics === true;
};

const isLocalHost = () =>
  ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname.toLowerCase());

export const canCollectAnalytics = () => {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return false;
  if (window.location.pathname.startsWith("/secure-admin-")) return false;
  if (isLocalHost() && import.meta.env.VITE_ANALYTICS_DEBUG !== "true") return false;
  return true;
};

const getReferrerHost = () => {
  if (!document.referrer) return undefined;
  try {
    const hostname = new URL(document.referrer).hostname.toLowerCase().replace(/^www\./, "");
    return hostname === window.location.hostname.toLowerCase().replace(/^www\./, "")
      ? undefined
      : hostname;
  } catch {
    return undefined;
  }
};

const buildAttribution = (): Attribution => {
  const params = new URLSearchParams(window.location.search);
  const source = params.get("utm_source")?.slice(0, 120) || undefined;
  const medium = params.get("utm_medium")?.slice(0, 80) || undefined;
  const referrerHost = getReferrerHost();
  const searchHost = referrerHost?.match(/(^|\.)(google|bing|yahoo|duckduckgo)\./)?.[2];
  const socialHost = referrerHost?.match(
    /(^|\.)(facebook|instagram|linkedin|x|twitter|tiktok|youtube)\./
  )?.[2];

  return {
    referrerHost,
    trafficSource: source || searchHost || socialHost || referrerHost || "direct",
    trafficMedium:
      medium || (searchHost ? "organic" : socialHost ? "social" : referrerHost ? "referral" : "none"),
    utm: {
      source,
      medium,
      campaign: params.get("utm_campaign")?.slice(0, 160) || undefined,
      content: params.get("utm_content")?.slice(0, 160) || undefined,
      term: params.get("utm_term")?.slice(0, 160) || undefined,
    },
  };
};

const getVisitorId = () => {
  const stored = readJson<{ id?: string }>(VISITOR_KEY)?.id;
  const visitorId = stored || memoryVisitorId || makeId();
  memoryVisitorId = visitorId;
  if (!stored) writeJson(VISITOR_KEY, { id: visitorId, createdAt: Date.now() });
  return visitorId;
};

const getSession = () => {
  const now = Date.now();
  const stored = readJson<StoredSession>(SESSION_KEY) || memorySession;
  const session =
    stored && now - Number(stored.lastActivityAt || 0) < SESSION_TIMEOUT_MS
      ? { ...stored, lastActivityAt: now }
      : { id: makeId(), lastActivityAt: now, attribution: buildAttribution() };
  memorySession = session;
  writeJson(SESSION_KEY, session);
  return session;
};

const getBrowser = (userAgent: string) => {
  if (/Edg\//.test(userAgent)) return "Edge";
  if (/OPR\//.test(userAgent)) return "Opera";
  if (/Firefox\//.test(userAgent)) return "Firefox";
  if (/Chrome\//.test(userAgent)) return "Chrome";
  if (/Safari\//.test(userAgent)) return "Safari";
  return "Other";
};

const getOperatingSystem = (userAgent: string) => {
  if (/Windows/.test(userAgent)) return "Windows";
  if (/Android/.test(userAgent)) return "Android";
  if (/iPhone|iPad|iPod/.test(userAgent)) return "iOS";
  if (/Mac OS/.test(userAgent)) return "macOS";
  if (/Linux/.test(userAgent)) return "Linux";
  return "Other";
};

const getDevice = () => {
  const userAgent = navigator.userAgent || "";
  const width = window.innerWidth || 0;
  const type = /iPad|Tablet/i.test(userAgent)
    ? "tablet"
    : /Mobi|Android|iPhone|iPod/i.test(userAgent) || width < 768
    ? "mobile"
    : "desktop";
  return {
    type,
    browser: getBrowser(userAgent),
    os: getOperatingSystem(userAgent),
    viewportWidth: width,
    viewportHeight: window.innerHeight || 0,
  };
};

const scheduleFlush = () => {
  if (flushTimer !== undefined) return;
  flushTimer = window.setTimeout(() => {
    flushTimer = undefined;
    void flushAnalytics();
  }, 1_500);
};

export const trackAnalyticsEvent = (
  eventType: AnalyticsEventType,
  eventName: string,
  properties?: AnalyticsProperties
) => {
  if (!canCollectAnalytics()) return;
  const market = getCurrentMarket();
  const locale = getCurrentLocale(market);
  const session = getSession();
  queue.push({
    eventId: makeId(),
    eventType,
    eventName,
    occurredAt: new Date().toISOString(),
    path: window.location.pathname || "/",
    pageTitle: document.title || "Creativa Poeta",
    locale,
    market: market.code,
    referrerHost: session.attribution.referrerHost,
    trafficSource: session.attribution.trafficSource,
    trafficMedium: session.attribution.trafficMedium,
    utm: session.attribution.utm,
    device: getDevice(),
    properties,
  });
  if (queue.length >= 10) void flushAnalytics();
  else scheduleFlush();
};

export const trackConversion = (
  eventName: string,
  conversionType: string,
  properties?: Omit<AnalyticsProperties, "conversionType">
) => {
  trackAnalyticsEvent("conversion", eventName, { ...properties, conversionType });
};

export const trackApiError = (endpoint: string, statusCode?: number) => {
  if (endpoint.includes("/api/analytics/collect")) return;
  trackAnalyticsEvent("api_error", "api_request_failed", { endpoint, statusCode });
};

export const flushAnalytics = async (preferBeacon = false) => {
  if (!canCollectAnalytics() || queue.length === 0) return;
  if (flushTimer !== undefined) {
    window.clearTimeout(flushTimer);
    flushTimer = undefined;
  }

  const batch = queue.splice(0, 20);
  const payload = JSON.stringify({
    consent: true,
    visitorId: getVisitorId(),
    sessionId: getSession().id,
    events: batch,
  });

  if (preferBeacon && typeof navigator.sendBeacon === "function") {
    const queued = navigator.sendBeacon(
      COLLECT_URL,
      new Blob([payload], { type: "application/json" })
    );
    if (queued) return;
  }

  try {
    await fetch(COLLECT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      credentials: "omit",
      keepalive: true,
    });
  } catch {
    // Analytics must never interrupt the visitor's experience.
  } finally {
    if (queue.length > 0) scheduleFlush();
  }
};

export const clearAnalyticsTracking = () => {
  queue = [];
  memoryVisitorId = "";
  memorySession = null;
  if (flushTimer !== undefined) window.clearTimeout(flushTimer);
  flushTimer = undefined;
  try {
    window.localStorage.removeItem(VISITOR_KEY);
    window.localStorage.removeItem(SESSION_KEY);
  } catch {
    // Storage may be unavailable in private browsing contexts.
  }
};
