import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert, Box, Button, Card, CardContent, Chip, CircularProgress, Dialog, DialogActions,
  DialogContent, DialogTitle, Divider, MenuItem, Stack, Tab, Tabs, TextField, Typography,
} from "@mui/material";
import DeleteForever from "@mui/icons-material/DeleteForever";
import History from "@mui/icons-material/History";
import Refresh from "@mui/icons-material/Refresh";
import Restore from "@mui/icons-material/Restore";
import {
  AuditEvent, TrashEntityType, TrashItem, getAuditHistory, getSecurityAuditEvents,
  getTrashItems, permanentlyDeleteTrashItem, restoreTrashItem, rollbackAuditEvent,
} from "../APIs/Trash";
import { ActionButton, DataTable, MenuAction, PageHeader } from "./components/DashboardComponents";

const entityLabels: Record<TrashEntityType, string> = {
  admin_user: "Admin user", blog: "Blog", blog_comment: "Blog comment",
  project_request: "Project request", contact_query: "Contact query",
  partnership_request: "Partnership request", referral_partner: "Referral partner",
  referral_lead: "Referral lead", job_application: "Job application",
  inbound_email: "Incoming email", outbound_email: "Sent email", job: "Job",
  referral_reward: "Referral reward", admin_notification: "Admin notification",
  internal_conversation: "Internal conversation", whatsapp_conversation: "WhatsApp conversation",
  whatsapp_message: "WhatsApp message",
};

const auditActions = ["create", "update", "delete", "restore", "rollback", "purge"];

