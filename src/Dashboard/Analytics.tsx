import { useEffect, useMemo, useState } from "react";
import { Alert, Box, Grid, Paper, Skeleton, Typography } from "@mui/material";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import {
  DashboardCard,
  PageHeader,
  ProgressCard,
} from "./components/DashboardComponents";
import {
  Assessment as AssessmentIcon,
  Email as EmailIcon,
  Inbox as InboxIcon,
  PendingActions as PendingActionsIcon,
  Work as WorkIcon,
} from "@mui/icons-material";
import { ContactQuery, getContactQueries } from "../APIs/Contact";
import { getProjects, ProjectRequest } from "../APIs/projectForm";

Chart.register(...registerables);

const theme = {
  primary: "#EEBA2B",
  slate: "#071a33",
  success: "#10b981",
  info: "#2563eb",
  warning: "#f59e0b",
  error: "#ef4444",
  muted: "#64748b",
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        padding: 18,
        usePointStyle: true,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
    },
    y: {
      beginAtZero: true,
      ticks: { precision: 0 },
      grid: { color: "#f1f5f9" },
    },
  },
};

const normalizeProjectStatus = (status?: string, isReplied?: boolean) => {
  if (isReplied && !status) return "In-Progress";
  const normalized = (status || "Pending").toLowerCase();
  if (normalized === "completed") return "Completed";
  if (normalized === "cancelled" || normalized === "canceled") return "Cancelled";
  if (normalized === "in-progress" || normalized === "in progress") return "In-Progress";
  return "Pending";
};

const normalizeContactStatus = (query: ContactQuery) => {
  if (query.isReplied && !query.status) return "replied";
  return (query.status || "pending").toLowerCase();
};

const monthKey = (dateString?: string) => {
  const date = new Date(dateString || "");
  if (Number.isNaN(date.getTime())) return "Unknown";
  return date.toLocaleDateString("fr-BE", { month: "short", year: "2-digit" });
};

const countByMonth = (items: Array<{ createdAt?: string }>) => {
  const buckets = new Map<string, number>();

  items.forEach((item) => {
    const key = monthKey(item.createdAt);
    buckets.set(key, (buckets.get(key) || 0) + 1);
  });

  return Array.from(buckets.entries()).slice(-6);
};

