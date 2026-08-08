import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  canCollectAnalytics,
  clearAnalyticsTracking,
  flushAnalytics,
  hasAnalyticsConsent,
  trackAnalyticsEvent,
  trackConversion,
} from "./analytics";

const getFormName = (form: HTMLFormElement) =>
  form.dataset.analyticsForm ||
  form.getAttribute("name") ||
  form.id ||
  `${window.location.pathname.replace(/\W+/g, "_") || "home"}_form`;

const WebsiteAnalyticsTracker = () => {
  const location = useLocation();
  const [consented, setConsented] = useState(hasAnalyticsConsent());

  useEffect(() => {
    const onConsentUpdated = (event: Event) => {
      const analytics = Boolean((event as CustomEvent<{ analytics?: boolean }>).detail?.analytics);
      setConsented(analytics);
      if (!analytics) clearAnalyticsTracking();
    };
    window.addEventListener("cp-cookie-consent-updated", onConsentUpdated);
    return () => window.removeEventListener("cp-cookie-consent-updated", onConsentUpdated);
  }, []);

  useEffect(() => {
    if (!consented || !canCollectAnalytics()) return undefined;
    let activeStartedAt = Date.now();
    const reachedDepths = new Set<number>();
    const heartbeat = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        trackAnalyticsEvent("engagement", "session_heartbeat");
      }
    }, 120_000);
    const pageViewTimer = window.setTimeout(() => {
      trackAnalyticsEvent("page_view", "page_view");
    }, 0);

    const recordEngagement = () => {
      if (!activeStartedAt) return;
      const durationMs = Date.now() - activeStartedAt;
      activeStartedAt = 0;
      if (durationMs >= 1_000) {
        trackAnalyticsEvent("engagement", "page_engagement", { durationMs });
      }
    };

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const depth = Math.min(100, Math.round((window.scrollY / scrollable) * 100));
      [25, 50, 75, 90].forEach((threshold) => {
        if (depth >= threshold && !reachedDepths.has(threshold)) {
          reachedDepths.add(threshold);
          trackAnalyticsEvent("scroll", "scroll_depth", { depth: threshold });
        }
      });
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        recordEngagement();
        void flushAnalytics(true);
      } else {
        activeStartedAt = Date.now();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.clearTimeout(pageViewTimer);
      window.clearInterval(heartbeat);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      recordEngagement();
    };
  }, [consented, location.pathname, location.search]);

  useEffect(() => {
    if (!consented || !canCollectAnalytics()) return undefined;
    const startedForms = new WeakSet<HTMLFormElement>();

    const onFocusIn = (event: FocusEvent) => {
      const form = (event.target as HTMLElement | null)?.closest("form");
      if (!(form instanceof HTMLFormElement) || startedForms.has(form)) return;
      startedForms.add(form);
      trackAnalyticsEvent("form", "form_start", { form: getFormName(form) });
    };

    const onSubmit = (event: SubmitEvent) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      trackAnalyticsEvent("form", "form_submit_attempt", { form: getFormName(form) });
    };

    const onClick = (event: MouseEvent) => {
      const element = (event.target as HTMLElement | null)?.closest("a,button");
      if (!(element instanceof HTMLElement)) return;
      const anchor = element instanceof HTMLAnchorElement ? element : null;
      const href = anchor?.href || "";
      if (href.startsWith("mailto:")) {
        trackConversion("email_click", "email_click");
        return;
      }
      if (href.startsWith("tel:")) {
        trackConversion("phone_click", "phone_click");
        return;
      }
      if (anchor) {
        try {
          const target = new URL(anchor.href, window.location.href);
          if (target.hostname !== window.location.hostname) {
            trackAnalyticsEvent("click", "outbound_click", { target: target.href });
            return;
          }
          if (
            /\/(start-project|contact|partnership|tester-visibilite|demander-assistance-numerique)/.test(
              target.pathname
            )
          ) {
            trackAnalyticsEvent("click", "cta_click", { target: target.pathname });
          }
        } catch {
          // Ignore malformed links.
        }
      }
    };

    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("submit", onSubmit);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("submit", onSubmit);
      document.removeEventListener("click", onClick);
    };
  }, [consented]);

  useEffect(() => {
    if (!consented || !canCollectAnalytics()) return undefined;
    let cancelled = false;
    void import("web-vitals").then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
      const report = (metric: { name: string; value: number; delta: number; rating: string; id: string }) => {
        if (cancelled) return;
        trackAnalyticsEvent("web_vital", "web_vital", {
          metricName: metric.name,
          metricValue: metric.value,
          metricDelta: metric.delta,
          metricRating: metric.rating,
          metricId: metric.id,
        });
      };
      onCLS(report);
      onFCP(report);
      onINP(report);
      onLCP(report);
      onTTFB(report);
    });
    return () => {
      cancelled = true;
    };
  }, [consented]);

  useEffect(() => {
    if (!consented || !canCollectAnalytics()) return undefined;
    const onError = (event: ErrorEvent) => {
      trackAnalyticsEvent("error", "javascript_error", {
        errorMessage: event.message,
        errorSource: event.filename,
        line: event.lineno,
        column: event.colno,
      });
    };
    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const message = event.reason instanceof Error ? event.reason.message : String(event.reason || "Promise rejected");
      trackAnalyticsEvent("error", "unhandled_promise_rejection", { errorMessage: message });
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandledRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, [consented]);

  return null;
};

export default WebsiteAnalyticsTracker;
