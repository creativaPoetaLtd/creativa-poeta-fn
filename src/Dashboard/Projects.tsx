import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import {
  Assignment,
  Business,
  Delete,
  Email,
  MarkEmailRead,
  Person,
  Phone,
  Refresh,
  Reply,
  Schedule,
  Work,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import {
  deleteProject,
  getProjectById,
  getProjects,
  ProjectRequest,
  replyToProject,
  updateProjectStatus,
} from "../APIs/projectForm";
import {
  ActionButton,
  DashboardCard,
  DataTable,
  MenuAction,
  PageHeader,
  StatusChip,
} from "./components/DashboardComponents";

const statusOptions = ["Pending", "In-Progress", "Completed", "Cancelled"];
type RequestKind = "projects" | "visibility" | "assistance";

type ProjectsProps = {
  kind?: RequestKind;
};

const requestKindCopy: Record<
  RequestKind,
  {
    title: string;
    subtitle: string;
    loading: string;
    empty: string;
    totalLabel: string;
  }
> = {
  projects: {
    title: "Project Requests",
    subtitle: "Inbox for requests submitted from the Start Project form.",
    loading: "Loading incoming project requests...",
    empty: "No project requests found",
    totalLabel: "Project Requests",
  },
  visibility: {
    title: "Visibility Tests",
    subtitle: "Inbox for visibility tests submitted from Tester ma visibilite.",
    loading: "Loading visibility tests...",
    empty: "No visibility tests found",
    totalLabel: "Visibility Tests",
  },
  assistance: {
    title: "Assistance Requests",
    subtitle: "Inbox for digital assistance, troubleshooting and setup requests.",
    loading: "Loading assistance requests...",
    empty: "No assistance requests found",
    totalLabel: "Assistance Requests",
  },
};

const getServiceType = (project: ProjectRequest) =>
  (project.serviceType || "").trim().toLowerCase();

const isVisibilityRequest = (project: ProjectRequest) => {
  const serviceType = getServiceType(project);
  const selected = (project.selectedServices || []).join(" ").toLowerCase();
  return (
    serviceType.includes("diagnostic visibilite") ||
    serviceType.includes("visibility test") ||
    selected.includes("test visibilite")
  );
};

const isAssistanceRequest = (project: ProjectRequest) => {
  const serviceType = getServiceType(project);
  const selected = (project.selectedServices || []).join(" ").toLowerCase();
  return (
    serviceType.includes("assistance numerique") ||
    serviceType.includes("digital assistance") ||
    serviceType.includes("depannage") ||
    selected.includes("depannage") ||
    selected.includes("troubleshooting")
  );
};

const matchesRequestKind = (project: ProjectRequest, kind: RequestKind) => {
  if (kind === "visibility") return isVisibilityRequest(project);
  if (kind === "assistance") return isAssistanceRequest(project);
  return !isVisibilityRequest(project) && !isAssistanceRequest(project);
};

const normalizeStatus = (status?: string, isReplied?: boolean) => {
  if (isReplied && !status) return "In-Progress";
  const normalized = (status || "Pending").toLowerCase();
  if (normalized === "in-progress" || normalized === "in progress") return "In-Progress";
  if (normalized === "completed") return "Completed";
  if (normalized === "cancelled" || normalized === "canceled") return "Cancelled";
  return "Pending";
};

const getStatusVariant = (status: string) => {
  switch (normalizeStatus(status).toLowerCase()) {
    case "completed":
      return "success";
    case "in-progress":
      return "info";
    case "cancelled":
      return "error";
    default:
      return "warning";
  }
};

const formatDate = (dateString?: string) => {
  if (!dateString) return "Unknown date";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "Unknown date";
  return date.toLocaleString("fr-BE", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getProjectDateValue = (project: ProjectRequest) => {
  const date = new Date(project.createdAt || 0);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
};

export default function Projects({ kind = "projects" }: ProjectsProps) {
  const { isAuthenticated, token } = useAuth();
  const pageCopy = requestKindCopy[kind];
  const [projects, setProjects] = useState<ProjectRequest[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceTypeFilter, setServiceTypeFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectRequest | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [replySubject, setReplySubject] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const showMessage = (message: string, severity: "success" | "error" = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!isAuthenticated || !token) {
        throw new Error("Please login to access project requests.");
      }

      const data = await getProjects(1, 100, "all");
      const receivedProjects = data.requests || data.projects || [];
      setProjects([...receivedProjects].sort((a, b) => getProjectDateValue(b) - getProjectDateValue(a)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch project requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && token) {
      void fetchProjects();
    }
  }, [isAuthenticated, token]);

  const serviceTypes = useMemo(
    () =>
      Array.from(new Set(projects
        .filter((project) => matchesRequestKind(project, kind))
        .map((project) => project.serviceType || "Not specified")))
        .filter(Boolean)
        .sort(),
    [kind, projects]
  );

  const scopedProjects = useMemo(
    () => projects.filter((project) => matchesRequestKind(project, kind)),
    [kind, projects]
  );

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return scopedProjects.filter((project) => {
      const status = normalizeStatus(project.status, project.isReplied);
      const serviceType = project.serviceType || "Not specified";
      const searchPool = [
        project.name,
        project.email,
        project.phone,
        project.company,
        serviceType,
        project.customServiceDescription,
        project.customServiceNeeds,
        project.additionalInfo,
        ...(project.selectedServices || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = !query || searchPool.includes(query);
      const matchesStatus = statusFilter === "all" || status === statusFilter;
      const matchesServiceType = serviceTypeFilter === "all" || serviceType === serviceTypeFilter;

      return matchesSearch && matchesStatus && matchesServiceType;
    });
  }, [scopedProjects, search, serviceTypeFilter, statusFilter]);

  const metrics = useMemo(() => {
    const total = scopedProjects.length;
    const pending = scopedProjects.filter((p) => normalizeStatus(p.status, p.isReplied) === "Pending").length;
    const active = scopedProjects.filter((p) => normalizeStatus(p.status, p.isReplied) === "In-Progress").length;
    const replied = scopedProjects.filter((p) => p.isReplied).length;

    return { total, pending, active, replied };
  }, [scopedProjects]);

  const handleView = async (project: ProjectRequest) => {
    try {
      const response = await getProjectById(project._id);
      const detailedProject = (response as { request?: ProjectRequest }).request ?? (response as ProjectRequest);
      setSelectedProject(detailedProject);
      setViewModalOpen(true);
    } catch (err) {
      showMessage(err instanceof Error ? err.message : "Failed to fetch project details.", "error");
    }
  };

  const handleStatusUpdate = async (projectId: string, newStatus: string) => {
    try {
      await updateProjectStatus(projectId, newStatus);
      setProjects((current) =>
        current.map((project) =>
          project._id === projectId ? { ...project, status: newStatus } : project
        )
      );
      setSelectedProject((current) =>
        current?._id === projectId ? { ...current, status: newStatus } : current
      );
      showMessage(`Status updated to ${newStatus}.`);
    } catch (err) {
      showMessage(err instanceof Error ? err.message : "Failed to update status.", "error");
    }
  };

  const handleDelete = async (projectId: string) => {
    if (!window.confirm("Delete this project request?")) return;

    try {
      await deleteProject(projectId);
      setProjects((current) => current.filter((project) => project._id !== projectId));
      setViewModalOpen(false);
      showMessage("Project request deleted.");
    } catch (err) {
      showMessage(err instanceof Error ? err.message : "Failed to delete project request.", "error");
    }
  };

  const handleReply = (project: ProjectRequest) => {
    setSelectedProject(project);
    setReplySubject(`Re: ${project.serviceType || "Project request"}`);
    setReplyMessage(
      `Bonjour ${project.name},\n\nMerci pour votre demande. Nous l'avons bien recue et nous allons revenir vers vous avec les prochaines etapes.\n\nCreativa Poeta`
    );
    setReplyModalOpen(true);
  };

  const submitReply = async () => {
    if (!selectedProject || !replySubject.trim() || !replyMessage.trim()) {
      showMessage("Subject and message are required.", "error");
      return;
    }

    try {
      setReplyLoading(true);
      await replyToProject(selectedProject._id, replyMessage, replySubject);
      await handleStatusUpdate(selectedProject._id, "In-Progress");
      setProjects((current) =>
        current.map((project) =>
          project._id === selectedProject._id
            ? { ...project, isReplied: true, replyMessage, status: "In-Progress" }
            : project
        )
      );
      setReplyModalOpen(false);
      showMessage("Reply sent.");
    } catch (err) {
      showMessage(err instanceof Error ? err.message : "Failed to send reply.", "error");
    } finally {
      setReplyLoading(false);
    }
  };

  const tableRows = filteredProjects.map((project) => {
    const status = normalizeStatus(project.status, project.isReplied);
    const serviceType = project.serviceType || "Not specified";

    return {
      id: project._id,
      Client: (
        <Box>
          <Typography fontWeight={700}>{project.name || "Unknown client"}</Typography>
          <Typography variant="caption" color="text.secondary">
            {project.email}
          </Typography>
        </Box>
      ),
      Company: project.company || "Personal request",
      Service: (
        <Chip
          label={serviceType}
          size="small"
          sx={{ bgcolor: "#071a33", color: "white", fontWeight: 700, maxWidth: 260 }}
        />
      ),
      Needs: (
        <Box sx={{ maxWidth: 360 }}>
          {(project.selectedServices || []).slice(0, 2).map((service) => (
            <Chip
              key={service}
              label={service}
              size="small"
              variant="outlined"
              sx={{ mr: 0.5, mb: 0.5, maxWidth: 220 }}
            />
          ))}
          {(project.selectedServices?.length || 0) > 2 && (
            <Chip label={`+${(project.selectedServices?.length || 0) - 2}`} size="small" />
          )}
          {!project.selectedServices?.length && (
            <Typography variant="caption" color="text.secondary">
              {project.customServiceDescription || "No specific service selected"}
            </Typography>
          )}
        </Box>
      ),
      Status: <StatusChip status={status} variant={getStatusVariant(status) as any} />,
      Date: formatDate(project.createdAt),
    };
  });

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <PageHeader title={pageCopy.title} subtitle={pageCopy.loading} />
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item}>
              <Skeleton variant="rounded" height={130} />
            </Grid>
          ))}
        </Grid>
        <Skeleton variant="rounded" height={420} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <PageHeader
        title={pageCopy.title}
        subtitle={pageCopy.subtitle}
        action={
          <ActionButton variant="secondary" startIcon={<Refresh />} onClick={fetchProjects}>
            Refresh
          </ActionButton>
        }
      />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title={pageCopy.totalLabel} value={metrics.total} icon={<Assignment />} color="#071a33" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="Pending" value={metrics.pending} icon={<Schedule />} color="#f59e0b" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="In Progress" value={metrics.active} icon={<Work />} color="#2563eb" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="Replied" value={metrics.replied} icon={<MarkEmailRead />} color="#16a34a" />
        </Grid>
      </Grid>

      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={5}>
              <TextField
                label="Search name, email, service, message..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(event) => setStatusFilter(event.target.value)}
                >
                  <MenuItem value="all">All statuses</MenuItem>
                  {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Service</InputLabel>
                <Select
                  value={serviceTypeFilter}
                  label="Service"
                  onChange={(event) => setServiceTypeFilter(event.target.value)}
                >
                  <MenuItem value="all">All services</MenuItem>
                  {serviceTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={1}>
              <Typography variant="body2" color="text.secondary">
                {filteredProjects.length} shown
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <DataTable
        headers={["Client", "Company", "Service", "Needs", "Status", "Date"]}
        hiddenFields={["id"]}
        rows={tableRows}
        onView={(id) => {
          const project = projects.find((item) => item._id === id);
          if (project) void handleView(project);
        }}
        customActions={(row) => {
          const project = projects.find((item) => item._id === row.id);
          if (!project) return null;

          return (
            <>
              <MenuAction icon={<Reply />} label="Reply" onClick={() => handleReply(project)} color="#EEBA2B" />
              <MenuAction icon={<Delete />} label="Delete" onClick={() => void handleDelete(project._id)} color="#ef4444" />
            </>
          );
        }}
        emptyMessage={pageCopy.empty}
      />

      <Dialog open={viewModalOpen} onClose={() => setViewModalOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: "#071a33", color: "white" }}>
          Project Request Details
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {selectedProject && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2.5, height: "100%" }}>
                    <Typography variant="h6" sx={{ mb: 2, color: "#071a33" }}>
                      Client
                    </Typography>
                    <Typography sx={{ display: "flex", gap: 1, mb: 1 }}>
                      <Person fontSize="small" /> {selectedProject.name}
                    </Typography>
                    <Typography sx={{ display: "flex", gap: 1, mb: 1 }}>
                      <Email fontSize="small" /> {selectedProject.email}
                    </Typography>
                    <Typography sx={{ display: "flex", gap: 1, mb: 1 }}>
                      <Phone fontSize="small" /> {selectedProject.phone || "No phone"}
                    </Typography>
                    <Typography sx={{ display: "flex", gap: 1 }}>
                      <Business fontSize="small" /> {selectedProject.company || "No company"}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2.5, height: "100%" }}>
                    <Typography variant="h6" sx={{ mb: 2, color: "#071a33" }}>
                      Request
                    </Typography>
                    <Typography fontWeight={700}>{selectedProject.serviceType || "Not specified"}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Sent: {formatDate(selectedProject.createdAt)}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <StatusChip
                        status={normalizeStatus(selectedProject.status, selectedProject.isReplied)}
                        variant={getStatusVariant(selectedProject.status || "") as any}
                      />
                    </Box>
                  </Paper>
                </Grid>
              </Grid>

              {!!selectedProject.selectedServices?.length && (
                <Paper sx={{ p: 2.5 }}>
                  <Typography variant="h6" sx={{ mb: 2, color: "#071a33" }}>
                    Selected Services
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {selectedProject.selectedServices.map((service) => (
                      <Chip key={service} label={service} variant="outlined" sx={{ borderColor: "#EEBA2B" }} />
                    ))}
                  </Box>
                </Paper>
              )}

              {[
                ["Other need", selectedProject.customServiceDescription],
                ["Context", selectedProject.customServiceNeeds],
                ["Additional info", selectedProject.additionalInfo],
                ["Reply sent", selectedProject.replyMessage],
              ]
                .filter(([, value]) => Boolean(value))
                .map(([label, value]) => (
                  <Paper key={label} sx={{ p: 2.5 }}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                      {label}
                    </Typography>
                    <Typography sx={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>{value}</Typography>
                  </Paper>
                ))}

              <Paper sx={{ p: 2.5, bgcolor: "#f8fafc" }}>
                <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                  Update status
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {statusOptions.map((status) => (
                    <ActionButton
                      key={status}
                      size="small"
                      variant={normalizeStatus(selectedProject.status, selectedProject.isReplied) === status ? "primary" : "secondary"}
                      onClick={() => void handleStatusUpdate(selectedProject._id, status)}
                    >
                      {status}
                    </ActionButton>
                  ))}
                </Box>
              </Paper>
            </Box>
          )}
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2 }}>
          <ActionButton variant="secondary" onClick={() => setViewModalOpen(false)}>
            Close
          </ActionButton>
          {selectedProject && (
            <ActionButton variant="primary" startIcon={<Reply />} onClick={() => handleReply(selectedProject)}>
              Reply
            </ActionButton>
          )}
        </DialogActions>
      </Dialog>

      <Dialog open={replyModalOpen} onClose={() => setReplyModalOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: "#EEBA2B", color: "#071a33" }}>
          Reply to {selectedProject?.name}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            label="Subject"
            value={replySubject}
            onChange={(event) => setReplySubject(event.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Message"
            value={replyMessage}
            onChange={(event) => setReplyMessage(event.target.value)}
            fullWidth
            multiline
            rows={8}
          />
          {selectedProject && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              This email will be sent to {selectedProject.email}.
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <ActionButton variant="secondary" disabled={replyLoading} onClick={() => setReplyModalOpen(false)}>
            Cancel
          </ActionButton>
          <ActionButton variant="primary" disabled={replyLoading} onClick={() => void submitReply()}>
            {replyLoading ? "Sending..." : "Send reply"}
          </ActionButton>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
