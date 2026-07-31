import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  createInternalConversation,
  getInternalConversations,
  InternalConversation,
  InternalGroupMeta,
  InternalUserOption,
  markInternalConversationRead,
  sendInternalMessage,
} from "../APIs/internalMessages";
import { useAuth } from "../contexts/AuthContext";

const getId = (conversation: InternalConversation) => conversation.id || conversation._id || "";

const formatDate = (value?: string) => {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
};

const fallbackGroupMeta = (groupKey?: string): InternalGroupMeta => ({
  key: groupKey || "CPG",
  label: groupKey || "Group",
  levels: [],
  ownerLevel: 5,
  color: "#475569",
  background: "#f8fafc",
});

const InternalMessages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<InternalConversation[]>([]);
  const [groups, setGroups] = useState<InternalGroupMeta[]>([]);
  const [users, setUsers] = useState<InternalUserOption[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newRecipients, setNewRecipients] = useState<InternalUserOption[]>([]);
  const [newBody, setNewBody] = useState("");

  const currentEmail = user?.email?.toLowerCase() || "";
  const selectedConversation = useMemo(
    () => conversations.find((conversation) => getId(conversation) === selectedId),
    [conversations, selectedId]
  );

  const activeConversations = useMemo(
    () => conversations.filter((conversation) => conversation.type !== "group" || conversation.hasMessages || conversation.unreadCount > 0),
    [conversations]
  );

  const emptyGroupConversations = useMemo(
    () => conversations.filter((conversation) => conversation.type === "group" && !conversation.hasMessages && conversation.unreadCount === 0),
    [conversations]
  );

  const selectableUsers = useMemo(
    () => users.filter((item) => item.email.toLowerCase() !== currentEmail),
    [currentEmail, users]
  );

  const loadConversations = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getInternalConversations();
      const nextConversations = response.conversations || [];
      setConversations(nextConversations);
      setGroups(response.groups || []);
      setUsers(response.users || []);
      if (!selectedId && nextConversations.length) {
        const firstActive = nextConversations.find((conversation) => conversation.type !== "group" || conversation.hasMessages || conversation.unreadCount > 0);
        setSelectedId(getId(firstActive || nextConversations[0]));
      }
    } catch (err: any) {
      setError(err?.message || "Unable to load internal messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    const markRead = async () => {
      if (!selectedId) return;
      try {
        const response = await markInternalConversationRead(selectedId);
        setConversations((items) =>
          items.map((item) => (getId(item) === selectedId ? response.conversation : item))
        );
      } catch {
        // Read status should not block the inbox.
      }
    };

    markRead();
  }, [selectedId]);

  const handleSend = async () => {
    if (!selectedId || !message.trim()) return;
    const body = message.trim();
    setMessage("");
    try {
      const response = await sendInternalMessage(selectedId, body);
      setConversations((items) =>
        items.map((item) => (getId(item) === selectedId ? response.conversation : item))
      );
    } catch (err: any) {
      setError(err?.message || "Unable to send the message.");
      setMessage(body);
    }
  };

  const handleCreate = async () => {
    const recipients = newRecipients.map((item) => item.email.trim().toLowerCase()).filter(Boolean);

    if (recipients.length === 0) {
      setError("Select at least one CP user.");
      return;
    }

    try {
      const response = await createInternalConversation({
        title: newTitle.trim() || undefined,
        participantEmails: recipients,
        body: newBody.trim() || undefined,
      });
      setConversations((items) => [response.conversation, ...items.filter((item) => getId(item) !== getId(response.conversation))]);
      setSelectedId(getId(response.conversation));
      setCreateOpen(false);
      setNewTitle("");
      setNewRecipients([]);
      setNewBody("");
    } catch (err: any) {
      setError(err?.message || "Unable to create the conversation.");
    }
  };

  const renderConversationRow = (conversation: InternalConversation) => {
    const id = getId(conversation);
    const active = id === selectedId;
    const meta = conversation.groupMeta || fallbackGroupMeta(conversation.groupKey);

    return (
      <Box
        key={id}
        onClick={() => setSelectedId(id)}
        sx={{
          p: 2,
          cursor: "pointer",
          bgcolor: active ? "#fff8d6" : "#fff",
          borderLeft: conversation.type === "group" ? `5px solid ${meta.color}` : "5px solid transparent",
          '&:hover': { bgcolor: active ? "#fff8d6" : "#f8fafc" },
        }}
      >
        <Stack direction="row" justifyContent="space-between" spacing={1} alignItems="center">
          <Typography fontWeight={800} noWrap>{displayConversationTitle(conversation)}</Typography>
          {conversation.unreadCount > 0 && <Chip size="small" color="warning" label={conversation.unreadCount} />}
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.75 }}>
          {conversation.type === "group" && (
            <Chip
              size="small"
              label={conversation.groupKey || "Group"}
              sx={{ bgcolor: meta.background, color: meta.color, fontWeight: 900 }}
            />
          )}
          <Typography variant="caption" color="text.secondary">
            {conversation.type === "group" ? "Group" : "Conversation"} - {formatDate(conversation.lastMessageAt || conversation.updatedAt)}
          </Typography>
        </Stack>
        {conversation.lastMessage && (
          <Typography variant="body2" color="text.secondary" noWrap sx={{ mt: 1 }}>
            {conversation.lastMessage.senderName}: {conversation.lastMessage.body}
          </Typography>
        )}
      </Box>
    );
  };

  const selectedMeta = selectedConversation?.groupMeta || fallbackGroupMeta(selectedConversation?.groupKey);
  const displayConversationTitle = (conversation: InternalConversation) =>
    conversation.type === "group" ? conversation.groupKey || conversation.groupMeta?.key || "CPG" : conversation.title;

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={800} color="#0b1f3a">
            Internal Messages
          </Typography>
          <Typography color="text.secondary">
            Team conversations, CPG groups and direct admin messages.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" startIcon={<RefreshIcon />} onClick={loadConversations} disabled={loading}>
            Refresh
          </Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateOpen(true)}>
            New Thread
          </Button>
        </Stack>
      </Stack>

      {error && (
        <Alert severity="error" onClose={() => setError("")} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2} sx={{ minWidth: 0 }}>
        <Grid item xs={12} md={4} sx={{ minWidth: 0 }}>
          <Paper sx={{ overflow: "hidden", borderRadius: 3 }}>
            <Box sx={{ p: 2, borderBottom: "1px solid #e5e7eb" }}>
              <Typography fontWeight={800}>Open Threads</Typography>
              <Typography variant="caption" color="text.secondary">
                Groups appear here after the first message.
              </Typography>
            </Box>
            <Stack divider={<Divider />} sx={{ maxHeight: 460, overflow: "auto" }}>
              {activeConversations.length === 0 && (
                <Box sx={{ p: 3 }}>
                  <Typography color="text.secondary">No active internal conversation yet.</Typography>
                </Box>
              )}
              {activeConversations.map(renderConversationRow)}
            </Stack>
            <Accordion disableGutters elevation={0} sx={{ borderTop: "1px solid #e5e7eb" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography fontWeight={800}>All My Groups</Typography>
                  <Chip size="small" label={groups.length || emptyGroupConversations.length} />
                </Stack>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0 }}>
                <Stack divider={<Divider />} sx={{ maxHeight: 260, overflow: "auto" }}>
                  {emptyGroupConversations.length === 0 && (
                    <Box sx={{ p: 2 }}>
                      <Typography variant="body2" color="text.secondary">No empty groups available.</Typography>
                    </Box>
                  )}
                  {emptyGroupConversations.map(renderConversationRow)}
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8} sx={{ minWidth: 0 }}>
          <Paper sx={{ borderRadius: 3, height: { xs: "calc(100vh - 230px)", md: "calc(100vh - 230px)" }, minHeight: { xs: 520, md: 560 }, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
            {selectedConversation ? (
              <>
                <Box sx={{ p: 2.5, borderBottom: "1px solid #e5e7eb" }}>
                  <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                    <Typography variant="h6" fontWeight={900} sx={{ overflowWrap: "anywhere" }}>{displayConversationTitle(selectedConversation)}</Typography>
                    {selectedConversation.type === "group" && (
                      <Chip
                        size="small"
                        label={selectedConversation.groupKey}
                        sx={{ bgcolor: selectedMeta.background, color: selectedMeta.color, fontWeight: 900 }}
                      />
                    )}
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {selectedConversation.type === "group"
                      ? "Group conversation"
                      : selectedConversation.participantEmails.join(", ")}
                  </Typography>
                </Box>

                <Stack spacing={1.5} sx={{ p: 2.5, flex: 1, minHeight: 0, overflow: "auto", bgcolor: "#f8fafc", minWidth: 0 }}>
                  {(selectedConversation.messages || []).map((item, index) => {
                    const mine = item.senderEmail?.toLowerCase() === currentEmail;
                    return (
                      <Box key={item._id || `${item.createdAt}-${index}`} sx={{ display: "flex", justifyContent: mine ? "flex-end" : "flex-start" }}>
                        <Box
                          sx={{
                            maxWidth: { xs: "100%", md: "78%" },
                            minWidth: 0,
                            overflowWrap: "anywhere",
                            wordBreak: "break-word",
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor: mine ? "#0b1f3a" : "#fff",
                            color: mine ? "#fff" : "#0b1f3a",
                            border: mine ? "none" : "1px solid #e5e7eb",
                          }}
                        >
                          <Typography variant="caption" sx={{ opacity: 0.8, display: "block", mb: 0.5 }}>
                            {item.senderName} - {formatDate(item.createdAt)}
                          </Typography>
                          <Typography whiteSpace="pre-wrap" sx={{ overflowWrap: "anywhere", wordBreak: "break-word" }}>{item.body}</Typography>
                        </Box>
                      </Box>
                    );
                  })}
                  {(selectedConversation.messages || []).length === 0 && (
                    <Typography color="text.secondary">No message in this thread yet.</Typography>
                  )}
                </Stack>

                <Box sx={{ p: 2, borderTop: "1px solid #e5e7eb" }}>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems={{ xs: "stretch", sm: "flex-end" }}>
                    <TextField
                      fullWidth
                      multiline
                      maxRows={4}
                      placeholder="Write an internal message..."
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
                          event.preventDefault();
                          handleSend();
                        }
                      }}
                    />
                    <IconButton color="primary" onClick={handleSend} disabled={!message.trim()} sx={{ alignSelf: { xs: "flex-end", sm: "center" }, flexShrink: 0 }}>
                      <SendIcon />
                    </IconButton>
                  </Stack>
                </Box>
              </>
            ) : (
              <Box sx={{ p: 4 }}>
                <Typography color="text.secondary">Select a conversation.</Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={createOpen} onClose={() => setCreateOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          New Internal Thread
          <IconButton onClick={() => setCreateOpen(false)}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={2}>
            <Autocomplete
              multiple
              options={selectableUsers}
              value={newRecipients}
              getOptionLabel={(option) => `${option.name || option.email} - ${option.email}`}
              isOptionEqualToValue={(option, value) => option.email === value.email}
              onChange={(_, value) => setNewRecipients(value)}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  <Box>
                    <Typography fontWeight={800}>{option.name || option.email}</Typography>
                    <Typography variant="caption" color="text.secondary">{option.email}</Typography>
                  </Box>
                </Box>
              )}
              renderInput={(params) => (
                <TextField {...params} label="CP recipients" placeholder="Select CP users" helperText="Choose the admins who should participate in this conversation." />
              )}
            />
            <TextField
              label="First message"
              value={newBody}
              onChange={(event) => setNewBody(event.target.value)}
              multiline
              minRows={4}
              fullWidth
            />
            <TextField
              label="Optional title"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
              helperText="Optional: give this conversation a title. Leave empty and CP will create one."
              fullWidth
              size="small"
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setCreateOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InternalMessages;
