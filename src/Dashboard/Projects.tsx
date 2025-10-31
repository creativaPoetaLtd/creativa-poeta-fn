import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Card,
  CardContent,
  Alert,
  Snackbar,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from "@mui/material";
import {
  Email,
  Phone,
  Business,
  ExpandMore,
  Timeline,
  Person,
  Assignment,
  Reply,
  Refresh,
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

interface Project {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceType: string;
  selectedServices: string[];
  customServiceDescription: string;
  customServiceNeeds: string;
  serviceSpecificOtherDescription: string;
  additionalInfo: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  isReplied?: boolean;
  repliedAt?: string;
  repliedBy?: string;
  replyMessage?: string;
}

export default function Projects() {
  const { isAuthenticated, token } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [serviceTypeFilter, setServiceTypeFilter] = useState("");
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [replySubject, setReplySubject] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const showMessage = (
    message: string,
    severity: "success" | "error" = "success"
  ) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check authentication first
      if (!isAuthenticated || !token) {
        throw new Error("Please login to access this feature");
      }

      const module = await import("../APIs/projectForm");

      if (typeof module.getProjects !== "function") {
        throw new Error("getProjects function not found in module");
      }

      const data = await module.getProjects();
      setProjects(data.requests || []);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchProjects();
    }
  }, [isAuthenticated, token]);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.email.toLowerCase().includes(search.toLowerCase()) ||
      project.company.toLowerCase().includes(search.toLowerCase()) ||
      project.serviceType.toLowerCase().includes(search.toLowerCase());

    const matchesServiceType =
      serviceTypeFilter === "" || project.serviceType === serviceTypeFilter;

    return matchesSearch && matchesServiceType;
  });

  const handleView = async (project: Project) => {
    try {
      // Check authentication first
      if (!isAuthenticated || !token) {
        throw new Error("Please login to access this feature");
      }

      const module = await import("../APIs/projectForm");

      if (typeof module.getProjectById !== "function") {
        throw new Error("getProjectById function not found in module");
      }

      const detailedProject = await module.getProjectById(project._id);
      setSelectedProject(detailedProject.request || detailedProject);
      setViewModalOpen(true);
    } catch (err) {
      console.error("Error fetching project details:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch project details"
      );
    }
  };

  const handleStatusUpdate = async (projectId: string, newStatus: string) => {
    try {
      const module = await import("../APIs/projectForm");

      if (typeof module.updateProjectStatus !== "function") {
        throw new Error("updateProjectStatus function not found in module");
      }

      await module.updateProjectStatus(projectId, newStatus);
      fetchProjects(); // Refresh the list
      showMessage(`Project status updated to ${newStatus}`, "success");
    } catch (err) {
      console.error("Error updating project status:", err);
      showMessage(
        err instanceof Error ? err.message : "Failed to update project status",
        "error"
      );
    }
  };

  const handleDelete = async (projectId: string) => {
    if (
      window.confirm("Are you sure you want to delete this project request?")
    ) {
      try {
        const module = await import("../APIs/projectForm");

        if (typeof module.deleteProject !== "function") {
          throw new Error("deleteProject function not found in module");
        }

        await module.deleteProject(projectId);
        fetchProjects(); // Refresh the list
        showMessage("Project deleted successfully", "success");
      } catch (err) {
        console.error("Error deleting project:", err);
        showMessage(
          err instanceof Error ? err.message : "Failed to delete project",
          "error"
        );
      }
    }
  };

  const handleReply = (project: Project) => {
    setSelectedProject(project);
    setReplySubject(`Re: ${project.serviceType} Service Inquiry`);
    setReplyMessage(
      `Dear ${project.name},\n\nThank you for your interest in our services. I have reviewed your project requirements and would like to discuss this further.\n\nBest regards,\nCreativa Poeta Team`
    );
    setReplyModalOpen(true);
  };

  const submitReply = async () => {
    if (!selectedProject || !replySubject.trim() || !replyMessage.trim()) {
      showMessage("Please fill in all required fields", "error");
      return;
    }

    try {
      setReplyLoading(true);
      const module = await import("../APIs/projectForm");

      if (typeof module.replyToProject !== "function") {
        throw new Error("replyToProject function not found in module");
      }

      await module.replyToProject(
        selectedProject._id,
        replyMessage,
        replySubject
      );
      setReplyModalOpen(false);
      setReplySubject("");
      setReplyMessage("");
      setError(null);
      showMessage("Reply sent successfully!", "success");
      // Optionally update project status to "In-Progress" after reply
      await handleStatusUpdate(selectedProject._id, "In-Progress");
      fetchProjects(); // Refresh the list to show updated reply status
    } catch (err) {
      console.error("Error sending reply:", err);
      showMessage(
        err instanceof Error ? err.message : "Failed to send reply",
        "error"
      );
    } finally {
      setReplyLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "warning";
      case "in-progress":
        return "info";
      case "completed":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getServiceTypeColor = (serviceType: string) => {
    const colors = {
      "Graphic Design": "#e91e63",
      "Content Writing": "#4caf50",
      "Digital Marketing": "#ff9800",
      "Web Development": "#2196f3",
      Other: "#795548",
    };
    return colors[serviceType as keyof typeof colors] || "#EEBA2B";
  };

  if (loading) {
    return (
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <PageHeader
          title="Project Requests Management"
          subtitle="Loading project data..."
        />
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item}>
              <Card sx={{ textAlign: "center", bgcolor: "#f8f9fa" }}>
                <CardContent>
                  <Skeleton
                    variant="text"
                    width={80}
                    height={40}
                    sx={{ mx: "auto" }}
                  />
                  <Skeleton
                    variant="text"
                    width={120}
                    height={20}
                    sx={{ mx: "auto" }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mb: 3 }}>
          <Skeleton variant="rectangular" height={56} sx={{ mb: 2 }} />
        </Box>
        <Skeleton variant="rectangular" height={400} />
      </Box>
    );
  }

  if (error) return <Typography color="error">Error: {error}</Typography>;

  // Calculate metrics for dashboard cards
  const totalProjects = projects.length;
  const repliedProjects = projects.filter((p) => p.isReplied).length;
  const pendingProjects = projects.filter((p) => p.status === "Pending").length;
  const completedProjects = projects.filter(
    (p) => p.status === "Completed"
  ).length;

  // Calculate trends (mock data for demonstration)
  const totalTrend = "up" as const;
  const repliedTrend = "up" as const;
  const pendingTrend = "down" as const;
  const completedTrend = "up" as const;

  // Prepare table data for DataTable component
  const tableHeaders = [
    "Client Name",
    "Company",
    "Service Type",
    "Services",
    "Status",
    "Created",
  ];

  const tableRows = filteredProjects.map((project) => ({
    id: project._id,
    "Client Name": (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Person fontSize="small" />
        {project.name}
      </Box>
    ),
    Company: (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Business fontSize="small" />
        {project.company || "N/A"}
      </Box>
    ),
    "Service Type": (
      <Chip
        label={project.serviceType}
        size="small"
        sx={{
          bgcolor: getServiceTypeColor(project.serviceType),
          color: "white",
          fontWeight: "bold",
          maxWidth: "200px",
        }}
      />
    ),
    Services: (
      <Box sx={{ maxWidth: "250px" }}>
        {project.selectedServices && project.selectedServices.length > 0 ? (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {project.selectedServices.slice(0, 2).map((service, index) => (
              <Chip
                key={index}
                label={
                  service.length > 30
                    ? service.substring(0, 30) + "..."
                    : service
                }
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.7rem", height: "20px" }}
              />
            ))}
            {project.selectedServices.length > 2 && (
              <Chip
                label={`+${project.selectedServices.length - 2} more`}
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.7rem", height: "20px" }}
              />
            )}
          </Box>
        ) : project.customServiceDescription ? (
          <Typography variant="caption" sx={{ fontStyle: "italic" }}>
            Custom: {project.customServiceDescription.substring(0, 50)}...
          </Typography>
        ) : (
          <Typography variant="caption" color="textSecondary">
            No services specified
          </Typography>
        )}
      </Box>
    ),
    Status: (
      <StatusChip
        status={project.isReplied ? "Replied" : "Pending"}
        variant={project.isReplied ? "success" : "warning"}
      />
    ),
    Created: formatDate(project.createdAt),
  }));

  const handleViewProject = (id: string) => {
    const project = projects.find((p) => p._id === id);
    if (project) handleView(project);
  };

  const customActions = (row: any) => {
    const project = projects.find((p) => p._id === row.id);
    if (!project) return null;

    return (
      <>
        <MenuAction
          icon={<Reply />}
          label={project.isReplied ? "Replied" : "Reply"}
          onClick={() => handleReply(project)}
          disabled={project.isReplied}
          color="#EEBA2B"
        />
        <MenuAction
          icon={<Delete />}
          label="Delete"
          onClick={() => handleDelete(project._id)}
          color="#ef4444"
        />
      </>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title="Project Requests Management"
        subtitle="Manage client project requests and communications"
        action={
          <ActionButton
            variant="secondary"
            startIcon={<Refresh />}
            onClick={fetchProjects}
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh"}
          </ActionButton>
        }
      />

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Total Projects"
            value={totalProjects.toString()}
            icon={<Assignment />}
            trend={totalTrend}
            trendValue="+8.2%"
            color="#EEBA2B"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Replied"
            value={repliedProjects.toString()}
            icon={<Reply />}
            trend={repliedTrend}
            trendValue="+12.5%"
            color="#4caf50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Pending"
            value={pendingProjects.toString()}
            icon={<Timeline />}
            trend={pendingTrend}
            trendValue="-3.1%"
            color="#ff9800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Completed"
            value={completedProjects.toString()}
            icon={<Assignment />}
            trend={completedTrend}
            trendValue="+15.3%"
            color="#2196f3"
          />
        </Grid>
      </Grid>

      {/* Search and Filter Controls */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <TextField
              label="Search projects..."
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                flexGrow: 1,
                minWidth: 250,
                maxWidth: 400,
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#EEBA2B" },
                  "&.Mui-focused fieldset": { borderColor: "#EEBA2B" },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#EEBA2B" },
              }}
            />
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Filter by Type</InputLabel>
              <Select
                value={serviceTypeFilter}
                label="Filter by Type"
                onChange={(e) => setServiceTypeFilter(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "#EEBA2B" },
                    "&.Mui-focused fieldset": { borderColor: "#EEBA2B" },
                  },
                }}
              >
                <MenuItem value="">All Types</MenuItem>
                {Array.from(new Set(projects.map((p) => p.serviceType)))
                  .sort()
                  .map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              Total: {filteredProjects.length} project
              {filteredProjects.length !== 1 ? "s" : ""}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Projects Table */}
      <DataTable
        headers={tableHeaders}
        hiddenFields={["id"]}
        rows={tableRows}
        onView={handleViewProject}
        customActions={customActions}
        emptyMessage="No projects found"
      />

      {/* Project Details Modal */}
      <Dialog
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: "#EEBA2B", color: "black" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Assignment />
            Project Request Details
          </Box>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {selectedProject && (
            <Grid container spacing={3}>
              {/* Client Information */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, color: "#EEBA2B" }}>
                      👤 Client Information
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Person fontSize="small" />
                        <Typography>
                          <strong>Name:</strong> {selectedProject.name}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Email fontSize="small" />
                        <Typography>
                          <strong>Email:</strong> {selectedProject.email}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Phone fontSize="small" />
                        <Typography>
                          <strong>Phone:</strong> {selectedProject.phone}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Business fontSize="small" />
                        <Typography>
                          <strong>Company:</strong>{" "}
                          {selectedProject.company || "N/A"}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Project Overview */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, color: "#EEBA2B" }}>
                      📋 Service Overview
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Typography>
                        <strong>Service Type:</strong>{" "}
                        {selectedProject.serviceType}
                      </Typography>
                      {selectedProject.customServiceDescription && (
                        <Typography>
                          <strong>Custom Service:</strong>{" "}
                          {selectedProject.customServiceDescription}
                        </Typography>
                      )}
                      {selectedProject.customServiceNeeds && (
                        <Typography>
                          <strong>Specific Needs:</strong>{" "}
                          {selectedProject.customServiceNeeds}
                        </Typography>
                      )}
                      {selectedProject.serviceSpecificOtherDescription && (
                        <Typography>
                          <strong>Additional Requirements:</strong>{" "}
                          {selectedProject.serviceSpecificOtherDescription}
                        </Typography>
                      )}
                      <Chip
                        label={selectedProject.status}
                        color={getStatusColor(selectedProject.status) as any}
                        size="small"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Selected Services */}
              {selectedProject.selectedServices &&
                selectedProject.selectedServices.length > 0 && (
                  <Grid item xs={12}>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="h6">
                          🛠️ Selected Services (
                          {selectedProject.selectedServices.length})
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {selectedProject.selectedServices.map(
                            (service, index) => (
                              <Chip
                                key={index}
                                label={service}
                                variant="outlined"
                                sx={{
                                  borderColor: "#EEBA2B",
                                  color: "#EEBA2B",
                                }}
                              />
                            )
                          )}
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                )}

              {/* Additional Information */}
              {selectedProject.additionalInfo && (
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2, color: "#EEBA2B" }}>
                        📝 Additional Information
                      </Typography>
                      <Typography>{selectedProject.additionalInfo}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )}

              {/* Reply Information */}
              {selectedProject?.isReplied && selectedProject?.replyMessage && (
                <Grid item xs={12}>
                  <Card
                    sx={{ bgcolor: "#f8f9fa", border: "1px solid #EEBA2B" }}
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 2, color: "#EEBA2B" }}>
                        📧 Reply Information
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                        }}
                      >
                        <Typography>
                          <strong>Replied by:</strong>{" "}
                          {selectedProject?.repliedBy || "Admin"}
                        </Typography>
                        <Typography>
                          <strong>Replied on:</strong>{" "}
                          {selectedProject?.repliedAt
                            ? formatDate(selectedProject.repliedAt)
                            : "N/A"}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: "bold", mb: 1 }}
                          >
                            Reply Message:
                          </Typography>
                          <Typography
                            sx={{
                              bgcolor: "white",
                              p: 2,
                              borderRadius: 1,
                              border: "1px solid #e0e0e0",
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {selectedProject?.replyMessage}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <ActionButton
            variant="secondary"
            onClick={() => setViewModalOpen(false)}
          >
            Close
          </ActionButton>
        </DialogActions>
      </Dialog>

      {/* Reply Modal */}
      <Dialog
        open={replyModalOpen}
        onClose={() => setReplyModalOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: "#EEBA2B", color: "black" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Reply />
            Reply to {selectedProject?.name}
          </Box>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Subject"
              value={replySubject}
              onChange={(e) => setReplySubject(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Message"
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              multiline
              rows={8}
              fullWidth
              required
              placeholder="Type your reply message here..."
            />
            {selectedProject && (
              <Typography variant="body2" color="text.secondary">
                This email will be sent to: {selectedProject.email}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <ActionButton
            variant="secondary"
            onClick={() => setReplyModalOpen(false)}
            disabled={replyLoading}
          >
            Cancel
          </ActionButton>
          <ActionButton
            variant="primary"
            onClick={submitReply}
            disabled={replyLoading}
          >
            {replyLoading ? "Sending..." : "Send Reply"}
          </ActionButton>
        </DialogActions>
      </Dialog>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
