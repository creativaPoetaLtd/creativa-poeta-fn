import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
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
  Checkbox,
  InputLabel,
  ListItemText,
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
import AttachFile from "@mui/icons-material/AttachFile";
import Close from "@mui/icons-material/Close";
import Create from "@mui/icons-material/Create";
import Delete from "@mui/icons-material/Delete";
import Drafts from "@mui/icons-material/Drafts";
import EmailIcon from "@mui/icons-material/Email";
import Forward from "@mui/icons-material/Forward";
import Inbox from "@mui/icons-material/Inbox";
import MarkEmailRead from "@mui/icons-material/MarkEmailRead";
import Refresh from "@mui/icons-material/Refresh";
import Reply from "@mui/icons-material/Reply";
import Send from "@mui/icons-material/Send";
import PersonPin from "@mui/icons-material/PersonPin";
import {
  claimEmail,
  ComposeEmailPayload,
  deleteEmail,
  deleteOutboundEmail,
  EmailFolder,
  EmailMessage,
  EmailStatus,
  forwardEmail,
  getEmail,
  getEmails,
  getOutboundEmails,
  OutboundEmail,
  releaseEmail,
  replyToEmail,
  saveEmailDraft,
  sendComposedEmail,
  sendEmailDraft,
  syncEmails,
  updateEmailDraft,
  updateEmailStatus,
} from "../APIs/Emails";
import { useAuth } from "../contexts/AuthContext";
import { getAdminRoleColor } from "./utils/adminRoleColors";
import {
  ActionButton,
  DashboardCard,
  DataTable,
  MenuAction,
  PageHeader,
  StatusChip,
} from "./components/DashboardComponents";

const allStatusValues: EmailStatus[] = ["new", "read", "replied", "archived"];
const statusLabels: Record<EmailStatus, string> = {
  new: "New",
  read: "Read",
  replied: "Replied",
  archived: "Archived",
};
const sharedMailboxDefaults = ["contact@creativapoeta.com", "contact@creativapoeta.be"];

const normalizeMailbox = (value?: string) => String(value || "").trim().toLowerCase();
const toFilterParam = (selected: string[], allValues: string[]) => {
  const clean = selected.map(normalizeMailbox).filter(Boolean);
  if (!clean.length || clean.length === allValues.length) return "all";
  return clean.join(",");
};

const emptyCompose = { fromEmail: "", to: "", cc: "", bcc: "", subject: "", body: "", signature: "" };
const maxAttachmentCount = 8;
const maxAttachmentTotalBytes = 8 * 1024 * 1024;

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


const formatFileSize = (bytes = 0) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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

const getOwnerLabel = (email: EmailMessage) => email.assignedToName || email.assignedToEmail || "Open";
const getOwnerChipStyles = (email: EmailMessage) => {
  if (!email.assignedToEmail) return {};
  const colors = getAdminRoleColor(email.assignedToRole);
  return {
    bgcolor: colors.backgroundColor,
    color: colors.color,
    borderColor: colors.borderColor,
    fontWeight: 800,
    "& .MuiChip-icon": { color: colors.color },
  };
};
const isAssignedToAnother = (email: EmailMessage, currentEmail?: string) =>
  Boolean(email.assignedToEmail && normalizeMailbox(email.assignedToEmail) !== normalizeMailbox(currentEmail));

const splitEmailList = (value: string) =>
  value
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);

const toComposePayload = (form: ComposeForm, draftId?: string): ComposeEmailPayload => ({
  fromEmail: normalizeMailbox(form.fromEmail),
  to: splitEmailList(form.to),
  cc: splitEmailList(form.cc),
  bcc: splitEmailList(form.bcc),
  subject: form.subject.trim(),
  body: form.body.trim(),
  signature: form.signature.trim(),
  draftId,
});

const fromOutboundEmail = (email: OutboundEmail): ComposeForm => ({
  fromEmail: email.fromEmail || "",
  to: (email.to || []).join(", "),
  cc: (email.cc || []).join(", "),
  bcc: (email.bcc || []).join(", "),
  subject: email.subject || "",
  body: email.body || "",
  signature: email.signature || "",
});

