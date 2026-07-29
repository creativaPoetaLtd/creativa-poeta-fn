import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import Archive from "@mui/icons-material/Archive";
import Create from "@mui/icons-material/Create";
import Delete from "@mui/icons-material/Delete";
import Drafts from "@mui/icons-material/Drafts";
import EmailIcon from "@mui/icons-material/Email";
import Inbox from "@mui/icons-material/Inbox";
import MarkEmailRead from "@mui/icons-material/MarkEmailRead";
import Refresh from "@mui/icons-material/Refresh";
import Reply from "@mui/icons-material/Reply";
import Send from "@mui/icons-material/Send";
import {
  ComposeEmailPayload,
  deleteEmail,
  deleteOutboundEmail,
  EmailFolder,
  EmailMessage,
  EmailSyncResult,
  EmailStatus,
  getEmail,
  getEmails,
  getOutboundEmails,
  OutboundEmail,
  replyToEmail,
  saveEmailDraft,
  sendComposedEmail,
  sendEmailDraft,
  syncEmails,
  updateEmailDraft,
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

const emptyCompose = { to: "", cc: "", bcc: "", subject: "", body: "", signature: "" };

type ComposeForm = typeof emptyCompose;

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
    case "draft":
      return "warning";
    case "read":
      return "info";
    case "replied":
    case "sent":
      return "success";
    case "failed":
      return "error";
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

const splitEmailList = (value: string) =>
  value
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);

const toComposePayload = (form: ComposeForm, draftId?: string): ComposeEmailPayload => ({
  to: splitEmailList(form.to),
  cc: splitEmailList(form.cc),
  bcc: splitEmailList(form.bcc),
  subject: form.subject.trim(),
  body: form.body.trim(),
  signature: form.signature.trim(),
  draftId,
});

const fromOutboundEmail = (email: OutboundEmail): ComposeForm => ({
  to: (email.to || []).join(", "),
  cc: (email.cc || []).join(", "),
  bcc: (email.bcc || []).join(", "),
  subject: email.subject || "",
  body: email.body || "",
  signature: email.signature || "",
});

