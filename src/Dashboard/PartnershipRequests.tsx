import { useCallback, useEffect, useMemo, useState } from "react";
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
  Pagination,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Delete from "@mui/icons-material/Delete";
import Handshake from "@mui/icons-material/Handshake";
import HourglassTop from "@mui/icons-material/HourglassTop";
import MarkEmailRead from "@mui/icons-material/MarkEmailRead";
import Pending from "@mui/icons-material/Pending";
import Person from "@mui/icons-material/Person";
import Refresh from "@mui/icons-material/Refresh";
import Reply from "@mui/icons-material/Reply";
import {
  PartnershipRequest,
  PartnershipRequestStatus,
  claimPartnershipRequest,
  deletePartnershipRequest,
  getPartnershipRequest,
  getPartnershipRequests,
  releasePartnershipRequest,
  replyToPartnershipRequest,
  updatePartnershipRequestStatus,
} from "../APIs/PartnershipRequests";
import { useAuth } from "../contexts/useAuth";
import {
  ActionButton,
  DashboardCard,
  DataTable,
  MenuAction,
  PageHeader,
  StatusChip,
} from "./components/DashboardComponents";

const statuses: PartnershipRequestStatus[] = ["pending", "in_progress", "replied", "closed"];

const statusVariant = (status: PartnershipRequestStatus) => {
  if (status === "pending") return "warning" as const;
  if (status === "in_progress") return "info" as const;
  if (status === "replied") return "success" as const;
  return "default" as const;
};

