import {
  alpha,
  AppBar,
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Chip,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Link as MuiLink,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import BusinessIcon from "@mui/icons-material/Business";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EmailIcon from "@mui/icons-material/Email";
import ForumIcon from "@mui/icons-material/Forum";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PeopleIcon from "@mui/icons-material/People";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import WorkIcon from "@mui/icons-material/Work";
import HandshakeIcon from "@mui/icons-material/Handshake";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MenuIcon from "@mui/icons-material/Menu";
import { useCallback, useEffect, useMemo, useState } from "react";
import logo from "../assets/flags/logopoeta1.png";
import { getEmailSummary } from "../APIs/Emails";
import { getInternalMessageSummary } from "../APIs/internalMessages";
import { getAdminNotificationSummary } from "../APIs/adminNotifications";
import { getContactSummary } from "../APIs/Contact";
import { getProjectSummary } from "../APIs/projectForm";
import { getReferralProgramSummary } from "../APIs/ReferralProgram";
import { getAnalyticsIncidentSummary } from "../APIs/websiteAnalytics";
import { getWhatsAppSummary } from "../APIs/WhatsApp";
import { probeProtectedArchiveAccess } from "../APIs/Trash";
import { useAuth } from "../contexts/useAuth";
import Analytics from "./Analytics";
import Blogs from "./Blogs";
import ContactQueries from "./ContactQueries";
import Emails from "./Emails";
import InternalMessages from "./InternalMessages";
import CareersDashboard from "./CareersDashboard";
import Projects from "./Projects";
import ReferralProgram from "./ReferralProgram";
import Settings from "./Settings";
import Users from "./Users";
import WebsiteAnalytics from "./WebsiteAnalytics";
import WhatsAppInbox from "./WhatsAppInbox";
import UptimeMonitoring from "./UptimeMonitoring";
import Trash from "./Trash";
import { getAdminRoleColor } from "./utils/adminRoleColors";

const drawerWidth = 292;

const navigationItems = [
  {
    text: "Overview",
    icon: <DashboardIcon />,
    path: "/secure-admin-dashboard-2024",
    color: "#EEBA2B",
    section: "Pilotage",
    permission: "dashboard:read",
  },
  {
    text: "Website Analytics",
    icon: <QueryStatsIcon />,
    path: "/secure-admin-dashboard-2024/website-analytics",
    color: "#38bdf8",
    section: "Pilotage",
    permission: "analytics:read",
  },
  {
    text: "Projects",
    icon: <WorkIcon />,
    path: "/secure-admin-dashboard-2024/projects",
    color: "#4CAF50",
    section: "Demandes",
    permission: "requests:projects",
  },
  {
    text: "CP Impact",
    icon: <VolunteerActivismIcon />,
    path: "/secure-admin-dashboard-2024/cp-impact",
    color: "#2659ff",
    section: "Demandes",
    permission: "requests:projects",
  },
  {
    text: "Visibility Tests",
    icon: <SearchIcon />,
    path: "/secure-admin-dashboard-2024/visibility-tests",
    color: "#0ea5e9",
    section: "Demandes",
    permission: "requests:visibility",
  },
  {
    text: "Assistance Requests",
    icon: <SupportAgentIcon />,
    path: "/secure-admin-dashboard-2024/assistance-requests",
    color: "#EEBA2B",
    section: "Demandes",
    permission: "requests:assistance",
  },
  {
    text: "Referral & Partners",
    icon: <HandshakeIcon />,
    path: "/secure-admin-dashboard-2024/referral-program",
    color: "#7c3aed",
    section: "Demandes",
    permission: "referrals:read",
  },
  {
    text: "Contact Inbox",
    icon: <EmailIcon />,
    path: "/secure-admin-dashboard-2024/contact-queries",
    color: "#FF9800",
    section: "Demandes",
    permission: "contacts:read",
  },
  {
    text: "WhatsApp",
    icon: <WhatsAppIcon />,
    path: "/secure-admin-dashboard-2024/whatsapp",
    color: "#25D366",
    section: "Demandes",
    permission: "whatsapp:read",
  },
  {
    text: "Emails",
    icon: <EmailIcon />,
    path: "/secure-admin-dashboard-2024/emails",
    color: "#14b8a6",
    section: "Demandes",
    permission: "email:read",
  },
  {
    text: "Internal Messages",
    icon: <ForumIcon />,
    path: "/secure-admin-dashboard-2024/internal-messages",
    color: "#8b5cf6",
    section: "Demandes",
    permission: "internal:messages",
  },
  {
    text: "Blogs",
    icon: <ArticleIcon />,
    path: "/secure-admin-dashboard-2024/blogs",
    color: "#2196F3",
    section: "Contenu",
    permission: "blogs:manage",
  },
  {
    text: "Users",
    icon: <PeopleIcon />,
    path: "/secure-admin-dashboard-2024/users",
    color: "#9C27B0",
    section: "Systeme",
    permission: "users:manage",
  },
  {
    text: "Settings",
    icon: <SettingsIcon />,
    path: "/secure-admin-dashboard-2024/settings",
    color: "#607D8B",
    section: "Systeme",
    permission: "dashboard:read",
  },
  {
    text: "Careers",
    icon: <BusinessIcon />,
    path: "/secure-admin-dashboard-2024/jobs",
    color: "#F44336",
    section: "Systeme",
    permission: "jobs:manage",
  },
];

const rootAdminEmails = ["admin@creativapoeta.com", "admin@cp.com"];

const normalizeDashboardRole = (role?: string, email?: string) => {
  if (email && rootAdminEmails.includes(email.trim().toLowerCase())) return "super_admin";
  if (role === "admin") return "admin_0";
  if (role === "editor") return "admin_2";
  if (role === "viewer") return "admin_4";
  return role || "admin_5";
};

export default function Dashboard() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isCompactDashboard = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [emailAttentionCount, setEmailAttentionCount] = useState(0);
  const [requestAttentionCounts, setRequestAttentionCounts] = useState<Record<string, number>>({});
  const [canAccessProtectedArchive, setCanAccessProtectedArchive] = useState(false);
  const [archiveAccessChecked, setArchiveAccessChecked] = useState(false);
  const menuOpen = Boolean(anchorEl);
  const currentRole = normalizeDashboardRole(user?.role, user?.email);
  const displayName = user?.name || "Admin";
  const avatarLetter = displayName.trim().charAt(0).toUpperCase() || "A";
  const roleColors = getAdminRoleColor(currentRole);
  const userPermissions = useMemo(() => new Set(user?.permissions || []), [user?.permissions]);
  const hasPermission = useCallback((permission?: string) => {
    if (!permission) return true;
    if (["super_admin", "admin_0"].includes(currentRole)) return true;
    return userPermissions.has(permission);
  }, [currentRole, userPermissions]);
  useEffect(() => {
    let mounted = true;

    if (!user) {
      setCanAccessProtectedArchive(false);
      setArchiveAccessChecked(false);
      return () => { mounted = false; };
    }

    if (currentRole === "super_admin") {
      setCanAccessProtectedArchive(true);
      setArchiveAccessChecked(true);
      return () => { mounted = false; };
    }

    setCanAccessProtectedArchive(false);
    setArchiveAccessChecked(false);
    void probeProtectedArchiveAccess()
      .then(() => {
        if (mounted) setCanAccessProtectedArchive(true);
      })
      .catch(() => {
        if (mounted) setCanAccessProtectedArchive(false);
      })
      .finally(() => {
        if (mounted) setArchiveAccessChecked(true);
      });

    return () => { mounted = false; };
  }, [currentRole, user]);

  const availableNavigationItems = canAccessProtectedArchive
    ? [
        ...navigationItems,
        {
          text: "Deleted items",
          icon: <DeleteSweepIcon />,
          path: "/secure-admin-dashboard-2024/deleted-items",
          color: "#dc2626",
          section: "Systeme",
          permission: "",
        },
      ]
    : navigationItems;

  const visibleNavigationItems = availableNavigationItems.filter((item) => {
    if (item.text === "Users" && !["super_admin", "admin_0"].includes(currentRole)) {
      return false;
    }
    return hasPermission(item.permission);
  });

  useEffect(() => {
    if (!user) return undefined;

    let mounted = true;
    const loadNavigationBadges = async () => {
      const [emailResult, projectResult, partnershipResult, contactResult, whatsAppResult, adminNotificationResult, internalMessageResult, analyticsIncidentResult] = await Promise.allSettled([
        getEmailSummary(),
        getProjectSummary(),
        hasPermission("referrals:read") ? getReferralProgramSummary() : Promise.resolve({ metrics: { attention: 0 } }),
        getContactSummary(),
        hasPermission("whatsapp:read") ? getWhatsAppSummary() : Promise.resolve({ metrics: { attention: 0 } }),
        ["super_admin", "admin_0"].includes(currentRole) ? getAdminNotificationSummary() : Promise.resolve({ metrics: { new: 0, open: 0 } }),
        hasPermission("internal:messages") ? getInternalMessageSummary() : Promise.resolve({ metrics: { unread: 0, total: 0 } }),
        hasPermission("analytics:read") ? getAnalyticsIncidentSummary() : Promise.resolve({ metrics: { open: 0, critical: 0, warning: 0 } }),
      ]);

      if (!mounted) return;

      if (emailResult.status === "fulfilled") {
        setEmailAttentionCount(Number(emailResult.value.metrics?.attention || emailResult.value.metrics?.new || 0));
      } else {
        setEmailAttentionCount(0);
      }

      const projectMetrics = projectResult.status === "fulfilled" ? projectResult.value.metrics || {} : {};
      const partnershipMetrics = partnershipResult.status === "fulfilled" ? partnershipResult.value.metrics || {} : {};
      const contactMetrics = contactResult.status === "fulfilled" ? contactResult.value.metrics || {} : {};
      const whatsAppMetrics: Record<string, number> = whatsAppResult.status === "fulfilled"
        ? whatsAppResult.value.metrics || {}
        : {};
      const adminNotificationMetrics = adminNotificationResult.status === "fulfilled" ? adminNotificationResult.value.metrics || { new: 0, open: 0 } : { new: 0, open: 0 };
      const internalMessageMetrics = internalMessageResult.status === "fulfilled" ? internalMessageResult.value.metrics || { unread: 0 } : { unread: 0 };
      const analyticsIncidentMetrics = analyticsIncidentResult.status === "fulfilled" ? analyticsIncidentResult.value.metrics || { open: 0 } : { open: 0 };
      setRequestAttentionCounts({
        "Website Analytics": Number(analyticsIncidentMetrics.open || 0),
        Projects: Number(projectMetrics.projects || 0),
        "CP Impact": Number(projectMetrics.impact || 0),
        "Visibility Tests": Number(projectMetrics.visibility || 0),
        "Assistance Requests": Number(projectMetrics.assistance || 0),
        "Referral & Partners": Number(partnershipMetrics.attention || 0),
        "Contact Inbox": Number(contactMetrics.attention || contactMetrics.pending || 0),
        WhatsApp: Number(whatsAppMetrics.attention || whatsAppMetrics.unread || 0),
        Users: Number(adminNotificationMetrics.new || adminNotificationMetrics.open || 0),
        "Internal Messages": Number(internalMessageMetrics.unread || 0),
      });
    };

    void loadNavigationBadges();
    const interval = window.setInterval(loadNavigationBadges, 60000);
    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, [user, currentRole, hasPermission]);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const handleHomeNavigation = () => {
    navigate("/");
    handleMenuClose();
  };

  const renderWithPermission = (permission: string, element: JSX.Element) =>
    hasPermission(permission) ? (
      element
    ) : (
      <Box sx={{ p: 3 }}>
        <Typography sx={{ fontWeight: 900, color: "#071a33", mb: 1 }}>
          Access reserved
        </Typography>
        <Typography sx={{ color: "#64748b" }}>
          Your account does not have access to this section.
        </Typography>
      </Box>
    );
  const getCurrentPageTitle = () => {
    const currentItem = visibleNavigationItems.find((item) => location.pathname === item.path);
    return currentItem ? currentItem.text : "Overview";
  };

  const isActivePath = (path: string) => location.pathname === path;

  const getNavigationBadgeCount = (text: string) => {
    if (text === "Emails") return emailAttentionCount;
    return requestAttentionCounts[text] || 0;
  };

  const groupedNavigation = visibleNavigationItems.reduce<Record<string, typeof navigationItems>>(
    (groups, item) => {
      groups[item.section] = groups[item.section] || [];
      groups[item.section].push(item);
      return groups;
    },
    {}
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f6f8fb" }}>
      <CssBaseline />

      <Drawer
        variant={isCompactDashboard ? "temporary" : "permanent"}
        open={isCompactDashboard ? mobileDrawerOpen : true}
        onClose={() => setMobileDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: { xs: 0, md: drawerWidth },
          flexShrink: { xs: 0, md: 0 },
          [`& .MuiDrawer-paper`]: {
            width: { xs: "min(86vw, 292px)", md: drawerWidth },
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            background:
              "linear-gradient(180deg, #06152a 0%, #071a33 48%, #020814 100%)",
            color: "white",
            borderRight: "none",
            boxShadow: "10px 0 40px rgba(2,8,20,0.28)",
          },
        }}
      >
        <Box sx={{ p: 2.5, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <Box
            component={Link}
            to="/secure-admin-dashboard-2024"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              textDecoration: "none",
            }}
          >
            <Box
              sx={{
                width: 54,
                height: 54,
                borderRadius: 2,
                display: "grid",
                placeItems: "center",
                bgcolor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(238,186,43,0.25)",
                overflow: "hidden",
              }}
            >
              <Box component="img" src={logo} alt="Creativa Poeta" sx={{ width: 120, maxWidth: "none" }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ color: "white", fontWeight: 900, lineHeight: 1 }}>
                Creativa
              </Typography>
              <Typography variant="h6" sx={{ color: "#EEBA2B", fontWeight: 900, lineHeight: 1 }}>
                Admin
              </Typography>
            </Box>
          </Box>
          <Chip
            label="Request Portal"
            size="small"
            sx={{
              mt: 2,
              bgcolor: "rgba(238,186,43,0.12)",
              color: "#FFE533",
              border: "1px solid rgba(238,186,43,0.35)",
              fontWeight: 800,
            }}
          />
        </Box>

        <List
          sx={{
            flexGrow: 1,
            minHeight: 0,
            overflowY: "auto",
            overflowX: "hidden",
            pt: 2,
            px: 2,
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255,255,255,0.22) transparent",
            "&::-webkit-scrollbar": { width: 6 },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "rgba(255,255,255,0.22)",
              borderRadius: 999,
            },
          }}
        >
          {Object.entries(groupedNavigation).map(([section, items]) => (
            <Box key={section} sx={{ mb: 2 }}>
              <Typography
                sx={{
                  px: 1.5,
                  mb: 0.75,
                  color: "rgba(255,255,255,0.42)",
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {section}
              </Typography>
              {items.map((item) => {
                const active = isActivePath(item.path);
                const badgeCount = getNavigationBadgeCount(item.text);
                return (
                  <ListItem
                    key={item.text}
                    component={Link}
                    to={item.path}
                    sx={{
                      mb: 0.75,
                      borderRadius: 2.25,
                      transition: "all 0.22s ease",
                      backgroundColor: active ? alpha(item.color, 0.16) : "transparent",
                      border: active
                        ? `1px solid ${alpha(item.color, 0.45)}`
                        : "1px solid transparent",
                      boxShadow: active ? `0 10px 30px ${alpha(item.color, 0.12)}` : "none",
                      "&:hover": {
                        backgroundColor: alpha(item.color, 0.12),
                        transform: "translateX(4px)",
                        border: `1px solid ${alpha(item.color, 0.25)}`,
                      },
                      textDecoration: "none",
                      color: "inherit",
                    }}
                    onClick={() => {
                      if (isCompactDashboard) setMobileDrawerOpen(false);
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: active ? item.color : "rgba(255,255,255,0.62)",
                        minWidth: 38,
                        transition: "color 0.22s ease",
                      }}
                    >
                      {badgeCount > 0 ? (
                        <Badge badgeContent={badgeCount} color="error" overlap="circular">
                          {item.icon}
                        </Badge>
                      ) : (
                        item.icon
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontSize: "0.92rem",
                        fontWeight: active ? 800 : 650,
                        color: active ? "white" : "rgba(255,255,255,0.76)",
                      }}
                    />
                  </ListItem>
                );
              })}
            </Box>
          ))}
        </List>

        <Box sx={{ mt: "auto", p: 2, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <Button
            fullWidth
            onClick={handleHomeNavigation}
            startIcon={<HomeIcon />}
            sx={{
              justifyContent: "flex-start",
              color: "rgba(255,255,255,0.78)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 2,
              py: 1.2,
              textTransform: "none",
              fontWeight: 800,
              "&:hover": {
                color: "#FFE533",
                borderColor: "rgba(238,186,43,0.4)",
                bgcolor: "rgba(238,186,43,0.08)",
              },
            }}
          >
            Back to website
          </Button>
        </Box>
      </Drawer>

      <Box sx={{ flexGrow: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
            ml: { xs: 0, md: `${drawerWidth}px` },
            backgroundColor: "rgba(255,255,255,0.92)",
            color: "#1e293b",
            borderBottom: "1px solid #e2e8f0",
            backdropFilter: "blur(10px)",
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar sx={{ minHeight: { xs: 68, md: 84 }, px: { xs: 1.25, sm: 2.5, md: 4 }, gap: 1 }}>
            <IconButton
              color="inherit"
              onClick={() => setMobileDrawerOpen(true)}
              aria-label="Open dashboard navigation"
              sx={{ display: { xs: "inline-flex", md: "none" }, color: "#071a33" }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  color: "#1e293b",
                  mb: { xs: 0, md: 0.5 },
                  letterSpacing: 0,
                  fontSize: { xs: "1.25rem", sm: "1.6rem", md: "2.125rem" },
                }}
              >
                {getCurrentPageTitle()}
              </Typography>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                sx={{ color: "#64748b", display: { xs: "none", sm: "flex" } }}
              >
                <MuiLink
                  component={Link}
                  to="/secure-admin-dashboard-2024"
                  sx={{
                    color: "#64748b",
                    textDecoration: "none",
                    "&:hover": { color: "#EEBA2B" },
                    fontSize: "0.875rem",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <HomeIcon sx={{ mr: 0.5, fontSize: 16 }} />
                  Home
                </MuiLink>
                <Typography color="#071a33" fontSize="0.875rem" fontWeight={800}>
                  {getCurrentPageTitle()}
                </Typography>
              </Breadcrumbs>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, md: 2 } }}>
              <Chip
                label={displayName}
                size="small"
                sx={{
                  bgcolor: roleColors.backgroundColor,
                  color: roleColors.color,
                  borderColor: roleColors.borderColor,
                  border: `1px solid ${roleColors.borderColor}`,
                  fontWeight: 900,
                  display: { xs: "none", md: "inline-flex" },
                }}
              />
              <Button
                color="inherit"
                onClick={handleMenuClick}
                endIcon={
                  <ExpandMoreIcon
                    sx={{
                      transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  />
                }
                sx={{
                  background: "linear-gradient(135deg, #071a33 0%, #12365f 100%)",
                  color: "white",
                  "&:hover": {
                    background: "linear-gradient(135deg, #12365f 0%, #071a33 100%)",
                    transform: "translateY(-1px)",
                    boxShadow: "0 8px 22px rgba(7, 26, 51, 0.25)",
                  },
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: "bold",
                  px: 2,
                  py: 1,
                  transition: "all 0.3s ease",
                  border: "1px solid rgba(7, 26, 51, 0.2)",
                  minWidth: { xs: 50, sm: "auto" },
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    mr: 1,
                    backgroundColor: roleColors.backgroundColor,
                    color: roleColors.color,
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                  }}
                >
                  {avatarLetter}
                </Avatar>
                <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                  {displayName}
                </Box>
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                  sx: {
                    minWidth: 220,
                    mt: 1,
                    borderRadius: 2,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    border: "1px solid #e2e8f0",
                    "& .MuiMenuItem-root": {
                      borderRadius: 1,
                      mx: 1,
                      my: 0.5,
                      "&:hover": { backgroundColor: alpha("#EEBA2B", 0.1) },
                    },
                  },
                }}
              >
                <MenuItem onClick={handleHomeNavigation}>
                  <HomeIcon sx={{ mr: 2, color: "#EEBA2B" }} />
                  Website
                </MenuItem>
                <MenuItem onClick={() => navigate("/secure-admin-dashboard-2024")}>
                  <DashboardIcon sx={{ mr: 2, color: "#EEBA2B" }} />
                  Overview
                </MenuItem>
                <MenuItem onClick={() => navigate("/secure-admin-dashboard-2024/settings")}>
                  <SettingsIcon sx={{ mr: 2, color: "#EEBA2B" }} />
                  Settings
                </MenuItem>
                <Divider sx={{ my: 1 }} />
                <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                  <LogoutIcon sx={{ mr: 2 }} />
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            flexGrow: 1,
            mt: { xs: "68px", md: "84px" },
            p: { xs: 0, sm: 2, md: 4 },
            background:
              "radial-gradient(circle at top right, rgba(238,186,43,0.12), transparent 32rem), #f6f8fb",
            minHeight: { xs: "calc(100vh - 68px)", md: "calc(100vh - 84px)" },
            minWidth: 0,
            maxWidth: { xs: "100vw", md: `calc(100vw - ${drawerWidth}px)` },
            overflowX: "hidden",
          }}
        >
          <Routes>
            <Route path="/" element={renderWithPermission("dashboard:read", <Analytics />)} />
            <Route path="website-analytics" element={renderWithPermission("analytics:read", <WebsiteAnalytics />)} />
            <Route path="uptime-monitoring" element={renderWithPermission("analytics:read", <UptimeMonitoring />)} />
            <Route path="projects" element={renderWithPermission("requests:projects", <Projects kind="projects" />)} />
            <Route path="cp-impact" element={renderWithPermission("requests:projects", <Projects kind="impact" />)} />
            <Route path="visibility-tests" element={renderWithPermission("requests:visibility", <Projects kind="visibility" />)} />
            <Route path="assistance-requests" element={renderWithPermission("requests:assistance", <Projects kind="assistance" />)} />
            <Route path="referral-program" element={renderWithPermission("referrals:read", <ReferralProgram />)} />
            <Route path="partnership-requests" element={renderWithPermission("referrals:read", <ReferralProgram />)} />
            <Route path="blogs" element={renderWithPermission("blogs:manage", <Blogs />)} />
            <Route path="contact-queries" element={renderWithPermission("contacts:read", <ContactQueries />)} />
            <Route path="whatsapp" element={renderWithPermission("whatsapp:read", <WhatsAppInbox />)} />
            <Route path="emails" element={renderWithPermission("email:read", <Emails />)} />
            <Route path="internal-messages" element={renderWithPermission("internal:messages", <InternalMessages />)} />
            <Route path="users" element={renderWithPermission("users:manage", <Users />)} />
            <Route
              path="deleted-items"
              element={
                archiveAccessChecked ? (
                  canAccessProtectedArchive ? (
                    <Trash />
                  ) : (
                    <Navigate to="/secure-admin-dashboard-2024" replace />
                  )
                ) : null
              }
            />
            <Route path="settings" element={renderWithPermission("dashboard:read", <Settings />)} />
            <Route path="jobs" element={renderWithPermission("jobs:manage", <CareersDashboard />)} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}
