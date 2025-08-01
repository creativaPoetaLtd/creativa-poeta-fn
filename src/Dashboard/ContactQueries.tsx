import React, { useState, useEffect } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Grid,
  Typography,
  Card,
  CardContent,
  Paper,
} from "@mui/material";
import {
  Reply,
  Delete,
  Email,
  Person,
  CalendarToday,
  CheckCircle,
  Pending,
  ContactSupport,
  TrendingUp,
} from "@mui/icons-material";
import {
  getContactQueries,
  getContactQuery,
  replyToContactQuery,
  updateContactQueryStatus,
  deleteContactQuery,
} from "../APIs/Contact";
import {
  DashboardCard,
  PageHeader,
  DataTable,
  StatusChip,
  ActionButton,
} from "./components/DashboardComponents";

interface ContactQuery {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: "pending" | "replied" | "closed";
  isReplied: boolean;
  replyMessage?: string;
  repliedAt?: string;
  repliedBy?: string;
  createdAt: string;
  updatedAt: string;
}

interface ContactQueriesData {
  queries: ContactQuery[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalQueries: number;
    limit: number;
  };
}

const ContactQueries: React.FC = () => {
  const [queries, setQueries] = useState<ContactQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuery, setSelectedQuery] = useState<ContactQuery | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalQueries: 0,
    limit: 10,
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchQueries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data: ContactQueriesData = await getContactQueries(
        currentPage,
        10,
        statusFilter
      );
      setQueries(data.queries);
      setPagination(data.pagination);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch contact queries"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, [currentPage, statusFilter]);

  const handleViewQuery = async (queryId: string) => {
    try {
      const response = await getContactQuery(queryId);
      setSelectedQuery(response.query);
      setViewDialogOpen(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch query details"
      );
    }
  };

  const handleReplyClick = (query: ContactQuery) => {
    setSelectedQuery(query);
    setSubject(`Re: Your Contact Form Inquiry`);
    setReplyMessage("");
    setReplyDialogOpen(true);
  };

  const handleSendReply = async () => {
    if (!selectedQuery || !replyMessage.trim()) return;

    try {
      setSubmitting(true);
      await replyToContactQuery(selectedQuery._id, replyMessage, subject);
      setReplyDialogOpen(false);
      setReplyMessage("");
      setSubject("");
      setSelectedQuery(null);
      await fetchQueries(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send reply");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (queryId: string, newStatus: string) => {
    try {
      await updateContactQueryStatus(queryId, newStatus);
      await fetchQueries(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status");
    }
  };

  const handleDeleteClick = (query: ContactQuery) => {
    setSelectedQuery(query);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedQuery) return;

    try {
      setSubmitting(true);
      await deleteContactQuery(selectedQuery._id);
      setDeleteDialogOpen(false);
      setSelectedQuery(null);
      await fetchQueries(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete query");
    } finally {
      setSubmitting(false);
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
    <Box sx={{ p: 3 }}>
      <PageHeader
        title="📧 Contact Queries Management"
        subtitle="Manage and respond to customer inquiries"
      />

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <DashboardCard
            title="Pending Queries"
            value={queries
              .filter((q) => q.status === "pending")
              .length.toString()}
            icon={<Pending />}
            trend="down"
            trendValue="12% from last month"
            color="#FF9800"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard
            title="Replied"
            value={queries
              .filter((q) => q.status === "replied")
              .length.toString()}
            icon={<CheckCircle />}
            trend="up"
            trendValue="8% from last month"
            color="#4CAF50"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard
            title="Total Queries"
            value={pagination.totalQueries.toString()}
            icon={<Email />}
            trend="up"
            trendValue="15% from last month"
            color="#2196F3"
          />
        </Grid>
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Status Filter</InputLabel>
              <Select
                value={statusFilter}
                label="Status Filter"
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "#EEBA2B" },
                    "&.Mui-focused fieldset": { borderColor: "#EEBA2B" },
                  },
                }}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="replied">Replied</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
              </Select>
            </FormControl>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <TrendingUp sx={{ fontSize: 16 }} />
              Total: {pagination.totalQueries} queries
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Queries Table */}
      <DataTable
        headers={["Name", "Email", "Status", "Submitted"]}
        rows={
          loading
            ? []
            : queries.map((query) => ({
                id: query._id,
                name: (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Person sx={{ fontSize: 20, color: "#EEBA2B" }} />
                    <Typography variant="body2" fontWeight="medium">
                      {query.name}
                    </Typography>
                  </Box>
                ),
                email: (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Email sx={{ fontSize: 20, color: "#EEBA2B" }} />
                    <Typography variant="body2">{query.email}</Typography>
                  </Box>
                ),
                status: (
                  <StatusChip
                    status={query.status}
                    variant={
                      query.status === "pending"
                        ? "warning"
                        : query.status === "replied"
                        ? "success"
                        : "default"
                    }
                  />
                ),
                date: (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CalendarToday
                      sx={{ fontSize: 16, color: "text.secondary" }}
                    />
                    <Typography variant="body2">
                      {formatDate(query.createdAt)}
                    </Typography>
                  </Box>
                ),
              }))
        }
        onView={(id) => handleViewQuery(id)}
        customActions={(row) => (
          <>
            <ActionButton
              variant="primary"
              size="small"
              onClick={() =>
                handleReplyClick(queries.find((q) => q._id === row.id)!)
              }
              startIcon={<Reply />}
            >
              Reply
            </ActionButton>
            <ActionButton
              variant="danger"
              size="small"
              onClick={() =>
                handleDeleteClick(queries.find((q) => q._id === row.id)!)
              }
              startIcon={<Delete />}
            >
              Delete
            </ActionButton>
          </>
        )}
        emptyMessage={loading ? "Loading..." : "No contact queries found"}
      />

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={pagination.totalPages}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                "&.Mui-selected": {
                  backgroundColor: "#EEBA2B",
                  color: "#000",
                  "&:hover": { backgroundColor: "#FFE533" },
                },
              },
            }}
          />
        </Box>
      )}

      {/* View Query Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            border: "2px solid #EEBA2B",
          },
        }}
      >
        <DialogTitle
          sx={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ContactSupport sx={{ color: "#EEBA2B" }} />
            <Typography variant="h6" fontWeight="bold">
              Contact Query Details
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {selectedQuery && (
            <Box sx={{ pt: 1 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2, backgroundColor: "#f8fafc" }}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      Name:
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {selectedQuery.name}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2, backgroundColor: "#f8fafc" }}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      Email:
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {selectedQuery.email}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2, backgroundColor: "#f8fafc" }}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      Status:
                    </Typography>
                    <StatusChip
                      status={selectedQuery.status}
                      variant={
                        selectedQuery.status === "pending"
                          ? "warning"
                          : selectedQuery.status === "replied"
                          ? "success"
                          : "default"
                      }
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2, backgroundColor: "#f8fafc" }}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      Submitted:
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {formatDate(selectedQuery.createdAt)}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    Message:
                  </Typography>
                  <Paper
                    sx={{
                      p: 3,
                      backgroundColor: "#ffffff",
                      border: "1px solid #e2e8f0",
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      variant="body1"
                      style={{ whiteSpace: "pre-wrap" }}
                      sx={{ lineHeight: 1.7 }}
                    >
                      {selectedQuery.message}
                    </Typography>
                  </Paper>
                </Grid>
                {selectedQuery.isReplied && selectedQuery.replyMessage && (
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      Reply:
                    </Typography>
                    <Paper
                      sx={{
                        p: 3,
                        backgroundColor: "#f0fdf4",
                        border: "1px solid #4CAF50",
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        variant="body1"
                        style={{ whiteSpace: "pre-wrap" }}
                        sx={{ lineHeight: 1.7 }}
                      >
                        {selectedQuery.replyMessage}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          mt: 2,
                          display: "block",
                          fontStyle: "italic",
                          borderTop: "1px solid #e2e8f0",
                          pt: 1,
                        }}
                      >
                        Replied on{" "}
                        {selectedQuery.repliedAt
                          ? formatDate(selectedQuery.repliedAt)
                          : "Unknown"}
                        {selectedQuery.repliedBy &&
                          ` by ${selectedQuery.repliedBy}`}
                      </Typography>
                    </Paper>
                  </Grid>
                )}
              </Grid>

              {/* Status Update */}
              <Box
                sx={{
                  mt: 4,
                  p: 3,
                  backgroundColor: "#f8fafc",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 2, fontWeight: "bold" }}
                >
                  Update Status:
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  {["pending", "replied", "closed"].map((status) => (
                    <ActionButton
                      key={status}
                      variant={
                        selectedQuery.status === status
                          ? "primary"
                          : "secondary"
                      }
                      size="small"
                      onClick={() =>
                        handleStatusChange(selectedQuery._id, status)
                      }
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </ActionButton>
                  ))}
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions
          sx={{
            p: 3,
            backgroundColor: "#f8fafc",
            borderTop: "1px solid #e2e8f0",
          }}
        >
          <ActionButton
            variant="secondary"
            onClick={() => setViewDialogOpen(false)}
          >
            Close
          </ActionButton>
          {selectedQuery && (
            <ActionButton
              variant="primary"
              onClick={() => {
                setViewDialogOpen(false);
                handleReplyClick(selectedQuery);
              }}
              startIcon={<Reply />}
            >
              Reply
            </ActionButton>
          )}
        </DialogActions>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog
        open={replyDialogOpen}
        onClose={() => setReplyDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            border: "2px solid #EEBA2B",
          },
        }}
      >
        <DialogTitle
          sx={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Reply sx={{ color: "#EEBA2B" }} />
            <Typography variant="h6" fontWeight="bold">
              Reply to Contact Query
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {selectedQuery && (
            <Box sx={{ pt: 1 }}>
              <Paper
                sx={{
                  p: 2,
                  backgroundColor: "#f8fafc",
                  mb: 3,
                  borderRadius: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Replying to: <strong>{selectedQuery.name}</strong> (
                  {selectedQuery.email})
                </Typography>
              </Paper>

              <TextField
                autoFocus
                margin="dense"
                label="Subject"
                fullWidth
                variant="outlined"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "#EEBA2B" },
                    "&.Mui-focused fieldset": { borderColor: "#EEBA2B" },
                  },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#EEBA2B" },
                }}
              />

              <TextField
                margin="dense"
                label="Reply Message"
                fullWidth
                multiline
                rows={8}
                variant="outlined"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type your reply message here..."
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "#EEBA2B" },
                    "&.Mui-focused fieldset": { borderColor: "#EEBA2B" },
                  },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#EEBA2B" },
                }}
              />

              <Paper
                sx={{
                  p: 3,
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mb: 1, fontWeight: "bold" }}
                >
                  Original Message:
                </Typography>
                <Typography
                  variant="body2"
                  style={{ whiteSpace: "pre-wrap" }}
                  sx={{ lineHeight: 1.6, color: "text.secondary" }}
                >
                  {selectedQuery.message}
                </Typography>
              </Paper>
            </Box>
          )}
        </DialogContent>
        <DialogActions
          sx={{
            p: 3,
            backgroundColor: "#f8fafc",
            borderTop: "1px solid #e2e8f0",
          }}
        >
          <ActionButton
            variant="secondary"
            onClick={() => setReplyDialogOpen(false)}
          >
            Cancel
          </ActionButton>
          <ActionButton
            variant="primary"
            onClick={handleSendReply}
            disabled={!replyMessage.trim() || submitting}
            startIcon={submitting ? <CircularProgress size={16} /> : <Reply />}
          >
            {submitting ? "Sending..." : "Send Reply"}
          </ActionButton>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            border: "2px solid #f44336",
          },
        }}
      >
        <DialogTitle
          sx={{ backgroundColor: "#fef2f2", borderBottom: "1px solid #fecaca" }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Delete sx={{ color: "#f44336" }} />
            <Typography variant="h6" fontWeight="bold" color="#f44336">
              Confirm Delete
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Are you sure you want to delete this contact query? This action
            cannot be undone.
          </Typography>
          {selectedQuery && (
            <Paper
              sx={{
                p: 3,
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: 2,
              }}
            >
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>From:</strong> {selectedQuery.name} (
                {selectedQuery.email})
              </Typography>
              <Typography variant="body2">
                <strong>Submitted:</strong>{" "}
                {formatDate(selectedQuery.createdAt)}
              </Typography>
            </Paper>
          )}
        </DialogContent>
        <DialogActions
          sx={{
            p: 3,
            backgroundColor: "#fef2f2",
            borderTop: "1px solid #fecaca",
          }}
        >
          <ActionButton
            variant="secondary"
            onClick={() => setDeleteDialogOpen(false)}
          >
            Cancel
          </ActionButton>
          <ActionButton
            variant="danger"
            onClick={handleDeleteConfirm}
            disabled={submitting}
            startIcon={submitting ? <CircularProgress size={16} /> : <Delete />}
          >
            {submitting ? "Deleting..." : "Delete"}
          </ActionButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContactQueries;
