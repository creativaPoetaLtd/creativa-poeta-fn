import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import {
  AdsClick,
  Assessment,
  BugReport,
  CheckCircle,
  Devices,
  Language,
  Login,
  Mail,
  ManageSearch,
  Mouse,
  NotificationsActive,
  People,
  Public,
  Refresh,
  Route,
  Security,
  Speed,
  TrendingDown,
  TrendingUp,
  Visibility,
  WarningAmber,
} from "@mui/icons-material";
import { Chart, registerables } from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import {
  AnalyticsIncident,
  AnalyticsIncidentStatus,
  AnalyticsBreakdownItem,
  AnalyticsConversionAttributionItem,
  AnalyticsRealtimeBreakdownItem,
  AnalyticsSummary,
  AnalyticsVital,
  evaluateAnalyticsIncidents,
  getWebsiteAnalyticsRealtime,
  getWebsiteAnalytics,
  updateAnalyticsIncidentStatus,
  WebsiteAnalyticsRealtime,
  WebsiteAnalyticsReport,
} from "../APIs/websiteAnalytics";

Chart.register(...registerables);

const colors = {
  navy: "#071a33",
  gold: "#EEBA2B",
  blue: "#2563eb",
  cyan: "#0891b2",
  green: "#059669",
  red: "#dc2626",
  violet: "#7c3aed",
  orange: "#ea580c",
  muted: "#64748b",
};

const chartPalette = [
  colors.gold,
  colors.blue,
  colors.green,
  colors.violet,
  colors.orange,
  colors.cyan,
  "#94a3b8",
];

const numberFormatter = new Intl.NumberFormat("fr-BE");
const compactNumberFormatter = new Intl.NumberFormat("fr-BE", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const formatNumber = (value: number) => numberFormatter.format(value || 0);
const formatCompactNumber = (value: number) => compactNumberFormatter.format(value || 0);
const formatDuration = (seconds: number) => {
  const safeSeconds = Math.max(0, Math.round(seconds || 0));
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;
  return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
};

const humanize = (value: string) =>
  value
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());

const formatVitalValue = (metric: string, value: number) =>
  metric === "CLS" ? value.toFixed(3) : `${Math.round(value)} ms`;

const getVitalRating = (metric: string, value: number) => {
  const thresholds: Record<string, [number, number]> = {
    LCP: [2500, 4000],
    INP: [200, 500],
    CLS: [0.1, 0.25],
    FCP: [1800, 3000],
    TTFB: [800, 1800],
  };
  const [good, poor] = thresholds[metric] || [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY];
  if (value <= good) return { label: "Good", color: colors.green };
  if (value <= poor) return { label: "Needs improvement", color: colors.orange };
  return { label: "Poor", color: colors.red };
};

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  comparison?: number;
  icon: React.ReactNode;
  color: string;
  inverseTrend?: boolean;
}

function MetricCard({
  title,
  value,
  subtitle,
  comparison,
  icon,
  color,
  inverseTrend = false,
}: MetricCardProps) {
  const hasComparison = typeof comparison === "number";
  const positive = (comparison || 0) >= 0;
  const healthy = inverseTrend ? !positive : positive;

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: { xs: 2, md: 3 },
        border: "1px solid #e2e8f0",
        boxShadow: "0 8px 28px rgba(15, 23, 42, 0.06)",
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 2.5 }, "&:last-child": { pb: { xs: 2, md: 2.5 } } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="caption"
              sx={{ color: colors.muted, fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase" }}
            >
              {title}
            </Typography>
            <Typography sx={{ color: colors.navy, fontSize: { xs: "1.65rem", md: "2rem" }, fontWeight: 900, mt: 0.5 }}>
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 42,
              height: 42,
              flexShrink: 0,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              color,
              bgcolor: alpha(color, 0.11),
            }}
          >
            {icon}
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center" flexWrap="wrap" gap={0.75} sx={{ mt: 1 }}>
          <Typography variant="body2" sx={{ color: colors.muted }}>
            {subtitle}
          </Typography>
          {hasComparison && (
            <Chip
              size="small"
              icon={positive ? <TrendingUp /> : <TrendingDown />}
              label={`${positive ? "+" : ""}${comparison}%`}
              sx={{
                height: 22,
                bgcolor: alpha(healthy ? colors.green : colors.red, 0.1),
                color: healthy ? colors.green : colors.red,
                fontWeight: 800,
                "& .MuiChip-icon": { color: "inherit", fontSize: 15 },
              }}
            />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

interface SectionCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

function SectionCard({ title, subtitle, children, action }: SectionCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        p: { xs: 2, md: 2.75 },
        borderRadius: { xs: 2, md: 3 },
        border: "1px solid #e2e8f0",
        boxShadow: "0 8px 28px rgba(15, 23, 42, 0.05)",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2} sx={{ mb: 2.25 }}>
        <Box>
          <Typography sx={{ color: colors.navy, fontWeight: 900, fontSize: "1.05rem" }}>{title}</Typography>
          {subtitle && <Typography variant="body2" sx={{ color: colors.muted, mt: 0.35 }}>{subtitle}</Typography>}
        </Box>
        {action}
      </Stack>
      {children}
    </Paper>
  );
}

function EmptyState({ label = "No data for this period." }: { label?: string }) {
  return (
    <Box sx={{ minHeight: 150, display: "grid", placeItems: "center", textAlign: "center", px: 2 }}>
      <Typography variant="body2" sx={{ color: colors.muted }}>{label}</Typography>
    </Box>
  );
}

function BreakdownList({ items }: { items: AnalyticsBreakdownItem[] }) {
  if (!items.length) return <EmptyState />;

  return (
    <Stack spacing={1.65}>
      {items.slice(0, 8).map((item) => (
        <Box key={item.name}>
          <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ mb: 0.6 }}>
            <Typography variant="body2" noWrap sx={{ color: colors.navy, fontWeight: 700 }}>{item.name}</Typography>
            <Typography variant="body2" sx={{ color: colors.muted, flexShrink: 0 }}>
              {formatNumber(item.count)} · {item.percentage}%
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={Math.min(100, item.percentage)}
            sx={{
              height: 6,
              borderRadius: 8,
              bgcolor: "#eef2f7",
              "& .MuiLinearProgress-bar": { borderRadius: 8, bgcolor: colors.blue },
            }}
          />
        </Box>
      ))}
    </Stack>
  );
}

function PathRankingList({
  items,
  color,
}: {
  items: Array<{ path: string; count: number; percentage: number }>;
  color: string;
}) {
  if (!items.length) return <EmptyState />;

  return (
    <Stack spacing={1.5}>
      {items.slice(0, 8).map((item) => (
        <Box key={item.path}>
          <Stack direction="row" justifyContent="space-between" spacing={1.5} sx={{ mb: 0.6 }}>
            <Typography
              variant="body2"
              title={item.path}
              noWrap
              sx={{ color: colors.navy, fontWeight: 750, minWidth: 0 }}
            >
              {item.path}
            </Typography>
            <Typography variant="body2" sx={{ color: colors.muted, flexShrink: 0 }}>
              {formatNumber(item.count)} · {item.percentage}%
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={Math.min(100, item.percentage)}
            sx={{
              height: 6,
              borderRadius: 8,
              bgcolor: "#eef2f7",
              "& .MuiLinearProgress-bar": { bgcolor: color, borderRadius: 8 },
            }}
          />
        </Box>
      ))}
    </Stack>
  );
}

function ConversionAttributionList({ items }: { items: AnalyticsConversionAttributionItem[] }) {
  if (!items.length) return <EmptyState label="No conversion attribution available for this period." />;

  return (
    <Stack spacing={1.5}>
      {items.slice(0, 8).map((item) => (
        <Box key={item.name}>
          <Stack direction="row" justifyContent="space-between" spacing={1.5} sx={{ mb: 0.6 }}>
            <Typography
              variant="body2"
              title={item.name}
              noWrap
              sx={{ color: colors.navy, fontWeight: 800, minWidth: 0 }}
            >
              {item.name}
            </Typography>
            <Typography variant="body2" sx={{ color: colors.muted, flexShrink: 0 }}>
              {formatNumber(item.convertedSessions)}/{formatNumber(item.sessions)} · {item.conversionRate}%
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={Math.min(100, item.conversionRate)}
            sx={{
              height: 7,
              borderRadius: 8,
              bgcolor: "#eef2f7",
              "& .MuiLinearProgress-bar": { bgcolor: colors.green, borderRadius: 8 },
            }}
          />
        </Box>
      ))}
    </Stack>
  );
}

