import {
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import AssignmentInd from "@mui/icons-material/AssignmentInd";
import CheckCircle from "@mui/icons-material/CheckCircle";
import DoneAll from "@mui/icons-material/DoneAll";
import MarkChatRead from "@mui/icons-material/MarkChatRead";
import MoreTime from "@mui/icons-material/MoreTime";
import PersonOff from "@mui/icons-material/PersonOff";
import Refresh from "@mui/icons-material/Refresh";
import Search from "@mui/icons-material/Search";
import Send from "@mui/icons-material/Send";
import StickyNote2 from "@mui/icons-material/StickyNote2";
import WarningAmber from "@mui/icons-material/WarningAmber";
import WhatsApp from "@mui/icons-material/WhatsApp";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  addWhatsAppConversationNote,
  claimWhatsAppConversation,
  getWhatsAppConversation,
  getWhatsAppConversations,
  getWhatsAppSummary,
  releaseWhatsAppConversation,
  replyToWhatsAppConversation,
  updateWhatsAppConversationStatus,
  WhatsAppConversation,
  WhatsAppConversationStatus,
  WhatsAppMessage,
  WhatsAppSummary,
} from "../APIs/WhatsApp";
import { API_BASE_URL } from "../APIs/client";
import { useAuth } from "../contexts/useAuth";
import { ActionButton, PageHeader } from "./components/DashboardComponents";

const statusOptions: Array<{ value: WhatsAppConversationStatus; label: string }> = [
  { value: "open", label: "Open" },
  { value: "waiting", label: "Waiting for client" },
  { value: "resolved", label: "Resolved" },
  { value: "closed", label: "Closed" },
  { value: "spam", label: "Spam" },
];

const rootRoles = ["super_admin", "admin_0"];
const normalizeEmail = (value?: string) => (value || "").trim().toLowerCase();

