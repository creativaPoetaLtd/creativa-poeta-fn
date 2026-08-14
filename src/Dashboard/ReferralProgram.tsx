import { useCallback, useEffect, useState } from "react";
import {
  Alert, Box, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl,
  FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Snackbar, Tab, Tabs, TextField, Typography,
} from "@mui/material";
import AccountBalanceWallet from "@mui/icons-material/AccountBalanceWallet";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Groups from "@mui/icons-material/Groups";
import Handshake from "@mui/icons-material/Handshake";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Add from "@mui/icons-material/Add";
import ContentCopy from "@mui/icons-material/ContentCopy";
import Refresh from "@mui/icons-material/Refresh";
import Search from "@mui/icons-material/Search";
import Visibility from "@mui/icons-material/Visibility";
import {
  ManualReferralEntryPayload, ReferralLead, ReferralLeadStatus, ReferralPartner, ReferralPartnerStatus, ReferralReward,
  claimReferralLead, createManualReferralEntry, getReferralLeads, getReferralPartners, getReferralProgramSummary,
  getReferralRewards, markReferralRewardPaid, updateReferralLead, updateReferralPartner,
  updateReferralRewardStatus, upsertReferralReward,
} from "../APIs/ReferralProgram";
import { useAuth } from "../contexts/useAuth";
import PartnershipRequests from "./PartnershipRequests";
import { ActionButton, DashboardCard, DataTable, MenuAction, PageHeader, StatusChip } from "./components/DashboardComponents";