const Emails = () => {
  const [folder, setFolder] = useState<EmailFolder>("inbox");
  const [emails, setEmails] = useState<EmailMessage[]>([]);
  const [outboundEmails, setOutboundEmails] = useState<OutboundEmail[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<EmailMessage | null>(null);
  const [selectedOutbound, setSelectedOutbound] = useState<OutboundEmail | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [syncReport, setSyncReport] = useState<EmailSyncResult | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [mailboxFilter, setMailboxFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalEmails: 0, limit: 25 });
  const [metrics, setMetrics] = useState<Record<string, number>>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "warning">("success");
  const [replyOpen, setReplyOpen] = useState(false);
  const [replySubject, setReplySubject] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [replySignature, setReplySignature] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeForm, setComposeForm] = useState<ComposeForm>(emptyCompose);
  const [editingDraftId, setEditingDraftId] = useState<string | null>(null);
  const [composeLoading, setComposeLoading] = useState(false);
  const syncingRef = useRef(false);

  const showMessage = (message: string, severity: "success" | "error" | "warning" = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const loadEmails = useCallback(async () => {
    try {
      setLoading(true);

      if (folder === "inbox") {
        const response = await getEmails(currentPage, 25, statusFilter, mailboxFilter, search);
        setEmails(response.emails || []);
        setOutboundEmails([]);
        setMetrics(response.metrics || {});
        if (response.pagination) setPagination(response.pagination);
      } else {
        const response = await getOutboundEmails(folder === "sent" ? "sent" : "draft", currentPage, 25, search);
        setOutboundEmails(response.emails || []);
        setEmails([]);
        setMetrics(response.metrics || {});
        if (response.pagination) setPagination(response.pagination);
      }

      setError(null);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "Failed to fetch emails.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, folder, mailboxFilter, search, statusFilter]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void loadEmails();
    }, search ? 350 : 0);

    return () => window.clearTimeout(timeout);
  }, [loadEmails, search]);

  const inboxRows = useMemo(
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

  const outboundRows = useMemo(
    () =>
      outboundEmails.map((email) => ({
        id: email._id,
        To: (
          <Box>
            <Typography fontWeight={800}>{email.to?.join(", ") || "No recipient"}</Typography>
            {!!email.cc?.length && (
              <Typography variant="caption" color="text.secondary">CC: {email.cc.join(", ")}</Typography>
            )}
          </Box>
        ),
        Subject: (
          <Box sx={{ maxWidth: 520 }}>
            <Typography fontWeight={800}>{email.subject || "No subject"}</Typography>
            <Typography variant="body2" color="text.secondary" noWrap>{email.body || "No message"}</Typography>
            {email.error && <Typography variant="caption" color="error">{email.error}</Typography>}
          </Box>
        ),
        Status: <StatusChip status={email.status} variant={getStatusVariant(email.status) as any} />,
        Date: formatDate(email.sentAt || email.updatedAt || email.createdAt),
      })),
    [outboundEmails]
  );

  const handleFolderChange = (_: unknown, nextFolder: EmailFolder) => {
    setFolder(nextFolder);
    setCurrentPage(1);
    setStatusFilter("all");
    setMailboxFilter("all");
    setSearch("");
  };

  const runMailboxSync = useCallback(
    async (silent = false) => {
      if (syncingRef.current) return;

      try {
        syncingRef.current = true;
        if (!silent) setSyncing(true);

        const result = await syncEmails(75);
        setSyncReport(result);
        const missing = result.results.filter((item) => !item.configured).length;
        const failed = result.results.filter((item) => item.error && item.configured).length;
        await loadEmails();

        if (silent) {
          if (result.imported > 0) {
            showMessage(`${result.imported} new email(s) imported.`);
          }
          return;
        }

        if (failed > 0 || missing > 0) {
          showMessage(`Sync done with warnings: ${result.imported} imported, ${result.updated} updated. Check backend env vars.`, "warning");
        } else {
          showMessage(`Sync done: ${result.imported} imported, ${result.updated} updated.`);
        }
      } catch (syncError) {
        if (!silent) {
          setSyncReport(null);
          showMessage(syncError instanceof Error ? syncError.message : "Email sync failed.", "error");
        }
      } finally {
        syncingRef.current = false;
        if (!silent) setSyncing(false);
      }
    },
    [loadEmails]
  );

  const handleSync = async () => {
    await runMailboxSync(false);
  };

  useEffect(() => {
    if (folder !== "inbox") return undefined;

    const interval = window.setInterval(() => {
      void runMailboxSync(true);
    }, 30000);

    return () => window.clearInterval(interval);
  }, [folder, runMailboxSync]);

  const handleViewInbox = async (id: string) => {
    try {
      const response = await getEmail(id);
      setSelectedEmail(response.email);
      setSelectedOutbound(null);
      setViewOpen(true);
      setEmails((current) => current.map((item) => (item._id === id ? response.email : item)));
    } catch (viewError) {
      showMessage(viewError instanceof Error ? viewError.message : "Failed to open email.", "error");
    }
  };

  const handleViewOutbound = (id: string) => {
    const email = outboundEmails.find((item) => item._id === id) || null;
    setSelectedOutbound(email);
    setSelectedEmail(null);
    setViewOpen(true);
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
    setReplySignature("");
    setReplyOpen(true);
  };

  const openComposeDialog = (draft?: OutboundEmail) => {
    setEditingDraftId(draft?._id || null);
    setComposeForm(draft ? fromOutboundEmail(draft) : emptyCompose);
    setComposeOpen(true);
  };

  const handleReplySubmit = async () => {
    if (!selectedEmail || !replyMessage.trim() || !replySubject.trim()) {
      showMessage("Subject and reply message are required.", "warning");
      return;
    }

    try {
      setReplyLoading(true);
      const response = await replyToEmail(selectedEmail._id, replyMessage, replySubject, replySignature);
      setEmails((current) => current.map((item) => (item._id === selectedEmail._id ? response.email : item)));
      setSelectedEmail(response.email);
      setReplyOpen(false);
      setReplyMessage("");
      setReplySignature("");
      showMessage("Reply sent from the dashboard.");
    } catch (replyError) {
      showMessage(replyError instanceof Error ? replyError.message : "Failed to send reply.", "error");
    } finally {
      setReplyLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    try {
      setComposeLoading(true);
      const payload = toComposePayload(composeForm);
      if (editingDraftId) await updateEmailDraft(editingDraftId, payload);
      else await saveEmailDraft(payload);
      setComposeOpen(false);
      setEditingDraftId(null);
      if (folder !== "drafts") setFolder("drafts");
      setCurrentPage(1);
      await loadEmails();
      showMessage("Draft saved.");
    } catch (draftError) {
      showMessage(draftError instanceof Error ? draftError.message : "Failed to save draft.", "error");
    } finally {
      setComposeLoading(false);
    }
  };

  const handleSendCompose = async () => {
    try {
      setComposeLoading(true);
      await sendComposedEmail(toComposePayload(composeForm, editingDraftId || undefined));
      setComposeOpen(false);
      setEditingDraftId(null);
      if (folder !== "sent") setFolder("sent");
      setCurrentPage(1);
      await loadEmails();
      showMessage("Email sent.");
    } catch (sendError) {
      showMessage(sendError instanceof Error ? sendError.message : "Failed to send email.", "error");
    } finally {
      setComposeLoading(false);
    }
  };

  const handleSendDraft = async (email: OutboundEmail) => {
    try {
      await sendEmailDraft(email._id);
      await loadEmails();
      showMessage("Draft sent.");
    } catch (sendError) {
      showMessage(sendError instanceof Error ? sendError.message : "Failed to send draft.", "error");
      await loadEmails();
    }
  };

  const handleDeleteInbox = async (email: EmailMessage) => {
    if (!window.confirm(`Delete the dashboard copy of "${email.subject}"?`)) return;
    try {
      await deleteEmail(email._id);
      setEmails((current) => current.filter((item) => item._id !== email._id));
      showMessage("Email deleted from dashboard copy.");
    } catch (deleteError) {
      showMessage(deleteError instanceof Error ? deleteError.message : "Failed to delete email.", "error");
    }
  };

  const handleDeleteOutbound = async (email: OutboundEmail) => {
    if (!window.confirm(`Delete "${email.subject || "this email"}"?`)) return;
    try {
      await deleteOutboundEmail(email._id);
      setOutboundEmails((current) => current.filter((item) => item._id !== email._id));
      showMessage("Email deleted.");
    } catch (deleteError) {
      showMessage(deleteError instanceof Error ? deleteError.message : "Failed to delete email.", "error");
    }
  };

  const totalInbox = folder === "inbox" ? pagination.totalEmails : 0;
  const totalOutbound = folder !== "inbox" ? pagination.totalEmails : 0;

  return (
    <Box>
      <PageHeader
        title="Emails"
        subtitle="Inbox, sent emails and drafts for Creativa Poeta mailboxes."
        action={
          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
            <ActionButton variant="primary" startIcon={<Create />} onClick={() => openComposeDialog()} disabled={composeLoading}>
              Compose
            </ActionButton>
            <ActionButton variant="secondary" startIcon={<Refresh />} onClick={() => void loadEmails()} disabled={loading}>
              Refresh
            </ActionButton>
            {folder === "inbox" && (
              <ActionButton variant="primary" startIcon={<Inbox />} onClick={() => void handleSync()} disabled={syncing}>
                {syncing ? "Syncing..." : "Sync mailboxes"}
              </ActionButton>
            )}
          </Box>
        }
      />

      <Tabs value={folder} onChange={handleFolderChange} sx={{ mb: 3 }}>
        <Tab value="inbox" icon={<Inbox />} iconPosition="start" label="Inbox" />
        <Tab value="sent" icon={<Send />} iconPosition="start" label="Sent" />
        <Tab value="drafts" icon={<Drafts />} iconPosition="start" label="Drafts" />
      </Tabs>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title={folder === "inbox" ? "Total Emails" : "Total"} value={folder === "inbox" ? totalInbox : totalOutbound} icon={<EmailIcon />} color="#071a33" />
        </Grid>
        {folder === "inbox" ? (
          <>
            <Grid item xs={12} sm={6} md={3}><DashboardCard title="New" value={metrics.new || 0} icon={<Inbox />} color="#f59e0b" /></Grid>
            <Grid item xs={12} sm={6} md={3}><DashboardCard title="Read" value={metrics.read || 0} icon={<MarkEmailRead />} color="#0ea5e9" /></Grid>
            <Grid item xs={12} sm={6} md={3}><DashboardCard title="Archived" value={metrics.archived || 0} icon={<Archive />} color="#64748b" /></Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} sm={6} md={3}><DashboardCard title="Sent" value={folder === "sent" ? totalOutbound : metrics.sent || 0} icon={<Send />} color="#16a34a" /></Grid>
            <Grid item xs={12} sm={6} md={3}><DashboardCard title="Drafts" value={folder === "drafts" ? totalOutbound : metrics.draft || 0} icon={<Drafts />} color="#f59e0b" /></Grid>
            <Grid item xs={12} sm={6} md={3}><DashboardCard title="Failed" value={outboundEmails.filter((item) => item.status === "failed").length} icon={<EmailIcon />} color="#ef4444" /></Grid>
          </>
        )}
      </Grid>

      {syncReport && (
        <Alert severity={syncReport.results.some((item) => item.error) ? "warning" : "success"} sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>
            Last sync diagnostic
          </Typography>
          {syncReport.results.map((item) => (
            <Box key={item.mailbox} sx={{ mb: 0.75 }}>
              <strong>{item.mailbox}</strong>
              {item.address ? ` (${item.address})` : ""}: {item.configured ? "configured" : "not configured"}, imported {item.imported}, updated {item.updated}, skipped {item.skipped}
              {item.error ? ` - ${item.error}` : ""}
            </Box>
          ))}
        </Alert>
      )}


      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={folder === "inbox" ? 6 : 12}>
              <TextField
                label={folder === "inbox" ? "Search sender, subject or message..." : "Search recipient, subject or message..."}
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCurrentPage(1);
                }}
                fullWidth
              />
            </Grid>
            {folder === "inbox" && (
              <>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select value={statusFilter} label="Status" onChange={(event) => { setStatusFilter(event.target.value); setCurrentPage(1); }}>
                      {statusOptions.map((status) => <MenuItem key={status} value={status}>{status === "all" ? "All statuses" : status}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Mailbox</InputLabel>
                    <Select value={mailboxFilter} label="Mailbox" onChange={(event) => { setMailboxFilter(event.target.value); setCurrentPage(1); }}>
                      {mailboxOptions.map((option) => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>
      </Card>

      {folder === "inbox" ? (
        <DataTable
          headers={["From", "Subject", "Status", "Received"]}
          hiddenFields={["id"]}
          rows={inboxRows}
          onView={(id) => void handleViewInbox(id)}
          customActions={(row) => {
            const email = emails.find((item) => item._id === row.id);
            if (!email) return null;
            return (
              <>
                <MenuAction icon={<MarkEmailRead />} label="Mark read" onClick={() => void handleStatusChange(email._id, "read")} color="#0ea5e9" />
                <MenuAction icon={<Reply />} label="Reply" onClick={() => openReplyDialog(email)} color="#16a34a" />
                <MenuAction icon={<MarkEmailRead />} label="Mark replied" onClick={() => void handleStatusChange(email._id, "replied")} color="#16a34a" />
                <MenuAction icon={<Archive />} label="Archive" onClick={() => void handleStatusChange(email._id, "archived")} color="#64748b" />
                <MenuAction icon={<Delete />} label="Delete copy" onClick={() => void handleDeleteInbox(email)} color="#ef4444" />
              </>
            );
          }}
          emptyMessage="No synced emails found"
        />
      ) : (
        <DataTable
          headers={["To", "Subject", "Status", "Date"]}
          hiddenFields={["id"]}
          rows={outboundRows}
          onView={handleViewOutbound}
          customActions={(row) => {
            const email = outboundEmails.find((item) => item._id === row.id);
            if (!email) return null;
            return (
              <>
                {folder === "drafts" && <MenuAction icon={<Create />} label="Edit draft" onClick={() => openComposeDialog(email)} color="#f59e0b" />}
                {folder === "drafts" && <MenuAction icon={<Send />} label="Send draft" onClick={() => void handleSendDraft(email)} color="#16a34a" />}
                <MenuAction icon={<Delete />} label="Delete" onClick={() => void handleDeleteOutbound(email)} color="#ef4444" />
              </>
            );
          }}
          emptyMessage={folder === "sent" ? "No sent emails yet" : "No drafts yet"}
        />
      )}

      {pagination.totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination count={pagination.totalPages} page={currentPage} onChange={(_, page) => setCurrentPage(page)} sx={{ "& .MuiPaginationItem-root.Mui-selected": { backgroundColor: "#EEBA2B", color: "#071a33" } }} />
        </Box>
      )}

      <Dialog open={viewOpen} onClose={() => setViewOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: "#071a33", color: "white" }}>{selectedEmail?.subject || selectedOutbound?.subject || "Email"}</DialogTitle>
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
                    <Box sx={{ mt: 2 }}><StatusChip status={selectedEmail.status} variant={getStatusVariant(selectedEmail.status) as any} /></Box>
                  </Paper>
                </Grid>
              </Grid>
              <Paper sx={{ p: 2.5 }}><Typography sx={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>{selectedEmail.text || selectedEmail.preview || "No readable text content."}</Typography></Paper>
              {selectedEmail.replyMessage && (
                <Paper sx={{ p: 2.5, borderLeft: "5px solid #16a34a", bgcolor: "#f0fdf4" }}>
                  <Typography variant="subtitle2" color="text.secondary">Last reply</Typography>
                  <Typography fontWeight={800}>{selectedEmail.replySubject || "Reply"}</Typography>
                  <Typography variant="caption" color="text.secondary">{formatDate(selectedEmail.repliedAt)} by {selectedEmail.repliedBy || "Admin"}</Typography>
                  <Typography sx={{ mt: 2, whiteSpace: "pre-wrap", lineHeight: 1.7 }}>{selectedEmail.replyMessage}</Typography>
                </Paper>
              )}
            </Box>
          )}
          {selectedOutbound && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Paper sx={{ p: 2.5 }}>
                <Typography variant="subtitle2" color="text.secondary">To</Typography>
                <Typography fontWeight={800}>{selectedOutbound.to?.join(", ") || "No recipient"}</Typography>
                {!!selectedOutbound.cc?.length && <Typography sx={{ mt: 1 }}>CC: {selectedOutbound.cc.join(", ")}</Typography>}
                {!!selectedOutbound.bcc?.length && <Typography sx={{ mt: 1 }}>BCC: {selectedOutbound.bcc.join(", ")}</Typography>}
                <Box sx={{ mt: 2 }}><StatusChip status={selectedOutbound.status} variant={getStatusVariant(selectedOutbound.status) as any} /></Box>
              </Paper>
              <Paper sx={{ p: 2.5 }}><Typography sx={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>{selectedOutbound.body || "No message"}</Typography></Paper>
              {selectedOutbound.error && <Alert severity="error">{selectedOutbound.error}</Alert>}
            </Box>
          )}
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2, flexWrap: "wrap", gap: 1 }}>
          <ActionButton variant="secondary" onClick={() => setViewOpen(false)}>Close</ActionButton>
          {selectedEmail && <ActionButton variant="success" startIcon={<Reply />} onClick={() => openReplyDialog(selectedEmail)}>Reply</ActionButton>}
          {selectedOutbound && folder === "drafts" && <ActionButton variant="primary" startIcon={<Create />} onClick={() => openComposeDialog(selectedOutbound)}>Edit draft</ActionButton>}
        </DialogActions>
      </Dialog>

      <Dialog open={replyOpen} onClose={() => !replyLoading && setReplyOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: "#071a33", color: "white" }}>Reply to {selectedEmail ? getSender(selectedEmail) : "email"}</DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <TextField label="Subject" value={replySubject} onChange={(event) => setReplySubject(event.target.value)} fullWidth required />
            <TextField label="Reply message" value={replyMessage} onChange={(event) => setReplyMessage(event.target.value)} minRows={8} multiline fullWidth required placeholder="Write a clear, professional answer..." />
            <TextField label="Signature" value={replySignature} onChange={(event) => setReplySignature(event.target.value)} minRows={2} multiline fullWidth placeholder="Ex. Deogris, Creativa Poeta" />
            <Alert severity="info">Signature is optional. If filled, it appears under Best regards.</Alert>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <ActionButton variant="secondary" disabled={replyLoading} onClick={() => setReplyOpen(false)}>Cancel</ActionButton>
          <ActionButton variant="primary" disabled={replyLoading} startIcon={<Reply />} onClick={() => void handleReplySubmit()}>{replyLoading ? "Sending..." : "Send reply"}</ActionButton>
        </DialogActions>
      </Dialog>

      <Dialog open={composeOpen} onClose={() => !composeLoading && setComposeOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: "#071a33", color: "white" }}>{editingDraftId ? "Edit draft" : "Compose email"}</DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <TextField label="To" value={composeForm.to} onChange={(event) => setComposeForm((current) => ({ ...current, to: event.target.value }))} fullWidth required placeholder="client@example.com" />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}><TextField label="CC" value={composeForm.cc} onChange={(event) => setComposeForm((current) => ({ ...current, cc: event.target.value }))} fullWidth placeholder="optional@example.com" /></Grid>
              <Grid item xs={12} md={6}><TextField label="BCC" value={composeForm.bcc} onChange={(event) => setComposeForm((current) => ({ ...current, bcc: event.target.value }))} fullWidth placeholder="hidden@example.com" /></Grid>
            </Grid>
            <TextField label="Subject" value={composeForm.subject} onChange={(event) => setComposeForm((current) => ({ ...current, subject: event.target.value }))} fullWidth required />
            <TextField label="Message" value={composeForm.body} onChange={(event) => setComposeForm((current) => ({ ...current, body: event.target.value }))} minRows={10} multiline fullWidth required placeholder="Write your message..." />
            <TextField label="Signature" value={composeForm.signature} onChange={(event) => setComposeForm((current) => ({ ...current, signature: event.target.value }))} minRows={2} multiline fullWidth placeholder="Ex. Deogris, Creativa Poeta" />
            <Alert severity="info">Signature is optional. If filled, it appears under Best regards.</Alert>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1, flexWrap: "wrap" }}>
          <ActionButton variant="secondary" disabled={composeLoading} onClick={() => setComposeOpen(false)}>Cancel</ActionButton>
          <ActionButton variant="secondary" disabled={composeLoading} startIcon={<Drafts />} onClick={() => void handleSaveDraft()}>{composeLoading ? "Saving..." : "Save draft"}</ActionButton>
          <ActionButton variant="primary" disabled={composeLoading} startIcon={<Send />} onClick={() => void handleSendCompose()}>{composeLoading ? "Sending..." : "Send email"}</ActionButton>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>{snackbarMessage}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Emails;
