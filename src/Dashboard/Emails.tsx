import { useCallback, useEffect, useMemo, useState } from "react";
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
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Archive from "@mui/icons-material/Archive";
import Delete from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";
import Inbox from "@mui/icons-material/Inbox";
import MarkEmailRead from "@mui/icons-material/MarkEmailRead";
import Refresh from "@mui/icons-material/Refresh";
import Reply from "@mui/icons-material/Reply";
import {
  deleteEmail,
  EmailMessage,
  EmailStatus,
  getEmail,
  getEmails,
  replyToEmail,
  syncEmails,
  updateEmailStatus,
} from "../APIs/Emails";
import {
  ActionButton,
  DashboardCard,
  DataTable,
  MenuAction,
  PageHeader,
  StatusChip,
} from "./components/DashboardComponents";

const statusOptions: Array<"all" | EmailStatus> = ["all", "new", "read", "replied", "archived"];
const mailboxOptions = [
  { value: "all", label: "All mailboxes" },
  { value: "be", label: "contact@creativapoeta.be" },
  { value: "global", label: "contact@creativapoeta.com" },
];

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

const getStatusVariant = (status: string) => {
  switch (status) {
    case "new":
      return "warning";
    case "read":
      return "info";
    case "replied":
      return "success";
    case "archived":
      return "default";
    default:
      return "default";
  }
};

const getSender = (email: EmailMessage) => {
  if (email.fromName && email.fromEmail) return `${email.fromName} <${email.fromEmail}>`;
  return email.fromEmail || email.fromName || "Unknown sender";
};

