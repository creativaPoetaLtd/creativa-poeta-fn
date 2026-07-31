import { useEffect, useMemo, useState } from "react";
import {
  Alert,
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
import {
  createInternalConversation,
  getInternalConversations,
  InternalConversation,
  markInternalConversationRead,
  sendInternalMessage,
} from "../APIs/internalMessages";
import { useAuth } from "../contexts/AuthContext";

const getId = (conversation: InternalConversation) => conversation.id || conversation._id || "";

const formatDate = (value?: string) => {
  if (!value) return "";
  return new Intl.DateTimeFormat("fr-BE", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
};

const InternalMessages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<InternalConversation[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newRecipients, setNewRecipients] = useState("");
  const [newBody, setNewBody] = useState("");

  const currentEmail = user?.email?.toLowerCase() || "";
  const selectedConversation = useMemo(
    () => conversations.find((conversation) => getId(conversation) === selectedId),
    [conversations, selectedId]
  );

  const loadConversations = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getInternalConversations();
      setConversations(response.conversations || []);
      if (!selectedId && response.conversations?.length) {
        setSelectedId(getId(response.conversations[0]));
      }
    } catch (err: any) {
      setError(err?.message || "Impossible de charger les messages internes.");
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
        // Reading a conversation should not block the interface if the read marker fails.
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
      setError(err?.message || "Impossible d'envoyer le message.");
      setMessage(body);
    }
  };

  const handleCreate = async () => {
    const recipients = newRecipients
      .split(/[;,\n]/)
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean);

    if (!newTitle.trim() || recipients.length === 0) {
      setError("Ajoutez un titre et au moins un destinataire.");
      return;
    }

    try {
      const response = await createInternalConversation({
        title: newTitle.trim(),
        participantEmails: recipients,
        body: newBody.trim() || undefined,
      });
      setConversations((items) => [response.conversation, ...items]);
      setSelectedId(getId(response.conversation));
      setCreateOpen(false);
      setNewTitle("");
      setNewRecipients("");
      setNewBody("");
    } catch (err: any) {
      setError(err?.message || "Impossible de creer la conversation.");
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={800} color="#0b1f3a">
            Messages internes
          </Typography>
          <Typography color="text.secondary">
            Conversations d'equipe, groupes par niveau et messages directs.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" startIcon={<RefreshIcon />} onClick={loadConversations} disabled={loading}>
            Actualiser
          </Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateOpen(true)}>
            Nouveau fil
          </Button>
        </Stack>
      </Stack>

      {error && (
        <Alert severity="error" onClose={() => setError("")} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ overflow: "hidden", borderRadius: 3 }}>
            <Box sx={{ p: 2, borderBottom: "1px solid #e5e7eb" }}>
              <Typography fontWeight={800}>Fils disponibles</Typography>
            </Box>
            <Stack divider={<Divider />} sx={{ maxHeight: 620, overflow: "auto" }}>
              {conversations.length === 0 && (
                <Box sx={{ p: 3 }}>
                  <Typography color="text.secondary">Aucune conversation interne.</Typography>
                </Box>
              )}
              {conversations.map((conversation) => {
                const id = getId(conversation);
                const active = id === selectedId;
                return (
                  <Box
                    key={id}
                    onClick={() => setSelectedId(id)}
                    sx={{
                      p: 2,
                      cursor: "pointer",
                      bgcolor: active ? "#fff8d6" : "#fff",
                      '&:hover': { bgcolor: active ? "#fff8d6" : "#f8fafc" },
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" spacing={1} alignItems="center">
                      <Typography fontWeight={800}>{conversation.title}</Typography>
                      {conversation.unreadCount > 0 && <Chip size="small" color="warning" label={conversation.unreadCount} />}
                    </Stack>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
                      {conversation.type === "group" ? "Groupe" : "Conversation"} · {formatDate(conversation.lastMessageAt || conversation.updatedAt)}
                    </Typography>
                    {conversation.lastMessage && (
                      <Typography variant="body2" color="text.secondary" noWrap sx={{ mt: 1 }}>
                        {conversation.lastMessage.senderName}: {conversation.lastMessage.body}
                      </Typography>
                    )}
                  </Box>
                );
              })}
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ borderRadius: 3, minHeight: 620, display: "flex", flexDirection: "column" }}>
            {selectedConversation ? (
              <>
                <Box sx={{ p: 2.5, borderBottom: "1px solid #e5e7eb" }}>
                  <Typography variant="h6" fontWeight={900}>{selectedConversation.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedConversation.type === "group"
                      ? "Conversation de groupe automatique"
                      : selectedConversation.participantEmails.join(", ")}
                  </Typography>
                </Box>

                <Stack spacing={1.5} sx={{ p: 2.5, flex: 1, overflow: "auto", bgcolor: "#f8fafc" }}>
                  {(selectedConversation.messages || []).map((item, index) => {
                    const mine = item.senderEmail?.toLowerCase() === currentEmail;
                    return (
                      <Box key={item._id || `${item.createdAt}-${index}`} sx={{ display: "flex", justifyContent: mine ? "flex-end" : "flex-start" }}>
                        <Box
                          sx={{
                            maxWidth: "78%",
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor: mine ? "#0b1f3a" : "#fff",
                            color: mine ? "#fff" : "#0b1f3a",
                            border: mine ? "none" : "1px solid #e5e7eb",
                          }}
                        >
                          <Typography variant="caption" sx={{ opacity: 0.8, display: "block", mb: 0.5 }}>
                            {item.senderName} · {formatDate(item.createdAt)}
                          </Typography>
                          <Typography whiteSpace="pre-wrap">{item.body}</Typography>
                        </Box>
                      </Box>
                    );
                  })}
                  {(selectedConversation.messages || []).length === 0 && (
                    <Typography color="text.secondary">Aucun message dans ce fil.</Typography>
                  )}
                </Stack>

                <Box sx={{ p: 2, borderTop: "1px solid #e5e7eb" }}>
                  <Stack direction="row" spacing={1} alignItems="flex-end">
                    <TextField
                      fullWidth
                      multiline
                      maxRows={4}
                      placeholder="Ecrire un message interne..."
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
                          event.preventDefault();
                          handleSend();
                        }
                      }}
                    />
                    <IconButton color="primary" onClick={handleSend} disabled={!message.trim()}>
                      <SendIcon />
                    </IconButton>
                  </Stack>
                </Box>
              </>
            ) : (
              <Box sx={{ p: 4 }}>
                <Typography color="text.secondary">Selectionnez une conversation.</Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={createOpen} onClose={() => setCreateOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          Nouveau fil interne
          <IconButton onClick={() => setCreateOpen(false)}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={2}>
            <TextField label="Titre" value={newTitle} onChange={(event) => setNewTitle(event.target.value)} fullWidth />
            <TextField
              label="Destinataires CP"
              value={newRecipients}
              onChange={(event) => setNewRecipients(event.target.value)}
              placeholder="prenom.nom@creativapoeta.com"
              helperText="Separez plusieurs adresses avec une virgule ou un point-virgule."
              fullWidth
            />
            <TextField
              label="Premier message"
              value={newBody}
              onChange={(event) => setNewBody(event.target.value)}
              multiline
              minRows={4}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setCreateOpen(false)}>Annuler</Button>
          <Button variant="contained" onClick={handleCreate}>Creer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InternalMessages;