function RealtimeBreakdownList({ items }: { items: AnalyticsRealtimeBreakdownItem[] }) {
  if (!items.length) {
    return <Typography variant="body2" sx={{ color: colors.muted }}>No active visit.</Typography>;
  }

  return (
    <Stack spacing={0.8}>
      {items.slice(0, 5).map((item) => (
        <Stack
          key={item.name}
          direction="row"
          justifyContent="space-between"
          spacing={1}
          sx={{ pb: 0.7, borderBottom: "1px solid #eef2f7" }}
        >
          <Typography variant="body2" title={item.name} noWrap sx={{ color: colors.navy, fontWeight: 750, minWidth: 0 }}>
            {item.name}
          </Typography>
          <Typography variant="caption" sx={{ color: colors.muted, flexShrink: 0 }}>
            {formatNumber(item.visitors)} visitor{item.visitors === 1 ? "" : "s"}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}

function VitalCard({ vital }: { vital: AnalyticsVital }) {
  const rating = getVitalRating(vital.metric, vital.p75);
  const goodPercentage = vital.samples > 0 ? Math.round((vital.good / vital.samples) * 100) : 0;

  return (
    <Box sx={{ p: 2, border: "1px solid #e2e8f0", borderRadius: 2.5, bgcolor: "#fbfdff" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography sx={{ color: colors.navy, fontWeight: 900 }}>{vital.metric}</Typography>
          <Typography variant="caption" sx={{ color: colors.muted }}>{formatNumber(vital.samples)} samples</Typography>
        </Box>
        <Chip
          label={rating.label}
          size="small"
          sx={{ bgcolor: alpha(rating.color, 0.1), color: rating.color, fontWeight: 800 }}
        />
      </Stack>
      <Typography sx={{ color: rating.color, fontWeight: 900, fontSize: "1.65rem", mt: 1.5 }}>
        {formatVitalValue(vital.metric, vital.p75)}
      </Typography>
      <Typography variant="body2" sx={{ color: colors.muted }}>75th percentile · {goodPercentage}% good</Typography>
    </Box>
  );
}

const incidentColor = (severity: AnalyticsIncident["severity"]) => {
  if (severity === "critical") return colors.red;
  if (severity === "warning") return colors.orange;
  return colors.blue;
};

function IncidentCard({
  incident,
  busy,
  onStatusChange,
}: {
  incident: AnalyticsIncident;
  busy: boolean;
  onStatusChange: (incident: AnalyticsIncident, status: AnalyticsIncidentStatus) => void;
}) {
  const color = incidentColor(incident.severity);
  const change = `${incident.changePercent > 0 ? "+" : ""}${incident.changePercent}%`;

  return (
    <Box
      sx={{
        p: { xs: 1.5, md: 2 },
        borderRadius: 2.5,
        border: `1px solid ${alpha(color, 0.3)}`,
        bgcolor: alpha(color, 0.045),
      }}
    >
      <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" spacing={1.5}>
        <Box sx={{ minWidth: 0 }}>
          <Stack direction="row" alignItems="center" flexWrap="wrap" gap={0.75}>
            <WarningAmber sx={{ color, fontSize: 20 }} />
            <Typography sx={{ color: colors.navy, fontWeight: 900 }}>{incident.title}</Typography>
            <Chip
              size="small"
              label={incident.severity}
              sx={{ bgcolor: alpha(color, 0.12), color, fontWeight: 900, textTransform: "uppercase" }}
            />
            {incident.status === "acknowledged" && (
              <Chip size="small" label="Acknowledged" color="default" />
            )}
          </Stack>
          <Typography variant="body2" sx={{ color: colors.muted, mt: 0.75 }}>
            {incident.message}
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={0.75} sx={{ mt: 1.25 }}>
            <Chip size="small" label={`Current: ${formatNumber(incident.currentValue)}`} />
            <Chip size="small" label={`Usual baseline: ${formatNumber(incident.baselineValue)}`} />
            <Chip size="small" label={`Change: ${change}`} />
            <Chip size="small" label={`${formatNumber(incident.occurrences)} detection(s)`} />
          </Stack>
          <Typography variant="caption" sx={{ color: "#94a3b8", display: "block", mt: 1 }}>
            Last detected {new Date(incident.lastDetectedAt).toLocaleString("fr-BE")} · Source: {humanize(incident.source)}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} sx={{ flexShrink: 0, alignSelf: { xs: "stretch", md: "flex-start" } }}>
          {incident.status === "open" && (
            <Button
              size="small"
              variant="outlined"
              disabled={busy}
              onClick={() => onStatusChange(incident, "acknowledged")}
              sx={{ textTransform: "none", fontWeight: 800 }}
            >
              Acknowledge
            </Button>
          )}
          <Button
            size="small"
            variant="contained"
            disabled={busy}
            onClick={() => onStatusChange(incident, "resolved")}
            sx={{ bgcolor: colors.navy, textTransform: "none", fontWeight: 800 }}
          >
            Resolve
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

const summaryCards = (
  summary: AnalyticsSummary,
  comparison: WebsiteAnalyticsReport["comparison"]
): MetricCardProps[] => [
  {
    title: "Unique visitors",
    value: formatCompactNumber(summary.visitors),
    subtitle: `${formatNumber(summary.newVisitors)} new · ${formatNumber(summary.returningVisitors)} returning`,
    comparison: comparison.visitors,
    icon: <People />,
    color: colors.blue,
  },
  {
    title: "Visits",
    value: formatCompactNumber(summary.sessions),
    subtitle: `${formatNumber(summary.activeVisitors)} active now`,
    comparison: comparison.sessions,
    icon: <Visibility />,
    color: colors.green,
  },
  {
    title: "Page views",
    value: formatCompactNumber(summary.pageViews),
    subtitle: `${summary.sessions ? (summary.pageViews / summary.sessions).toFixed(1) : "0.0"} pages per visit`,
    comparison: comparison.pageViews,
    icon: <Assessment />,
    color: colors.violet,
  },
  {
    title: "Conversions",
    value: formatCompactNumber(summary.conversions),
    subtitle: `${summary.conversionRate}% of visits convert`,
    comparison: comparison.conversions,
    icon: <AdsClick />,
    color: colors.gold,
  },
  {
    title: "Engagement rate",
    value: `${summary.engagementRate}%`,
    subtitle: `${formatDuration(summary.averageEngagementSeconds)} average engagement`,
    comparison: comparison.engagementRate,
    icon: <Mouse />,
    color: colors.cyan,
  },
  {
    title: "Tracked errors",
    value: formatCompactNumber(summary.errors),
    subtitle: `${formatNumber(summary.botSessions)} automated visits detected`,
    comparison: comparison.errors,
    icon: <BugReport />,
    color: colors.red,
    inverseTrend: true,
  },
];

export default function WebsiteAnalytics() {
  const [days, setDays] = useState(30);
  const [activeTab, setActiveTab] = useState(0);
  const [report, setReport] = useState<WebsiteAnalyticsReport | null>(null);
  const [realtime, setRealtime] = useState<WebsiteAnalyticsRealtime | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [evaluatingIncidents, setEvaluatingIncidents] = useState(false);
  const [incidentActionId, setIncidentActionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadReport = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);
      setReport(await getWebsiteAnalytics(days));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Failed to load website analytics.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [days]);

  useEffect(() => {
    void loadReport();
  }, [loadReport]);

  useEffect(() => {
    let mounted = true;
    const refreshRealtime = async () => {
      try {
        const nextRealtime = await getWebsiteAnalyticsRealtime();
        if (mounted) setRealtime(nextRealtime);
      } catch {
        // The historical report remains usable if a lightweight live refresh fails.
      }
    };
    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") void refreshRealtime();
    };

    void refreshRealtime();
    const interval = window.setInterval(refreshWhenVisible, 30_000);
    document.addEventListener("visibilitychange", refreshWhenVisible);
    return () => {
      mounted = false;
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
    };
  }, []);

  const handleEvaluateIncidents = async () => {
    try {
      setEvaluatingIncidents(true);
      setError(null);
      await evaluateAnalyticsIncidents();
      await loadReport(true);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Failed to evaluate incidents.");
    } finally {
      setEvaluatingIncidents(false);
    }
  };

  const handleIncidentStatus = async (
    incident: AnalyticsIncident,
    status: AnalyticsIncidentStatus
  ) => {
    const incidentId = incident.id || incident._id;
    if (!incidentId) return;
    try {
      setIncidentActionId(incidentId);
      setError(null);
      await updateAnalyticsIncidentStatus(incidentId, status);
      await loadReport(true);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Failed to update incident.");
    } finally {
      setIncidentActionId(null);
    }
  };

  const timelineData = useMemo(() => ({
    labels: report?.timeline.map((item) =>
      new Date(`${item.date}T12:00:00Z`).toLocaleDateString("fr-BE", { day: "2-digit", month: "short" })
    ) || [],
    datasets: [
      {
        label: "Visitors",
        data: report?.timeline.map((item) => item.visitors) || [],
        borderColor: colors.blue,
        backgroundColor: alpha(colors.blue, 0.12),
        tension: 0.35,
        fill: true,
        pointRadius: 2,
      },
      {
        label: "Visits",
        data: report?.timeline.map((item) => item.sessions) || [],
        borderColor: colors.gold,
        backgroundColor: alpha(colors.gold, 0.08),
        tension: 0.35,
        pointRadius: 2,
      },
      {
        label: "Page views",
        data: report?.timeline.map((item) => item.pageViews) || [],
        borderColor: colors.violet,
        backgroundColor: alpha(colors.violet, 0.08),
        tension: 0.35,
        pointRadius: 2,
      },
    ],
  }), [report]);

  const sourceChartData = useMemo(() => ({
    labels: report?.acquisition.sources.slice(0, 7).map((item) => item.name) || [],
    datasets: [{
      data: report?.acquisition.sources.slice(0, 7).map((item) => item.count) || [],
      backgroundColor: chartPalette,
      borderWidth: 0,
      hoverOffset: 7,
    }],
  }), [report]);

  const serverTimelineData = useMemo(() => ({
    labels: report?.health.server?.timeline.map((item) =>
      new Date(`${item.date}T12:00:00Z`).toLocaleDateString("fr-BE", { day: "2-digit", month: "short" })
    ) || [],
    datasets: [
      {
        label: "API requests",
        data: report?.health.server?.timeline.map((item) => item.requests) || [],
        borderColor: colors.blue,
        backgroundColor: alpha(colors.blue, 0.1),
        tension: 0.35,
        fill: true,
        pointRadius: 2,
      },
      {
        label: "Server errors",
        data: report?.health.server?.timeline.map((item) => item.serverErrors) || [],
        borderColor: colors.red,
        backgroundColor: alpha(colors.red, 0.08),
        tension: 0.35,
        pointRadius: 2,
      },
      {
        label: "Denied logins",
        data: report?.health.server?.timeline.map((item) => item.authDenied) || [],
        borderColor: colors.orange,
        backgroundColor: alpha(colors.orange, 0.08),
        tension: 0.35,
        pointRadius: 2,
      },
    ],
  }), [report]);

  const seoTimelineData = useMemo(() => ({
    labels: report?.seo.timeline?.map((item) =>
      new Date(`${item.name}T12:00:00Z`).toLocaleDateString("fr-BE", { day: "2-digit", month: "short" })
    ) || [],
    datasets: [
      {
        label: "Google clicks",
        data: report?.seo.timeline?.map((item) => item.clicks) || [],
        borderColor: colors.blue,
        backgroundColor: alpha(colors.blue, 0.11),
        tension: 0.35,
        fill: true,
        pointRadius: 2,
      },
      {
        label: "Google impressions",
        data: report?.seo.timeline?.map((item) => item.impressions) || [],
        borderColor: colors.gold,
        backgroundColor: alpha(colors.gold, 0.08),
        tension: 0.35,
        pointRadius: 2,
      },
    ],
  }), [report]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: "index" as const },
    plugins: {
      legend: { position: "bottom" as const, labels: { usePointStyle: true, padding: 18 } },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: "#eef2f7" } },
    },
  };

  if (loading && !report) {
    return (
      <Box>
        <Skeleton variant="rounded" height={96} sx={{ mb: 2.5 }} />
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid item xs={12} sm={6} lg={4} key={item}><Skeleton variant="rounded" height={150} /></Grid>
          ))}
        </Grid>
        <Skeleton variant="rounded" height={420} sx={{ mt: 2.5 }} />
      </Box>
    );
  }

  return (
    <Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", md: "flex-start" }}
        spacing={2}
        sx={{ mb: { xs: 2.5, md: 3.5 } }}
      >
        <Box>
          <Typography variant="h4" sx={{ color: colors.navy, fontWeight: 900, fontSize: { xs: "1.65rem", md: "2.125rem" } }}>
            Website Analytics
          </Typography>
          <Typography sx={{ color: colors.muted, mt: 0.65 }}>
            First-party, consent-aware insights from the public Creativa Poeta website.
          </Typography>
          {report && (
            <Typography variant="caption" sx={{ color: "#94a3b8", display: "block", mt: 0.75 }}>
              {new Date(report.range.from).toLocaleDateString("fr-BE")} – {new Date(report.range.to).toLocaleDateString("fr-BE")}
            </Typography>
          )}
        </Box>
        <Stack direction="row" spacing={1}>
          <Select
            size="small"
            value={days}
            onChange={(event) => setDays(Number(event.target.value))}
            sx={{ minWidth: 128, bgcolor: "white", fontWeight: 700 }}
          >
            <MenuItem value={7}>Last 7 days</MenuItem>
            <MenuItem value={30}>Last 30 days</MenuItem>
            <MenuItem value={90}>Last 90 days</MenuItem>
            <MenuItem value={365}>Last 12 months</MenuItem>
          </Select>
          <Button
            variant="contained"
            startIcon={refreshing ? <CircularProgress size={16} color="inherit" /> : <Refresh />}
            disabled={refreshing}
            onClick={() => void loadReport(true)}
            sx={{ bgcolor: colors.navy, textTransform: "none", fontWeight: 800, "&:hover": { bgcolor: "#12365f" } }}
          >
            Refresh
          </Button>
        </Stack>
      </Stack>

      {error && <Alert severity="error" sx={{ mb: 2.5 }} onClose={() => setError(null)}>{error}</Alert>}

      {!report ? (
        <Alert severity="info">Analytics data is not available yet. Try refreshing in a moment.</Alert>
      ) : (
        <>
          <Grid container spacing={{ xs: 1.5, md: 2.25 }} sx={{ mb: { xs: 2.5, md: 3 } }}>
            {summaryCards({
              ...report.summary,
              activeVisitors: realtime?.activeVisitors ?? report.summary.activeVisitors,
            }, report.comparison).map((card) => (
              <Grid item xs={12} sm={6} lg={4} key={card.title}><MetricCard {...card} /></Grid>
            ))}
          </Grid>

          <Paper
            elevation={0}
            sx={{ mb: 2.5, border: "1px solid #e2e8f0", borderRadius: 2.5, overflow: "hidden" }}
          >
            <Tabs
              value={activeTab}
              onChange={(_, nextTab: number) => setActiveTab(nextTab)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                px: { xs: 0.5, md: 1.5 },
                "& .MuiTab-root": { minHeight: 56, textTransform: "none", fontWeight: 800 },
                "& .Mui-selected": { color: `${colors.navy} !important` },
                "& .MuiTabs-indicator": { bgcolor: colors.gold, height: 3 },
              }}
            >
              <Tab label="Overview" />
              <Tab label="Audience & acquisition" />
              <Tab label="Content & conversions" />
              <Tab label="Google SEO" />
              <Tab label="Performance & health" />
            </Tabs>
          </Paper>

          {activeTab === 0 && (
            <Grid container spacing={{ xs: 1.5, md: 2.5 }}>
              <Grid item xs={12}>
                <SectionCard
                  title="Live website activity"
                  subtitle="Consent-aware visitors active during the last five minutes · refreshed every 30 seconds"
                  action={(
                    <Chip
                      size="small"
                      label="Live"
                      icon={<Visibility />}
                      sx={{ bgcolor: alpha(colors.green, 0.1), color: colors.green, fontWeight: 900 }}
                    />
                  )}
                >
                  {realtime ? (
                    <Grid container spacing={1.5}>
                      {[
                        { label: "Active visitors", value: realtime.activeVisitors, color: colors.green },
                        { label: "Active visits", value: realtime.activeSessions, color: colors.blue },
                        { label: "New visitors", value: realtime.newVisitors, color: colors.gold },
                      ].map((metric) => (
                        <Grid item xs={6} sm={4} key={metric.label}>
                          <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: alpha(metric.color, 0.07), border: `1px solid ${alpha(metric.color, 0.16)}` }}>
                            <Typography variant="caption" sx={{ color: colors.muted, fontWeight: 800 }}>{metric.label}</Typography>
                            <Typography sx={{ color: metric.color, fontSize: "1.55rem", fontWeight: 900 }}>{formatNumber(metric.value)}</Typography>
                          </Box>
                        </Grid>
                      ))}
                      {[
                        { title: "Active pages", items: realtime.pages },
                        { title: "Countries", items: realtime.countries },
                        { title: "Devices", items: realtime.devices },
                        { title: "Sources", items: realtime.sources },
                      ].map((group) => (
                        <Grid item xs={12} sm={6} lg={3} key={group.title}>
                          <Box sx={{ p: 1.5, height: "100%", border: "1px solid #e2e8f0", borderRadius: 2 }}>
                            <Typography variant="overline" sx={{ color: colors.muted, fontWeight: 900 }}>{group.title}</Typography>
                            <RealtimeBreakdownList items={group.items} />
                          </Box>
                        </Grid>
                      ))}
                      <Grid item xs={12}>
                        <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                          Last live refresh: {new Date(realtime.generatedAt).toLocaleTimeString("fr-BE")}
                          {realtime.lastActivityAt ? ` · Last visitor activity: ${new Date(realtime.lastActivityAt).toLocaleTimeString("fr-BE")}` : ""}
                        </Typography>
                      </Grid>
                    </Grid>
                  ) : <EmptyState label="Waiting for the first live audience refresh." />}
                </SectionCard>
              </Grid>
              <Grid item xs={12} lg={8}>
                <SectionCard title="Traffic over time" subtitle="Visitors, visits and page views by day">
                  {report.timeline.some((item) => item.pageViews || item.sessions) ? (
                    <Box sx={{ height: { xs: 285, md: 380 } }}><Line data={timelineData} options={chartOptions} /></Box>
                  ) : <EmptyState label="Traffic will appear here after consenting visitors browse the website." />}
                </SectionCard>
              </Grid>
              <Grid item xs={12} lg={4}>
                <SectionCard title="Visitor mix" subtitle="New versus returning people">
                  <Stack spacing={2.5}>
                    <Box>
                      <Stack direction="row" justifyContent="space-between"><Typography variant="body2" fontWeight={800}>New visitors</Typography><Typography variant="body2">{formatNumber(report.summary.newVisitors)}</Typography></Stack>
                      <LinearProgress variant="determinate" value={report.summary.visitors ? (report.summary.newVisitors / report.summary.visitors) * 100 : 0} sx={{ mt: 1, height: 8, borderRadius: 8, "& .MuiLinearProgress-bar": { bgcolor: colors.blue } }} />
                    </Box>
                    <Box>
                      <Stack direction="row" justifyContent="space-between"><Typography variant="body2" fontWeight={800}>Returning visitors</Typography><Typography variant="body2">{formatNumber(report.summary.returningVisitors)}</Typography></Stack>
                      <LinearProgress variant="determinate" value={report.summary.visitors ? (report.summary.returningVisitors / report.summary.visitors) * 100 : 0} sx={{ mt: 1, height: 8, borderRadius: 8, "& .MuiLinearProgress-bar": { bgcolor: colors.gold } }} />
                    </Box>
                    <Box sx={{ p: 2, borderRadius: 2, bgcolor: alpha(colors.green, 0.08) }}>
                      <Typography variant="caption" sx={{ color: colors.muted, textTransform: "uppercase", fontWeight: 800 }}>Engaged visits</Typography>
                      <Typography sx={{ color: colors.green, fontSize: "1.8rem", fontWeight: 900 }}>{formatNumber(report.summary.engagedSessions)}</Typography>
                      <Typography variant="body2" sx={{ color: colors.muted }}>{report.summary.bounceRate}% bounce rate</Typography>
                    </Box>
                  </Stack>
                </SectionCard>
              </Grid>
            </Grid>
          )}

          {activeTab === 1 && (
            <Grid container spacing={{ xs: 1.5, md: 2.5 }}>
              <Grid item xs={12} md={6} lg={4}><SectionCard title="Countries" subtitle="Visits by country" action={<Public sx={{ color: colors.blue }} />}><BreakdownList items={report.audience.countries} /></SectionCard></Grid>
              <Grid item xs={12} md={6} lg={4}><SectionCard title="Devices" subtitle="Desktop, mobile and tablet" action={<Devices sx={{ color: colors.violet }} />}><BreakdownList items={report.audience.devices} /></SectionCard></Grid>
              <Grid item xs={12} md={6} lg={4}><SectionCard title="Languages" subtitle="Visitor browser language" action={<Language sx={{ color: colors.green }} />}><BreakdownList items={report.audience.locales} /></SectionCard></Grid>
              <Grid item xs={12} md={6} lg={4}><SectionCard title="Regions" subtitle="Visits by geographic region"><BreakdownList items={report.audience.regions} /></SectionCard></Grid>
              <Grid item xs={12} md={6} lg={4}><SectionCard title="Website markets" subtitle="CP market versions used by visitors"><BreakdownList items={report.audience.markets} /></SectionCard></Grid>
              <Grid item xs={12} md={6}><SectionCard title="Traffic sources" subtitle="Where visitors discovered CP" action={<Route sx={{ color: colors.gold }} />}>{report.acquisition.sources.length ? <Box sx={{ height: 310 }}><Doughnut data={sourceChartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "bottom", labels: { usePointStyle: true, padding: 16 } } } }} /></Box> : <EmptyState />}</SectionCard></Grid>
              <Grid item xs={12} md={6}><SectionCard title="Acquisition details" subtitle="Mediums, campaigns and referring sites"><Typography variant="overline" sx={{ color: colors.muted, fontWeight: 900 }}>Mediums</Typography><BreakdownList items={report.acquisition.mediums} />{report.acquisition.campaigns.length > 0 && <Box sx={{ mt: 3 }}><Typography variant="overline" sx={{ color: colors.muted, fontWeight: 900 }}>Campaigns</Typography><BreakdownList items={report.acquisition.campaigns} /></Box>}{report.acquisition.referrers.length > 0 && <Box sx={{ mt: 3 }}><Typography variant="overline" sx={{ color: colors.muted, fontWeight: 900 }}>Referring sites</Typography><BreakdownList items={report.acquisition.referrers} /></Box>}</SectionCard></Grid>
              <Grid item xs={12} md={6}><SectionCard title="Browsers" subtitle="Most-used web browsers"><BreakdownList items={report.audience.browsers} /></SectionCard></Grid>
              <Grid item xs={12} md={6}><SectionCard title="Operating systems" subtitle="Visitor platforms"><BreakdownList items={report.audience.operatingSystems} /></SectionCard></Grid>
            </Grid>
          )}

          {activeTab === 2 && (
            <Grid container spacing={{ xs: 1.5, md: 2.5 }}>
              <Grid item xs={12}>
                <SectionCard title="Top content" subtitle="Most visited pages and their engagement">
                  {report.content.length ? (
                    <TableContainer sx={{ overflowX: "auto" }}>
                      <Table size="small" sx={{ minWidth: 820 }}>
                        <TableHead><TableRow><TableCell>Page</TableCell><TableCell align="right">Views</TableCell><TableCell align="right">Visitors</TableCell><TableCell align="right">Visits</TableCell><TableCell align="right">Exits</TableCell><TableCell align="right">Exit rate</TableCell><TableCell align="right">Avg. engagement</TableCell></TableRow></TableHead>
                        <TableBody>{report.content.map((item) => <TableRow key={item.path} hover><TableCell sx={{ color: colors.navy, fontWeight: 700, maxWidth: 320, wordBreak: "break-word" }}>{item.path}</TableCell><TableCell align="right">{formatNumber(item.views)}</TableCell><TableCell align="right">{formatNumber(item.visitors)}</TableCell><TableCell align="right">{formatNumber(item.sessions)}</TableCell><TableCell align="right">{formatNumber(item.exits)}</TableCell><TableCell align="right"><Chip size="small" label={`${item.exitRate}%`} sx={{ fontWeight: 800, bgcolor: alpha(item.exitRate >= 70 ? colors.orange : colors.blue, 0.09), color: item.exitRate >= 70 ? colors.orange : colors.blue }} /></TableCell><TableCell align="right">{formatDuration(item.averageEngagementSeconds)}</TableCell></TableRow>)}</TableBody>
                      </Table>
                    </TableContainer>
                  ) : <EmptyState />}
                </SectionCard>
              </Grid>
              <Grid item xs={12} lg={4}>
                <SectionCard title="Entry pages" subtitle="The first page seen during each visit">
                  <PathRankingList
                    color={colors.blue}
                    items={report.contentInsights.landingPages.map((item) => ({
                      path: item.path,
                      count: item.sessions,
                      percentage: item.percentage,
                    }))}
                  />
                </SectionCard>
              </Grid>
              <Grid item xs={12} lg={4}>
                <SectionCard title="Exit pages" subtitle="The last page seen during each visit">
                  <PathRankingList
                    color={colors.orange}
                    items={report.contentInsights.exitPages.map((item) => ({
                      path: item.path,
                      count: item.exits,
                      percentage: item.percentage,
                    }))}
                  />
                </SectionCard>
              </Grid>
              <Grid item xs={12} lg={4}>
                <SectionCard title="Scroll depth" subtitle="Share of visits reaching each page-depth milestone">
                  {report.contentInsights.scrollDepth.length ? (
                    <Stack spacing={1.75}>
                      {report.contentInsights.scrollDepth.map((item) => (
                        <Box key={item.depth}>
                          <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                            <Typography sx={{ color: colors.navy, fontWeight: 900 }}>{item.depth}% depth</Typography>
                            <Typography variant="body2" sx={{ color: colors.muted }}>
                              {formatNumber(item.sessions)} visits · {item.percentage}%
                            </Typography>
                          </Stack>
                          <LinearProgress
                            variant="determinate"
                            value={Math.min(100, item.percentage)}
                            sx={{
                              mt: 0.8,
                              height: 9,
                              borderRadius: 9,
                              bgcolor: "#eef2f7",
                              "& .MuiLinearProgress-bar": {
                                bgcolor: item.depth >= 75 ? colors.green : colors.violet,
                                borderRadius: 9,
                              },
                            }}
                          />
                        </Box>
                      ))}
                    </Stack>
                  ) : <EmptyState label="Scroll depth will appear after consenting visitors browse longer pages." />}
                </SectionCard>
              </Grid>
              <Grid item xs={12} lg={7}>
                <SectionCard title="Conversions" subtitle="Completed business actions on the website">
                  {report.conversions.items.length ? (
                    <TableContainer><Table size="small"><TableHead><TableRow><TableCell>Action</TableCell><TableCell align="right">Total</TableCell><TableCell align="right">Visitors</TableCell><TableCell align="right">Visits</TableCell></TableRow></TableHead><TableBody>{report.conversions.items.map((item) => <TableRow key={item.name}><TableCell sx={{ fontWeight: 700 }}>{humanize(item.name)}</TableCell><TableCell align="right">{formatNumber(item.count)}</TableCell><TableCell align="right">{formatNumber(item.visitors)}</TableCell><TableCell align="right">{formatNumber(item.sessions)}</TableCell></TableRow>)}</TableBody></Table></TableContainer>
                  ) : <EmptyState label="Submitted contacts, projects, partnerships, audits and applications will appear here." />}
                </SectionCard>
              </Grid>
              <Grid item xs={12} lg={5}>
                <SectionCard title="Form funnel" subtitle="From first interaction to completion">
                  {[{ label: "Forms started", value: report.conversions.funnel.formStarts, color: colors.blue }, { label: "Submit attempts", value: report.conversions.funnel.formSubmitAttempts, color: colors.gold }, { label: "Successful conversions", value: report.conversions.funnel.successfulConversions, color: colors.green }].map((step, index) => <Box key={step.label} sx={{ mb: index === 2 ? 0 : 2 }}><Stack direction="row" justifyContent="space-between"><Typography variant="body2" sx={{ fontWeight: 800 }}>{step.label}</Typography><Typography sx={{ color: step.color, fontWeight: 900 }}>{formatNumber(step.value)}</Typography></Stack><LinearProgress variant="determinate" value={report.conversions.funnel.formStarts ? Math.min(100, (step.value / report.conversions.funnel.formStarts) * 100) : 0} sx={{ mt: 1, height: 9, borderRadius: 9, "& .MuiLinearProgress-bar": { bgcolor: step.color } }} /></Box>)}
                </SectionCard>
              </Grid>
              <Grid item xs={12} md={6}>
                <SectionCard title="Conversion by source" subtitle="Converted visits versus all visits from each traffic source">
                  <ConversionAttributionList items={report.conversions.attribution.sources} />
                </SectionCard>
              </Grid>
              <Grid item xs={12} md={6}>
                <SectionCard title="Conversion by entry page" subtitle="Which first page brings the most converting visits">
                  <ConversionAttributionList items={report.conversions.attribution.landingPages} />
                </SectionCard>
              </Grid>
              <Grid item xs={12} md={6}>
                <SectionCard title="Conversion by device" subtitle="Conversion rate across mobile, desktop and tablet">
                  <ConversionAttributionList items={report.conversions.attribution.devices} />
                </SectionCard>
              </Grid>
              <Grid item xs={12} md={6}>
                <SectionCard title="Conversion by country" subtitle="Markets producing completed business actions">
                  <ConversionAttributionList items={report.conversions.attribution.countries} />
                </SectionCard>
              </Grid>
              <Grid item xs={12}>
                <SectionCard title="Form interactions" subtitle="Visits progressing from the first form interaction to a submit attempt">
                  {report.conversions.forms.length ? (
                    <TableContainer sx={{ overflowX: "auto" }}>
                      <Table size="small" sx={{ minWidth: 650 }}>
                        <TableHead>
                          <TableRow>
                            <TableCell>Form</TableCell>
                            <TableCell align="right">Visits started</TableCell>
                            <TableCell align="right">Visits attempted</TableCell>
                            <TableCell align="right">Progression</TableCell>
                            <TableCell align="right">Total attempts</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {report.conversions.forms.map((form) => (
                            <TableRow key={form.form} hover>
                              <TableCell sx={{ color: colors.navy, fontWeight: 800 }}>{humanize(form.form)}</TableCell>
                              <TableCell align="right">{formatNumber(form.startedSessions)}</TableCell>
                              <TableCell align="right">{formatNumber(form.attemptedSessions)}</TableCell>
                              <TableCell align="right">
                                <Chip
                                  size="small"
                                  label={`${form.attemptRate}%`}
                                  sx={{
                                    fontWeight: 900,
                                    bgcolor: alpha(form.attemptRate >= 60 ? colors.green : colors.orange, 0.1),
                                    color: form.attemptRate >= 60 ? colors.green : colors.orange,
                                  }}
                                />
                              </TableCell>
                              <TableCell align="right">{formatNumber(form.attemptEvents)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : <EmptyState label="Form interaction details will appear after consenting visitors use a public form." />}
                </SectionCard>
              </Grid>
            </Grid>
          )}

          {activeTab === 3 && (
            <Grid container spacing={{ xs: 1.5, md: 2.5 }}>
              {!report.seo.configured && (
                <Grid item xs={12}>
                  <SectionCard
                    title="Connect Google Search Console"
                    subtitle="The integration is installed; only the private server configuration remains."
                    action={<ManageSearch sx={{ color: colors.blue, fontSize: 34 }} />}
                  >
                    <Alert severity="info" sx={{ mb: 2.5 }}>
                      {report.seo.message || "Search Console credentials are not configured yet."}
                    </Alert>
                    <Grid container spacing={2}>
                      {[
                        { number: "1", title: "Google Cloud", text: "Enable the Google Search Console API and create a service account." },
                        { number: "2", title: "Read-only access", text: "Add the service-account email as a user on each CP Search Console property." },
                        { number: "3", title: "Server secrets", text: "Store the email, base64 private key and property list only in backend environment variables." },
                        { number: "4", title: "Automatic reports", text: "CP will cache and merge clicks, impressions, CTR, positions, queries and pages." },
                      ].map((step) => (
                        <Grid item xs={12} sm={6} key={step.number}>
                          <Box sx={{ display: "flex", gap: 1.5, p: 2, height: "100%", border: "1px solid #e2e8f0", borderRadius: 2.5, bgcolor: "#fbfdff" }}>
                            <Box sx={{ width: 34, height: 34, flexShrink: 0, display: "grid", placeItems: "center", borderRadius: "50%", bgcolor: colors.navy, color: "white", fontWeight: 900 }}>{step.number}</Box>
                            <Box>
                              <Typography sx={{ color: colors.navy, fontWeight: 900 }}>{step.title}</Typography>
                              <Typography variant="body2" sx={{ color: colors.muted, mt: 0.4, lineHeight: 1.6 }}>{step.text}</Typography>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                    {report.seo.missing?.length ? (
                      <Box sx={{ mt: 2.5 }}>
                        <Typography variant="overline" sx={{ color: colors.muted, fontWeight: 900 }}>Missing backend variables</Typography>
                        <Stack direction="row" flexWrap="wrap" gap={1}>
                          {report.seo.missing.map((variable) => <Chip key={variable} label={variable} size="small" sx={{ fontFamily: "monospace" }} />)}
                        </Stack>
                      </Box>
                    ) : null}
                  </SectionCard>
                </Grid>
              )}

              {report.seo.configured && report.seo.status === "error" && (
                <Grid item xs={12}>
                  <Alert severity="error">
                    <Typography fontWeight={900}>Google Search Console could not be reached.</Typography>
                    <Typography variant="body2">{report.seo.message || "Verify the service account and property permissions."}</Typography>
                  </Alert>
                </Grid>
              )}

              {report.seo.status === "connected" && report.seo.summary && (
                <>
                  {(report.seo.warning || report.seo.stale) && (
                    <Grid item xs={12}>
                      <Alert severity="warning">
                        Cached SEO data is being shown because Google could not be refreshed. {report.seo.warning}
                      </Alert>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "stretch", md: "center" }} spacing={1.5}>
                      <Box>
                        <Typography sx={{ color: colors.navy, fontWeight: 900, fontSize: "1.1rem" }}>Google organic search</Typography>
                        <Typography variant="body2" sx={{ color: colors.muted }}>
                          Finalized Search Console data{report.seo.dataThrough ? ` through ${new Date(`${report.seo.dataThrough}T12:00:00Z`).toLocaleDateString("fr-BE")}` : ""}.
                        </Typography>
                      </Box>
                      <Stack direction="row" flexWrap="wrap" gap={1}>
                        <Chip size="small" label={report.seo.cached ? "Cached" : "Fresh"} color={report.seo.cached ? "default" : "success"} />
                        {report.seo.fetchedAt && <Chip size="small" label={`Updated ${new Date(report.seo.fetchedAt).toLocaleString("fr-BE")}`} variant="outlined" />}
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MetricCard title="Google clicks" value={formatNumber(report.seo.summary.clicks)} subtitle="Organic visits from Google" icon={<Mouse />} color={colors.blue} />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MetricCard title="Impressions" value={formatCompactNumber(report.seo.summary.impressions)} subtitle="Appearances in Google results" icon={<Visibility />} color={colors.gold} />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MetricCard title="Google CTR" value={`${report.seo.summary.ctr}%`} subtitle="Clicks divided by impressions" icon={<AdsClick />} color={colors.green} />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <MetricCard title="Average position" value={report.seo.summary.position.toFixed(1)} subtitle="Lower is better" icon={<ManageSearch />} color={colors.violet} />
                  </Grid>

                  <Grid item xs={12}>
                    <SectionCard title="Google visibility over time" subtitle="Daily organic clicks and search impressions">
                      {report.seo.timeline?.length ? (
                        <Box sx={{ height: { xs: 285, md: 380 } }}><Line data={seoTimelineData} options={chartOptions} /></Box>
                      ) : <EmptyState label="No finalized Google Search data is available for this period." />}
                    </SectionCard>
                  </Grid>

                  <Grid item xs={12} lg={6}>
                    <SectionCard title="Search queries" subtitle="What people typed before seeing CP on Google">
                      {report.seo.queries?.length ? (
                        <TableContainer sx={{ maxHeight: 520 }}>
                          <Table stickyHeader size="small" sx={{ minWidth: 600 }}>
                            <TableHead><TableRow><TableCell>Query</TableCell><TableCell align="right">Clicks</TableCell><TableCell align="right">Impressions</TableCell><TableCell align="right">CTR</TableCell><TableCell align="right">Position</TableCell></TableRow></TableHead>
                            <TableBody>{report.seo.queries.map((item) => <TableRow key={item.name} hover><TableCell sx={{ color: colors.navy, fontWeight: 700 }}>{item.name}</TableCell><TableCell align="right">{formatNumber(item.clicks)}</TableCell><TableCell align="right">{formatNumber(item.impressions)}</TableCell><TableCell align="right">{item.ctr}%</TableCell><TableCell align="right">{item.position.toFixed(1)}</TableCell></TableRow>)}</TableBody>
                          </Table>
                        </TableContainer>
                      ) : <EmptyState label="Google may hide low-volume queries for privacy, or no data exists yet." />}
                    </SectionCard>
                  </Grid>

                  <Grid item xs={12} lg={6}>
                    <SectionCard title="Google landing pages" subtitle="Pages receiving organic visibility">
                      {report.seo.pages?.length ? (
                        <TableContainer sx={{ maxHeight: 520 }}>
                          <Table stickyHeader size="small" sx={{ minWidth: 620 }}>
                            <TableHead><TableRow><TableCell>Page</TableCell><TableCell align="right">Clicks</TableCell><TableCell align="right">Impressions</TableCell><TableCell align="right">CTR</TableCell><TableCell align="right">Position</TableCell></TableRow></TableHead>
                            <TableBody>{report.seo.pages.map((item) => <TableRow key={item.name} hover><TableCell sx={{ color: colors.navy, fontWeight: 700, maxWidth: 290, wordBreak: "break-word" }}>{item.name}</TableCell><TableCell align="right">{formatNumber(item.clicks)}</TableCell><TableCell align="right">{formatNumber(item.impressions)}</TableCell><TableCell align="right">{item.ctr}%</TableCell><TableCell align="right">{item.position.toFixed(1)}</TableCell></TableRow>)}</TableBody>
                          </Table>
                        </TableContainer>
                      ) : <EmptyState />}
                    </SectionCard>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <SectionCard title="Search countries" subtitle="Organic Google visibility by country">
                      {report.seo.countries?.length ? (
                        <TableContainer><Table size="small"><TableHead><TableRow><TableCell>Country</TableCell><TableCell align="right">Clicks</TableCell><TableCell align="right">Impressions</TableCell><TableCell align="right">Position</TableCell></TableRow></TableHead><TableBody>{report.seo.countries.slice(0, 12).map((item) => <TableRow key={item.name}><TableCell sx={{ fontWeight: 800 }}>{item.name.toUpperCase()}</TableCell><TableCell align="right">{formatNumber(item.clicks)}</TableCell><TableCell align="right">{formatNumber(item.impressions)}</TableCell><TableCell align="right">{item.position.toFixed(1)}</TableCell></TableRow>)}</TableBody></Table></TableContainer>
                      ) : <EmptyState />}
                    </SectionCard>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <SectionCard title="Google devices" subtitle="Search performance by device">
                      {report.seo.devices?.length ? (
                        <TableContainer><Table size="small"><TableHead><TableRow><TableCell>Device</TableCell><TableCell align="right">Clicks</TableCell><TableCell align="right">Impressions</TableCell><TableCell align="right">CTR</TableCell></TableRow></TableHead><TableBody>{report.seo.devices.map((item) => <TableRow key={item.name}><TableCell sx={{ fontWeight: 800 }}>{humanize(item.name)}</TableCell><TableCell align="right">{formatNumber(item.clicks)}</TableCell><TableCell align="right">{formatNumber(item.impressions)}</TableCell><TableCell align="right">{item.ctr}%</TableCell></TableRow>)}</TableBody></Table></TableContainer>
                      ) : <EmptyState />}
                    </SectionCard>
                  </Grid>

                  <Grid item xs={12}>
                    <SectionCard title="Connected Search Console properties" subtitle="Properties merged into this report">
                      <Stack direction="row" flexWrap="wrap" gap={1}>
                        {report.seo.properties?.map((property) => (
                          <Chip key={property.siteUrl} label={`${property.siteUrl} · ${formatNumber(property.clicks || 0)} clicks`} sx={{ fontWeight: 800 }} />
                        ))}
                      </Stack>
                    </SectionCard>
                  </Grid>
                </>
              )}
            </Grid>
          )}

          {activeTab === 4 && (
            <Grid container spacing={{ xs: 1.5, md: 2.5 }}>
              <Grid item xs={12}>
                <SectionCard
                  title="Active anomaly alerts"
                  subtitle="Adaptive checks compare the last 24 hours with CP's recent operational baseline"
                  action={(
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={evaluatingIncidents ? <CircularProgress size={15} /> : <NotificationsActive />}
                      disabled={evaluatingIncidents}
                      onClick={() => void handleEvaluateIncidents()}
                      sx={{ textTransform: "none", fontWeight: 800, flexShrink: 0 }}
                    >
                      Evaluate now
                    </Button>
                  )}
                >
                  {report.health.incidents.length ? (
                    <Stack spacing={1.25}>
                      {[...report.health.incidents]
                        .sort((left, right) => {
                          const rank = { critical: 0, warning: 1, info: 2 };
                          return rank[left.severity] - rank[right.severity];
                        })
                        .map((incident) => {
                          const incidentId = incident.id || incident._id || incident.type;
                          return (
                            <IncidentCard
                              key={incidentId}
                              incident={incident}
                              busy={incidentActionId === incidentId}
                              onStatusChange={(item, status) => void handleIncidentStatus(item, status)}
                            />
                          );
                        })}
                    </Stack>
                  ) : (
                    <Alert icon={<CheckCircle fontSize="inherit" />} severity="success">
                      No active anomaly detected. Daily monitoring remains enabled.
                    </Alert>
                  )}
                </SectionCard>
              </Grid>

              {report.health.server && (
                <>
                  <Grid item xs={12}>
                    <SectionCard
                      title="Server reliability & security"
                      subtitle="Backend measurements independent of visitor cookie consent"
                      action={<Security sx={{ color: colors.blue }} />}
                    >
                      <Grid container spacing={1.5}>
                        <Grid item xs={12} sm={6} lg={4}>
                          <MetricCard
                            title="Observed availability"
                            value={`${report.health.server.api.observedAvailability}%`}
                            subtitle={`${formatNumber(report.health.server.api.requests)} API responses observed`}
                            icon={<Speed />}
                            color={colors.green}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                          <MetricCard
                            title="API response time"
                            value={`${Math.round(report.health.server.api.averageResponseMs)} ms`}
                            subtitle={`${Math.round(report.health.server.api.maximumResponseMs)} ms slowest response`}
                            icon={<Route />}
                            color={colors.blue}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                          <MetricCard
                            title="Server errors"
                            value={formatNumber(report.health.server.api.serverErrors)}
                            subtitle={`${formatNumber(report.health.server.api.notFoundResponses)} not-found responses`}
                            comparison={report.health.server.comparison.serverErrors}
                            icon={<BugReport />}
                            color={colors.red}
                            inverseTrend
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                          <MetricCard
                            title="Failed forms"
                            value={formatNumber(report.health.server.forms.failed)}
                            subtitle={`${formatNumber(report.health.server.forms.successful)} successful submissions`}
                            comparison={report.health.server.comparison.formFailures}
                            icon={<AdsClick />}
                            color={colors.orange}
                            inverseTrend
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                          <MetricCard
                            title="Denied logins"
                            value={formatNumber(report.health.server.auth.denied)}
                            subtitle={`${formatNumber(report.health.server.auth.successful)} successful admin logins`}
                            comparison={report.health.server.comparison.authDenied}
                            icon={<Login />}
                            color={colors.violet}
                            inverseTrend
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                          <MetricCard
                            title="Spam filtered"
                            value={formatNumber(report.health.server.spam.blocked)}
                            subtitle="New messages classified by CP Mail"
                            icon={<Mail />}
                            color={colors.green}
                          />
                        </Grid>
                      </Grid>
                    </SectionCard>
                  </Grid>

                  <Grid item xs={12} lg={7}>
                    <SectionCard title="Server activity" subtitle="Requests, backend errors and denied logins by day">
                      {report.health.server.timeline.some((item) => item.requests || item.authDenied) ? (
                        <Box sx={{ height: { xs: 285, md: 350 } }}>
                          <Line data={serverTimelineData} options={chartOptions} />
                        </Box>
                      ) : <EmptyState label="Server activity will appear after this version starts collecting metrics." />}
                    </SectionCard>
                  </Grid>

                  <Grid item xs={12} lg={5}>
                    <SectionCard title="Form delivery" subtitle="Reliable server-side submission results">
                      {report.health.server.forms.byType.length ? (
                        <Stack spacing={1.5}>
                          {report.health.server.forms.byType.map((form) => {
                            const successRate = form.attempts ? Math.round((form.successful / form.attempts) * 100) : 0;
                            return (
                              <Box key={form.type} sx={{ p: 1.5, border: "1px solid #e2e8f0", borderRadius: 2 }}>
                                <Stack direction="row" justifyContent="space-between" spacing={2}>
                                  <Typography variant="body2" sx={{ color: colors.navy, fontWeight: 800 }}>{humanize(form.type)}</Typography>
                                  <Typography variant="body2" sx={{ color: form.failed ? colors.orange : colors.green, fontWeight: 900 }}>{successRate}%</Typography>
                                </Stack>
                                <Typography variant="caption" sx={{ color: colors.muted }}>
                                  {formatNumber(form.successful)} successful · {formatNumber(form.failed)} failed
                                </Typography>
                                <LinearProgress
                                  variant="determinate"
                                  value={successRate}
                                  sx={{ mt: 1, height: 7, borderRadius: 7, "& .MuiLinearProgress-bar": { bgcolor: form.failed ? colors.orange : colors.green } }}
                                />
                              </Box>
                            );
                          })}
                        </Stack>
                      ) : <EmptyState label="No public form submission has been observed yet." />}
                    </SectionCard>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <SectionCard title="Failing API routes" subtitle="Most frequent 4xx and 5xx responses">
                      {report.health.server.api.failingRoutes.length ? (
                        <TableContainer>
                          <Table size="small">
                            <TableHead><TableRow><TableCell>Route</TableCell><TableCell>Status</TableCell><TableCell align="right">Count</TableCell></TableRow></TableHead>
                            <TableBody>
                              {report.health.server.api.failingRoutes.map((item) => (
                                <TableRow key={`${item.route}-${item.status}`}>
                                  <TableCell sx={{ maxWidth: 280, wordBreak: "break-word", fontWeight: 700 }}>{item.route}</TableCell>
                                  <TableCell><Chip size="small" label={item.status} color={item.status >= 500 ? "error" : "warning"} /></TableCell>
                                  <TableCell align="right">{formatNumber(item.count)}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      ) : <Alert severity="success">No failing API route in this period.</Alert>}
                    </SectionCard>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <SectionCard title="Security signals" subtitle="Authentication, automated traffic and mail filtering">
                      <Stack spacing={1.5}>
                        <Stack direction="row" justifyContent="space-between" sx={{ py: 1, borderBottom: "1px solid #eef2f7" }}>
                          <Typography variant="body2">Admin login attempts</Typography>
                          <Typography variant="body2" fontWeight={900}>{formatNumber(report.health.server.auth.attempts)}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" sx={{ py: 1, borderBottom: "1px solid #eef2f7" }}>
                          <Typography variant="body2">Automated API requests</Typography>
                          <Typography variant="body2" fontWeight={900}>{formatNumber(report.health.server.api.botRequests)}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" sx={{ py: 1, borderBottom: "1px solid #eef2f7" }}>
                          <Typography variant="body2">Bot login attempts</Typography>
                          <Typography variant="body2" fontWeight={900}>{formatNumber(report.health.server.auth.botAttempts)}</Typography>
                        </Stack>
                        <Typography variant="overline" sx={{ color: colors.muted, fontWeight: 900 }}>Spam rules</Typography>
                        {report.health.server.spam.byRule.length ? (
                          <Stack direction="row" flexWrap="wrap" gap={1}>
                            {report.health.server.spam.byRule.map((rule) => (
                              <Chip key={rule.name} size="small" label={`${humanize(rule.name)} · ${formatNumber(rule.count)}`} />
                            ))}
                          </Stack>
                        ) : <Typography variant="body2" sx={{ color: colors.muted }}>No new spam message classified yet.</Typography>}
                        <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                          Last server metric: {report.health.server.lastMetricAt ? new Date(report.health.server.lastMetricAt).toLocaleString("fr-BE") : "not collected yet"}
                        </Typography>
                      </Stack>
                    </SectionCard>
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <SectionCard title="Core Web Vitals" subtitle="Real-user performance at the 75th percentile" action={<Speed sx={{ color: colors.green }} />}>
                  {report.performance.overall.length ? <Grid container spacing={1.5}>{report.performance.overall.map((vital) => <Grid item xs={12} sm={6} lg={4} key={vital.metric}><VitalCard vital={vital} /></Grid>)}</Grid> : <EmptyState label="Performance data appears after consenting visitors load the public website." />}
                  {report.performance.sampleLimitReached && <Alert severity="info" sx={{ mt: 2 }}>This view uses the latest 50,000 Web Vital samples in the selected period.</Alert>}
                </SectionCard>
              </Grid>
              <Grid item xs={12} lg={7}>
                <SectionCard title="Performance by device" subtitle="Mobile, desktop and tablet measurements">
                  {report.performance.byDevice.length ? <TableContainer><Table size="small"><TableHead><TableRow><TableCell>Metric</TableCell><TableCell>Device</TableCell><TableCell align="right">p75</TableCell><TableCell align="right">Samples</TableCell><TableCell align="right">Good</TableCell></TableRow></TableHead><TableBody>{report.performance.byDevice.map((vital) => <TableRow key={`${vital.metric}-${vital.device}`}><TableCell sx={{ fontWeight: 900 }}>{vital.metric}</TableCell><TableCell>{humanize(vital.device || "unknown")}</TableCell><TableCell align="right">{formatVitalValue(vital.metric, vital.p75)}</TableCell><TableCell align="right">{formatNumber(vital.samples)}</TableCell><TableCell align="right">{vital.samples ? Math.round((vital.good / vital.samples) * 100) : 0}%</TableCell></TableRow>)}</TableBody></Table></TableContainer> : <EmptyState />}
                </SectionCard>
              </Grid>
              <Grid item xs={12} lg={5}>
                <SectionCard title="Technical health" subtitle="Client/API errors and collection freshness" action={<BugReport sx={{ color: report.summary.errors ? colors.red : colors.green }} />}>
                  <Stack spacing={1.5}>
                    <Box sx={{ p: 1.5, bgcolor: "#f8fafc", borderRadius: 2 }}><Typography variant="caption" sx={{ color: colors.muted, fontWeight: 800 }}>LAST ANALYTICS EVENT</Typography><Typography variant="body2" sx={{ color: colors.navy, fontWeight: 800, mt: 0.4 }}>{report.health.lastEventAt ? new Date(report.health.lastEventAt).toLocaleString("fr-BE") : "No event received yet"}</Typography></Box>
                    {report.health.errorsByType.length ? report.health.errorsByType.map((item) => <Stack key={item.name} direction="row" justifyContent="space-between" sx={{ py: 0.75, borderBottom: "1px solid #eef2f7" }}><Typography variant="body2">{humanize(item.name)}</Typography><Chip size="small" label={formatNumber(item.count)} sx={{ bgcolor: alpha(colors.red, 0.1), color: colors.red, fontWeight: 800 }} /></Stack>) : <Alert severity="success">No tracked frontend, API or 404 errors in this period.</Alert>}
                    {report.health.apiErrorsByStatus.length > 0 && <Box><Typography variant="overline" sx={{ color: colors.muted, fontWeight: 900 }}>API status codes</Typography><Stack direction="row" flexWrap="wrap" gap={1}>{report.health.apiErrorsByStatus.map((item) => <Chip key={item.status} label={`${item.status || "Network"}: ${item.count}`} size="small" />)}</Stack></Box>}
                  </Stack>
                </SectionCard>
              </Grid>
              <Grid item xs={12}>
                <SectionCard title="Automated traffic" subtitle="Bots detected by the server and the consent-aware browser tracker">
                  {(report.health.server?.bots.length || report.health.bots.length) ? (
                    <Stack spacing={2}>
                      {report.health.server?.bots.length ? (
                        <Box>
                          <Typography variant="overline" sx={{ color: colors.muted, fontWeight: 900 }}>Server detected</Typography>
                          <Stack direction="row" flexWrap="wrap" gap={1}>
                            {report.health.server.bots.map((bot) => <Chip key={`server-${bot.name}`} label={`${humanize(bot.name)} · ${formatNumber(bot.count)}`} sx={{ bgcolor: alpha(colors.red, 0.08), color: colors.red, fontWeight: 800 }} />)}
                          </Stack>
                        </Box>
                      ) : null}
                      {report.health.bots.length ? (
                        <Box>
                          <Typography variant="overline" sx={{ color: colors.muted, fontWeight: 900 }}>Browser tracker detected</Typography>
                          <Stack direction="row" flexWrap="wrap" gap={1}>
                            {report.health.bots.map((bot) => <Chip key={`browser-${bot.name}`} label={`${humanize(bot.name)} · ${formatNumber(bot.count)}`} sx={{ bgcolor: alpha(colors.violet, 0.08), color: colors.violet, fontWeight: 800 }} />)}
                          </Stack>
                        </Box>
                      ) : null}
                    </Stack>
                  ) : <EmptyState label="No automated traffic detected in this period." />}
                </SectionCard>
              </Grid>
            </Grid>
          )}
        </>
      )}
    </Box>
  );
}
