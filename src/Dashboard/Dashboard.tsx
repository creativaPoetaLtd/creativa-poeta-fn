import {
  alpha,
  AppBar,
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Chip,
  CssBaseline,
  Divider,
  Drawer,
  Link as MuiLink,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ArticleIcon from "@mui/icons-material/Article";
import BusinessIcon from "@mui/icons-material/Business";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EmailIcon from "@mui/icons-material/Email";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PeopleIcon from "@mui/icons-material/People";
import SearchIcon from "@mui/icons-material/Search";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import WorkIcon from "@mui/icons-material/Work";
import { useState } from "react";
import logo from "../assets/flags/logopoeta1.png";
import { useAuth } from "../contexts/AuthContext";
import Analytics from "./Analytics";
import Blogs from "./Blogs";
import ContactQueries from "./ContactQueries";
import Emails from "./Emails";
import Jobs from "./Jobs";
import Projects from "./Projects";
import Users from "./Users";

const drawerWidth = 292;

const navigationItems = [
  {
    text: "Overview",
    icon: <DashboardIcon />,
    path: "/secure-admin-dashboard-2024",
    color: "#EEBA2B",
    section: "Pilotage",
  },
  {
    text: "Projects",
    icon: <WorkIcon />,
    path: "/secure-admin-dashboard-2024/projects",
    color: "#4CAF50",
    section: "Demandes",
  },
  {
    text: "Visibility Tests",
    icon: <SearchIcon />,
    path: "/secure-admin-dashboard-2024/visibility-tests",
    color: "#0ea5e9",
    section: "Demandes",
  },
  {
    text: "Assistance Requests",
    icon: <SupportAgentIcon />,
    path: "/secure-admin-dashboard-2024/assistance-requests",
    color: "#EEBA2B",
    section: "Demandes",
  },
  {
    text: "Contact Inbox",
    icon: <EmailIcon />,
    path: "/secure-admin-dashboard-2024/contact-queries",
    color: "#FF9800",
    section: "Demandes",
  },
  {
    text: "Emails",
    icon: <EmailIcon />,
    path: "/secure-admin-dashboard-2024/emails",
    color: "#14b8a6",
    section: "Demandes",
  },
  {
    text: "Blogs",
    icon: <ArticleIcon />,
    path: "/secure-admin-dashboard-2024/blogs",
    color: "#2196F3",
    section: "Contenu",
  },
  {
    text: "Users",
    icon: <PeopleIcon />,
    path: "/secure-admin-dashboard-2024/users",
    color: "#9C27B0",
    section: "Systeme",
  },
  {
    text: "Jobs",
    icon: <BusinessIcon />,
    path: "/secure-admin-dashboard-2024/jobs",
    color: "#F44336",
    section: "Systeme",
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const currentRole = normalizeDashboardRole(user?.role, user?.email);
  const visibleNavigationItems = navigationItems.filter((item) =>
    item.text !== "Users" || ["super_admin", "admin_0"].includes(currentRole)
  );
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

  const getCurrentPageTitle = () => {
    const currentItem = visibleNavigationItems.find((item) => location.pathname === item.path);
    return currentItem ? currentItem.text : "Overview";
  };

  const isActivePath = (path: string) => location.pathname === path;

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
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
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

        <Box
          sx={{
            mx: 2,
            mt: 2,
            p: 2,
            borderRadius: 3,
            border: "1px solid rgba(255,255,255,0.1)",
            background:
              "linear-gradient(135deg, rgba(238,186,43,0.16), rgba(255,255,255,0.045))",
          }}
        >
          <Typography sx={{ color: "#FFE533", fontWeight: 900, fontSize: 13, textTransform: "uppercase" }}>
            Aujourd'hui
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.78)", fontSize: 13, mt: 0.75, lineHeight: 1.55 }}>
            Suivez les demandes recues, les messages clients et les reponses a envoyer.
          </Typography>
        </Box>

        <List sx={{ pt: 2, px: 2 }}>
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
                  >
                    <ListItemIcon
                      sx={{
                        color: active ? item.color : "rgba(255,255,255,0.62)",
                        minWidth: 38,
                        transition: "color 0.22s ease",
                      }}
                    >
                      {item.icon}
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

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            backgroundColor: "rgba(255,255,255,0.92)",
            color: "#1e293b",
            borderBottom: "1px solid #e2e8f0",
            backdropFilter: "blur(10px)",
            zIndex: theme.zIndex.drawer - 1,
          }}
        >
          <Toolbar sx={{ minHeight: 84, px: 4 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 900, color: "#1e293b", mb: 0.5, letterSpacing: 0 }}
              >
                {getCurrentPageTitle()}
              </Typography>
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ color: "#64748b" }}>
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

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Chip
                label="Admin"
                size="small"
                sx={{
                  bgcolor: alpha("#071a33", 0.08),
                  color: "#071a33",
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
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    mr: 1,
                    backgroundColor: "#EEBA2B",
                    color: "#071a33",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                  }}
                >
                  P
                </Avatar>
                Profile
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
            mt: "84px",
            p: 4,
            background:
              "radial-gradient(circle at top right, rgba(238,186,43,0.12), transparent 32rem), #f6f8fb",
            minHeight: "calc(100vh - 84px)",
          }}
        >
          <Routes>
            <Route path="/" element={<Analytics />} />
            <Route path="projects" element={<Projects kind="projects" />} />
            <Route path="visibility-tests" element={<Projects kind="visibility" />} />
            <Route path="assistance-requests" element={<Projects kind="assistance" />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="contact-queries" element={<ContactQueries />} />
            <Route path="emails" element={<Emails />} />
            <Route path="users" element={<Users />} />
            <Route path="jobs" element={<Jobs />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}