const partnerStatuses: ReferralPartnerStatus[] = ["pending", "approved", "active", "rejected", "suspended", "closed"];
const leadStatuses: ReferralLeadStatus[] = ["submitted", "waiting_for_introduction", "under_review", "accepted", "duplicate", "rejected", "contacted", "qualified", "proposal_sent", "won", "lost"];
const formatDate = (value?: string) => value ? new Intl.DateTimeFormat("fr-BE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)) : "-";
const words = (value: string) => value.replace(/_/g, " ");
const statusVariant = (status: string) => {
  if (["active", "approved", "accepted", "qualified", "won", "paid"].includes(status)) return "success" as const;
  if (["rejected", "duplicate", "lost", "cancelled", "suspended"].includes(status)) return "error" as const;
  if (["under_review", "contacted", "proposal_sent", "earned", "scheduled"].includes(status)) return "info" as const;
  return "warning" as const;
};

export default function ReferralProgram() {
  const { user } = useAuth();
  const [tab, setTab] = useState(0);
  const [metrics, setMetrics] = useState<Record<string, number>>({});
  const [notice, setNotice] = useState<{ message: string; severity: "success" | "error" } | null>(null);
  const [manualOpen, setManualOpen] = useState(false);
  const canApproveRewards = ["super_admin", "admin_0"].includes(user?.role || "") || Boolean(user?.permissions?.includes("rewards:approve"));
  const canPayRewards = ["super_admin", "admin_0"].includes(user?.role || "") || Boolean(user?.permissions?.includes("rewards:pay"));
  const canManageStrategic = ["super_admin", "admin_0", "admin_1"].includes(user?.role || "") || Boolean(user?.permissions?.includes("requests:partnerships"));
  const canManageReferrals = ["super_admin", "admin_0", "admin_1"].includes(user?.role || "") || Boolean(user?.permissions?.includes("referrals:manage"));

  const loadSummary = useCallback(async () => {
    try { setMetrics((await getReferralProgramSummary()).metrics || {}); }
    catch (error) { setNotice({ message: error instanceof Error ? error.message : "Unable to load program summary.", severity: "error" }); }
  }, []);
  useEffect(() => { void loadSummary(); }, [loadSummary]);

  return <Box sx={{ p: { xs: 0, md: 3 } }}>
    <PageHeader title="Client Introductions & Partners" subtitle="Manage program applications, genuine introductions, rewards and strategic partnerships." action={<Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>{canManageReferrals && <ActionButton variant="primary" startIcon={<Add />} onClick={() => setManualOpen(true)}>Create referral</ActionButton>}<ActionButton variant="secondary" startIcon={<Refresh />} onClick={() => void loadSummary()}>Refresh</ActionButton></Box>} />
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={6} lg={3}><DashboardCard title="Pending partners" value={metrics.pendingPartners || 0} icon={<PersonAdd />} color="#f59e0b" /></Grid>
      <Grid item xs={6} lg={3}><DashboardCard title="Active partners" value={metrics.activePartners || 0} icon={<Groups />} color="#16a34a" /></Grid>
      <Grid item xs={6} lg={3}><DashboardCard title="Leads to review" value={metrics.leadsToReview || 0} icon={<Search />} color="#0ea5e9" /></Grid>
      <Grid item xs={6} lg={3}><DashboardCard title="Rewards to approve" value={metrics.rewardsToApprove || 0} icon={<AccountBalanceWallet />} color="#7c3aed" /></Grid>
    </Grid>
    <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
      <Tabs value={tab} onChange={(_, value) => setTab(value)} variant="scrollable" scrollButtons="auto" sx={{ borderBottom: "1px solid #e2e8f0", px: 1 }}>
        <Tab label="Overview" /><Tab label="Partner applications" /><Tab label="Referral leads" /><Tab label="Rewards" /><Tab label="Strategic partnerships" disabled={!canManageStrategic} />
      </Tabs>
      <Box sx={{ p: { xs: 1.5, md: 2.5 } }}>
        {tab === 0 && <ProgramOverview metrics={metrics} setTab={setTab} />}
        {tab === 1 && <PartnersPanel onNotice={setNotice} onChanged={loadSummary} />}
        {tab === 2 && <LeadsPanel canApproveRewards={canApproveRewards} onNotice={setNotice} onChanged={loadSummary} />}
        {tab === 3 && <RewardsPanel canApprove={canApproveRewards} canPay={canPayRewards} onNotice={setNotice} onChanged={loadSummary} />}
        {tab === 4 && <PartnershipRequests />}
      </Box>
    </Paper>
    <ManualEntryDialog open={manualOpen} onClose={() => setManualOpen(false)} onNotice={setNotice} onChanged={loadSummary} />
    <Snackbar open={Boolean(notice)} autoHideDuration={5000} onClose={() => setNotice(null)} anchorOrigin={{ vertical: "top", horizontal: "right" }}><Alert severity={notice?.severity || "success"} onClose={() => setNotice(null)}>{notice?.message}</Alert></Snackbar>
  </Box>;
}

function ProgramOverview({ metrics, setTab }: { metrics: Record<string, number>; setTab: (tab: number) => void }) {
  const items = [
    { title: "Review partner applications", value: metrics.pendingPartners || 0, text: "Approve only credible applicants. Approval generates a secure private referral link.", tab: 1 },
    { title: "Qualify introductions", value: metrics.leadsToReview || 0, text: "Verify the connection, consent, duplicates and whether the opportunity is new to Creativa Poeta.", tab: 2 },
    { title: "Control rewards", value: metrics.rewardsToApprove || 0, text: "Standard rewards use eligible revenue collected and a stored 10% rate without a fixed cap.", tab: 3 },
    { title: "Won opportunities", value: metrics.wonLeads || 0, text: "Track the referrals that have become paying Creativa Poeta clients.", tab: 2 },
  ];
  return <Grid container spacing={2}>{items.map((item) => <Grid item xs={12} md={6} key={item.title}><Paper variant="outlined" sx={{ p: 2.5, height: "100%", borderRadius: 2.5 }}><Typography variant="overline" color="text.secondary" fontWeight={900}>{item.value} ITEM(S)</Typography><Typography variant="h6" fontWeight={900}>{item.title}</Typography><Typography variant="body2" color="text.secondary" sx={{ my: 1.5 }}>{item.text}</Typography><ActionButton size="small" variant="secondary" onClick={() => setTab(item.tab)}>Open</ActionButton></Paper></Grid>)}</Grid>;
}

const initialManualEntry: ManualReferralEntryPayload = {
  existingPartnerId: "", name: "", email: "", phone: "", preferredContact: "whatsapp", country: "",
  locale: "fr", profileType: "Individual", program: "referral", website: "", termsAccepted: false,
  marketingConsent: false, approveNow: true, regenerateAccess: true, includeClient: true,
  clientType: "company", companyName: "", contactName: "", contactEmail: "", contactPhone: "", clientWebsite: "",
  serviceNeeded: "", budgetRange: "", needDescription: "", relationship: "",
  consentStatus: "not_yet",
};

function ManualEntryDialog({ open, onClose, onNotice, onChanged }: {
  open: boolean;
  onClose: () => void;
  onNotice: (notice: { message: string; severity: "success" | "error" }) => void;
  onChanged: () => Promise<void>;
}) {
  const [form, setForm] = useState<ManualReferralEntryPayload>({ ...initialManualEntry });
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ partnerId?: string; accessUrl?: string; shareUrl?: string } | null>(null);
  const existing = Boolean(form.existingPartnerId?.trim());

  const close = () => {
    if (sending) return;
    setForm({ ...initialManualEntry });
    setResult(null);
    onClose();
  };
  const copy = async (value: string, label: string) => {
    await navigator.clipboard.writeText(value);
    onNotice({ message: `${label} copied. You can send it by WhatsApp, SMS, email or another private channel.`, severity: "success" });
  };
  const submit = async () => {
    try {
      setSending(true);
      const response = await createManualReferralEntry(form);
      setResult({ partnerId: response.partner.partnerId, accessUrl: response.accessUrl, shareUrl: response.shareUrl });
      onNotice({ message: response.lead ? "Partner and client introduction recorded." : "Partner application recorded.", severity: "success" });
      await onChanged();
    } catch (error) {
      onNotice({ message: error instanceof Error ? error.message : "Unable to create the referral.", severity: "error" });
    } finally {
      setSending(false);
    }
  };

  return <Dialog open={open} onClose={close} maxWidth="md" fullWidth>
    <DialogTitle sx={{ bgcolor: "#071a33", color: "white", fontWeight: 900 }}>Create a referral manually</DialogTitle>
    <DialogContent dividers sx={{ p: { xs: 2, sm: 3 } }}>
      <Alert severity="info" sx={{ mb: 2 }}>Use this form when someone contacts Creativa Poeta through WhatsApp, Facebook, phone, SMS or another external channel. Use an existing partner ID when the person is already registered.</Alert>
      {result ? <Box sx={{ display: "grid", gap: 2 }}>
        <Alert severity="success">Saved under partner ID <b>{result.partnerId}</b>.</Alert>
        {result.accessUrl && <Paper variant="outlined" sx={{ p: 2, overflow: "hidden" }}><Typography fontWeight={900}>Private partner access</Typography><Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>Only the partner should receive this link.</Typography><Typography sx={{ wordBreak: "break-all", fontSize: 13 }}>{result.accessUrl}</Typography><ActionButton size="small" variant="secondary" startIcon={<ContentCopy />} onClick={() => result.accessUrl && void copy(result.accessUrl, "Private access link")}>Copy private link</ActionButton></Paper>}
        {result.shareUrl && <Paper variant="outlined" sx={{ p: 2, overflow: "hidden" }}><Typography fontWeight={900}>Client invitation link</Typography><Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>The partner may share this link with a client who agreed to be contacted.</Typography><Typography sx={{ wordBreak: "break-all", fontSize: 13 }}>{result.shareUrl}</Typography><ActionButton size="small" variant="secondary" startIcon={<ContentCopy />} onClick={() => result.shareUrl && void copy(result.shareUrl, "Client invitation link")}>Copy client link</ActionButton></Paper>}
        {!result.accessUrl && !result.shareUrl && <Alert severity="warning">The record is pending. Approve it from Partner applications to generate the shareable links.</Alert>}
      </Box> : <Box sx={{ display: "grid", gap: 2.5 }}>
        <Box><Typography variant="h6" fontWeight={900}>Introducer / partner</Typography><Typography variant="body2" color="text.secondary">Enter an existing partner ID, or leave it empty to create a new record.</Typography></Box>
        <TextField fullWidth label="Existing partner ID (optional)" value={form.existingPartnerId} onChange={(event) => setForm({ ...form, existingPartnerId: event.target.value.toUpperCase() })} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}><TextField disabled={existing} required={!existing} fullWidth label="Full name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></Grid>
          <Grid item xs={12} sm={6}><TextField disabled={existing} fullWidth type="email" label="Email (optional)" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></Grid>
          <Grid item xs={12} sm={6}><TextField disabled={existing} fullWidth label="WhatsApp or phone (optional)" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></Grid>
          <Grid item xs={12} sm={6}><FormControl disabled={existing} fullWidth><InputLabel>Preferred contact</InputLabel><Select label="Preferred contact" value={form.preferredContact} onChange={(event) => setForm({ ...form, preferredContact: event.target.value as ManualReferralEntryPayload["preferredContact"] })}>{["email", "whatsapp", "phone", "sms", "other"].map((value) => <MenuItem key={value} value={value}>{words(value)}</MenuItem>)}</Select></FormControl></Grid>
          <Grid item xs={12} sm={6}><TextField disabled={existing} required={!existing} fullWidth label="Country" value={form.country} onChange={(event) => setForm({ ...form, country: event.target.value })} /></Grid>
          <Grid item xs={12} sm={6}><TextField disabled={existing} required={!existing} fullWidth label="Profile" value={form.profileType} onChange={(event) => setForm({ ...form, profileType: event.target.value })} /></Grid>
          <Grid item xs={12} sm={6}><FormControl disabled={existing} fullWidth><InputLabel>Program</InputLabel><Select label="Program" value={form.program} onChange={(event) => setForm({ ...form, program: event.target.value as "referral" | "business" })}><MenuItem value="referral">Occasional introducer</MenuItem><MenuItem value="business">Commercial partner</MenuItem></Select></FormControl></Grid>
          <Grid item xs={12} sm={6}><TextField disabled={existing} fullWidth label="LinkedIn or website (optional)" value={form.website} onChange={(event) => setForm({ ...form, website: event.target.value })} /></Grid>
        </Grid>
        {!existing && <FormControlLabel control={<Checkbox checked={Boolean(form.termsAccepted)} onChange={(event) => setForm({ ...form, termsAccepted: event.target.checked })} />} label="The person accepted the program terms and confirmed being at least 18." />}
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}><FormControlLabel control={<Checkbox checked={form.approveNow} onChange={(event) => setForm({ ...form, approveNow: event.target.checked })} />} label="Approve now and prepare links" />{existing && <FormControlLabel control={<Checkbox checked={form.regenerateAccess} onChange={(event) => setForm({ ...form, regenerateAccess: event.target.checked })} />} label="Generate a new private access link" />}<FormControlLabel control={<Checkbox checked={form.includeClient} onChange={(event) => setForm({ ...form, includeClient: event.target.checked })} />} label="Also record a client introduction" /></Box>
        {form.includeClient && <><Divider /><Typography variant="h6" fontWeight={900}>Introduced client</Typography><Grid container spacing={2}>
          <Grid item xs={12} sm={6}><FormControl fullWidth><InputLabel>Client type</InputLabel><Select label="Client type" value={form.clientType || "company"} onChange={(event) => setForm({ ...form, clientType: event.target.value as "person" | "company", companyName: event.target.value === "person" ? "" : form.companyName, clientWebsite: event.target.value === "person" ? "" : form.clientWebsite })}><MenuItem value="person">Person</MenuItem><MenuItem value="company">Company</MenuItem></Select></FormControl></Grid>
          {form.clientType !== "person" && <Grid item xs={12} sm={6}><TextField required fullWidth label="Company" value={form.companyName} onChange={(event) => setForm({ ...form, companyName: event.target.value })} /></Grid>}
          <Grid item xs={12} sm={6}><TextField required fullWidth label={form.clientType === "person" ? "Full name" : "Contact person"} value={form.contactName} onChange={(event) => setForm({ ...form, contactName: event.target.value })} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth type="email" label="Client email (optional)" value={form.contactEmail} onChange={(event) => setForm({ ...form, contactEmail: event.target.value })} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Client phone / WhatsApp (optional)" value={form.contactPhone} onChange={(event) => setForm({ ...form, contactPhone: event.target.value })} /></Grid>
          {form.clientType !== "person" && <Grid item xs={12} sm={6}><TextField fullWidth label="Company website (optional)" value={form.clientWebsite} onChange={(event) => setForm({ ...form, clientWebsite: event.target.value })} /></Grid>}
          <Grid item xs={12} sm={6}><TextField required fullWidth label="Service needed" value={form.serviceNeeded} onChange={(event) => setForm({ ...form, serviceNeeded: event.target.value })} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Approximate budget" value={form.budgetRange} onChange={(event) => setForm({ ...form, budgetRange: event.target.value })} /></Grid>
          <Grid item xs={12} sm={6}><FormControl fullWidth><InputLabel>Contact consent</InputLabel><Select label="Contact consent" value={form.consentStatus} onChange={(event) => setForm({ ...form, consentStatus: event.target.value as "agreed" | "not_yet" })}><MenuItem value="agreed">Agreed</MenuItem><MenuItem value="not_yet">Not yet</MenuItem></Select></FormControl></Grid>
          <Grid item xs={12}><TextField fullWidth multiline minRows={3} label="Client need (optional)" value={form.needDescription} onChange={(event) => setForm({ ...form, needDescription: event.target.value })} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth label="Relationship with the client" value={form.relationship} onChange={(event) => setForm({ ...form, relationship: event.target.value })} /></Grid>
        </Grid></>}
      </Box>}
    </DialogContent>
    <DialogActions sx={{ p: 2, gap: 1 }}>{result ? <><ActionButton variant="secondary" onClick={() => { setResult(null); setForm({ ...initialManualEntry }); }}>Create another</ActionButton><ActionButton variant="primary" onClick={close}>Done</ActionButton></> : <><ActionButton variant="secondary" onClick={close}>Cancel</ActionButton><ActionButton variant="primary" disabled={sending} onClick={() => void submit()}>{sending ? "Saving..." : "Save referral"}</ActionButton></>}</DialogActions>
  </Dialog>;
}

