import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  Paper,
  useTheme,
  alpha,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import {
  Link,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Analytics from "./Analytics";
import Users from "./Users";
import Blogs from "./Blogs";
import Jobs from "./Jobs";
import Projects from "./Projects";
import ContactQueries from "./ContactQueries";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WorkIcon from "@mui/icons-material/Work";
import ArticleIcon from "@mui/icons-material/Article";
import EmailIcon from "@mui/icons-material/Email";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

const drawerWidth = 280;

// Navigation items configuration
const navigationItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/secure-admin-dashboard-2024",
    color: "#EEBA2B",
  },
  {
    text: "Projects",
    icon: <WorkIcon />,
    path: "/secure-admin-dashboard-2024/projects",
    color: "#4CAF50",
  },
  {
    text: "Blogs",
    icon: <ArticleIcon />,
    path: "/secure-admin-dashboard-2024/blogs",
    color: "#2196F3",
  },
  {
    text: "Contact Queries",
    icon: <EmailIcon />,
    path: "/secure-admin-dashboard-2024/contact-queries",
    color: "#FF9800",
  },
  {
    text: "Users",
    icon: <PeopleIcon />,
    path: "/secure-admin-dashboard-2024/users",
    color: "#9C27B0",
  },
  {
    text: "Jobs",
    icon: <BusinessIcon />,
    path: "/secure-admin-dashboard-2024/jobs",
    color: "#F44336",
  },
];

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleLogout = () => {
    logout(); // Use AuthContext logout method
    handleMenuClose();
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleHomeNavigation = () => {
    navigate("/");
    handleMenuClose();
  };

  // Get current page title for breadcrumbs
  const getCurrentPageTitle = () => {
    const currentItem = navigationItems.find(
      (item) => location.pathname === item.path
    );
    return currentItem ? currentItem.text : "Dashboard";
  };

  // Check if current path is active
  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Box
      sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc" }}
    >
      <CssBaseline />

      {/* Enhanced Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#1e293b",
            color: "white",
            borderRight: "none",
            boxShadow: "4px 0 12px rgba(0,0,0,0.15)",
          },
        }}
      >
        {/* Sidebar Header */}
        <Box
          sx={{
            p: 3,
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#EEBA2B",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <DashboardIcon sx={{ fontSize: 32 }} />
            Creativa Admin
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.7)", mt: 0.5 }}
          >
            Management Portal
          </Typography>
        </Box>

        {/* Navigation Menu */}
        <List sx={{ pt: 2, px: 2 }}>
          {navigationItems.map((item) => (
            <ListItem
              key={item.text}
              component={Link}
              to={item.path}
              sx={{
                mb: 1,
                borderRadius: 2,
                transition: "all 0.3s ease",
                backgroundColor: isActivePath(item.path)
                  ? alpha(item.color, 0.15)
                  : "transparent",
                border: isActivePath(item.path)
                  ? `1px solid ${alpha(item.color, 0.3)}`
                  : "1px solid transparent",
                "&:hover": {
                  backgroundColor: alpha(item.color, 0.1),
                  transform: "translateX(4px)",
                  border: `1px solid ${alpha(item.color, 0.2)}`,
                },
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActivePath(item.path)
                    ? item.color
                    : "rgba(255,255,255,0.7)",
                  minWidth: 40,
                  transition: "color 0.3s ease",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: "0.95rem",
                  fontWeight: isActivePath(item.path) ? 600 : 400,
                  color: isActivePath(item.path)
                    ? "white"
                    : "rgba(255,255,255,0.8)",
                }}
              />
            </ListItem>
          ))}
        </List>

        {/* Sidebar Footer */}
        <Box
          sx={{
            mt: "auto",
            p: 2,
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* <Paper
            sx={{
              p: 2,
              backgroundColor: alpha("#EEBA2B", 0.1),
              border: `1px solid ${alpha("#EEBA2B", 0.2)}`,
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "#EEBA2B", fontWeight: 600 }}
            >
              💡 Pro Tip
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "rgba(255,255,255,0.8)", display: "block", mt: 0.5 }}
            >
              Use keyboard shortcuts for faster navigation
            </Typography>
          </Paper> */}
        </Box>
      </Drawer>

      {/* Modern Main Content Area */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Enhanced App Bar */}
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            backgroundColor: "white",
            color: "#1e293b",
            borderBottom: "1px solid #e2e8f0",
            backdropFilter: "blur(10px)",
            zIndex: theme.zIndex.drawer - 1,
          }}
        >
          <Toolbar sx={{ minHeight: 80 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#1e293b",
                  mb: 0.5,
                }}
              >
                {getCurrentPageTitle()}
              </Typography>

              {/* Breadcrumbs */}
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                sx={{ color: "#64748b" }}
              >
                <MuiLink
                  component={Link}
                  to="/secure-admin-dashboard-2024"
                  sx={{
                    color: "#64748b",
                    textDecoration: "none",
                    "&:hover": { color: "#EEBA2B" },
                    fontSize: "0.875rem",
                  }}
                >
                  <HomeIcon sx={{ mr: 0.5, fontSize: 16 }} />
                  Home
                </MuiLink>
                <Typography
                  color="#EEBA2B"
                  fontSize="0.875rem"
                  fontWeight={500}
                >
                  {getCurrentPageTitle()}
                </Typography>
              </Breadcrumbs>
            </Box>

            {/* Enhanced Admin Profile Dropdown */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                color="inherit"
                onClick={handleMenuClick}
                endIcon={
                  <ExpandMoreIcon
                    sx={{
                      transform: open ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  />
                }
                sx={{
                  background:
                    "linear-gradient(135deg, #EEBA2B 0%, #FFE533 100%)",
                  color: "#000",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #FFE533 0%, #EEBA2B 100%)",
                    transform: "translateY(-1px)",
                    boxShadow: "0 4px 12px rgba(238, 186, 43, 0.3)",
                  },
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: "bold",
                  px: 2,
                  py: 1,
                  transition: "all 0.3s ease",
                  border: "1px solid rgba(238, 186, 43, 0.2)",
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    mr: 1,
                    backgroundColor: "#fff",
                    color: "#EEBA2B",
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
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
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
                      "&:hover": {
                        backgroundColor: alpha("#EEBA2B", 0.1),
                      },
                    },
                  },
                }}
              >
                <MenuItem onClick={handleHomeNavigation}>
                  <HomeIcon sx={{ mr: 2, color: "#EEBA2B" }} />
                  Landing Page
                </MenuItem>
                <MenuItem
                  onClick={() => navigate("/secure-admin-dashboard-2024")}
                >
                  <DashboardIcon sx={{ mr: 2, color: "#EEBA2B" }} />
                  Analytics
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

        {/* Enhanced Page Content with Modern Layout */}
        <Box
          sx={{
            flexGrow: 1,
            mt: "80px", // Account for fixed AppBar
            p: 4,
            backgroundColor: "#f8fafc",
            minHeight: "calc(100vh - 80px)",
          }}
        >
          <Routes>
            <Route path="/" element={<Analytics />} />
            <Route path="projects" element={<Projects />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="contact-queries" element={<ContactQueries />} />
            <Route path="users" element={<Users />} />
            <Route path="jobs" element={<Jobs />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}
