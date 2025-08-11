import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  Grid,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Visibility, Reply, Delete, Refresh } from "@mui/icons-material";
import { toast } from "react-toastify";
import {
  getProjects,
  updateProjectStatus,
  replyToProject,
  deleteProject,
} from "../../APIs/projectForm";

interface ProjectRequest {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  projectType: string;
  deliverables: string[];
  mainGoal: string;
  audience: string[];
  stylePreference: string;
  contentElements: string[];
  budget: string;
  timeline: string;
  status: string;
  projectPurpose: string[];
  additionalInfo?: string;
  createdAt: string;
  updatedAt: string;
  isReplied?: boolean;
  replyMessage?: string;
  repliedAt?: string;
  repliedBy?: string;
}

interface ProjectsResponse {
  message: string;
  requests: ProjectRequest[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalRequests: number;
    limit: number;
  };
}

const ProjectManagement: React.FC = () => {
  const [projects, setProjects] = useState<ProjectRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectRequest | null>(
    null
  );
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [replySubject, setReplySubject] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRequests: 0,
    limit: 10,
  });

  useEffect(() => {
    fetchProjects();
  }, [currentPage, statusFilter]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response: ProjectsResponse = await getProjects(
        currentPage,
        10,
        statusFilter
      );
      setProjects(response.requests);
      setPagination(response.pagination);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch projects"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleViewProject = (project: ProjectRequest) => {
    setSelectedProject(project);
    setViewDialogOpen(true);
  };

  const handleReplyToProject = (project: ProjectRequest) => {
    setSelectedProject(project);
    setReplySubject(`Re: Your Project Inquiry - ${project.projectType}`);
    setReplyMessage("");
    setReplyDialogOpen(true);
  };

  const handleSendReply = async () => {
    if (!selectedProject || !replyMessage.trim() || !replySubject.trim()) {
      toast.error("Please fill in both subject and message");
      return;
    }

    try {
      await replyToProject(selectedProject._id, replyMessage, replySubject);
      toast.success("Reply sent successfully!");
      setReplyDialogOpen(false);
      setReplyMessage("");
      setReplySubject("");
      fetchProjects(); // Refresh the list
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send reply"
      );
    }
  };

  const handleStatusChange = async (projectId: string, newStatus: string) => {
    try {
      await updateProjectStatus(projectId, newStatus);
      toast.success("Status updated successfully!");
      fetchProjects(); // Refresh the list
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update status"
      );
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(projectId);
        toast.success("Project deleted successfully!");
        fetchProjects(); // Refresh the list
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to delete project"
        );
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box p={3}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#EEBA2B", fontWeight: "bold" }}
      >
        Project Management
      </Typography>

      {/* Controls */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Filter by Status</InputLabel>
            <Select
              value={statusFilter}
              label="Filter by Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in-review">In Review</MenuItem>
              <MenuItem value="replied">Replied</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={fetchProjects}
            fullWidth
            sx={{ height: "56px" }}
          >
            Refresh
          </Button>
        </Grid>
      </Grid>

      {/* Projects Table */}
      {loading ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Email</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Project Type</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Budget</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Status</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Date</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Actions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project._id} hover>
                    <TableCell>{project.name}</TableCell>
                    <TableCell>{project.email}</TableCell>
                    <TableCell>{project.projectType}</TableCell>
                    <TableCell>{project.budget}</TableCell>
                    <TableCell>
                      <FormControl size="small" sx={{ minWidth: 120 }}>
                        <Select
                          value={project.status}
                          onChange={(e) =>
                            handleStatusChange(project._id, e.target.value)
                          }
                        >
                          <MenuItem value="pending">Pending</MenuItem>
                          <MenuItem value="in-review">In Review</MenuItem>
                          <MenuItem value="replied">Replied</MenuItem>
                          <MenuItem value="completed">Completed</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>{formatDate(project.createdAt)}</TableCell>
                    <TableCell>
                      <Tooltip title="View Details">
                        <IconButton
                          onClick={() => handleViewProject(project)}
                          size="small"
                          sx={{ color: "#EEBA2B" }}
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Reply">
                        <IconButton
                          onClick={() => handleReplyToProject(project)}
                          size="small"
                          sx={{ color: "#1976d2" }}
                        >
                          <Reply />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => handleDeleteProject(project._id)}
                          size="small"
                          sx={{ color: "#d32f2f" }}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box display="flex" justifyContent="center">
            <Pagination
              count={pagination.totalPages}
              page={pagination.currentPage}
              onChange={(_, page) => setCurrentPage(page)}
              color="primary"
              sx={{
                "& .MuiPaginationItem-root.Mui-selected": {
                  backgroundColor: "#EEBA2B",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#D4A728",
                  },
                },
              }}
            />
          </Box>
        </>
      )}

      {/* View Project Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ backgroundColor: "#EEBA2B", color: "white" }}>
          Project Details
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {selectedProject && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Name:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {selectedProject.name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Email:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {selectedProject.email}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Phone:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {selectedProject.phone}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Company:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {selectedProject.company || "N/A"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="textSecondary">
                  Project Type:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {selectedProject.projectType}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="textSecondary">
                  Deliverables:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {selectedProject.deliverables.join(", ")}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="textSecondary">
                  Main Goal:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {selectedProject.mainGoal}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="textSecondary">
                  Target Audience:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {selectedProject.audience.join(", ")}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Budget:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {selectedProject.budget}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Timeline:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {selectedProject.timeline}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="textSecondary">
                  Additional Info:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {selectedProject.additionalInfo || "N/A"}
                </Typography>
              </Grid>
              {selectedProject.isReplied && (
                <Grid item xs={12}>
                  <Alert severity="info">
                    <Typography variant="subtitle2">Reply sent:</Typography>
                    <Typography variant="body2">
                      {selectedProject.replyMessage}
                    </Typography>
                    <Typography variant="caption">
                      Replied by {selectedProject.repliedBy} on{" "}
                      {formatDate(selectedProject.repliedAt!)}
                    </Typography>
                  </Alert>
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog
        open={replyDialogOpen}
        onClose={() => setReplyDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ backgroundColor: "#EEBA2B", color: "white" }}>
          Reply to Project Request
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Subject"
            value={replySubject}
            onChange={(e) => setReplySubject(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Reply Message"
            multiline
            rows={6}
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            margin="normal"
            placeholder="Type your reply here..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReplyDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleSendReply}
            variant="contained"
            sx={{
              backgroundColor: "#EEBA2B",
              "&:hover": {
                backgroundColor: "#D4A728",
              },
            }}
          >
            Send Reply
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectManagement;