const Emails = () => {
  const [emails, setEmails] = useState<EmailMessage[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<EmailMessage | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [mailboxFilter, setMailboxFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalEmails: 0,
    limit: 25,
  });
  const [metrics, setMetrics] = useState<Record<string, number>>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "warning">("success");
  const [replyOpen, setReplyOpen] = useState(false);
  const [replySubject, setReplySubject] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);

  const showMessage = (message: string, severity: "success" | "error" | "warning" = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const loadEmails = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getEmails(currentPage, 25, statusFilter, mailboxFilter, search);
      setEmails(response.emails || []);
      setMetrics(response.metrics || {});
      if (response.pagination) setPagination(response.pagination);
      setError(null);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "Failed to fetch emails.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, mailboxFilter, search, statusFilter]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void loadEmails();
    }, search ? 350 : 0);

    return () => window.clearTimeout(timeout);
  }, [loadEmails, search]);

  const rows = useMemo(
    () =>
      emails.map((email) => ({
        id: email._id,
        From: (
          <Box>
            <Typography fontWeight={800}>{email.fromName || email.fromEmail || "Unknown sender"}</Typography>
            <Typography variant="caption" color="text.secondary">
              {email.mailboxAddress}
            </Typography>
          </Box>
        ),
        Subject: (
          <Box sx={{ maxWidth: 520 }}>
            <Typography fontWeight={email.status === "new" ? 900 : 650}>{email.subject}</Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {email.preview || "No preview available"}
            </Typography>
          </Box>
        ),
        Status: <StatusChip status={email.status} variant={getStatusVariant(email.status) as any} />,
        Received: formatDate(email.receivedAt),
      })),
    [emails]
  );

  const handleSync = async () => {
    try {
      setSyncing(true);
      const result = await syncEmails(75);
      const missing = result.results.filter((item) => !item.configured).length;
      const failed = result.results.filter((item) => item.error && item.configured).length;
      await loadEmails();
      if (failed > 0 || missing > 0) {
        showMessage(
          `Sync done with warnings: ${result.imported} imported, ${result.updated} updated. Check backend env vars.`,
          "warning"
        );
      } else {
        showMessage(`Sync done: ${result.imported} imported, ${result.updated} updated.`);
      }
    } catch (syncError) {
      showMessage(syncError instanceof Error ? syncError.message : "Email sync failed.", "error");
    } finally {
      setSyncing(false);
    }
  };

  const handleView = async (id: string) => {
    try {
      const response = await getEmail(id);
      setSelectedEmail(response.email);
      setViewOpen(true);
      setEmails((current) => current.map((item) => (item._id === id ? response.email : item)));
    } catch (viewError) {
      showMessage(viewError instanceof Error ? viewError.message : "Failed to open email.", "error");
    }
  };

  const handleStatusChange = async (id: string, status: EmailStatus) => {
    try {
      const response = await updateEmailStatus(id, status);
      setEmails((current) => current.map((item) => (item._id === id ? response.email : item)));
      setSelectedEmail((current) => (current?._id === id ? response.email : current));
      showMessage("Email status updated.");
    } catch (statusError) {
      showMessage(statusError instanceof Error ? statusError.message : "Failed to update email.", "error");
    }
  };

  const openReplyDialog = (email: EmailMessage) => {
    setSelectedEmail(email);
    setReplySubject(/^re:/i.test(email.subject) ? email.subject : `Re: ${email.subject || "Votre message"}`);
    setReplyMessage("");
    setReplyOpen(true);
  };

  const handleReplySubmit = async () => {
    if (!selectedEmail || !replyMessage.trim() || !replySubject.trim()) {
      showMessage("Subject and reply message are required.", "warning");
      return;
    }

    try {
      setReplyLoading(true);
      const response = await replyToEmail(selectedEmail._id, replyMessage, replySubject);
      setEmails((current) => current.map((item) => (item._id === selectedEmail._id ? response.email : item)));
      setSelectedEmail(response.email);
      setReplyOpen(false);
      setReplyMessage("");
      showMessage("Reply sent from the dashboard.");
    } catch (replyError) {
      showMessage(replyError instanceof Error ? replyError.message : "Failed to send reply.", "error");
    } finally {
      setReplyLoading(false);
    }
  };

  const handleDelete = async (email: EmailMessage) => {
    if (!window.confirm(`Delete the dashboard copy of "${email.subject}"?`)) return;

    try {
      await deleteEmail(email._id);
      setEmails((current) => current.filter((item) => item._id !== email._id));
      showMessage("Email deleted from dashboard copy.");
    } catch (deleteError) {
      showMessage(deleteError instanceof Error ? deleteError.message : "Failed to delete email.", "error");
    }
  };

  if (loading && emails.length === 0) {
    return <PageHeader title="Emails" subtitle="Loading synced mailbox messages..." />;
  }

  return (
    <Box>
      <PageHeader
        title="Emails"
        subtitle="Messages received by contact@creativapoeta.be and contact@creativapoeta.com."
        action={
          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
            <ActionButton variant="secondary" startIcon={<Refresh />} onClick={() => void loadEmails()} disabled={loading}>
              Refresh
            </ActionButton>
            <ActionButton variant="primary" startIcon={<Inbox />} onClick={() => void handleSync()} disabled={syncing}>
              {syncing ? "Syncing..." : "Sync mailboxes"}
            </ActionButton>
          </Box>
        }
      />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="Total Emails" value={pagination.totalEmails} icon={<EmailIcon />} color="#071a33" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="New" value={metrics.new || 0} icon={<Inbox />} color="#f59e0b" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="Read" value={metrics.read || 0} icon={<MarkEmailRead />} color="#0ea5e9" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="Archived" value={metrics.archived || 0} icon={<Archive />} color="#64748b" />
        </Grid>
      </Grid>

      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                label="Search sender, subject or message..."
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCurrentPage(1);
                }}
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
                  {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status === "all" ? "All statuses" : status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Mailbox</InputLabel>
                <Select
                  value={mailboxFilter}
                  label="Mailbox"
                  onChange={(event) => {
                    setMailboxFilter(event.target.value);
                    setCurrentPage(1);
                  }}
                >
                  {mailboxOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <DataTable
        headers={["From", "Subject", "Status", "Received"]}
        hiddenFields={["id"]}
        rows={rows}
        onView={(id) => void handleView(id)}
        customActions={(row) => {
          const email = emails.find((item) => item._id === row.id);
          if (!email) return null;

          return (
            <>
              <MenuAction icon={<MarkEmailRead />} label="Mark read" onClick={() => void handleStatusChange(email._id, "read")} color="#0ea5e9" />
              <MenuAction icon={<Reply />} label="Reply" onClick={() => openReplyDialog(email)} color="#16a34a" />
              <MenuAction icon={<MarkEmailRead />} label="Mark replied" onClick={() => void handleStatusChange(email._id, "replied")} color="#16a34a" />
              <MenuAction icon={<Archive />} label="Archive" onClick={() => void handleStatusChange(email._id, "archived")} color="#64748b" />
              <MenuAction icon={<Delete />} label="Delete copy" onClick={() => void handleDelete(email)} color="#ef4444" />
            </>
          );
        }}
        emptyMessage="No synced emails found"
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

      <Dialog open={viewOpen} onClose={() => setViewOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: "#071a33", color: "white" }}>
          {selectedEmail?.subject || "Email"}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {selectedEmail && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={7}>
                  <Paper sx={{ p: 2.5, height: "100%" }}>
                    <Typography variant="subtitle2" color="text.secondary">From</Typography>
                    <Typography fontWeight={800}>{getSender(selectedEmail)}</Typography>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>To</Typography>
                    <Typography>{selectedEmail.to?.join(", ") || selectedEmail.mailboxAddress}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={5}>
                  <Paper sx={{ p: 2.5, height: "100%" }}>
                    <Typography variant="subtitle2" color="text.secondary">Received</Typography>
                    <Typography>{formatDate(selectedEmail.receivedAt)}</Typography>
                    <Box sx={{ mt: 2 }}>
                      <StatusChip status={selectedEmail.status} variant={getStatusVariant(selectedEmail.status) as any} />
                    </Box>
                  </Paper>
                </Grid>
              </Grid>

              <Paper sx={{ p: 2.5 }}>
                <Typography sx={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
                  {selectedEmail.text || selectedEmail.preview || "No readable text content."}
                </Typography>
              </Paper>

              {selectedEmail.replyMessage && (
                <Paper sx={{ p: 2.5, borderLeft: "5px solid #16a34a", bgcolor: "#f0fdf4" }}>
                  <Typography variant="subtitle2" color="text.secondary">Last reply</Typography>
                  <Typography fontWeight={800}>{selectedEmail.replySubject || "Reply"}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(selectedEmail.repliedAt)} by {selectedEmail.repliedBy || "Admin"}
                  </Typography>
                  <Typography sx={{ mt: 2, whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
                    {selectedEmail.replyMessage}
                  </Typography>
                </Paper>
              )}
            </Box>
          )}
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2, flexWrap: "wrap", gap: 1 }}>
          <ActionButton variant="secondary" onClick={() => setViewOpen(false)}>Close</ActionButton>
          {selectedEmail && (
            <>
              <ActionButton variant="secondary" onClick={() => void handleStatusChange(selectedEmail._id, "read")}>Mark read</ActionButton>
              <ActionButton variant="success" startIcon={<Reply />} onClick={() => openReplyDialog(selectedEmail)}>Reply</ActionButton>
              <ActionButton variant="secondary" onClick={() => void handleStatusChange(selectedEmail._id, "replied")}>Mark replied</ActionButton>
              <ActionButton variant="secondary" onClick={() => void handleStatusChange(selectedEmail._id, "archived")}>Archive</ActionButton>
            </>
          )}
        </DialogActions>
      </Dialog>

      <Dialog open={replyOpen} onClose={() => !replyLoading && setReplyOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: "#071a33", color: "white" }}>
          Reply to {selectedEmail ? getSender(selectedEmail) : "email"}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <TextField
              label="Subject"
              value={replySubject}
              onChange={(event) => setReplySubject(event.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Reply message"
              value={replyMessage}
              onChange={(event) => setReplyMessage(event.target.value)}
              minRows={8}
              multiline
              fullWidth
              required
              placeholder="Write a clear, professional answer..."
            />
            <Alert severity="info">
              The email will use the branded Creativa Poeta template and the configured SMTP sender.
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <ActionButton variant="secondary" disabled={replyLoading} onClick={() => setReplyOpen(false)}>
            Cancel
          </ActionButton>
          <ActionButton variant="primary" disabled={replyLoading} startIcon={<Reply />} onClick={() => void handleReplySubmit()}>
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
};

export default Emails;
