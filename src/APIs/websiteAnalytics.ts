import { authRequest } from "./client";

export interface AnalyticsRange {
  from: string;
  to: string;
  previousFrom: string;
  previousTo: string;
  days: number;
}

export interface AnalyticsSummary {
  visitors: number;
  sessions: number;
  pageViews: number;
  activeVisitors: number;
  newVisitors: number;
  returningVisitors: number;
  engagedSessions: number;
  engagementRate: number;
  bounceRate: number;
  averageEngagementSeconds: number;
  conversions: number;
  convertedSessions: number;
  conversionRate: number;
  botSessions: number;
  errors: number;
}

export interface AnalyticsTimelineItem {
  date: string;
  visitors: number;
  sessions: number;
  newVisitors: number;
  pageViews: number;
  conversions: number;
  errors: number;
}

export interface AnalyticsBreakdownItem {
  name: string;
  count: number;
  percentage: number;
}

export interface AnalyticsContentItem {
  path: string;
  views: number;
  visitors: number;
  sessions: number;
  exits: number;
  exitRate: number;
  averageEngagementSeconds: number;
}

export interface AnalyticsLandingPage {
  path: string;
  sessions: number;
  visitors: number;
  percentage: number;
}

export interface AnalyticsExitPage {
  path: string;
  exits: number;
  visitors: number;
  percentage: number;
}

export interface AnalyticsScrollDepth {
  depth: number;
  events: number;
  sessions: number;
  visitors: number;
  percentage: number;
}

export interface AnalyticsConversionItem {
  name: string;
  count: number;
  visitors: number;
  sessions: number;
}

export interface AnalyticsConversionAttributionItem {
  name: string;
  sessions: number;
  visitors: number;
  convertedSessions: number;
  conversions: number;
  conversionRate: number;
}

export interface AnalyticsFormInteractionItem {
  form: string;
  startEvents: number;
  attemptEvents: number;
  startedSessions: number;
  attemptedSessions: number;
  attemptRate: number;
}

export interface AnalyticsVital {
  metric: string;
  device?: string;
  samples: number;
  average: number;
  p75: number;
  good: number;
  needsImprovement: number;
  poor: number;
}

