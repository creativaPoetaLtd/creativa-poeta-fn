import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  alpha,
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArticleIcon from "@mui/icons-material/Article";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import EmailIcon from "@mui/icons-material/Email";
import ForumIcon from "@mui/icons-material/Forum";
import HandshakeIcon from "@mui/icons-material/Handshake";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import WorkIcon from "@mui/icons-material/Work";
import { Link } from "react-router-dom";
import { getContactSummary } from "../APIs/Contact";
import { getEmailSummary } from "../APIs/Emails";
import { getInternalMessageSummary } from "../APIs/internalMessages";
import { getReferralProgramSummary } from "../APIs/ReferralProgram";
import { getProjectSummary } from "../APIs/projectForm";
import { getAnalyticsIncidentSummary } from "../APIs/websiteAnalytics";
import { useAuth } from "../contexts/useAuth";
import { PageHeader } from "./components/DashboardComponents";

type MetricMap = Record<string, number>;

type SummaryState = {
  projects: MetricMap | null;
  partnerships: MetricMap | null;
  contacts: MetricMap | null;
  emails: MetricMap | null;
  internalMessages: MetricMap | null;
  analytics: MetricMap | null;
};

type SummaryKey = keyof SummaryState;

type QueueItem = {
  key: string;
  title: string;
  description: string;
  path: string;
  permission: string;
  value: number | null;
  assigned?: number;
  color: string;
  icon: JSX.Element;
};

const colors = {
  navy: "#071a33",
  gold: "#EEBA2B",
  blue: "#2563eb",
  cyan: "#0ea5e9",
  green: "#16a34a",
  orange: "#f59e0b",
  red: "#ef4444",
  violet: "#7c3aed",
  teal: "#0f766e",
  muted: "#64748b",
};

const emptySummaries: SummaryState = {
  projects: {},
  partnerships: {},
  contacts: {},
  emails: {},
  internalMessages: {},
  analytics: {},
};

const rootAdminEmails = ["admin@creativapoeta.com", "admin@cp.com"];

const metric = (summary: MetricMap | null, key: string) =>
  summary === null ? null : Number(summary[key] || 0);

const OverviewMetric = ({
  label,
  value,
  detail,
  color,
  icon,
  path,
}: {
  label: string;
  value: number;
  detail: string;
  color: string;
  icon: JSX.Element;
  path?: string;
}) => (
  <Paper
    {...(path ? { component: Link, to: path } : {})}
    elevation={0}
    sx={{
      display: "block",
      height: "100%",
      p: 2.25,
      border: "1px solid #e2e8f0",
      borderRadius: 3,
      color: "inherit",
      textDecoration: "none",
      transition: "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
      ...(path && {
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: `0 12px 30px ${alpha(color, 0.14)}`,
          borderColor: alpha(color, 0.4),
        },
      }),
    }}
  >
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
      <Box>
        <Typography variant="overline" sx={{ color: colors.muted, fontWeight: 900, letterSpacing: "0.07em" }}>
          {label}
        </Typography>
        <Typography sx={{ color: colors.navy, fontSize: "2rem", lineHeight: 1.1, fontWeight: 900 }}>
          {value}
        </Typography>
        <Typography variant="body2" sx={{ color: colors.muted, mt: 0.75 }}>
          {detail}
        </Typography>
      </Box>
      <Box sx={{ width: 46, height: 46, borderRadius: 2, display: "grid", placeItems: "center", bgcolor: alpha(color, 0.1), color }}>
        {icon}
      </Box>
    </Stack>
  </Paper>
);