const formatDate = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("fr-BE", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatPhone = (waId: string) => (waId.startsWith("+") ? waId : `+${waId}`);

const getStatusColor = (status: WhatsAppConversationStatus) => {
  if (status === "open") return "#16a34a";
  if (status === "waiting") return "#f59e0b";
  if (status === "resolved") return "#2563eb";
  if (status === "spam") return "#dc2626";
  return "#64748b";
};

const isWindowOpen = (conversation?: WhatsAppConversation | null) =>
  Boolean(
    conversation?.serviceWindowExpiresAt &&
      new Date(conversation.serviceWindowExpiresAt).getTime() > Date.now()
  );

const ownerLabel = (conversation: WhatsAppConversation) =>
  conversation.assignedToName || conversation.assignedToEmail || "Unassigned";

const emptySummary: WhatsAppSummary = {
  configured: false,
  metrics: { open: 0, waiting: 0, unread: 0, unassigned: 0, assignedToMe: 0, resolved: 0, spam: 0, attention: 0 },
};

export default function WhatsAppInbox() {
  const { user } = useAuth();
  const theme = useTheme();
  const compact = useMediaQuery(theme.breakpoints.down("md"));
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const [summary, setSummary] = useState<WhatsAppSummary>(emptySummary);
  const [conversations, setConversations] = useState<WhatsAppConversation[]>([]);
  const [selected, setSelected] = useState<WhatsAppConversation | null>(null);
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [configured, setConfigured] = useState(false);
  const [statusFilter, setStatusFilter] = useState<WhatsAppConversationStatus | "all">("all");
  const [ownerFilter, setOwnerFilter] = useState<"all" | "mine" | "unassigned">("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [reply, setReply] = useState("");
  const [note, setNote] = useState("");
  const [notice, setNotice] = useState<{ message: string; severity: "success" | "error" } | null>(null);

  const userPermissions = useMemo(() => new Set(user?.permissions || []), [user?.permissions]);
  const canReply = rootRoles.includes(user?.role || "") || userPermissions.has("whatsapp:reply");
  const ownedByAnother = Boolean(
    selected?.assignedToEmail &&
      normalizeEmail(selected.assignedToEmail) !== normalizeEmail(user?.email)
  );

  const replaceConversation = useCallback((conversation: WhatsAppConversation) => {
    setConversations((current) =>
      current.map((item) => (item._id === conversation._id ? conversation : item))
    );
    setSelected((current) => (current?._id === conversation._id ? conversation : current));
  }, []);

  const loadSummary = useCallback(async () => {
    const result = await getWhatsAppSummary();
    setSummary(result);
    setConfigured(result.configured);
  }, []);

  const loadConversations = useCallback(
    async (silent = false) => {
      try {
        if (!silent) setLoading(true);
        const result = await getWhatsAppConversations({
          page,
          limit: 30,
          status: statusFilter,
          owner: ownerFilter,
          search: debouncedSearch,
        });
        setConversations(result.conversations || []);
        setTotalPages(result.pagination?.totalPages || 1);
        setConfigured(result.configured);
      } catch (error) {
        if (!silent) {
          setNotice({
            message: error instanceof Error ? error.message : "Unable to load WhatsApp conversations.",
            severity: "error",
          });
        }
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [debouncedSearch, ownerFilter, page, statusFilter]
  );

  const loadConversation = useCallback(async (id: string, silent = false) => {
    try {
      if (!silent) setDetailLoading(true);
      const result = await getWhatsAppConversation(id);
      setSelected(result.conversation);
      setMessages(result.messages || []);
      setConfigured(result.configured);
      setConversations((current) =>
        current.map((item) =>
          item._id === result.conversation._id
            ? { ...result.conversation, unreadCount: 0 }
            : item
        )
      );
    } catch (error) {
      if (!silent) {
        setNotice({
          message: error instanceof Error ? error.message : "Unable to open the conversation.",
          severity: "error",
        });
      }
    } finally {
      if (!silent) setDetailLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedSearch(search.trim()), 350);
    return () => window.clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, ownerFilter, statusFilter]);

  useEffect(() => {
    void Promise.all([loadConversations(), loadSummary()]).catch((error) =>
      setNotice({
        message: error instanceof Error ? error.message : "Unable to load WhatsApp inbox.",
        severity: "error",
      })
    );
  }, [loadConversations, loadSummary]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      void loadConversations(true);
      void loadSummary().catch(() => undefined);
      if (selected?._id) void loadConversation(selected._id, true);
    }, 10000);
    return () => window.clearInterval(interval);
  }, [loadConversation, loadConversations, loadSummary, selected?._id]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, selected?._id]);

  useEffect(() => {
    if (!compact && !selected && conversations[0]?._id) {
      void loadConversation(conversations[0]._id);
    }
  }, [compact, conversations, loadConversation, selected]);

  const refreshAll = async () => {
    await Promise.all([
      loadConversations(),
      loadSummary(),
      selected?._id ? loadConversation(selected._id) : Promise.resolve(),
    ]);
  };

  const runConversationAction = async (
    action: () => Promise<{ conversation: WhatsAppConversation; message: string }>
  ) => {
    try {
      setSubmitting(true);
      const result = await action();
      replaceConversation(result.conversation);
      setNotice({ message: result.message, severity: "success" });
      await loadSummary();
    } catch (error) {
      setNotice({
        message: error instanceof Error ? error.message : "The action could not be completed.",
        severity: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const sendReply = async () => {
    if (!selected || !reply.trim()) return;
    try {
      setSubmitting(true);
      const result = await replyToWhatsAppConversation(selected._id, reply.trim());
      replaceConversation(result.conversation);
      setMessages((current) => [...current, result.sentMessage]);
      setReply("");
      setNotice({ message: "WhatsApp reply sent.", severity: "success" });
      await loadSummary();
    } catch (error) {
      setNotice({
        message: error instanceof Error ? error.message : "The reply could not be sent.",
        severity: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const saveNote = async () => {
    if (!selected || !note.trim()) return;
    await runConversationAction(() => addWhatsAppConversationNote(selected._id, note.trim()));
    setNote("");
  };

  const metricItems = [
    { label: "Unread", value: summary.metrics.unread, icon: <MarkChatRead />, color: "#16a34a" },
    { label: "Unassigned", value: summary.metrics.unassigned, icon: <PersonOff />, color: "#f59e0b" },
    { label: "Waiting", value: summary.metrics.waiting, icon: <MoreTime />, color: "#2563eb" },
    { label: "Resolved", value: summary.metrics.resolved, icon: <CheckCircle />, color: "#64748b" },
  ];

  return (
    <Box sx={{ p: { xs: 1.5, sm: 2.5, lg: 3 } }}>
      <PageHeader
        title="WhatsApp Inbox"
        subtitle="A shared workspace for client conversations, ownership and follow-up."
        action={
          <ActionButton variant="secondary" startIcon={<Refresh />} onClick={() => void refreshAll()}>
            Refresh
          </ActionButton>
        }
      />

      {!configured && (
        <Alert severity="warning" icon={<WarningAmber />} sx={{ mb: 2.5, borderRadius: 2 }}>
          <Typography fontWeight={800}>Meta connection required</Typography>
          Add the WhatsApp Cloud API secrets to the backend, then configure this webhook in Meta:
          <Box component="code" sx={{ display: "block", mt: 0.75, wordBreak: "break-all" }}>
            {API_BASE_URL}/api/whatsapp/webhook
          </Box>
        </Alert>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", lg: "repeat(4, minmax(0, 1fr))" },
          gap: 1.5,
          mb: 2.5,
        }}
      >
        {metricItems.map((item) => (
          <Paper
            key={item.label}
            variant="outlined"
            sx={{ p: 1.75, borderRadius: 2.5, display: "flex", alignItems: "center", gap: 1.5 }}
          >
            <Avatar sx={{ bgcolor: alpha(item.color, 0.12), color: item.color, width: 42, height: 42 }}>
              {item.icon}
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight={900} color="#0f172a" lineHeight={1}>
                {item.value}
              </Typography>
              <Typography variant="caption" color="text.secondary" fontWeight={700}>
                {item.label}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      <Paper
        variant="outlined"
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          minHeight: 680,
          height: { md: "calc(100vh - 315px)", xs: "auto" },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "350px minmax(0, 1fr)" },
          bgcolor: "#f8fafc",
        }}
      >
        <Box
          sx={{
            borderRight: { md: "1px solid #e2e8f0" },
            display: compact && selected ? "none" : "flex",
            flexDirection: "column",
            minWidth: 0,
            bgcolor: "white",
          }}
        >
          <Box sx={{ p: 1.5, borderBottom: "1px solid #e2e8f0" }}>
            <TextField
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, phone or message"
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, mt: 1 }}>
              <FormControl size="small" fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(event) =>
                    setStatusFilter(event.target.value as WhatsAppConversationStatus | "all")
                  }
                >
                  <MenuItem value="all">All statuses</MenuItem>
                  {statusOptions.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="small" fullWidth>
                <InputLabel>Owner</InputLabel>
                <Select
                  value={ownerFilter}
                  label="Owner"
                  onChange={(event) =>
                    setOwnerFilter(event.target.value as "all" | "mine" | "unassigned")
                  }
                >
                  <MenuItem value="all">Everyone</MenuItem>
                  <MenuItem value="mine">Mine</MenuItem>
                  <MenuItem value="unassigned">Unassigned</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box sx={{ flex: 1, overflowY: "auto", minHeight: 420 }}>
            {loading ? (
              <Box sx={{ p: 5, display: "flex", justifyContent: "center" }}>
                <CircularProgress size={28} />
              </Box>
            ) : conversations.length === 0 ? (
              <Box sx={{ p: 4, textAlign: "center", color: "text.secondary" }}>
                <WhatsApp sx={{ fontSize: 42, color: "#cbd5e1", mb: 1 }} />
                <Typography fontWeight={800}>No conversations yet</Typography>
                <Typography variant="body2">New client messages will appear here.</Typography>
              </Box>
            ) : (
              conversations.map((conversation) => {
                const active = selected?._id === conversation._id;
                return (
                  <Box
                    component="button"
                    type="button"
                    key={conversation._id}
                    onClick={() => void loadConversation(conversation._id)}
                    sx={{
                      width: "100%",
                      border: 0,
                      borderBottom: "1px solid #eef2f7",
                      bgcolor: active ? alpha("#25D366", 0.08) : "white",
                      px: 1.5,
                      py: 1.4,
                      display: "flex",
                      gap: 1.25,
                      textAlign: "left",
                      cursor: "pointer",
                      font: "inherit",
                      "&:hover": { bgcolor: active ? alpha("#25D366", 0.1) : "#f8fafc" },
                    }}
                  >
                    <Badge badgeContent={conversation.unreadCount} color="success" max={99}>
                      <Avatar sx={{ bgcolor: "#dcfce7", color: "#15803d", fontWeight: 900 }}>
                        {(conversation.displayName || conversation.waId).charAt(0).toUpperCase()}
                      </Avatar>
                    </Badge>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
                        <Typography fontWeight={900} noWrap color="#0f172a">
                          {conversation.displayName || formatPhone(conversation.waId)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>
                          {formatDate(conversation.lastMessageAt)}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {conversation.lastDirection === "outbound" ? "You: " : ""}
                        {conversation.lastMessagePreview || "New conversation"}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mt: 0.75 }}>
                        <Box
                          sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: getStatusColor(conversation.status) }}
                        />
                        <Typography variant="caption" color="text.secondary" noWrap>
                          {ownerLabel(conversation)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                );
              })
            )}
          </Box>
          {totalPages > 1 && (
            <Box sx={{ p: 1, display: "flex", justifyContent: "center", borderTop: "1px solid #e2e8f0" }}>
              <Pagination size="small" count={totalPages} page={page} onChange={(_, value) => setPage(value)} />
            </Box>
          )}
        </Box>

        {!selected ? (
          <Box
            sx={{
              display: compact ? "none" : "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 520,
              p: 4,
              textAlign: "center",
            }}
          >
            <Box>
              <Avatar sx={{ width: 72, height: 72, bgcolor: "#dcfce7", color: "#16a34a", mx: "auto", mb: 2 }}>
                <WhatsApp sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h6" fontWeight={900}>Select a conversation</Typography>
              <Typography color="text.secondary">Open a client message to reply or take ownership.</Typography>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0, minHeight: { xs: 680, md: 0 } }}>
            <Box
              sx={{
                px: { xs: 1.25, sm: 2 },
                py: 1.25,
                bgcolor: "white",
                borderBottom: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", minWidth: 0, gap: 1 }}>
                {compact && (
                  <IconButton onClick={() => setSelected(null)} aria-label="Back to conversations">
                    <ArrowBack />
                  </IconButton>
                )}
                <Avatar sx={{ bgcolor: "#dcfce7", color: "#15803d", width: 40, height: 40 }}>
                  {(selected.displayName || selected.waId).charAt(0).toUpperCase()}
                </Avatar>
                <Box sx={{ minWidth: 0 }}>
                  <Typography fontWeight={900} noWrap>{selected.displayName || formatPhone(selected.waId)}</Typography>
                  <Typography variant="caption" color="text.secondary">{formatPhone(selected.waId)}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Tooltip title={ownerLabel(selected)}>
                  <Chip
                    size="small"
                    icon={<AssignmentInd />}
                    label={selected.assignedToEmail ? ownerLabel(selected) : "Unassigned"}
                    color={ownedByAnother ? "warning" : selected.assignedToEmail ? "success" : "default"}
                    sx={{ display: { xs: "none", sm: "flex" }, maxWidth: 180 }}
                  />
                </Tooltip>
                <FormControl size="small" sx={{ minWidth: { xs: 110, sm: 150 } }}>
                  <Select
                    value={selected.status}
                    disabled={!canReply || ownedByAnother || submitting}
                    onChange={(event) =>
                      void runConversationAction(() =>
                        updateWhatsAppConversationStatus(
                          selected._id,
                          event.target.value as WhatsAppConversationStatus
                        )
                      )
                    }
                  >
                    {statusOptions.map((item) => (
                      <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {ownedByAnother && (
              <Alert severity="warning" sx={{ borderRadius: 0 }}>
                {ownerLabel(selected)} is handling this conversation. Replies are locked to prevent duplicates.
              </Alert>
            )}

            <Box
              sx={{
                flex: 1,
                minHeight: 0,
                display: "grid",
                gridTemplateColumns: { xs: "1fr", xl: "minmax(0, 1fr) 285px" },
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0, minHeight: 0 }}>
                <Box
                  sx={{
                    flex: 1,
                    overflowY: "auto",
                    p: { xs: 1.5, sm: 2.5 },
                    background:
                      "radial-gradient(circle at top right, rgba(37,211,102,0.08), transparent 24rem), #f1f5f9",
                  }}
                >
                  {detailLoading ? (
                    <Box sx={{ py: 8, display: "flex", justifyContent: "center" }}><CircularProgress size={30} /></Box>
                  ) : (
                    <Stack spacing={1.25}>
                      {messages.map((message) => {
                        const outbound = message.direction === "outbound";
                        return (
                          <Box key={message._id} sx={{ alignSelf: outbound ? "flex-end" : "flex-start", maxWidth: "78%" }}>
                            <Paper
                              elevation={0}
                              sx={{
                                px: 1.5,
                                py: 1,
                                borderRadius: outbound ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                                bgcolor: outbound ? "#dcf8c6" : "white",
                                border: "1px solid",
                                borderColor: outbound ? "#bbefae" : "#e2e8f0",
                              }}
                            >
                              <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
                                {message.text || message.mediaCaption || `[${message.type}]`}
                              </Typography>
                              {(message.mediaFilename || message.mediaMimeType) && (
                                <Chip
                                  size="small"
                                  label={message.mediaFilename || message.mediaMimeType}
                                  sx={{ mt: 0.75 }}
                                />
                              )}
                              <Box sx={{ mt: 0.5, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 0.4 }}>
                                <Typography variant="caption" color="text.secondary">
                                  {formatDate(message.providerTimestamp || message.createdAt)}
                                </Typography>
                                {outbound && (
                                  <DoneAll
                                    sx={{
                                      fontSize: 15,
                                      color: message.status === "read" ? "#1687d9" : message.status === "failed" ? "#dc2626" : "#64748b",
                                    }}
                                  />
                                )}
                              </Box>
                            </Paper>
                            {message.status === "failed" && (
                              <Typography variant="caption" color="error" sx={{ display: "block", mt: 0.25 }}>
                                {message.errorMessage || "Delivery failed"}
                              </Typography>
                            )}
                          </Box>
                        );
                      })}
                      <div ref={messageEndRef} />
                    </Stack>
                  )}
                </Box>

                <Box sx={{ p: 1.5, bgcolor: "white", borderTop: "1px solid #e2e8f0" }}>
                  {!isWindowOpen(selected) && (
                    <Alert severity="info" sx={{ mb: 1.25, py: 0.25 }}>
                      The 24-hour reply window is closed. An approved Meta template will be required.
                    </Alert>
                  )}
                  <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1 }}>
                    <TextField
                      value={reply}
                      onChange={(event) => setReply(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                          event.preventDefault();
                          if (reply.trim()) void sendReply();
                        }
                      }}
                      placeholder="Write a WhatsApp reply..."
                      multiline
                      maxRows={5}
                      fullWidth
                      disabled={!configured || !canReply || ownedByAnother || !isWindowOpen(selected) || submitting}
                    />
                    <IconButton
                      onClick={() => void sendReply()}
                      disabled={!reply.trim() || !configured || !canReply || ownedByAnother || !isWindowOpen(selected) || submitting}
                      aria-label="Send WhatsApp reply"
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: "#25D366",
                        color: "white",
                        "&:hover": { bgcolor: "#1daa52" },
                        "&.Mui-disabled": { bgcolor: "#e2e8f0" },
                      }}
                    >
                      {submitting ? <CircularProgress size={20} /> : <Send />}
                    </IconButton>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  display: { xs: "block", xl: "block" },
                  borderLeft: { xl: "1px solid #e2e8f0" },
                  borderTop: { xs: "1px solid #e2e8f0", xl: 0 },
                  bgcolor: "white",
                  p: 1.75,
                  overflowY: "auto",
                }}
              >
                <Typography fontWeight={900} sx={{ mb: 1 }}>Ownership</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.25 }}>
                  {ownerLabel(selected)}
                </Typography>
                {canReply && !selected.assignedToEmail && (
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<AssignmentInd />}
                    disabled={submitting}
                    onClick={() => void runConversationAction(() => claimWhatsAppConversation(selected._id))}
                    sx={{ bgcolor: "#071a33", "&:hover": { bgcolor: "#0f2c51" } }}
                  >
                    Take ownership
                  </Button>
                )}
                {canReply && selected.assignedToEmail && !ownedByAnother && (
                  <Button
                    fullWidth
                    variant="outlined"
                    disabled={submitting}
                    onClick={() => void runConversationAction(() => releaseWhatsAppConversation(selected._id))}
                  >
                    Release
                  </Button>
                )}

                <Divider sx={{ my: 2 }} />
                <Typography fontWeight={900} sx={{ mb: 1 }}>Internal note</Typography>
                <TextField
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Visible to the team only"
                  multiline
                  minRows={3}
                  fullWidth
                  size="small"
                  disabled={!canReply || submitting}
                />
                <Button
                  variant="text"
                  startIcon={<StickyNote2 />}
                  disabled={!note.trim() || !canReply || submitting}
                  onClick={() => void saveNote()}
                  sx={{ mt: 0.75 }}
                >
                  Add note
                </Button>

                <Divider sx={{ my: 2 }} />
                <Typography fontWeight={900} sx={{ mb: 1 }}>Shared history</Typography>
                <Stack spacing={1.25}>
                  {[...(selected.activity || [])]
                    .reverse()
                    .filter((activity) => activity.type !== "inbound")
                    .slice(0, 15)
                    .map((activity, index) => (
                      <Box key={activity._id || `${activity.at}-${index}`} sx={{ borderLeft: "3px solid #25D366", pl: 1 }}>
                        <Typography variant="body2" fontWeight={700}>{activity.message}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {activity.actorName || activity.actorEmail || "System"} · {formatDate(activity.at)}
                        </Typography>
                      </Box>
                    ))}
                  {!selected.activity?.some((activity) => activity.type !== "inbound") && (
                    <Typography variant="body2" color="text.secondary">No team activity yet.</Typography>
                  )}
                </Stack>
              </Box>
            </Box>
          </Box>
        )}
      </Paper>

      <Snackbar
        open={Boolean(notice)}
        autoHideDuration={5000}
        onClose={() => setNotice(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={notice?.severity || "success"} onClose={() => setNotice(null)} sx={{ width: "100%" }}>
          {notice?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