export interface SearchConsoleMetric {
  name: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface SearchConsoleReport {
  configured: boolean;
  status: "connected" | "not_configured" | "error" | string;
  missing?: string[];
  message?: string;
  warning?: string;
  cached?: boolean;
  stale?: boolean;
  fetchedAt?: string;
  startDate?: string;
  endDate?: string;
  dataThrough?: string | null;
  summary?: Omit<SearchConsoleMetric, "name">;
  timeline?: SearchConsoleMetric[];
  queries?: SearchConsoleMetric[];
  pages?: SearchConsoleMetric[];
  countries?: SearchConsoleMetric[];
  devices?: SearchConsoleMetric[];
  properties?: Array<Partial<SearchConsoleMetric> & { siteUrl: string }>;
  propertyErrors?: Array<{ siteUrl: string; message: string }>;
}

export type AnalyticsIncidentSeverity = "info" | "warning" | "critical";
export type AnalyticsIncidentStatus = "open" | "acknowledged" | "resolved";

export interface AnalyticsIncident {
  id?: string;
  _id?: string;
  type: string;
  source: string;
  severity: AnalyticsIncidentSeverity;
  status: AnalyticsIncidentStatus;
  title: string;
  message: string;
  metric: string;
  currentValue: number;
  baselineValue: number;
  changePercent: number;
  threshold: number;
  occurrences: number;
  firstDetectedAt: string;
  lastDetectedAt: string;
  acknowledgedAt?: string;
  resolvedAt?: string;
}

export interface AnalyticsIncidentSummary {
  open: number;
  critical: number;
  warning: number;
}

export interface AnalyticsRealtimeBreakdownItem {
  name: string;
  sessions: number;
  visitors: number;
}

export interface WebsiteAnalyticsRealtime {
  generatedAt: string;
  activeSince: string;
  windowMinutes: number;
  activeVisitors: number;
  activeSessions: number;
  newVisitors: number;
  lastActivityAt: string | null;
  pages: AnalyticsRealtimeBreakdownItem[];
  countries: AnalyticsRealtimeBreakdownItem[];
  devices: AnalyticsRealtimeBreakdownItem[];
  sources: AnalyticsRealtimeBreakdownItem[];
}

export interface WebsiteAnalyticsReport {
  range: AnalyticsRange;
  summary: AnalyticsSummary;
  comparison: Partial<Record<keyof AnalyticsSummary, number>>;
  timeline: AnalyticsTimelineItem[];
  audience: {
    countries: AnalyticsBreakdownItem[];
    regions: AnalyticsBreakdownItem[];
    locales: AnalyticsBreakdownItem[];
    markets: AnalyticsBreakdownItem[];
    devices: AnalyticsBreakdownItem[];
    browsers: AnalyticsBreakdownItem[];
    operatingSystems: AnalyticsBreakdownItem[];
  };
  acquisition: {
    sources: AnalyticsBreakdownItem[];
    mediums: AnalyticsBreakdownItem[];
    campaigns: AnalyticsBreakdownItem[];
    referrers: AnalyticsBreakdownItem[];
  };
  content: AnalyticsContentItem[];
  contentInsights: {
    landingPages: AnalyticsLandingPage[];
    exitPages: AnalyticsExitPage[];
    scrollDepth: AnalyticsScrollDepth[];
  };
  conversions: {
    items: AnalyticsConversionItem[];
    funnel: {
      formStarts: number;
      formSubmitAttempts: number;
      successfulConversions: number;
    };
    forms: AnalyticsFormInteractionItem[];
    attribution: {
      sources: AnalyticsConversionAttributionItem[];
      devices: AnalyticsConversionAttributionItem[];
      countries: AnalyticsConversionAttributionItem[];
      landingPages: AnalyticsConversionAttributionItem[];
    };
  };
  performance: {
    overall: AnalyticsVital[];
    byDevice: AnalyticsVital[];
    sampleLimitReached: boolean;
  };
  health: {
    errorsByType: Array<{ name: string; count: number }>;
    apiErrorsByStatus: Array<{ status: number; count: number }>;
    bots: Array<{ name: string; count: number }>;
    lastEventAt: string | null;
    incidents: AnalyticsIncident[];
    server?: {
      api: {
        requests: number;
        successfulResponses: number;
        clientErrors: number;
        serverErrors: number;
        notFoundResponses: number;
        botRequests: number;
        observedAvailability: number;
        averageResponseMs: number;
        maximumResponseMs: number;
        statuses: Array<{ status: number; count: number }>;
        failingRoutes: Array<{ route: string; status: number; count: number }>;
      };
      auth: {
        attempts: number;
        successful: number;
        denied: number;
        botAttempts: number;
      };
      forms: {
        attempts: number;
        successful: number;
        failed: number;
        byType: Array<{ type: string; attempts: number; successful: number; failed: number }>;
      };
      spam: {
        blocked: number;
        byRule: Array<{ name: string; count: number }>;
      };
      bots: Array<{ name: string; count: number }>;
      timeline: Array<{
        date: string;
        requests: number;
        serverErrors: number;
        notFound: number;
        authDenied: number;
        formFailures: number;
        spamBlocked: number;
        botRequests: number;
      }>;
      comparison: {
        serverErrors?: number;
        authDenied?: number;
        formFailures?: number;
        spamBlocked?: number;
        botRequests?: number;
      };
      lastMetricAt: string | null;
    };
  };
  seo: SearchConsoleReport;
}

export const getWebsiteAnalytics = (days = 30) =>
  authRequest<WebsiteAnalyticsReport>(
    { method: "GET", url: "/api/analytics/overview", params: { days } },
    "Failed to load website analytics."
  );

export const getWebsiteAnalyticsRealtime = () =>
  authRequest<WebsiteAnalyticsRealtime>(
    { method: "GET", url: "/api/analytics/realtime" },
    "Failed to load realtime website analytics."
  );

export const getAnalyticsIncidentSummary = () =>
  authRequest<{ metrics: AnalyticsIncidentSummary }>(
    { method: "GET", url: "/api/analytics/incidents/summary" },
    "Failed to load analytics incident summary."
  );

export const evaluateAnalyticsIncidents = () =>
  authRequest<{ incidents: AnalyticsIncident[]; metrics: AnalyticsIncidentSummary }>(
    { method: "POST", url: "/api/analytics/incidents/evaluate" },
    "Failed to evaluate analytics incidents."
  );

export const updateAnalyticsIncidentStatus = (
  id: string,
  status: AnalyticsIncidentStatus
) =>
  authRequest<{ incident: AnalyticsIncident }>(
    { method: "PATCH", url: `/api/analytics/incidents/${id}/status`, data: { status } },
    "Failed to update analytics incident."
  );