function PartnersPanel({ onNotice, onChanged }: { onNotice: (notice: { message: string; severity: "success" | "error" }) => void; onChanged: () => Promise<void> }) {
  const [partners, setPartners] = useState<ReferralPartner[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ReferralPartner | null>(null);
  const [generatedLinks, setGeneratedLinks] = useState<{ accessUrl?: string; shareUrl?: string } | null>(null);
  const load = useCallback(async () => { try { setLoading(true); setPartners((await getReferralPartners(1, status, search)).partners || []); } catch (error) { onNotice({ message: error instanceof Error ? error.message : "Unable to load partners.", severity: "error" }); } finally { setLoading(false); } }, [onNotice, search, status]);
  useEffect(() => { const timer = window.setTimeout(() => void load(), 250); return () => window.clearTimeout(timer); }, [load]);
  const changeStatus = async (partner: ReferralPartner, nextStatus: ReferralPartnerStatus, regenerateAccess = false) => {
    const reason = nextStatus === "rejected" ? window.prompt("Reason for rejection (sent to the applicant):")?.trim() : undefined;
    if (nextStatus === "rejected" && !reason) return;
    try {
      const response = await updateReferralPartner(partner._id, { status: nextStatus, reason, regenerateAccess });
      setPartners((current) => current.map((item) => item._id === partner._id ? response.partner : item));
      setSelected((current) => current?._id === partner._id ? response.partner : current);
      if (response.accessUrl || response.shareUrl) {
        setGeneratedLinks({ accessUrl: response.accessUrl, shareUrl: response.shareUrl });
        setSelected(response.partner);
      }
      onNotice({ message: response.emailSent ? `Partner ${nextStatus}; notification sent.` : `Partner ${nextStatus}.`, severity: "success" });
      await onChanged();
    } catch (error) { onNotice({ message: error instanceof Error ? error.message : "Unable to update partner.", severity: "error" }); }
  };
  const rows = partners.map((partner) => ({ id: partner._id, Partner: <Box><Typography fontWeight={900}>{partner.name}</Typography><Typography variant="caption" color="text.secondary">{[partner.email, partner.phone].filter(Boolean).join(" · ") || "No contact"} · {partner.country}</Typography></Box>, Program: <Chip size="small" label={partner.program} color={partner.program === "business" ? "secondary" : "default"} />, "Partner ID": partner.partnerId || "Not issued", Status: <StatusChip status={partner.status} variant={statusVariant(partner.status)} />, Applied: formatDate(partner.createdAt) }));
  return <><Filters search={search} setSearch={setSearch} status={status} setStatus={setStatus} options={partnerStatuses} /><DataTable headers={["Partner", "Program", "Partner ID", "Status", "Applied"]} rows={rows} hiddenFields={["id"]} emptyMessage={loading ? "Loading partner applications..." : "No partner applications found"} onView={(id) => setSelected(partners.find((partner) => partner._id === id) || null)} customActions={(row) => { const partner = partners.find((item) => item._id === row.id); if (!partner) return null; return <><MenuAction icon={<Visibility />} label="View" onClick={() => setSelected(partner)} /><MenuAction icon={<CheckCircle />} label="Approve" color="#16a34a" onClick={() => void changeStatus(partner, "approved")} /></>; }} />
    <Dialog open={Boolean(selected)} onClose={() => { setSelected(null); setGeneratedLinks(null); }} maxWidth="md" fullWidth>
      <DialogTitle sx={{ bgcolor: "#071a33", color: "white" }}>Partner application</DialogTitle>
      <DialogContent sx={{ pt: 3 }}>{selected && <Box sx={{ display: "grid", gap: 2 }}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h6" fontWeight={900}>{selected.name}</Typography>
          <Box sx={{ display: "grid", gap: 0.5, mt: 1 }}>
            <Typography><b>Email:</b> {selected.email || "Not provided"}</Typography>
            <Typography><b>Phone / WhatsApp:</b> {selected.phone || "Not provided"}</Typography>
            <Typography><b>Preferred contact:</b> {words(selected.preferredContact || (selected.email ? "email" : "whatsapp"))}</Typography>
            <Typography><b>Country:</b> {selected.country}</Typography>
            <Typography><b>Profile:</b> {selected.profileType}</Typography>
            <Typography><b>Program:</b> {words(selected.program)}</Typography>
            <Typography><b>Language:</b> {selected.locale?.toUpperCase() || "Not provided"}</Typography>
            <Typography><b>Program terms accepted:</b> {selected.termsAcceptedAt ? `Yes · ${formatDate(selected.termsAcceptedAt)}` : "No"}</Typography>
            <Typography><b>Marketing consent:</b> {selected.marketingConsent ? "Yes" : "No"}</Typography>
            <Typography><b>Status:</b> {words(selected.status)}</Typography>
            <Typography><b>Partner ID:</b> {selected.partnerId || "Not issued"}</Typography>
            <Typography><b>Submitted:</b> {formatDate(selected.createdAt)}</Typography>
          </Box>
        </Paper>
        <Paper variant="outlined" sx={{ p: 2 }}><Typography fontWeight={900}>Website / professional profile</Typography><Typography sx={{ mt: 1, wordBreak: "break-all" }}>{selected.website || "Not provided"}</Typography>{selected.networkDescription && <Typography sx={{ whiteSpace: "pre-wrap", mt: 1 }}>{selected.networkDescription}</Typography>}</Paper>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>{partnerStatuses.map((item) => <ActionButton key={item} size="small" variant={selected.status === item ? "primary" : "secondary"} onClick={() => void changeStatus(selected, item)}>{words(item)}</ActionButton>)}</Box>
        {generatedLinks && <Alert severity="success"><Typography fontWeight={900}>Links ready to share</Typography><Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>{generatedLinks.accessUrl && <ActionButton size="small" variant="secondary" startIcon={<ContentCopy />} onClick={() => generatedLinks.accessUrl && void navigator.clipboard.writeText(generatedLinks.accessUrl)}>Copy private access</ActionButton>}{generatedLinks.shareUrl && <ActionButton size="small" variant="secondary" startIcon={<ContentCopy />} onClick={() => generatedLinks.shareUrl && void navigator.clipboard.writeText(generatedLinks.shareUrl)}>Copy client invitation</ActionButton>}</Box></Alert>}
        {["approved", "active"].includes(selected.status) && <Alert severity="warning" action={<ActionButton size="small" variant="secondary" onClick={() => void changeStatus(selected, selected.status, true)}>Generate new link</ActionButton>}>Generating a new private access invalidates the previous one. Copy the returned link and send it through the partner&apos;s preferred channel.</Alert>}
      </Box>}</DialogContent>
      <DialogActions><ActionButton variant="secondary" onClick={() => { setSelected(null); setGeneratedLinks(null); }}>Close</ActionButton></DialogActions>
    </Dialog>
  </>;
}

function LeadsPanel({ canApproveRewards, onNotice, onChanged }: { canApproveRewards: boolean; onNotice: (notice: { message: string; severity: "success" | "error" }) => void; onChanged: () => Promise<void> }) {
  const [leads, setLeads] = useState<ReferralLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ReferralLead | null>(null);
  const [rewardRevenue, setRewardRevenue] = useState("");
  const load = useCallback(async () => { try { setLoading(true); setLeads((await getReferralLeads(1, status, search)).leads || []); } catch (error) { onNotice({ message: error instanceof Error ? error.message : "Unable to load leads.", severity: "error" }); } finally { setLoading(false); } }, [onNotice, search, status]);
  useEffect(() => { const timer = window.setTimeout(() => void load(), 250); return () => window.clearTimeout(timer); }, [load]);
  const replace = (lead: ReferralLead) => { setLeads((current) => current.map((item) => item._id === lead._id ? lead : item)); setSelected((current) => current?._id === lead._id ? lead : current); };
  const change = async (data: { status?: ReferralLeadStatus; eligibility?: ReferralLead["eligibility"]; reason?: string }) => { if (!selected) return; try { replace((await updateReferralLead(selected._id, data)).lead); onNotice({ message: "Referral updated.", severity: "success" }); await onChanged(); } catch (error) { onNotice({ message: error instanceof Error ? error.message : "Unable to update referral.", severity: "error" }); } };
  const claim = async (lead: ReferralLead) => { try { replace((await claimReferralLead(lead._id)).lead); onNotice({ message: "Referral assigned to you.", severity: "success" }); } catch (error) { onNotice({ message: error instanceof Error ? error.message : "Unable to assign referral.", severity: "error" }); } };
  const createReward = async () => { if (!selected || !rewardRevenue) return; try { await upsertReferralReward(selected._id, { eligibleRevenueCents: Math.round(Number(rewardRevenue) * 100), status: "waiting_client_payment" }); onNotice({ message: "Reward ledger created from eligible revenue.", severity: "success" }); setRewardRevenue(""); await onChanged(); } catch (error) { onNotice({ message: error instanceof Error ? error.message : "Unable to create reward.", severity: "error" }); } };
  const rows = leads.map((lead) => ({ id: lead._id, Opportunity: <Box><Typography fontWeight={900}>{lead.companyName || lead.contactName}</Typography><Typography variant="caption" color="text.secondary">{words(lead.clientType || "company")} · {lead.serviceNeeded}</Typography></Box>, Partner: <Box><Typography fontWeight={800}>{lead.partnerId}</Typography><Typography variant="caption">{lead.partnerName}</Typography></Box>, Consent: <Chip size="small" label={words(lead.consentStatus)} color={["agreed", "prospect_submitted"].includes(lead.consentStatus) ? "success" : "warning"} />, Eligibility: <Chip size="small" label={lead.eligibility} />, Status: <StatusChip status={lead.status} variant={statusVariant(lead.status)} />, Submitted: formatDate(lead.createdAt) }));
  return <><Filters search={search} setSearch={setSearch} status={status} setStatus={setStatus} options={leadStatuses} /><DataTable headers={["Opportunity", "Partner", "Consent", "Eligibility", "Status", "Submitted"]} rows={rows} hiddenFields={["id"]} emptyMessage={loading ? "Loading referrals..." : "No referrals found"} onView={(id) => setSelected(leads.find((lead) => lead._id === id) || null)} customActions={(row) => { const lead = leads.find((item) => item._id === row.id); return lead && !lead.assignedToEmail ? <MenuAction icon={<Handshake />} label="Take ownership" color="#16a34a" onClick={() => void claim(lead)} /> : null; }} />
    <Dialog open={Boolean(selected)} onClose={() => setSelected(null)} maxWidth="md" fullWidth><DialogTitle sx={{ bgcolor: "#071a33", color: "white" }}>Client introduction</DialogTitle><DialogContent sx={{ pt: 3 }}>{selected && <Box sx={{ display: "grid", gap: 2 }}><Paper variant="outlined" sx={{ p: 2 }}><Typography variant="h6" fontWeight={900}>{selected.companyName || selected.contactName}</Typography><Typography>{words(selected.clientType || "company")} · {selected.contactEmail || selected.contactPhone}</Typography><Typography variant="body2" color="text.secondary">Partner {selected.partnerId} · {selected.partnerName}</Typography></Paper><Paper variant="outlined" sx={{ p: 2 }}><Typography fontWeight={900}>{selected.serviceNeeded}</Typography><Typography sx={{ whiteSpace: "pre-wrap", mt: 1 }}>{selected.needDescription || "No need description provided."}</Typography><Divider sx={{ my: 1.5 }} /><Typography variant="body2"><b>Connection:</b> {selected.relationship}</Typography><Typography variant="body2"><b>Source:</b> {selected.introductionMethod}</Typography></Paper><Grid container spacing={2}><Grid item xs={12} sm={6}><FormControl fullWidth><InputLabel>Status</InputLabel><Select label="Status" value={selected.status} onChange={(event) => void change({ status: event.target.value as ReferralLeadStatus })}>{leadStatuses.map((item) => <MenuItem value={item} key={item}>{words(item)}</MenuItem>)}</Select></FormControl></Grid><Grid item xs={12} sm={6}><FormControl fullWidth><InputLabel>Eligibility</InputLabel><Select label="Eligibility" value={selected.eligibility} onChange={(event) => void change({ eligibility: event.target.value as ReferralLead["eligibility"] })}>{["pending", "eligible", "ineligible"].map((item) => <MenuItem value={item} key={item}>{item}</MenuItem>)}</Select></FormControl></Grid></Grid>{canApproveRewards && <Paper variant="outlined" sx={{ p: 2, bgcolor: "#faf5ff" }}><Typography fontWeight={900}>Reward ledger</Typography><Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>Enter eligible revenue excluding VAT and pass-through costs. The server applies the standard 10% rate without a fixed cap.</Typography><Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}><TextField size="small" type="number" label="Eligible revenue (EUR)" value={rewardRevenue} onChange={(event) => setRewardRevenue(event.target.value)} /><ActionButton variant="primary" disabled={!rewardRevenue} onClick={() => void createReward()}>Create / update reward</ActionButton></Box></Paper>}</Box>}</DialogContent><DialogActions><ActionButton variant="secondary" onClick={() => setSelected(null)}>Close</ActionButton></DialogActions></Dialog>
  </>;
}