const Emails = () => {
  const { user } = useAuth();
  const [folder, setFolder] = useState<EmailFolder>("inbox");
  const [emails, setEmails] = useState<EmailMessage[]>([]);
  const [outboundEmails, setOutboundEmails] = useState<OutboundEmail[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<EmailMessage | null>(null);
  const [selectedOutbound, setSelectedOutbound] = useState<OutboundEmail | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusFilters, setStatusFilters] = useState<EmailStatus[]>(allStatusValues);
  const [mailboxFilters, setMailboxFilters] = useState<string[]>([]);
  const [serverMailboxes, setServerMailboxes] = useState<string[]>([]);
  const [filtersHydrated, setFiltersHydrated] = useState(false);
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
  const [forwardSourceId, setForwardSourceId] = useState<string | null>(null);
  const [composeForm, setComposeForm] = useState<ComposeForm>(emptyCompose);
  const [editingDraftId, setEditingDraftId] = useState<string | null>(null);
  const [composeAttachments, setComposeAttachments] = useState<File[]>([]);
  const [composeLoading, setComposeLoading] = useState(false);
  const syncingRef = useRef(false);

  const mailboxOptions = useMemo(() => {
    const values = new Set<string>();
    const add = (value?: string) => {
      const normalized = normalizeMailbox(value);
      if (normalized) values.add(normalized);
    };

    const role = String(user?.role || "").toLowerCase();
    const canSeeSharedByDefault = role === "super_admin" || role === "admin_0";

    add(user?.email);
    if (canSeeSharedByDefault) sharedMailboxDefaults.forEach(add);
    serverMailboxes.forEach(add);

    return Array.from(values).map((address) => ({ value: address, label: address }));
  }, [serverMailboxes, user?.email, user?.role]);

  const allMailboxValues = useMemo(() => mailboxOptions.map((option) => option.value), [mailboxOptions]);
  const filterStorageKey = useMemo(() => `cp-email-filters:${normalizeMailbox(user?.email) || "anonymous"}`, [user?.email]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(filterStorageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as { statuses?: EmailStatus[]; mailboxes?: string[] };
        const nextStatuses = (parsed.statuses || []).filter((status): status is EmailStatus => allStatusValues.includes(status as EmailStatus));
        if (nextStatuses.length) setStatusFilters(nextStatuses);
        if (Array.isArray(parsed.mailboxes)) setMailboxFilters(parsed.mailboxes.map(normalizeMailbox).filter(Boolean));
      }
    } catch {
      // Keep defaults if a saved preference is malformed.
    } finally {
      setFiltersHydrated(true);
    }
  }, [filterStorageKey]);

  useEffect(() => {
    if (!filtersHydrated) return;
    window.localStorage.setItem(
      filterStorageKey,
      JSON.stringify({ statuses: statusFilters, mailboxes: mailboxFilters })
    );
  }, [filterStorageKey, filtersHydrated, mailboxFilters, statusFilters]);

  useEffect(() => {
    if (!allMailboxValues.length) return;
    setMailboxFilters((current) => current.filter((mailbox) => allMailboxValues.includes(mailbox)));
  }, [allMailboxValues]);

  const showMessage = (message: string, severity: "success" | "error" | "warning" = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const loadEmails = useCallback(async () => {
    try {
      setLoading(true);

      if (folder === "inbox" || folder === "dmarc") {
        const response = await getEmails(currentPage, 25, toFilterParam(statusFilters, allStatusValues), toFilterParam(mailboxFilters, allMailboxValues), search, folder === "dmarc" ? "dmarc" : "inbox");
        setEmails(response.emails || []);
        const nextServerMailboxes = (response.mailboxes || []).map(normalizeMailbox).filter(Boolean);
        setServerMailboxes((current) => {
          if (current.length === nextServerMailboxes.length && current.every((mailbox, index) => mailbox === nextServerMailboxes[index])) {
            return current;
          }
          return nextServerMailboxes;
        });
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
  }, [allMailboxValues, currentPage, folder, mailboxFilters, search, statusFilters]);

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
            <Typography fontWeight={email.status === "new" ? 900 : 400}>{email.fromName || email.fromEmail || "Unknown sender"}</Typography>
            <Typography variant="caption" color="text.secondary">
              {email.mailboxAddress}
            </Typography>
          </Box>
        ),
        Subject: (
          <Box sx={{ maxWidth: 520 }}>
            <Typography fontWeight={email.status === "new" ? 900 : 400}>{email.subject}</Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {email.preview || "No preview available"}
            </Typography>
          </Box>
        ),
        Owner: (
          <Chip
            size="small"
            icon={<PersonPin />}
            label={getOwnerLabel(email)}
            color={email.assignedToEmail ? undefined : "default"}
            variant={email.assignedToEmail ? "filled" : "outlined"}
            sx={getOwnerChipStyles(email)}
          />
        ),
        Status: <StatusChip status={email.status} variant={getStatusVariant(email.status) as any} />,
        Received: formatDate(email.receivedAt),
      })),
    [emails, user?.email]
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
    setSearch("");
  };

  const runMailboxSync = useCallback(
    async (silent = false) => {
      if (syncingRef.current) return;

      try {
        syncingRef.current = true;
        if (!silent) setSyncing(true);

        const result = await syncEmails(75);
        await loadEmails();

        if (silent) {
          if (result.imported > 0) {
            showMessage(`${result.imported} new email(s) received.`);
          }
          return;
        }

        showMessage(result.imported > 0 ? `${result.imported} new email(s) received.` : "Mailbox sync completed.");
      } catch (syncError) {
        if (!silent) {
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
    if (folder !== "inbox" && folder !== "dmarc") return undefined;

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

  const handleClaimEmail = async (email: EmailMessage) => {
    try {
      const response = await claimEmail(email._id);
      setEmails((current) => current.map((item) => (item._id === email._id ? response.email : item)));
      setSelectedEmail((current) => (current?._id === email._id ? response.email : current));
      showMessage("Email assigned to you.");
    } catch (claimError) {
      showMessage(claimError instanceof Error ? claimError.message : "Failed to assign email.", "error");
    }
  };

  const handleReleaseEmail = async (email: EmailMessage) => {
    try {
      const response = await releaseEmail(email._id);
      setEmails((current) => current.map((item) => (item._id === email._id ? response.email : item)));
      setSelectedEmail((current) => (current?._id === email._id ? response.email : current));
      showMessage("Email released.");
    } catch (releaseError) {
      showMessage(releaseError instanceof Error ? releaseError.message : "Failed to release email.", "error");
    }
  };

  const openReplyDialog = (email: EmailMessage) => {
    setSelectedEmail(email);
    setReplySubject(/^re:/i.test(email.subject) ? email.subject : `Re: ${email.subject || "Your message"}`);
    setReplyMessage("");
    setReplySignature("");
    setReplyOpen(true);
  };

  const openComposeDialog = (draft?: OutboundEmail) => {
    setForwardSourceId(null);
    setEditingDraftId(draft?._id || null);
    const defaultFromEmail = allMailboxValues[0] || "";
    setComposeForm(draft ? { ...fromOutboundEmail(draft), fromEmail: draft.fromEmail || defaultFromEmail } : { ...emptyCompose, fromEmail: defaultFromEmail });
    setComposeAttachments([]);
    setComposeOpen(true);
  };

  const openForwardDialog = (email: EmailMessage) => {
    const mailboxAddress = normalizeMailbox(email.mailboxAddress);
    const defaultFromEmail = allMailboxValues.includes(mailboxAddress) ? mailboxAddress : allMailboxValues[0] || "";
    setSelectedEmail(email);
    setForwardSourceId(email._id);
    setEditingDraftId(null);
    setComposeForm({
      ...emptyCompose,
      fromEmail: defaultFromEmail,
      subject: /^(fw|fwd):/i.test(email.subject || "") ? email.subject : `Fwd: ${email.subject || "Forwarded message"}`,
    });
    setComposeAttachments([]);
    setComposeOpen(true);
  };



  const handleAttachmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    event.target.value = "";
    if (!selectedFiles.length) return;

    const nextFiles = [...composeAttachments, ...selectedFiles];
    if (nextFiles.length > maxAttachmentCount) {
      showMessage(`Maximum ${maxAttachmentCount} attachments are allowed.`, "warning");
      return;
    }

    const totalSize = nextFiles.reduce((total, file) => total + file.size, 0);
    if (totalSize > maxAttachmentTotalBytes) {
      showMessage("Attachments are too large. Maximum total size is 8 MB.", "warning");
      return;
    }

    setComposeAttachments(nextFiles);
  };

  const removeAttachment = (indexToRemove: number) => {
    setComposeAttachments((current) => current.filter((_, index) => index !== indexToRemove));
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
    if (forwardSourceId) {
      showMessage("Forward drafts are not available yet. Send the forwarded email directly.", "warning");
      return;
    }

    if (composeAttachments.length) {
      showMessage("Attachments are sent immediately and cannot be saved in drafts yet.", "warning");
      return;
    }

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
      if (forwardSourceId) await forwardEmail(forwardSourceId, toComposePayload(composeForm), composeAttachments);
      else await sendComposedEmail(toComposePayload(composeForm, editingDraftId || undefined), composeAttachments);
      setComposeOpen(false);
      setEditingDraftId(null);
      setForwardSourceId(null);
      setComposeAttachments([]);
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

  const isInboundFolder = folder === "inbox" || folder === "dmarc";
  const totalInbox = isInboundFolder ? pagination.totalEmails : 0;
  const totalOutbound = !isInboundFolder ? pagination.totalEmails : 0;

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
            {isInboundFolder && (
              <ActionButton variant="primary" startIcon={<Inbox />} onClick={() => void handleSync()} disabled={syncing}>
                {syncing ? "Syncing..." : "Sync mailboxes"}
              </ActionButton>
            )}
          </Box>
        }
      />

      <Tabs value={folder} onChange={handleFolderChange} sx={{ mb: 3 }}>
        <Tab value="inbox" icon={<Inbox />} iconPosition="start" label="Inbox" />
        <Tab value="dmarc" icon={<MarkEmailRead />} iconPosition="start" label="DMARC" />
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
          <DashboardCard title={folder === "dmarc" ? "DMARC Reports" : folder === "inbox" ? "Total Emails" : "Total"} value={isInboundFolder ? totalInbox : totalOutbound} icon={<EmailIcon />} color="#071a33" />
        </Grid>
        {isInboundFolder ? (
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


      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={isInboundFolder ? 6 : 12}>
              <TextField
                label={isInboundFolder ? "Search sender, subject or message..." : "Search recipient, subject or message..."}
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCurrentPage(1);
                }}
                fullWidth
              />
            </Grid>
            {isInboundFolder && (
              <>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      multiple
                      value={statusFilters}
                      label="Status"
                      renderValue={(selected) =>
                        selected.length === allStatusValues.length
                          ? "All statuses"
                          : selected.map((status) => statusLabels[status as EmailStatus]).join(", ")
                      }
                      onChange={(event) => {
                        const value = event.target.value;
                        setStatusFilters(typeof value === "string" ? (value.split(",") as EmailStatus[]) : (value as EmailStatus[]));
                        setCurrentPage(1);
                      }}
                    >
                      {allStatusValues.map((status) => (
                        <MenuItem key={status} value={status}>
                          <Checkbox checked={statusFilters.includes(status)} />
                          <ListItemText primary={statusLabels[status]} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Mailbox</InputLabel>
                    <Select
                      multiple
                      value={mailboxFilters}
                      label="Mailbox"
                      renderValue={(selected) =>
                        selected.length === 0 || selected.length === allMailboxValues.length
                          ? "All mailboxes"
                          : selected.join(", ")
                      }
                      onChange={(event) => {
                        const value = event.target.value;
                        setMailboxFilters(typeof value === "string" ? value.split(",").map(normalizeMailbox) : (value as string[]).map(normalizeMailbox));
                        setCurrentPage(1);
                      }}
                    >
                      {mailboxOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          <Checkbox checked={mailboxFilters.includes(option.value)} />
                          <ListItemText primary={option.label} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>
      </Card>

      {isInboundFolder ? (
        <DataTable
          headers={["From", "Subject", "Owner", "Status", "Received"]}
          hiddenFields={["id"]}
          rows={inboxRows}
          onView={(id) => void handleViewInbox(id)}
          customActions={(row) => {
            const email = emails.find((item) => item._id === row.id);
            if (!email) return null;
            return (
              <>
                {!email.assignedToEmail && <MenuAction icon={<PersonPin />} label="Take ownership" onClick={() => void handleClaimEmail(email)} color="#f59e0b" />}
                {email.assignedToEmail && !isAssignedToAnother(email, user?.email) && <MenuAction icon={<PersonPin />} label="Release" onClick={() => void handleReleaseEmail(email)} color="#64748b" />}
                <MenuAction icon={<MarkEmailRead />} label="Mark read" onClick={() => void handleStatusChange(email._id, "read")} color="#0ea5e9" />
                <MenuAction icon={<Reply />} label="Reply" onClick={() => openReplyDialog(email)} color="#16a34a" />
                <MenuAction icon={<Forward />} label="Forward" onClick={() => openForwardDialog(email)} color="#2563eb" />
                <MenuAction icon={<MarkEmailRead />} label="Mark replied" onClick={() => void handleStatusChange(email._id, "replied")} color="#16a34a" />
                <MenuAction icon={<Archive />} label="Archive" onClick={() => void handleStatusChange(email._id, "archived")} color="#64748b" />
                <MenuAction icon={<Delete />} label="Delete copy" onClick={() => void handleDeleteInbox(email)} color="#ef4444" />
              </>
            );
          }}
          emptyMessage={folder === "dmarc" ? "No DMARC reports found" : "No synced emails found"}
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
              {isAssignedToAnother(selectedEmail, user?.email) && (
                <Alert severity="warning">
                  This email is already handled by {selectedEmail.assignedToName || selectedEmail.assignedToEmail}. Check the shared history before replying.
                </Alert>
              )}
              <Paper sx={{ p: 2.5, display: "flex", alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Owner</Typography>
                  <Typography fontWeight={900}>{getOwnerLabel(selectedEmail)}</Typography>
                  {selectedEmail.assignedAt && <Typography variant="caption" color="text.secondary">Since {formatDate(selectedEmail.assignedAt)}</Typography>}
                </Box>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {!selectedEmail.assignedToEmail && <ActionButton variant="primary" startIcon={<PersonPin />} onClick={() => void handleClaimEmail(selectedEmail)}>Take ownership</ActionButton>}
                  {selectedEmail.assignedToEmail && !isAssignedToAnother(selectedEmail, user?.email) && <ActionButton variant="secondary" startIcon={<PersonPin />} onClick={() => void handleReleaseEmail(selectedEmail)}>Release</ActionButton>}
                </Box>
              </Paper>
              <Paper sx={{ p: 2.5 }}><Typography sx={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>{selectedEmail.text || selectedEmail.preview || "No readable text content."}</Typography></Paper>
              {selectedEmail.replyMessage && (
                <Paper sx={{ p: 2.5, borderLeft: "5px solid #16a34a", bgcolor: "#f0fdf4" }}>
                  <Typography variant="subtitle2" color="text.secondary">Last reply</Typography>
                  <Typography fontWeight={800}>{selectedEmail.replySubject || "Reply"}</Typography>
                  <Typography variant="caption" color="text.secondary">{formatDate(selectedEmail.repliedAt)} by {selectedEmail.repliedBy || "Admin"}</Typography>
                  <Typography sx={{ mt: 2, whiteSpace: "pre-wrap", lineHeight: 1.7 }}>{selectedEmail.replyMessage}</Typography>
                </Paper>
              )}
              {!!selectedEmail.activity?.length && (
                <Paper sx={{ p: 2.5 }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Shared history</Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {selectedEmail.activity.slice().reverse().slice(0, 12).map((event, index) => (
                      <Box key={`${event.createdAt || event.type}-${index}`} sx={{ display: "flex", justifyContent: "space-between", gap: 2, borderBottom: index === Math.min((selectedEmail.activity?.length || 1), 12) - 1 ? "none" : "1px solid #e2e8f0", pb: 1 }}>
                        <Box>
                          <Typography fontWeight={800}>{event.message || event.type}</Typography>
                          <Typography variant="caption" color="text.secondary">{event.actorName || event.actorEmail || "Admin"}</Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: "nowrap" }}>{formatDate(event.createdAt)}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              )}            </Box>
          )}
          {selectedOutbound && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Paper sx={{ p: 2.5 }}>
                <Typography variant="subtitle2" color="text.secondary">To</Typography>
                <Typography fontWeight={800}>{selectedOutbound.to?.join(", ") || "No recipient"}</Typography>
                {!!selectedOutbound.cc?.length && <Typography sx={{ mt: 1 }}>CC: {selectedOutbound.cc.join(", ")}</Typography>}
                {!!selectedOutbound.bcc?.length && <Typography sx={{ mt: 1 }}>BCC: {selectedOutbound.bcc.join(", ")}</Typography>}
                <Box sx={{ mt: 2 }}><StatusChip status={selectedOutbound.status} variant={getStatusVariant(selectedOutbound.status) as any} /></Box>
                {!!selectedOutbound.attachments?.length && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">Attachments</Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                      {selectedOutbound.attachments.map((attachment, index) => (
                        <Chip key={`${attachment.filename}-${index}`} icon={<AttachFile />} label={`${attachment.filename} (${formatFileSize(attachment.size || 0)})`} />
                      ))}
                    </Box>
                  </Box>
                )}
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
          {selectedEmail && <ActionButton variant="secondary" startIcon={<Forward />} onClick={() => openForwardDialog(selectedEmail)}>Forward</ActionButton>}
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
        <DialogTitle sx={{ bgcolor: "#071a33", color: "white" }}>{forwardSourceId ? "Forward email" : editingDraftId ? "Edit draft" : "Compose email"}</DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <TextField select label="From" value={composeForm.fromEmail} onChange={(event) => setComposeForm((current) => ({ ...current, fromEmail: event.target.value }))} fullWidth required>
              {mailboxOptions.map((option) => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
            </TextField>
            <TextField label="To" value={composeForm.to} onChange={(event) => setComposeForm((current) => ({ ...current, to: event.target.value }))} fullWidth required placeholder="client@example.com" />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}><TextField label="CC" value={composeForm.cc} onChange={(event) => setComposeForm((current) => ({ ...current, cc: event.target.value }))} fullWidth placeholder="optional@example.com" /></Grid>
              <Grid item xs={12} md={6}><TextField label="BCC" value={composeForm.bcc} onChange={(event) => setComposeForm((current) => ({ ...current, bcc: event.target.value }))} fullWidth placeholder="hidden@example.com" /></Grid>
            </Grid>
            <TextField label="Subject" value={composeForm.subject} onChange={(event) => setComposeForm((current) => ({ ...current, subject: event.target.value }))} fullWidth required />
            <TextField label="Message" value={composeForm.body} onChange={(event) => setComposeForm((current) => ({ ...current, body: event.target.value }))} minRows={10} multiline fullWidth required placeholder="Write your message..." />
            <TextField label="Signature" value={composeForm.signature} onChange={(event) => setComposeForm((current) => ({ ...current, signature: event.target.value }))} minRows={2} multiline fullWidth placeholder="Ex. Deogris, Creativa Poeta" />
            <Alert severity="info">Signature is optional. If filled, it appears under Best regards.</Alert>
            <Box sx={{ border: "1px dashed #cbd5e1", borderRadius: 2, p: 2, bgcolor: "#f8fafc" }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Attachments</Typography>
                  <Typography variant="caption" color="text.secondary">Any file type, up to 8 files / 8 MB total.</Typography>
                </Box>
                <Button variant="outlined" component="label" startIcon={<AttachFile />} disabled={composeLoading} sx={{ borderRadius: 999, fontWeight: 800 }}>
                  Add files
                  <input hidden multiple type="file" onChange={handleAttachmentChange} />
                </Button>
              </Box>
              {composeAttachments.length > 0 && (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1.5 }}>
                  {composeAttachments.map((file, index) => (
                    <Chip
                      key={`${file.name}-${file.size}-${index}`}
                      icon={<AttachFile />}
                      label={`${file.name} (${formatFileSize(file.size)})`}
                      onDelete={() => removeAttachment(index)}
                      deleteIcon={<Close />}
                      sx={{ maxWidth: "100%", "& .MuiChip-label": { overflow: "hidden", textOverflow: "ellipsis" } }}
                    />
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1, flexWrap: "wrap" }}>
          <ActionButton variant="secondary" disabled={composeLoading} onClick={() => setComposeOpen(false)}>Cancel</ActionButton>
          {!forwardSourceId && <ActionButton variant="secondary" disabled={composeLoading} startIcon={<Drafts />} onClick={() => void handleSaveDraft()}>{composeLoading ? "Saving..." : "Save draft"}</ActionButton>}
          <ActionButton variant="primary" disabled={composeLoading} startIcon={<Send />} onClick={() => void handleSendCompose()}>{composeLoading ? "Sending..." : forwardSourceId ? "Forward email" : "Send email"}</ActionButton>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={() => setSnackbarOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>{snackbarMessage}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Emails;