export default function Trash() {
  const [tab, setTab] = useState<"trash" | "audit">("trash");
  const [items, setItems] = useState<TrashItem[]>([]);
  const [entityTypes, setEntityTypes] = useState<TrashEntityType[]>([]);
  const [search, setSearch] = useState("");
  const [entityType, setEntityType] = useState("");
  const [auditAction, setAuditAction] = useState("");
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [workingId, setWorkingId] = useState("");
  const [historyItem, setHistoryItem] = useState<TrashItem | null>(null);
  const [history, setHistory] = useState<AuditEvent[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [message, setMessage] = useState<{ severity: "success" | "error"; text: string } | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setMessage(null);
      if (tab === "trash") {
        const response = await getTrashItems({ limit: 100, search: search.trim() || undefined, entityType: entityType || undefined });
        setItems(response.items || []);
        setEntityTypes(response.entityTypes || []);
      } else {
        const response = await getSecurityAuditEvents({ limit: 100, search: search.trim() || undefined, entityType: entityType || undefined, action: auditAction || undefined });
        setAuditEvents(response.events || []);
      }
    } catch (error) {
      setMessage({ severity: "error", text: error instanceof Error ? error.message : "Failed to load protected records." });
    } finally {
      setLoading(false);
    }
  }, [auditAction, entityType, search, tab]);

  useEffect(() => {
    const timeout = window.setTimeout(() => void loadData(), 250);
    return () => window.clearTimeout(timeout);
  }, [loadData]);

  const handleRestore = async (item: TrashItem) => {
    if (!window.confirm(`Restore "${item.label}"?`)) return;
    try {
      setWorkingId(item._id);
      const response = await restoreTrashItem(item);
      setItems((current) => current.filter((entry) => entry._id !== item._id));
      setMessage({ severity: "success", text: response.message || "Item restored." });
    } catch (error) {
      setMessage({ severity: "error", text: error instanceof Error ? error.message : "Restoration failed." });
    } finally { setWorkingId(""); }
  };

  const handlePermanentDelete = async (item: TrashItem) => {
    if (!window.confirm(`Permanently delete "${item.label}"? This action cannot be undone.`)) return;
    try {
      setWorkingId(item._id);
      const response = await permanentlyDeleteTrashItem(item);
      setItems((current) => current.filter((entry) => entry._id !== item._id));
      setMessage({ severity: "success", text: response.message || "Item permanently deleted." });
    } catch (error) {
      setMessage({ severity: "error", text: error instanceof Error ? error.message : "Permanent deletion failed." });
    } finally { setWorkingId(""); }
  };

  const openHistory = async (item: TrashItem) => {
    setHistoryItem(item); setHistory([]); setHistoryLoading(true);
    try { const response = await getAuditHistory(item); setHistory(response.events || []); }
    catch (error) {
      setMessage({ severity: "error", text: error instanceof Error ? error.message : "Failed to load audit history." });
      setHistoryItem(null);
    } finally { setHistoryLoading(false); }
  };

  const handleRollback = async (event: AuditEvent, item?: Pick<TrashItem, "entityType" | "originalId">) => {
    const target = item || historyItem;
    if (!target || !window.confirm("Restore this previous version? The operation will be recorded in the audit history.")) return;
    try {
      setWorkingId(event._id);
      const response = await rollbackAuditEvent(target, event._id);
      setMessage({ severity: "success", text: response.message || "Previous version restored." });
      if (historyItem) { const refreshed = await getAuditHistory(historyItem); setHistory(refreshed.events || []); }
      if (tab === "audit") await loadData();
    } catch (error) {
      setMessage({ severity: "error", text: error instanceof Error ? error.message : "Rollback failed." });
    } finally { setWorkingId(""); }
  };

  const trashRows = useMemo(() => items.map((item) => ({
    id: item._id,
    item: <Box><Typography sx={{ fontWeight: 800, color: "#071a33" }}>{item.label}</Typography><Typography sx={{ fontSize: 12, color: "#64748b" }}>Original ID: {item.originalId}</Typography></Box>,
    type: <Chip size="small" label={entityLabels[item.entityType] || item.entityType} />,
    deletedBy: item.deletedByName || item.deletedByEmail || "System",
    deletedAt: new Date(item.deletedAt).toLocaleString(),
  })), [items]);

  const auditRows = useMemo(() => auditEvents.map((event) => ({
    id: event._id,
    event: <Box><Typography sx={{ fontWeight: 800, color: "#071a33" }}>{event.action.toUpperCase()}</Typography><Typography sx={{ fontSize: 12, color: "#64748b" }}>{event.entityId}</Typography></Box>,
    type: <Chip size="small" label={entityLabels[event.entityType as TrashEntityType] || event.entityType} />,
    actor: event.actorName || event.actorEmail || "System",
    changed: event.changedPaths?.length ? event.changedPaths.join(", ") : "-",
    date: new Date(event.createdAt).toLocaleString(),
  })), [auditEvents]);

  return <Box sx={{ p: { xs: 2, md: 3 } }}>
    <PageHeader title="Protected archive" subtitle="Incognito recovery, permanent deletion and immutable security history." action={<ActionButton variant="secondary" startIcon={<Refresh />} onClick={() => void loadData()}>Refresh</ActionButton>} />
    {message && <Alert severity={message.severity} onClose={() => setMessage(null)} sx={{ mb: 2 }}>{message.text}</Alert>}
    <Card sx={{ mb: 3 }}><Tabs value={tab} onChange={(_event, value) => { setTab(value); setSearch(""); setEntityType(""); setAuditAction(""); }}><Tab value="trash" label="Deleted records" /><Tab value="audit" label="Security history" /></Tabs><Divider /><CardContent><Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
      <TextField size="small" label={tab === "trash" ? "Search deleted items" : "Search ID or actor"} value={search} onChange={(event) => setSearch(event.target.value)} sx={{ flex: 1 }} />
      <TextField select size="small" label="Type" value={entityType} onChange={(event) => setEntityType(event.target.value)} sx={{ minWidth: { sm: 230 } }}>
        <MenuItem value="">All types</MenuItem>{(entityTypes.length ? entityTypes : Object.keys(entityLabels) as TrashEntityType[]).map((type) => <MenuItem key={type} value={type}>{entityLabels[type] || type}</MenuItem>)}
      </TextField>
      {tab === "audit" && <TextField select size="small" label="Action" value={auditAction} onChange={(event) => setAuditAction(event.target.value)} sx={{ minWidth: { sm: 180 } }}><MenuItem value="">All actions</MenuItem>{auditActions.map((action) => <MenuItem key={action} value={action}>{action}</MenuItem>)}</TextField>}
    </Stack></CardContent></Card>
    {loading ? <Box sx={{ py: 8, display: "flex", justifyContent: "center" }}><CircularProgress /></Box> : tab === "trash" ? <DataTable
      headers={["Item", "Type", "Deleted by", "Deleted at"]} hiddenFields={["id"]} rows={trashRows} emptyMessage="No deleted items"
      customActions={(row) => {
        const item = items.find((entry) => entry._id === row.id); if (!item) return null;
        const disabled = workingId === item._id;
        return <><MenuAction icon={<History />} label="Audit history" disabled={disabled} onClick={() => void openHistory(item)} color="#2563eb" /><MenuAction icon={<Restore />} label="Restore" disabled={disabled} onClick={() => void handleRestore(item)} color="#16a34a" /><MenuAction icon={<DeleteForever />} label="Delete permanently" disabled={disabled} onClick={() => void handlePermanentDelete(item)} color="#dc2626" /></>;
      }}
    /> : <DataTable
      headers={["Event", "Type", "Actor", "Changed fields", "Date"]} hiddenFields={["id"]} rows={auditRows} emptyMessage="No security events"
      customActions={(row) => {
        const event = auditEvents.find((entry) => entry._id === row.id);
        if (!event?.canRollback || !(event.entityType in entityLabels)) return null;
        const item = { entityType: event.entityType as TrashEntityType, originalId: event.entityId };
        return <MenuAction icon={<Restore />} label="Restore this version" disabled={workingId === event._id} onClick={() => void handleRollback(event, item)} color="#16a34a" />;
      }}
    />}
    <Dialog open={Boolean(historyItem)} onClose={() => setHistoryItem(null)} fullWidth maxWidth="md">
      <DialogTitle>Audit history{historyItem ? ` - ${historyItem.label}` : ""}</DialogTitle>
      <DialogContent dividers>{historyLoading ? <Box sx={{ py: 5, display: "flex", justifyContent: "center" }}><CircularProgress /></Box> : history.length === 0 ? <Typography color="text.secondary">No audit event is available for this record.</Typography> : <Stack spacing={0} divider={<Divider flexItem />}>
        {history.map((event) => <Box key={event._id} sx={{ py: 1.5, display: "flex", gap: 2, alignItems: "flex-start", justifyContent: "space-between" }}><Box>
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap"><Chip size="small" label={event.action.toUpperCase()} /><Typography sx={{ fontSize: 13, color: "#64748b" }}>{new Date(event.createdAt).toLocaleString()}</Typography></Stack>
          <Typography sx={{ mt: 0.75, fontSize: 13 }}>{event.actorName || event.actorEmail || "System"}{event.actorRole ? ` - ${event.actorRole}` : ""}</Typography>
          {event.changedPaths?.length > 0 && <Typography sx={{ mt: 0.5, fontSize: 12, color: "#64748b", overflowWrap: "anywhere" }}>Changed: {event.changedPaths.join(", ")}</Typography>}
        </Box>{event.before && event.action !== "create" && event.action !== "purge" && <Button size="small" disabled={workingId === event._id} onClick={() => void handleRollback(event)}>Restore version</Button>}</Box>)}
      </Stack>}</DialogContent>
      <DialogActions><Button onClick={() => setHistoryItem(null)}>Close</Button></DialogActions>
    </Dialog>
  </Box>;
}