const QueueCard = ({ item }: { item: QueueItem }) => {
  const unavailable = item.value === null;
  const needsAttention = Number(item.value || 0) > 0;

  return (
    <Paper
      component={Link}
      to={item.path}
      elevation={0}
      aria-label={`Open ${item.title}`}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        p: 2.25,
        border: "1px solid #e2e8f0",
        borderRadius: 3,
        color: "inherit",
        textDecoration: "none",
        transition: "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: `0 14px 34px ${alpha(item.color, 0.15)}`,
          borderColor: alpha(item.color, 0.45),
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1.5}>
        <Box sx={{ width: 44, height: 44, borderRadius: 2, display: "grid", placeItems: "center", bgcolor: alpha(item.color, 0.1), color: item.color }}>
          {item.icon}
        </Box>
        <Chip
          size="small"
          label={unavailable ? "Unavailable" : needsAttention ? "Needs attention" : "Clear"}
          sx={{
            fontWeight: 900,
            bgcolor: unavailable ? "#f1f5f9" : needsAttention ? alpha(colors.orange, 0.12) : alpha(colors.green, 0.1),
            color: unavailable ? colors.muted : needsAttention ? "#b45309" : colors.green,
          }}
        />
      </Stack>

      <Typography sx={{ color: colors.navy, fontWeight: 900, mt: 2 }}>{item.title}</Typography>
      <Typography sx={{ color: unavailable ? colors.muted : item.color, fontSize: "2rem", lineHeight: 1.15, fontWeight: 900, mt: 0.5 }}>
        {unavailable ? "--" : item.value}
      </Typography>
      <Typography variant="body2" sx={{ color: colors.muted, mt: 0.75, flexGrow: 1 }}>
        {item.description}
      </Typography>

      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2, pt: 1.5, borderTop: "1px solid #eef2f7" }}>
        <Typography variant="caption" sx={{ color: colors.muted, fontWeight: 800 }}>
          {item.assigned ? `${item.assigned} assigned to you` : "Open queue"}
        </Typography>
        <ArrowForwardIcon sx={{ color: item.color, fontSize: 20 }} />
      </Stack>
    </Paper>
  );
};