function RewardsPanel({ canApprove, canPay, onNotice, onChanged }: { canApprove: boolean; canPay: boolean; onNotice: (notice: { message: string; severity: "success" | "error" }) => void; onChanged: () => Promise<void> }) {
  const [rewards, setRewards] = useState<ReferralReward[]>([]);
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => { try { setLoading(true); setRewards((await getReferralRewards()).rewards || []); } catch (error) { onNotice({ message: error instanceof Error ? error.message : "Unable to load rewards.", severity: "error" }); } finally { setLoading(false); } }, [onNotice]);
  useEffect(() => { void load(); }, [load]);
  const moveReward = async (reward: ReferralReward, status: "earned" | "approved" | "scheduled" | "cancelled") => {
    try {
      const response = await updateReferralRewardStatus(reward._id, status);
      setRewards((current) => current.map((item) => item._id === reward._id ? response.reward : item));
      onNotice({ message: `Reward moved to ${words(status)}.`, severity: "success" });
      await onChanged();
    } catch (error) { onNotice({ message: error instanceof Error ? error.message : "Unable to update reward.", severity: "error" }); }
  };
  const payReward = async (reward: ReferralReward) => {
    const reference = window.prompt("Payment reference (bank, Wise, PayPal, etc.):")?.trim();
    if (!reference) return;
    try {
      const response = await markReferralRewardPaid(reward._id, reference);
      setRewards((current) => current.map((item) => item._id === reward._id ? response.reward : item));
      onNotice({ message: "Reward marked as paid with an audit reference.", severity: "success" });
      await onChanged();
    } catch (error) { onNotice({ message: error instanceof Error ? error.message : "Unable to mark reward paid.", severity: "error" }); }
  };
  const rows = rewards.map((reward) => { const partner = typeof reward.partner === "string" ? undefined : reward.partner; const lead = typeof reward.lead === "string" ? undefined : reward.lead; return { id: reward._id, Partner: <Box><Typography fontWeight={900}>{partner?.name || reward.partnerId}</Typography><Typography variant="caption">{reward.partnerId}</Typography></Box>, Client: lead?.companyName || lead?.contactName || "-", "Eligible revenue": `€${(reward.eligibleRevenueCents / 100).toFixed(2)}`, Reward: <Typography fontWeight={900}>€{(reward.amountCents / 100).toFixed(2)}</Typography>, Status: <StatusChip status={reward.status} variant={statusVariant(reward.status)} />, Updated: formatDate(reward.updatedAt) }; });
  return <><Alert severity="info" sx={{ mb: 2 }}>Financial records are never deleted. Standard rewards are calculated on the backend from eligible revenue at 10%, without a fixed cap.</Alert><DataTable headers={["Partner", "Client", "Eligible revenue", "Reward", "Status", "Updated"]} rows={rows} hiddenFields={["id"]} emptyMessage={loading ? "Loading rewards..." : "No reward records yet"} customActions={(row) => { const reward = rewards.find((item) => item._id === row.id); if (!reward) return null; return <>{canApprove && reward.status === "waiting_client_payment" && <MenuAction icon={<CheckCircle />} label="Client payment received" color="#0ea5e9" onClick={() => void moveReward(reward, "earned")} />}{canApprove && reward.status === "earned" && <MenuAction icon={<CheckCircle />} label="Approve reward" color="#16a34a" onClick={() => void moveReward(reward, "approved")} />}{canApprove && reward.status === "approved" && <MenuAction icon={<AccountBalanceWallet />} label="Schedule payment" color="#7c3aed" onClick={() => void moveReward(reward, "scheduled")} />}{canPay && reward.status === "scheduled" && <MenuAction icon={<AccountBalanceWallet />} label="Mark paid" color="#16a34a" onClick={() => void payReward(reward)} />}</>; }} /></>;
}

function Filters({ search, setSearch, status, setStatus, options }: { search: string; setSearch: (value: string) => void; status: string; setStatus: (value: string) => void; options: string[] }) {
  return <Grid container spacing={2} sx={{ mb: 2 }}><Grid item xs={12} md={8}><TextField fullWidth size="small" label="Search..." value={search} onChange={(event) => setSearch(event.target.value)} /></Grid><Grid item xs={12} md={4}><FormControl fullWidth size="small"><InputLabel>Status</InputLabel><Select value={status} label="Status" onChange={(event) => setStatus(event.target.value)}><MenuItem value="all">All statuses</MenuItem>{options.map((option) => <MenuItem key={option} value={option}>{words(option)}</MenuItem>)}</Select></FormControl></Grid></Grid>;
}
