import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Skeleton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import {
  CheckCircle,
  Delete,
  Email,
  MarkEmailRead,
  Pending,
  Refresh,
  Reply,
} from "@mui/icons-material";
import {
  ContactQuery,
  deleteContactQuery,
  getContactQueries,
  getContactQuery,
  replyToContactQuery,
  updateContactQueryStatus,
} from "../APIs/Contact";
import {
  ActionButton,
  DashboardCard,
  DataTable,
  MenuAction,
  PageHeader,
  StatusChip,
} from "./components/DashboardComponents";

const statusOptions = ["pending", "replied", "closed"];

const normalizeContactStatus = (query: ContactQuery) => {
  if (query.isReplied && !query.status) return "replied";
  return (query.status || "pending").toLowerCase();
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case "replied":
      return "success";
    case "closed":
      return "default";
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

const getQueryName = (query: ContactQuery) => query.fullName || query.name || "Unknown contact";

const ContactQueries = () => {
  const [queries, setQueries] = useState<ContactQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuery, setSelectedQuery] = useState<ContactQuery | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalQueries: 0,
    limit: 25,
  });
  const [submitting, setSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const showMessage = (message: string, severity: "success" | "error" = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const fetchQueries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getContactQueries(currentPage, 25, statusFilter);
      setQueries(data.queries || []);
      setPagination({
        currentPage: data.pagination?.currentPage || currentPage,
        totalPages: data.pagination?.totalPages || 1,
        totalQueries: data.pagination?.totalQueries || data.queries?.length || 0,
        limit: data.pagination?.limit || 25,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch contact queries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchQueries();
  }, [currentPage, statusFilter]);

  const filteredQueries = useMemo(() => {
    const queryText = search.trim().toLowerCase();
    if (!queryText) return queries;

    return queries.filter((query) =>
      [getQueryName(query), query.email, query.message, query.replyMessage]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(queryText)
    );
  }, [queries, search]);

  const metrics = useMemo(() => {
    const pending = queries.filter((query) => normalizeContactStatus(query) === "pending").length;
    const replied = queries.filter((query) => normalizeContactStatus(query) === "replied").length;
    const closed = queries.filter((query) => normalizeContactStatus(query) === "closed").length;
    return { pending, replied, closed, total: pagination.totalQueries || queries.length };
  }, [pagination.totalQueries, queries]);

  const handleViewQuery = async (queryId: string) => {
    try {
      const response = await getContactQuery(queryId);
      const detailedQuery = (response as { query?: ContactQuery }).query ?? (response as ContactQuery);
      setSelectedQuery(detailedQuery);
      setViewDialogOpen(true);
    } catch (err) {
      showMessage(err instanceof Error ? err.message : "Failed to fetch query details.", "error");
    }
  };

  const handleReplyClick = (query: ContactQuery) => {
    setSelectedQuery(query);
    setSubject("Re: Your message to Creativa Poeta");
    setReplyMessage(
      `Bonjour ${getQueryName(query)},\n\nMerci pour votre message. Nous l'avons bien recu et nous revenons vers vous rapidement.\n\nCreativa Poeta`
    );
    setReplyDialogOpen(true);
  };

  const handleSendReply = async () => {
    if (!selectedQuery || !replyMessage.trim() || !subject.trim()) {
      showMessage("Subject and message are required.", "error");
      return;
    }

    try {
      setSubmitting(true);
      await replyToContactQuery(selectedQuery._id, replyMessage, subject);
      setQueries((current) =>
        current.map((query) =>
          query._id === selectedQuery._id
            ? { ...query, status: "replied", isReplied: true, replyMessage }
            : query
        )
      );
      setReplyDialogOpen(false);
      showMessage("Reply sent.");
    } catch (err) {
      showMessage(err instanceof Error ? err.message : "Failed to send reply.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (queryId: string, newStatus: string) => {
    try {
      await updateContactQueryStatus(queryId, newStatus);
      setQueries((current) =>
        current.map((query) => (query._id === queryId ? { ...query, status: newStatus } : query))
      );
      setSelectedQuery((current) =>
        current?._id === queryId ? { ...current, status: newStatus } : current
      );
      showMessage(`Status updated to ${newStatus}.`);
    } catch (err) {
      showMessage(err instanceof Error ? err.message : "Failed to update status.", "error");
    }
  };

  const handleDelete = async (query: ContactQuery) => {
    if (!window.confirm("Delete this contact message?")) return;

    try {
      setSubmitting(true);
      await deleteContactQuery(query._id);
      setQueries((current) => current.filter((item) => item._id !== query._id));
      setViewDialogOpen(false);
      showMessage("Contact message deleted.");
    } catch (err) {
      showMessage(err instanceof Error ? err.message : "Failed to delete contact query.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const rows = filteredQueries.map((query) => {
    const status = normalizeContactStatus(query);
    return {
      id: query._id,
      Contact: (
        <Box>
          <Typography fontWeight={700}>{getQueryName(query)}</Typography>
          <Typography variant="caption" color="text.secondary">
            {query.email}
          </Typography>
        </Box>
      ),
      Message: (
        <Typography variant="body2" sx={{ maxWidth: 420 }}>
          {query.message?.length > 120 ? `${query.message.slice(0, 120)}...` : query.message}
        </Typography>
      ),
      Status: <StatusChip status={status} variant={getStatusVariant(status) as any} />,
      Submitted: formatDate(query.createdAt),
    };
  });

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <PageHeader title="Contact Inbox" subtitle="Loading contact messages..." />
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
        title="Contact Inbox"
        subtitle="Messages submitted from the website contact form."
        action={
          <ActionButton variant="secondary" startIcon={<Refresh />} onClick={fetchQueries}>
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
          <DashboardCard title="Total Messages" value={metrics.total} icon={<Email />} color="#071a33" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="Pending" value={metrics.pending} icon={<Pending />} color="#f59e0b" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="Replied" value={metrics.replied} icon={<MarkEmailRead />} color="#16a34a" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="Closed" value={metrics.closed} icon={<CheckCircle />} color="#64748b" />
        </Grid>
      </Grid>

      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={7}>
              <TextField
                label="Search name, email or message..."
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
                  onChange={(event) => {
                    setStatusFilter(event.target.value);
                    setCurrentPage(1);
                  }}
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
            <Grid item xs={12} md={2}>
              <Typography variant="body2" color="text.secondary">
                {filteredQueries.length} shown
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <DataTable
        headers={["Contact", "Message", "Status", "Submitted"]}
        hiddenFields={["id"]}
        rows={rows}
        onView={(id) => void handleViewQuery(id)}
        customActions={(row) => {
          const query = queries.find((item) => item._id === row.id);
          if (!query) return null;
          const isReplied = normalizeContactStatus(query) === "replied";

          return (
            <>
              <MenuAction
                icon={<Reply />}
                label={isReplied ? "Replied" : "Reply"}
                onClick={() => handleReplyClick(query)}
                disabled={isReplied}
                color="#EEBA2B"
              />
              <MenuAction icon={<Delete />} label="Delete" onClick={() => void handleDelete(query)} color="#ef4444" />
            </>
          );
        }}
        emptyMessage="No contact messages found"
      />

      {pagination.totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={pagination.totalPages}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            sx={{
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "#EEBA2B",
                color: "#071a33",
              },
            }}
          />
        </Box>
      )}

      <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: "#071a33", color: "white" }}>
          Contact Message Details
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {selectedQuery && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2.5, height: "100%" }}>
                    <Typography variant="h6" sx={{ mb: 2, color: "#071a33" }}>
                      Contact
                    </Typography>
                    <Typography fontWeight={700}>{getQueryName(selectedQuery)}</Typography>
                    <Typography color="text.secondary">{selectedQuery.email}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Sent: {formatDate(selectedQuery.createdAt)}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2.5, height: "100%" }}>
                    <Typography variant="h6" sx={{ mb: 2, color: "#071a33" }}>
                      Status
                    </Typography>
                    <StatusChip
                      status={normalizeContactStatus(selectedQuery)}
                      variant={getStatusVariant(normalizeContactStatus(selectedQuery)) as any}
                    />
                    <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {statusOptions.map((status) => (
                        <ActionButton
                          key={status}
                          size="small"
                          variant={normalizeContactStatus(selectedQuery) === status ? "primary" : "secondary"}
                          onClick={() => void handleStatusChange(selectedQuery._id, status)}
                        >
                          {status}
                        </ActionButton>
                      ))}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>

              <Paper sx={{ p: 2.5 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                  Message
                </Typography>
                <Typography sx={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
                  {selectedQuery.message}
                </Typography>
              </Paper>

              {selectedQuery.replyMessage && (
                <Paper sx={{ p: 2.5, bgcolor: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    Reply sent
                  </Typography>
                  <Typography sx={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
                    {selectedQuery.replyMessage}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1.5 }}>
                    {selectedQuery.repliedAt ? formatDate(selectedQuery.repliedAt) : "Reply date unknown"}
                  </Typography>
                </Paper>
              )}
            </Box>
          )}
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2 }}>
          <ActionButton variant="secondary" onClick={() => setViewDialogOpen(false)}>
            Close
          </ActionButton>
          {selectedQuery && (
            <ActionButton variant="primary" startIcon={<Reply />} onClick={() => handleReplyClick(selectedQuery)}>
              Reply
            </ActionButton>
          )}
        </DialogActions>
      </Dialog>

      <Dialog open={replyDialogOpen} onClose={() => setReplyDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: "#EEBA2B", color: "#071a33" }}>
          Reply to {selectedQuery ? getQueryName(selectedQuery) : "contact"}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            label="Subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
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
          {selectedQuery && (
            <Paper sx={{ p: 2, mt: 2, bgcolor: "#f8fafc" }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Original message
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                {selectedQuery.message}
              </Typography>
            </Paper>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <ActionButton variant="secondary" disabled={submitting} onClick={() => setReplyDialogOpen(false)}>
            Cancel
          </ActionButton>
          <ActionButton variant="primary" disabled={submitting} onClick={() => void handleSendReply()}>
            {submitting ? "Sending..." : "Send reply"}
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
};

export default ContactQueries;
