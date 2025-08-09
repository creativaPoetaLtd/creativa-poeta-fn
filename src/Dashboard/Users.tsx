import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  People,
  PersonAdd,
  VerifiedUser,
  PersonOff,
  Email,
  Badge,
  Edit,
  Delete,
} from "@mui/icons-material";
import {
  DashboardCard,
  PageHeader,
  DataTable,
  StatusChip,
  ActionButton,
  MenuAction,
} from "./components/DashboardComponents";

// Sample Users Data
const usersData = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "User",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Moderator",
    status: "Active",
  },
  {
    id: 4,
    name: "Diana Ross",
    email: "diana@example.com",
    role: "User",
    status: "Pending",
  },
];

export default function Users() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Filtered Users
  const filteredUsers = usersData.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterStatus ? user.status === filterStatus : true)
  );

  const handleEditUser = (id: string) => {
    console.log("Edit user:", id);
    // TODO: Implement edit user functionality
  };

  const handleDeleteUser = (id: string) => {
    console.log("Delete user:", id);
    // TODO: Implement delete user functionality
  };

  const handleViewUser = (id: string) => {
    console.log("View user:", id);
    // TODO: Implement view user functionality
  };

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title="👥 Users Management"
        subtitle="Manage system users and their permissions"
        action={
          <ActionButton variant="primary" startIcon={<PersonAdd />}>
            Add New User
          </ActionButton>
        }
      />

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <DashboardCard
            title="Total Users"
            value={usersData.length.toString()}
            icon={<People />}
            trend="up"
            trendValue="5% from last month"
            color="#2196F3"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardCard
            title="Active Users"
            value={usersData
              .filter((u) => u.status === "Active")
              .length.toString()}
            icon={<VerifiedUser />}
            trend="up"
            trendValue="8% from last month"
            color="#4CAF50"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardCard
            title="Inactive Users"
            value={usersData
              .filter((u) => u.status === "Inactive")
              .length.toString()}
            icon={<PersonOff />}
            trend="down"
            trendValue="3% from last month"
            color="#FF5722"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardCard
            title="Pending Users"
            value={usersData
              .filter((u) => u.status === "Pending")
              .length.toString()}
            icon={<PersonAdd />}
            trend="neutral"
            trendValue="2 new requests"
            color="#FF9800"
          />
        </Grid>
      </Grid>

      {/* Search & Filter */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              label="Search Users"
              variant="outlined"
              size="small"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#EEBA2B" },
                  "&.Mui-focused fieldset": { borderColor: "#EEBA2B" },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#EEBA2B" },
              }}
            />
            <TextField
              select
              label="Filter by Status"
              variant="outlined"
              size="small"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              sx={{
                width: 200,
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#EEBA2B" },
                  "&.Mui-focused fieldset": { borderColor: "#EEBA2B" },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#EEBA2B" },
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </TextField>
          </Box>
        </CardContent>
      </Card>

      {/* Users Table */}
      <DataTable
        headers={["Name", "Email", "Role", "Status"]}
        hiddenFields={["id"]}
        rows={filteredUsers.map((user) => ({
          id: user.id.toString(),
          name: (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <People sx={{ fontSize: 20, color: "#EEBA2B" }} />
              <Typography variant="body2" fontWeight="medium">
                {user.name}
              </Typography>
            </Box>
          ),
          email: (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Email sx={{ fontSize: 20, color: "#EEBA2B" }} />
              <Typography variant="body2">{user.email}</Typography>
            </Box>
          ),
          role: (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Badge sx={{ fontSize: 16, color: "text.secondary" }} />
              <Typography variant="body2">{user.role}</Typography>
            </Box>
          ),
          status: (
            <StatusChip
              status={user.status.toLowerCase()}
              variant={
                user.status === "Active"
                  ? "success"
                  : user.status === "Inactive"
                  ? "error"
                  : "warning"
              }
            />
          ),
        }))}
        onView={handleViewUser}
        customActions={(row) => {
          return (
            <>
              <MenuAction
                icon={<Edit />}
                label="Edit"
                onClick={() => handleEditUser(row.id)}
                color="#EEBA2B"
              />
              <MenuAction
                icon={<Delete />}
                label="Delete"
                onClick={() => handleDeleteUser(row.id)}
                color="#ef4444"
              />
            </>
          );
        }}
        emptyMessage="No users found"
      />
    </Box>
  );
}