export default function Analytics() {
  const [projects, setProjects] = useState<ProjectRequest[]>([]);
  const [contacts, setContacts] = useState<ContactQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [projectData, contactData] = await Promise.all([
        getProjects(1, 100, "all"),
        getContactQueries(1, 100, "all"),
      ]);

      setProjects(projectData.requests || projectData.projects || []);
      setContacts(contactData.queries || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchDashboardData();
  }, []);

  const metrics = useMemo(() => {
    const projectStatuses = projects.map((project) =>
      normalizeProjectStatus(project.status, project.isReplied)
    );
    const contactStatuses = contacts.map(normalizeContactStatus);
    const totalIncoming = projects.length + contacts.length;
    const replied =
      projects.filter((project) => project.isReplied).length +
      contacts.filter((query) => normalizeContactStatus(query) === "replied").length;
    const pending =
      projectStatuses.filter((status) => status === "Pending").length +
      contactStatuses.filter((status) => status === "pending").length;
    const active = projectStatuses.filter((status) => status === "In-Progress").length;
    const responseRate = totalIncoming > 0 ? Math.round((replied / totalIncoming) * 100) : 0;

    return {
      totalIncoming,
      projectTotal: projects.length,
      contactTotal: contacts.length,
      pending,
      active,
      replied,
      responseRate,
      completed: projectStatuses.filter((status) => status === "Completed").length,
      cancelled: projectStatuses.filter((status) => status === "Cancelled").length,
      closedContacts: contactStatuses.filter((status) => status === "closed").length,
    };
  }, [contacts, projects]);

  const monthlyEntries = useMemo(() => {
    const projectMonths = new Map(countByMonth(projects));
    const contactMonths = new Map(countByMonth(contacts));
    const keys = Array.from(new Set([...projectMonths.keys(), ...contactMonths.keys()]));

    return keys.map((key) => ({
      key,
      projects: projectMonths.get(key) || 0,
      contacts: contactMonths.get(key) || 0,
    }));
  }, [contacts, projects]);

  const incomingChartData = {
    labels: monthlyEntries.map((entry) => entry.key),
    datasets: [
      {
        label: "Project requests",
        data: monthlyEntries.map((entry) => entry.projects),
        backgroundColor: theme.primary,
        borderRadius: 6,
      },
      {
        label: "Contact messages",
        data: monthlyEntries.map((entry) => entry.contacts),
        backgroundColor: theme.info,
        borderRadius: 6,
      },
    ],
  };

  const projectStatusData = {
    labels: ["Pending", "In Progress", "Completed", "Cancelled"],
    datasets: [
      {
        data: [
          projects.filter((project) => normalizeProjectStatus(project.status, project.isReplied) === "Pending").length,
          metrics.active,
          metrics.completed,
          metrics.cancelled,
        ],
        backgroundColor: [theme.warning, theme.info, theme.success, theme.error],
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const contactStatusData = {
    labels: ["Pending", "Replied", "Closed"],
    datasets: [
      {
        data: [
          contacts.filter((query) => normalizeContactStatus(query) === "pending").length,
          contacts.filter((query) => normalizeContactStatus(query) === "replied").length,
          metrics.closedContacts,
        ],
        backgroundColor: [theme.warning, theme.success, theme.muted],
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  if (loading) {
    return (
      <Box>
        <PageHeader title="Admin Overview" subtitle="Loading live inbox metrics..." />
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} lg={3} key={item}>
              <Skeleton variant="rounded" height={140} />
            </Grid>
          ))}
        </Grid>
        <Skeleton variant="rounded" height={420} />
      </Box>
    );
  }

  return (
    <Box>
      <PageHeader
        title="Admin Overview"
        subtitle="Live view of website requests, contact messages and response activity."
      />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <DashboardCard
            title="Incoming Requests"
            value={metrics.totalIncoming}
            subtitle={`${metrics.projectTotal} projects, ${metrics.contactTotal} contacts`}
            icon={<InboxIcon />}
            color={theme.slate}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <DashboardCard
            title="Project Requests"
            value={metrics.projectTotal}
            subtitle={`${metrics.active} in progress`}
            icon={<WorkIcon />}
            color={theme.primary}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <DashboardCard
            title="Contact Messages"
            value={metrics.contactTotal}
            subtitle={`${contacts.filter((query) => normalizeContactStatus(query) === "pending").length} pending`}
            icon={<EmailIcon />}
            color={theme.info}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <DashboardCard
            title="Pending Follow-Up"
            value={metrics.pending}
            subtitle={`${metrics.replied} already replied`}
            icon={<PendingActionsIcon />}
            color={theme.warning}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6} lg={4}>
          <ProgressCard
            title="Response Rate"
            current={metrics.responseRate}
            total={100}
            subtitle="Incoming requests already replied"
            color={theme.success}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <ProgressCard
            title="Project Completion"
            current={metrics.completed}
            total={Math.max(metrics.projectTotal, 1)}
            subtitle="Completed project requests"
            color={theme.primary}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <ProgressCard
            title="Contact Closure"
            current={metrics.closedContacts}
            total={Math.max(metrics.contactTotal, 1)}
            subtitle="Contact messages closed"
            color={theme.muted}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={7}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              border: "1px solid #e2e8f0",
              height: 400,
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <AssessmentIcon sx={{ color: theme.primary }} />
                <Typography fontWeight={700} color="#1e293b">
                  Incoming Activity
                </Typography>
              </Box>
              <Typography color="#64748b" fontSize="0.875rem">
                Project requests and contact messages by month.
              </Typography>
            </Box>
            <Box sx={{ height: 300 }}>
              <Bar data={incomingChartData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={2.5}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              border: "1px solid #e2e8f0",
              height: 400,
            }}
          >
            <Typography fontWeight={700} color="#1e293b" sx={{ mb: 1 }}>
              Project Status
            </Typography>
            <Box sx={{ height: 310, display: "flex", alignItems: "center" }}>
              <Doughnut data={projectStatusData} options={{ ...chartOptions, scales: undefined }} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={2.5}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              border: "1px solid #e2e8f0",
              height: 400,
            }}
          >
            <Typography fontWeight={700} color="#1e293b" sx={{ mb: 1 }}>
              Contact Status
            </Typography>
            <Box sx={{ height: 310, display: "flex", alignItems: "center" }}>
              <Doughnut data={contactStatusData} options={{ ...chartOptions, scales: undefined }} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
