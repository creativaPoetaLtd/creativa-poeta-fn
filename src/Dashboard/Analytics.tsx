import { Box, Grid, Paper, useTheme } from "@mui/material";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import {
  DashboardCard,
  PageHeader,
  ProgressCard,
} from "./components/DashboardComponents";
import {
  People as PeopleIcon,
  Work as WorkIcon,
  Article as ArticleIcon,
  Email as EmailIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
} from "@mui/icons-material";

Chart.register(...registerables);

// Enhanced dummy data with more realistic values
const dashboardStats = {
  users: {
    total: 1247,
    active: 892,
    new: 156,
    growth: "+12.5%",
  },
  projects: {
    total: 89,
    pending: 23,
    inProgress: 15,
    completed: 45,
    cancelled: 6,
    completion: 73.6,
  },
  blogs: {
    total: 342,
    published: 298,
    drafts: 44,
    views: 15420,
    growth: "+8.3%",
  },
  contactQueries: {
    total: 156,
    pending: 23,
    replied: 98,
    closed: 35,
    responseRate: 86.5,
  },
  jobs: {
    total: 78,
    open: 23,
    closed: 55,
    applications: 432,
  },
};

// Enhanced Chart Data with better styling
const theme = {
  primary: "#EEBA2B",
  secondary: "#4CAF50",
  tertiary: "#2196F3",
  quaternary: "#FF9800",
  error: "#F44336",
  success: "#10b981",
  warning: "#f59e0b",
};

const userGrowthData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "New Users",
      data: [45, 52, 38, 67, 73, 89, 95],
      backgroundColor: theme.primary,
      borderRadius: 6,
      borderSkipped: false,
    },
    {
      label: "Active Users",
      data: [78, 85, 92, 88, 94, 102, 108],
      backgroundColor: theme.secondary,
      borderRadius: 6,
      borderSkipped: false,
    },
  ],
};

const projectStatusData = {
  labels: ["Completed", "In Progress", "Pending", "Cancelled"],
  datasets: [
    {
      data: [45, 15, 23, 6],
      backgroundColor: [
        theme.success,
        theme.warning,
        theme.primary,
        theme.error,
      ],
      borderWidth: 0,
      hoverOffset: 8,
    },
  ],
};

const revenueData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Revenue ($)",
      data: [12400, 19000, 15600, 22100, 18900, 25300],
      borderColor: theme.primary,
      backgroundColor: `${theme.primary}20`,
      tension: 0.4,
      fill: true,
      pointBackgroundColor: theme.primary,
      pointBorderWidth: 2,
      pointRadius: 6,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        padding: 20,
        usePointStyle: true,
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        color: "#f1f5f9",
      },
    },
  },
};

export default function Analytics() {
  return (
    <Box>
      <PageHeader
        title="Dashboard Analytics"
        subtitle="Overview of your system performance and key metrics"
      />

      {/* Key Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <DashboardCard
            title="Total Users"
            value={dashboardStats.users.total.toLocaleString()}
            subtitle={`${dashboardStats.users.active} active users`}
            icon={<PeopleIcon />}
            color="#4CAF50"
            trend="up"
            trendValue={dashboardStats.users.growth}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <DashboardCard
            title="Total Projects"
            value={dashboardStats.projects.total}
            subtitle={`${dashboardStats.projects.completed} completed`}
            icon={<WorkIcon />}
            color="#2196F3"
            trend="up"
            trendValue="+5.2%"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <DashboardCard
            title="Blog Posts"
            value={dashboardStats.blogs.total}
            subtitle={`${dashboardStats.blogs.views.toLocaleString()} total views`}
            icon={<ArticleIcon />}
            color="#FF9800"
            trend="up"
            trendValue={dashboardStats.blogs.growth}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <DashboardCard
            title="Contact Queries"
            value={dashboardStats.contactQueries.total}
            subtitle={`${dashboardStats.contactQueries.responseRate}% response rate`}
            icon={<EmailIcon />}
            color="#9C27B0"
            trend="up"
            trendValue="+3.1%"
          />
        </Grid>
      </Grid>

      {/* Progress Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6} lg={3}>
          <ProgressCard
            title="Project Completion"
            current={dashboardStats.projects.completed}
            total={dashboardStats.projects.total}
            subtitle="Projects completed this quarter"
            color="#4CAF50"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <ProgressCard
            title="Query Response Rate"
            current={Math.round(
              (dashboardStats.contactQueries.replied /
                dashboardStats.contactQueries.total) *
                100
            )}
            total={100}
            subtitle="Queries responded to"
            color="#2196F3"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <ProgressCard
            title="Active Jobs"
            current={dashboardStats.jobs.open}
            total={dashboardStats.jobs.total}
            subtitle="Currently open positions"
            color="#FF9800"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <ProgressCard
            title="Published Blogs"
            current={dashboardStats.blogs.published}
            total={dashboardStats.blogs.total}
            subtitle="Published vs drafts"
            color="#9C27B0"
          />
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3}>
        {/* User Growth Chart */}
        <Grid item xs={12} lg={8}>
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
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <TrendingUpIcon sx={{ color: "#EEBA2B" }} />
                <Box
                  sx={{ fontWeight: 600, fontSize: "1.1rem", color: "#1e293b" }}
                >
                  User Growth Trends
                </Box>
              </Box>
              <Box sx={{ color: "#64748b", fontSize: "0.875rem" }}>
                Monthly user acquisition and activity patterns
              </Box>
            </Box>
            <Box sx={{ height: 300 }}>
              <Bar data={userGrowthData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>

        {/* Project Status Distribution */}
        <Grid item xs={12} lg={4}>
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
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <AssessmentIcon sx={{ color: "#EEBA2B" }} />
                <Box
                  sx={{ fontWeight: 600, fontSize: "1.1rem", color: "#1e293b" }}
                >
                  Project Status
                </Box>
              </Box>
              <Box sx={{ color: "#64748b", fontSize: "0.875rem" }}>
                Current project distribution
              </Box>
            </Box>
            <Box
              sx={{
                height: 300,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={{ width: "80%", height: "80%" }}>
                <Doughnut
                  data={projectStatusData}
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      legend: {
                        position: "bottom" as const,
                        labels: {
                          padding: 15,
                          usePointStyle: true,
                          font: {
                            size: 12,
                          },
                        },
                      },
                    },
                  }}
                />
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Revenue Chart */}
        <Grid item xs={12}>
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
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <TrendingUpIcon sx={{ color: "#EEBA2B" }} />
                <Box
                  sx={{ fontWeight: 600, fontSize: "1.1rem", color: "#1e293b" }}
                >
                  Revenue Performance
                </Box>
              </Box>
              <Box sx={{ color: "#64748b", fontSize: "0.875rem" }}>
                Monthly revenue trends and projections
              </Box>
            </Box>
            <Box sx={{ height: 300 }}>
              <Line data={revenueData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
