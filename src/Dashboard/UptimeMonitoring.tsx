import {
  Alert,
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DnsIcon from "@mui/icons-material/Dns";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PublicIcon from "@mui/icons-material/Public";

const colors = {
  navy: "#071a33",
  gold: "#EEBA2B",
  blue: "#0ea5e9",
  green: "#16a34a",
  muted: "#64748b",
};

const Section = ({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle: string;
  icon: JSX.Element;
  children: React.ReactNode;
}) => (
  <Paper
    elevation={0}
    sx={{
      height: "100%",
      p: { xs: 2, md: 2.5 },
      border: "1px solid #e2e8f0",
      borderRadius: 2.5,
    }}
  >
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
      <Box>
        <Typography sx={{ color: colors.navy, fontWeight: 900, fontSize: "1.05rem" }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: colors.muted, mt: 0.35 }}>
          {subtitle}
        </Typography>
      </Box>
      {icon}
    </Stack>
    <Box sx={{ mt: 2 }}>{children}</Box>
  </Paper>
);

export default function UptimeMonitoring({ embedded = false }: { embedded?: boolean }) {
  return (
    <Box>
      {!embedded && (
        <Box sx={{ mb: { xs: 2.5, md: 3.5 } }}>
          <Typography
            variant="h4"
            sx={{ color: colors.navy, fontWeight: 900, fontSize: { xs: "1.65rem", md: "2.125rem" } }}
          >
            Uptime Monitoring
          </Typography>
          <Typography sx={{ color: colors.muted, mt: 0.65 }}>
            External availability monitoring and a practical guide for diagnosing CP outages.
          </Typography>
        </Box>
      )}

      <Grid container spacing={{ xs: 1.5, md: 2.5 }}>
        <Grid item xs={12}>
          <Section
            title="UptimeRobot monitoring"
            subtitle="Independent availability checks performed every five minutes"
            icon={<NotificationsActiveIcon sx={{ color: colors.green, fontSize: 34 }} />}
          >
            <Alert severity="info" sx={{ mb: 2 }}>
              UptimeRobot keeps the official uptime history and sends outage alerts. CP Analytics tracks
              application errors, server activity and internal incidents. The two sources complement each
              other, but their data is not automatically synchronized.
            </Alert>
            <Button
              component="a"
              href="https://dashboard.uptimerobot.com/monitors"
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              endIcon={<OpenInNewIcon />}
              sx={{
                bgcolor: colors.navy,
                textTransform: "none",
                fontWeight: 900,
                "&:hover": { bgcolor: "#12365f" },
              }}
            >
              Open UptimeRobot monitors
            </Button>
          </Section>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Section
            title="Public website coverage"
            subtitle="CP markets and public entry points monitored in UptimeRobot"
            icon={<PublicIcon sx={{ color: colors.blue }} />}
          >
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {["Main website", "Belgium", "France", "Rwanda", "Netherlands", "www redirect"].map(
                (monitor) => <Chip key={monitor} label={monitor} size="small" sx={{ fontWeight: 800 }} />
              )}
            </Stack>
            <Typography variant="body2" sx={{ mt: 2, color: colors.muted }}>
              If one market is down, check its DNS or Netlify domain configuration. If all markets are down,
              check the main frontend deployment.
            </Typography>
          </Section>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Section
            title="Backend diagnosis"
            subtitle="Two checks distinguish an API outage from a database outage"
            icon={<DnsIcon sx={{ color: "#7c3aed" }} />}
          >
            <Stack spacing={1.5}>
              <Box sx={{ p: 1.5, border: "1px solid #e2e8f0", borderRadius: 2 }}>
                <Typography sx={{ color: colors.navy, fontWeight: 900 }}>CP - Backend API</Typography>
                <Typography variant="body2" sx={{ color: colors.muted, wordBreak: "break-all" }}>
                  /api/health/live - confirms that the deployed backend can answer.
                </Typography>
              </Box>
              <Box sx={{ p: 1.5, border: "1px solid #e2e8f0", borderRadius: 2 }}>
                <Typography sx={{ color: colors.navy, fontWeight: 900 }}>CP - Backend and database</Typography>
                <Typography variant="body2" sx={{ color: colors.muted, wordBreak: "break-all" }}>
                  /api/health/ready - confirms that both the backend and MongoDB are available.
                </Typography>
              </Box>
              <Alert severity="success">Both green means the public API and database are operational.</Alert>
            </Stack>
          </Section>
        </Grid>

        <Grid item xs={12}>
          <Section
            title="How to investigate an alert"
            subtitle="Use UptimeRobot and CP Analytics together to locate the source"
            icon={<CheckCircleIcon sx={{ color: colors.green }} />}
          >
            <Grid container spacing={1.5}>
              {[
                {
                  number: "1",
                  title: "Open UptimeRobot",
                  text: "Identify the exact website, API or database monitor that changed to Down.",
                },
                {
                  number: "2",
                  title: "Check CP Analytics",
                  text: "Open Website Analytics, then Performance & health, to review errors and incidents.",
                },
                {
                  number: "3",
                  title: "Check hosting",
                  text: "Use Netlify for the public website and Vercel for backend deployment logs.",
                },
              ].map((step) => (
                <Grid item xs={12} md={4} key={step.number}>
                  <Box sx={{ height: "100%", p: 2, border: "1px solid #e2e8f0", borderRadius: 2 }}>
                    <Chip
                      label={step.number}
                      size="small"
                      sx={{ mb: 1.25, bgcolor: colors.gold, color: colors.navy, fontWeight: 900 }}
                    />
                    <Typography sx={{ color: colors.navy, fontWeight: 900 }}>{step.title}</Typography>
                    <Typography variant="body2" sx={{ mt: 0.75, color: colors.muted }}>
                      {step.text}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Section>
        </Grid>
      </Grid>
    </Box>
  );
}