export default function Analytics() {
  const { user } = useAuth();
  const [summaries, setSummaries] = useState<SummaryState>(emptySummaries);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const normalizedRole = rootAdminEmails.includes((user?.email || "").trim().toLowerCase())
    ? "super_admin"
    : user?.role === "admin"
      ? "admin_0"
      : user?.role || "admin_5";
  const permissions = useMemo(() => new Set(user?.permissions || []), [user?.permissions]);
  const hasPermission = useCallback(
    (permission: string) => ["super_admin", "admin_0"].includes(normalizedRole) || permissions.has(permission),
    [normalizedRole, permissions]
  );

  const loadOverview = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    const tasks: Array<{
      key: SummaryKey;
      label: string;
      allowed: boolean;
      load: () => Promise<MetricMap>;
    }> = [
      {
        key: "projects",
        label: "project requests",
        allowed: ["requests:projects", "requests:visibility", "requests:assistance"].some(hasPermission),
        load: async () => (await getProjectSummary()).metrics,
      },
      {
        key: "partnerships",
        label: "referral program",
        allowed: hasPermission("referrals:read"),
        load: async () => (await getReferralProgramSummary()).metrics,
      },
      {
        key: "contacts",
        label: "contact inbox",
        allowed: hasPermission("contacts:read"),
        load: async () => (await getContactSummary()).metrics,
      },
      {
        key: "emails",
        label: "emails",
        allowed: hasPermission("email:read"),
        load: async () => (await getEmailSummary()).metrics,
      },
      {
        key: "internalMessages",
        label: "internal messages",
        allowed: hasPermission("internal:messages"),
        load: async () => (await getInternalMessageSummary()).metrics,
      },
      {
        key: "analytics",
        label: "website incidents",
        allowed: hasPermission("analytics:read"),
        load: async () => (await getAnalyticsIncidentSummary()).metrics as unknown as MetricMap,
      },
    ];

    const allowedTasks = tasks.filter((task) => task.allowed);
    const results = await Promise.allSettled(allowedTasks.map((task) => task.load()));
    const next: SummaryState = { ...emptySummaries };
    const nextErrors: string[] = [];

    allowedTasks.forEach((task, index) => {
      const result = results[index];
      if (result.status === "fulfilled") next[task.key] = result.value;
      else {
        next[task.key] = null;
        nextErrors.push(task.label);
      }
    });

    setSummaries(next);
    setErrors(nextErrors);
    setLoading(false);
    setRefreshing(false);
  }, [hasPermission]);

  useEffect(() => {
    void loadOverview();
  }, [loadOverview]);

  const queueItems: QueueItem[] = [
    {
      key: "projects",
      title: "Project Requests",
      description: "Project enquiries waiting for review or follow-up.",
      path: "/secure-admin-dashboard-2024/projects",
      permission: "requests:projects",
      value: metric(summaries.projects, "projects"),
      color: colors.gold,
      icon: <WorkIcon />,
    },
    {
      key: "visibility",
      title: "Visibility Tests",
      description: "Visibility audits and tests requiring attention.",
      path: "/secure-admin-dashboard-2024/visibility-tests",
      permission: "requests:visibility",
      value: metric(summaries.projects, "visibility"),
      color: colors.cyan,
      icon: <SearchIcon />,
    },
    {
      key: "assistance",
      title: "Assistance Requests",
      description: "Digital assistance requests awaiting action.",
      path: "/secure-admin-dashboard-2024/assistance-requests",
      permission: "requests:assistance",
      value: metric(summaries.projects, "assistance"),
      color: colors.blue,
      icon: <SupportAgentIcon />,
    },
    {
      key: "partnerships",
      title: "Referral & Partners",
      description: "Partner applications, referral leads and rewards requiring attention.",
      path: "/secure-admin-dashboard-2024/referral-program",
      permission: "referrals:read",
      value: metric(summaries.partnerships, "attention"),
      color: colors.violet,
      icon: <HandshakeIcon />,
    },
    {
      key: "contacts",
      title: "Contact Inbox",
      description: "Contact-form messages waiting for a response.",
      path: "/secure-admin-dashboard-2024/contact-queries",
      permission: "contacts:read",
      value: metric(summaries.contacts, "attention"),
      assigned: metric(summaries.contacts, "assignedToMe") || 0,
      color: colors.orange,
      icon: <ContactMailIcon />,
    },
    {
      key: "emails",
      title: "Emails",
      description: "New inbox messages and messages assigned to you.",
      path: "/secure-admin-dashboard-2024/emails",
      permission: "email:read",
      value: metric(summaries.emails, "attention"),
      assigned: metric(summaries.emails, "assignedToMe") || 0,
      color: colors.teal,
      icon: <EmailIcon />,
    },
    {
      key: "internal",
      title: "Internal Messages",
      description: "Unread conversations inside the CP team.",
      path: "/secure-admin-dashboard-2024/internal-messages",
      permission: "internal:messages",
      value: metric(summaries.internalMessages, "unread"),
      color: colors.violet,
      icon: <ForumIcon />,
    },
  ].filter((item) => hasPermission(item.permission));

  const attentionTotal = queueItems.reduce((total, item) => total + Number(item.value || 0), 0);
  const assignedToMe = [
    metric(summaries.projects, "assignedToMe"),
    metric(summaries.contacts, "assignedToMe"),
    metric(summaries.emails, "assignedToMe"),
  ].reduce<number>((total, value) => total + Number(value || 0), 0);
  const communicationWaiting = [
    metric(summaries.contacts, "pending"),
    metric(summaries.emails, "new"),
    metric(summaries.internalMessages, "unread"),
  ].reduce<number>((total, value) => total + Number(value || 0), 0);
  const openIncidents = Number(metric(summaries.analytics, "open") || 0);

  const quickLinks = [
    {
      title: "Website Analytics",
      description: "Audience, acquisition, SEO, conversions and health.",
      path: "/secure-admin-dashboard-2024/website-analytics",
      permission: "analytics:read",
      color: colors.cyan,
      icon: <QueryStatsIcon />,
    },
    {
      title: "Uptime Monitoring",
      description: "Open uptime guidance and the direct UptimeRobot link.",
      path: "/secure-admin-dashboard-2024/uptime-monitoring",
      permission: "analytics:read",
      color: colors.green,
      icon: <NotificationsActiveIcon />,
    },
    {
      title: "Blogs",
      description: "Create, update and manage CP blog content.",
      path: "/secure-admin-dashboard-2024/blogs",
      permission: "blogs:manage",
      color: colors.blue,
      icon: <ArticleIcon />,
    },
  ].filter((item) => hasPermission(item.permission));

  if (loading) {
    return (
      <Box>
        <PageHeader title="Admin Overview" subtitle="Loading all CP work queues..." />
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <Grid item xs={12} sm={6} lg={3} key={item}>
              <Skeleton variant="rounded" height={190} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box>
      <PageHeader
        title="Admin Overview"
        subtitle="One operational view of requests, communications, assignments and website incidents."
        action={(
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            disabled={refreshing}
            onClick={() => void loadOverview(true)}
            sx={{ bgcolor: colors.navy, textTransform: "none", fontWeight: 900, "&:hover": { bgcolor: "#12365f" } }}
          >
            {refreshing ? "Refreshing..." : "Refresh"}
          </Button>
        )}
      />

      {errors.length > 0 && (
        <Alert severity="warning" sx={{ mb: 2.5 }}>
          Some overview summaries could not be loaded: {errors.join(", ")}. Their individual pages remain accessible.
        </Alert>
      )}

      <Grid container spacing={2} sx={{ mb: 3.5 }}>
        <Grid item xs={12} sm={6} xl={3}>
          <OverviewMetric
            label="Needs attention"
            value={attentionTotal}
            detail={`Across ${queueItems.length} accessible work queues`}
            color={colors.orange}
            icon={<WarningAmberIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} xl={3}>
          <OverviewMetric
            label="Assigned to me"
            value={assignedToMe}
            detail="Open work explicitly assigned to your account"
            color={colors.blue}
            icon={<AssignmentIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} xl={3}>
          <OverviewMetric
            label="Communications waiting"
            value={communicationWaiting}
            detail="Pending contacts, new emails and unread team messages"
            color={colors.teal}
            icon={<EmailIcon />}
          />
        </Grid>
        {hasPermission("analytics:read") && (
          <Grid item xs={12} sm={6} xl={3}>
            <OverviewMetric
              label="Website incidents"
              value={openIncidents}
              detail="Open performance, health or security incidents"
              color={openIncidents > 0 ? colors.red : colors.green}
              icon={<QueryStatsIcon />}
              path="/secure-admin-dashboard-2024/website-analytics"
            />
          </Grid>
        )}
      </Grid>

      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={1} sx={{ mb: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ color: colors.navy, fontWeight: 900 }}>
            Work queues
          </Typography>
          <Typography variant="body2" sx={{ color: colors.muted, mt: 0.35 }}>
            Select any card to open the corresponding dashboard tab.
          </Typography>
        </Box>
        <Chip label={`${queueItems.length} accessible queues`} sx={{ bgcolor: alpha(colors.navy, 0.07), color: colors.navy, fontWeight: 900 }} />
      </Stack>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {queueItems.map((item) => (
          <Grid item xs={12} sm={6} lg={4} xl={3} key={item.key}>
            <QueueCard item={item} />
          </Grid>
        ))}
      </Grid>

      {quickLinks.length > 0 && (
        <Box>
          <Typography variant="h5" sx={{ color: colors.navy, fontWeight: 900, mb: 2 }}>
            Content and operations
          </Typography>
          <Grid container spacing={2}>
            {quickLinks.map((item) => (
              <Grid item xs={12} md={4} key={item.title}>
                <Paper
                  component={Link}
                  to={item.path}
                  elevation={0}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.75,
                    height: "100%",
                    p: 2,
                    border: "1px solid #e2e8f0",
                    borderRadius: 2.5,
                    color: "inherit",
                    textDecoration: "none",
                    "&:hover": { borderColor: alpha(item.color, 0.5), bgcolor: alpha(item.color, 0.035) },
                  }}
                >
                  <Box sx={{ width: 42, height: 42, flex: "0 0 auto", borderRadius: 2, display: "grid", placeItems: "center", bgcolor: alpha(item.color, 0.1), color: item.color }}>
                    {item.icon}
                  </Box>
                  <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                    <Typography sx={{ color: colors.navy, fontWeight: 900 }}>{item.title}</Typography>
                    <Typography variant="body2" sx={{ color: colors.muted }}>{item.description}</Typography>
                  </Box>
                  <ArrowForwardIcon sx={{ color: item.color }} />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}