const formatDate = (value?: string) =>
  value
    ? new Intl.DateTimeFormat("fr-BE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value))
    : "-";

const ownerLabel = (request: PartnershipRequest) =>
  request.assignedToName || request.assignedToEmail || "Unassigned";

const isAssignedToAnother = (request: PartnershipRequest, email?: string) =>
  Boolean(
    request.assignedToEmail &&
      request.assignedToEmail.toLowerCase() !== String(email || "").toLowerCase()
  );

export default function PartnershipRequests() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<PartnershipRequest[]>([]);
  const [selected, setSelected] = useState<PartnershipRequest | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRequests, setTotalRequests] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);
  const [subject, setSubject] = useState("Re: Partnership with Creativa Poeta");
  const [replyMessage, setReplyMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<{ message: string; severity: "success" | "error" } | null>(null);

  const replaceRequest = (updated: PartnershipRequest) => {
    setRequests((current) => current.map((item) => (item._id === updated._id ? updated : item)));
    setSelected((current) => (current?._id === updated._id ? updated : current));
  };

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getPartnershipRequests(page, 25, statusFilter);
      setRequests(response.requests || []);
      setTotalPages(response.pagination?.totalPages || 1);
      setTotalRequests(response.pagination?.totalRequests || response.requests?.length || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch partnership requests.");
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter]);

  useEffect(() => {
    void fetchRequests();
  }, [fetchRequests]);

  const filteredRequests = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return requests;
    return requests.filter((request) =>
      [request.name, request.company, request.email, request.phone, request.partnershipType, request.message]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [requests, search]);

  const metrics = useMemo(
    () => ({
      pending: requests.filter((item) => item.status === "pending").length,
      inProgress: requests.filter((item) => item.status === "in_progress").length,
      replied: requests.filter((item) => item.status === "replied").length,
      closed: requests.filter((item) => item.status === "closed").length,
    }),
    [requests]
  );

  const openDetails = async (id: string) => {
    try {
      const response = await getPartnershipRequest(id);
      replaceRequest(response.request);
      setSelected(response.request);
      setDetailsOpen(true);
    } catch (err) {
      setNotice({ message: err instanceof Error ? err.message : "Unable to open request.", severity: "error" });
    }
  };

  const claim = async (request: PartnershipRequest) => {
    try {
      const response = await claimPartnershipRequest(request._id);
      replaceRequest(response.request);
      setNotice({ message: "Partnership request assigned to you.", severity: "success" });
    } catch (err) {
      setNotice({ message: err instanceof Error ? err.message : "Unable to assign request.", severity: "error" });
    }
  };

  const release = async (request: PartnershipRequest) => {
    try {
      const response = await releasePartnershipRequest(request._id);
      replaceRequest(response.request);
      setNotice({ message: "Partnership request released.", severity: "success" });
    } catch (err) {
      setNotice({ message: err instanceof Error ? err.message : "Unable to release request.", severity: "error" });
    }
  };

  const updateStatus = async (status: PartnershipRequestStatus) => {
    if (!selected) return;
    try {
      const response = await updatePartnershipRequestStatus(selected._id, status);
      replaceRequest(response.request);
      setNotice({ message: `Status updated to ${status}.`, severity: "success" });
    } catch (err) {
      setNotice({ message: err instanceof Error ? err.message : "Unable to update status.", severity: "error" });
    }
  };

  const startReply = (request: PartnershipRequest) => {
    setSelected(request);
    setSubject(`Re: Partnership with Creativa Poeta${request.company ? ` - ${request.company}` : ""}`);
    setReplyMessage(`Bonjour ${request.name},\n\nMerci pour votre proposition de partenariat. Nous l'avons bien recue et revenons vers vous avec la suite.\n\nCreativa Poeta`);
    setReplyOpen(true);
  };

  const sendReply = async () => {
    if (!selected || !replyMessage.trim() || !subject.trim()) return;
    try {
      setSubmitting(true);
      const response = await replyToPartnershipRequest(selected._id, replyMessage, subject);
      replaceRequest(response.request);
      setReplyOpen(false);
      setNotice({ message: "Reply sent successfully.", severity: "success" });
    } catch (err) {
      setNotice({ message: err instanceof Error ? err.message : "Unable to send reply.", severity: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const remove = async (request: PartnershipRequest) => {
    if (!window.confirm(`Delete the partnership request from ${request.company || request.name}?`)) return;
    try {
      await deletePartnershipRequest(request._id);
      setRequests((current) => current.filter((item) => item._id !== request._id));
      setDetailsOpen(false);
      setNotice({ message: "Partnership request deleted.", severity: "success" });
    } catch (err) {
      setNotice({ message: err instanceof Error ? err.message : "Unable to delete request.", severity: "error" });
    }
  };

  const rows = filteredRequests.map((request) => ({
    id: request._id,
    Partner: (
      <Box>
        <Typography fontWeight={800}>{request.company || request.name}</Typography>
        <Typography variant="caption" color="text.secondary">{request.name} · {request.email}</Typography>
      </Box>
    ),
    Type: <Chip size="small" label={request.partnershipType} variant="outlined" />,
    Owner: <Chip size="small" icon={<Person />} label={ownerLabel(request)} color={request.assignedToEmail ? "success" : "default"} />,
    Status: <StatusChip status={request.status} variant={statusVariant(request.status)} />,
    Submitted: formatDate(request.createdAt),
  }));

  return (
    <Box sx={{ p: { xs: 0, md: 3 } }}>
      <PageHeader
        title="Partnership Requests"
        subtitle="Review, assign and follow partnership proposals submitted from the website."
        action={<ActionButton variant="secondary" startIcon={<Refresh />} onClick={() => void fetchRequests()}>Refresh</ActionButton>}
      />

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} lg={3}><DashboardCard title="All requests" value={totalRequests} icon={<Handshake />} color="#071a33" /></Grid>
        <Grid item xs={12} sm={6} lg={3}><DashboardCard title="Pending" value={metrics.pending} icon={<Pending />} color="#f59e0b" /></Grid>
        <Grid item xs={12} sm={6} lg={3}><DashboardCard title="In progress" value={metrics.inProgress} icon={<HourglassTop />} color="#0ea5e9" /></Grid>
        <Grid item xs={12} sm={6} lg={3}><DashboardCard title="Replied / closed" value={metrics.replied + metrics.closed} icon={<MarkEmailRead />} color="#16a34a" /></Grid>
      </Grid>

      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField fullWidth label="Search company, contact, type or message..." value={search} onChange={(event) => setSearch(event.target.value)} />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select value={statusFilter} label="Status" onChange={(event) => { setStatusFilter(event.target.value); setPage(1); }}>
                  <MenuItem value="all">All statuses</MenuItem>
                  {statuses.map((status) => <MenuItem key={status} value={status}>{status.replace("_", " ")}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <DataTable
        headers={["Partner", "Type", "Owner", "Status", "Submitted"]}
        rows={rows}
        hiddenFields={["id"]}
        onView={(id) => void openDetails(id)}
        emptyMessage={loading ? "Loading partnership requests..." : "No partnership requests found"}
        customActions={(row) => {
          const request = requests.find((item) => item._id === row.id);
          if (!request) return null;
          return (
            <>
              {!request.assignedToEmail && <MenuAction icon={<Person />} label="Take ownership" onClick={() => void claim(request)} color="#16a34a" />}
              {request.assignedToEmail && !isAssignedToAnother(request, user?.email) && <MenuAction icon={<Person />} label="Release" onClick={() => void release(request)} />}
              <MenuAction icon={<Reply />} label="Reply" onClick={() => startReply(request)} color="#EEBA2B" />
              <MenuAction icon={<Delete />} label="Delete" onClick={() => void remove(request)} color="#ef4444" />
            </>
          );
        }}
      />

      {totalPages > 1 && <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}><Pagination count={totalPages} page={page} onChange={(_, nextPage) => setPage(nextPage)} /></Box>}

      <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: "#071a33", color: "white" }}>Partnership request</DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {selected && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              {isAssignedToAnother(selected, user?.email) && <Alert severity="warning">Already handled by {ownerLabel(selected)}.</Alert>}
              <Grid container spacing={2}>
                <Grid item xs={12} md={7}>
                  <Paper sx={{ p: 2.5, height: "100%" }}>
                    <Typography variant="h6" fontWeight={900}>{selected.company || selected.name}</Typography>
                    <Typography>{selected.name}</Typography>
                    <Typography color="text.secondary">{selected.email}{selected.phone ? ` · ${selected.phone}` : ""}</Typography>
                    <Typography variant="caption" color="text.secondary">Language: {selected.locale} · {formatDate(selected.createdAt)}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={5}>
                  <Paper sx={{ p: 2.5, height: "100%" }}>
                    <Typography variant="subtitle2" color="text.secondary">Partnership type</Typography>
                    <Typography fontWeight={900} sx={{ mb: 1.5 }}>{selected.partnershipType}</Typography>
                    <Chip icon={<Person />} label={ownerLabel(selected)} size="small" />
                  </Paper>
                </Grid>
              </Grid>
              <Paper sx={{ p: 2.5, bgcolor: "#f8fafc" }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Message</Typography>
                <Typography sx={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>{selected.message}</Typography>
              </Paper>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {statuses.map((status) => <ActionButton key={status} size="small" variant={selected.status === status ? "primary" : "secondary"} onClick={() => void updateStatus(status)}>{status.replace("_", " ")}</ActionButton>)}
              </Box>
              {!!selected.activity?.length && (
                <Paper sx={{ p: 2.5 }}>
                  <Typography variant="h6" fontWeight={900} sx={{ mb: 1.5 }}>Activity</Typography>
                  {[...selected.activity].reverse().slice(0, 10).map((item, index) => (
                    <Box key={`${item.at}-${index}`} sx={{ borderLeft: "3px solid #EEBA2B", pl: 1.5, mb: 1.25 }}>
                      <Typography variant="body2" fontWeight={800}>{item.message}</Typography>
                      <Typography variant="caption" color="text.secondary">{item.actorName || item.actorEmail || "Admin"} · {formatDate(item.at)}</Typography>
                    </Box>
                  ))}
                </Paper>
              )}
              {selected.replyMessage && <Alert icon={<CheckCircle />} severity="success"><Typography fontWeight={800}>Reply sent</Typography><Typography sx={{ whiteSpace: "pre-wrap" }}>{selected.replyMessage}</Typography></Alert>}
            </Box>
          )}
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2 }}>
          <ActionButton variant="secondary" onClick={() => setDetailsOpen(false)}>Close</ActionButton>
          {selected && !selected.assignedToEmail && <ActionButton variant="secondary" onClick={() => void claim(selected)}>Take ownership</ActionButton>}
          {selected && <ActionButton variant="primary" startIcon={<Reply />} onClick={() => startReply(selected)}>Reply</ActionButton>}
        </DialogActions>
      </Dialog>

      <Dialog open={replyOpen} onClose={() => setReplyOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: "#EEBA2B", color: "#071a33" }}>Reply to {selected?.company || selected?.name}</DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField fullWidth label="Subject" value={subject} onChange={(event) => setSubject(event.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth multiline rows={8} label="Message" value={replyMessage} onChange={(event) => setReplyMessage(event.target.value)} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <ActionButton variant="secondary" disabled={submitting} onClick={() => setReplyOpen(false)}>Cancel</ActionButton>
          <ActionButton variant="primary" disabled={submitting || !replyMessage.trim()} onClick={() => void sendReply()}>{submitting ? "Sending..." : "Send reply"}</ActionButton>
        </DialogActions>
      </Dialog>

      <Snackbar open={Boolean(notice)} autoHideDuration={5000} onClose={() => setNotice(null)} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert severity={notice?.severity || "success"} onClose={() => setNotice(null)}>{notice?.message}</Alert>
      </Snackbar>
    </Box>
  );
}
