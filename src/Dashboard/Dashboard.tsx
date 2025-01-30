import {
    AppBar,
    Toolbar,
    Typography,
    CssBaseline,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Box,
    Button,
  } from "@mui/material";
  import { Link, Routes, Route } from "react-router-dom";
  import Analytics from "./Analytics"; // Import Analytics Page
  import Users from "./Users";
  import Blogs from "./Blogs";
  
  const drawerWidth = 240;
  
  export default function Dashboard() {
    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
  
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
          }}
        >
          <List>
            {/* Sidebar Links */}
            <ListItem component={Link} to="/dashboard">
              <ListItemText primary="📊 Dashboard" />
            </ListItem>
            <ListItem component={Link} to="/dashboard/blogs">
              <ListItemText primary="📝 Blogs" />
            </ListItem>
            <ListItem component={Link} to="/dashboard/users">
              <ListItemText primary="👥 Users" />
            </ListItem>
            <ListItem component={Link} to="/dashboard/jobs">
              <ListItemText primary="💼 Jobs" />
            </ListItem>
          </List>
        </Drawer>
  
        {/* Main Content */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          {/* App Bar */}
          <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
            <Toolbar>
              <Typography variant="h6" noWrap>
                Dashboard
              </Typography>
              <Button component={Link} to="/" color="inherit" sx={{ marginLeft: "auto" }}>
                Back to Home
              </Button>
            </Toolbar>
          </AppBar>
  
          {/* Page Content Based on Route */}
          <Box sx={{ mt: 10 }}>
            <Routes>
              <Route path="/" element={<Analytics />} />
              <Route path="blogs" element={<Typography variant="h4">
                <Blogs />
              </Typography>} />
              <Route path="users" element={<Typography variant="h4">
                <Users />
              </Typography>} />
              <Route path="jobs" element={<Typography variant="h4">💼 Jobs Page</Typography>} />
            </Routes>
          </Box>
        </Box>
      </Box>
    );
  }
  