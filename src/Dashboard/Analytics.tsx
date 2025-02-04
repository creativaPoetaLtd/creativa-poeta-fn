import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

// Dummy Data
const userStats = {
  totalUsers: 1200,
  activeUsers: 850,
  newUsers: 150,
};

const jobsStats = {
  totalJobs: 500,
  openJobs: 120,
  closedJobs: 380,
};

const blogStats = {
  totalBlogs: 300,
  recentBlogs: 15,
};

// Chart Data
const userGrowthData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "User Growth",
      data: [10, 25, 40, 60, 80, 100],
      backgroundColor: "rgba(54, 162, 235, 0.6)",
    },
  ],
};

export default function Analytics() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        📊 Dashboard Analytics
      </Typography>

      {/* Stats Summary */}
      <Grid container spacing={3}>
        {/* Users Summary */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: "#f3f4f6" }}>
            <CardContent>
              <Typography variant="h6">👤 Total Users</Typography>
              <Typography variant="h4">{userStats.totalUsers}</Typography>
              <Typography color="text.secondary">Active: {userStats.activeUsers} | New: {userStats.newUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Jobs Summary */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: "#f3f4f6" }}>
            <CardContent>
              <Typography variant="h6">💼 Total Jobs</Typography>
              <Typography variant="h4">{jobsStats.totalJobs}</Typography>
              <Typography color="text.secondary">Open: {jobsStats.openJobs} | Closed: {jobsStats.closedJobs}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Blogs Summary */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: "#f3f4f6" }}>
            <CardContent>
              <Typography variant="h6">📝 Total Blogs</Typography>
              <Typography variant="h4">{blogStats.totalBlogs}</Typography>
              <Typography color="text.secondary">Recent: {blogStats.recentBlogs}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Box sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6">📈 User Growth</Typography>
            <Bar data={userGrowthData} />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
