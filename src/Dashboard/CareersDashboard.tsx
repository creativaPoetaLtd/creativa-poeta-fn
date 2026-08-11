import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Box, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Snackbar, Tab, Tabs, TextField, Typography } from "@mui/material";
import Add from "@mui/icons-material/Add";
import Business from "@mui/icons-material/Business";
import Close from "@mui/icons-material/Close";
import Edit from "@mui/icons-material/Edit";
import People from "@mui/icons-material/People";
import Visibility from "@mui/icons-material/Visibility";
import {
  CareerApplication, CareerApplicationStatus, CareerJob, CareerJobPayload, CareerJobType,
  closeCareerJob, createCareerJob, getAdminCareerJobs, getCareerApplications,
  updateCareerApplicationStatus, updateCareerJob,
} from "../APIs/CareerApi";
import { ActionButton, DashboardCard, DataTable, MenuAction, PageHeader, StatusChip } from "./components/DashboardComponents";

const blankJob: CareerJobPayload = {
  title: "", summary: "", company: "Creativa Poeta", department: "", location: "Remote",
  type: "contract", description: "", responsibilities: [], requirements: [], benefits: [],
  isRemote: true, howToApply: "Apply through the Creativa Poeta Career page.", status: "draft",
  applicationDeadline: undefined,
};
const applicationStatuses: CareerApplicationStatus[] = ["new", "reviewing", "shortlisted", "rejected", "archived"];
const formatDate = (value?: string) => value ? new Intl.DateTimeFormat("fr-BE", { dateStyle: "medium" }).format(new Date(value)) : "—";
const words = (value: string) => value.replace(/_/g, " ");
const statusVariant = (status: string) => status === "published" || status === "shortlisted" ? "success" as const : status === "closed" || status === "rejected" ? "error" as const : status === "reviewing" ? "info" as const : "warning" as const;

export default function CareersDashboard() {
  const [tab, setTab] = useState(0);
  const [jobs, setJobs] = useState<CareerJob[]>([]);
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<{ message: string; severity: "success" | "error" } | null>(null);
  const [editor, setEditor] = useState<CareerJob | "new" | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<CareerApplication | null>(null);
  const [applicationFilter, setApplicationFilter] = useState("all");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const [jobResponse, applicationResponse] = await Promise.all([getAdminCareerJobs(), getCareerApplications(applicationFilter)]);
      setJobs(jobResponse.jobs || []);
      setApplications(applicationResponse.applications || []);
    } catch (error) {
      setNotice({ message: error instanceof Error ? error.message : "Unable to load Career data.", severity: "error" });
    } finally { setLoading(false); }
  }, [applicationFilter]);
  useEffect(() => { void load(); }, [load]);

  const metrics = useMemo(() => ({
    published: jobs.filter((job) => job.status === "published").length,
    drafts: jobs.filter((job) => job.status === "draft").length,
    newApplications: applications.filter((application) => application.status === "new").length,
  }), [applications, jobs]);

  const closeJob = async (job: CareerJob) => {
    try {
      const response = await closeCareerJob(job._id);
      setJobs((current) => current.map((item) => item._id === job._id ? response.job : item));
      setNotice({ message: "Opportunity closed and removed from the public Career page.", severity: "success" });
    } catch (error) { setNotice({ message: error instanceof Error ? error.message : "Unable to close the opportunity.", severity: "error" }); }
  };

  const changeApplicationStatus = async (status: CareerApplicationStatus) => {
    if (!selectedApplication) return;
    try {
      const response = await updateCareerApplicationStatus(selectedApplication._id, status);
      setSelectedApplication(response.application);
      setApplications((current) => current.map((item) => item._id === response.application._id ? response.application : item));
      setNotice({ message: "Application status updated.", severity: "success" });
    } catch (error) { setNotice({ message: error instanceof Error ? error.message : "Unable to update the application.", severity: "error" }); }
  };

  const jobRows = jobs.map((job) => ({
    id: job._id,
    Opportunity: <Box><Typography fontWeight={900}>{job.title}</Typography><Typography variant="caption" color="text.secondary">{job.department || job.company}</Typography></Box>,
    Location: job.isRemote ? "Remote" : job.location,
    Type: words(job.type),
    Status: <StatusChip status={job.status} variant={statusVariant(job.status)} />,
    Deadline: formatDate(job.applicationDeadline),
  }));
  const applicationRows = applications.map((application) => ({
    id: application._id,
    Candidate: <Box><Typography fontWeight={900}>{application.fullName}</Typography><Typography variant="caption" color="text.secondary">{application.email || application.phone}</Typography></Box>,
    Application: application.kind === "spontaneous" ? "Spontaneous" : application.jobTitle || "Published role",
    Role: application.desiredRole || "—",
    Status: <StatusChip status={application.status} variant={statusVariant(application.status)} />,
    Received: formatDate(application.createdAt),
  }));

  return <Box sx={{ p: { xs: 0, md: 3 } }}>
    <PageHeader title="Careers" subtitle="Publish opportunities and review every application received from the public Career page." action={<ActionButton variant="primary" startIcon={<Add />} onClick={() => setEditor("new")}>New opportunity</ActionButton>} />
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={6} lg={4}><DashboardCard title="Published" value={metrics.published} icon={<Business />} color="#16a34a" /></Grid>
      <Grid item xs={6} lg={4}><DashboardCard title="Drafts" value={metrics.drafts} icon={<Edit />} color="#f59e0b" /></Grid>
      <Grid item xs={12} lg={4}><DashboardCard title="New applications" value={metrics.newApplications} icon={<People />} color="#0ea5e9" /></Grid>
    </Grid>
    <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
      <Tabs value={tab} onChange={(_, value) => setTab(value)} sx={{ borderBottom: "1px solid #e2e8f0", px: 1 }}><Tab label="Opportunities" /><Tab label="Applications" /></Tabs>
      <Box sx={{ p: { xs: 1.5, md: 2.5 } }}>
        {tab === 0 && <DataTable headers={["Opportunity", "Location", "Type", "Status", "Deadline"]} hiddenFields={["id"]} rows={jobRows} emptyMessage={loading ? "Loading opportunities..." : "No opportunities created yet"} customActions={(row) => { const job = jobs.find((item) => item._id === row.id); if (!job) return null; return <><MenuAction icon={<Edit />} label="Edit" color="#d39b00" onClick={() => setEditor(job)} />{job.status !== "closed" && <MenuAction icon={<Close />} label="Close" color="#ef4444" onClick={() => void closeJob(job)} />}</>; }} />}
        {tab === 1 && <><Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}><FormControl size="small" sx={{ minWidth: 190 }}><InputLabel>Status</InputLabel><Select label="Status" value={applicationFilter} onChange={(event) => setApplicationFilter(event.target.value)}><MenuItem value="all">All applications</MenuItem>{applicationStatuses.map((status) => <MenuItem key={status} value={status}>{words(status)}</MenuItem>)}</Select></FormControl></Box><DataTable headers={["Candidate", "Application", "Role", "Status", "Received"]} hiddenFields={["id"]} rows={applicationRows} emptyMessage={loading ? "Loading applications..." : "No applications received yet"} customActions={(row) => <MenuAction icon={<Visibility />} label="Review" color="#0ea5e9" onClick={() => setSelectedApplication(applications.find((item) => item._id === row.id) || null)} />} /></>}
      </Box>
    </Paper>
    <JobEditor open={Boolean(editor)} job={editor === "new" ? undefined : editor || undefined} onClose={() => setEditor(null)} onSaved={(job) => { setJobs((current) => editor === "new" ? [job, ...current] : current.map((item) => item._id === job._id ? job : item)); setEditor(null); setNotice({ message: editor === "new" ? "Opportunity created." : "Opportunity updated.", severity: "success" }); }} />
    <ApplicationDialog application={selectedApplication} onClose={() => setSelectedApplication(null)} onStatus={changeApplicationStatus} />
    <Snackbar open={Boolean(notice)} autoHideDuration={5000} onClose={() => setNotice(null)} anchorOrigin={{ vertical: "top", horizontal: "right" }}><Alert severity={notice?.severity || "success"} onClose={() => setNotice(null)}>{notice?.message}</Alert></Snackbar>
  </Box>;
}

function JobEditor({ open, job, onClose, onSaved }: { open: boolean; job?: CareerJob; onClose: () => void; onSaved: (job: CareerJob) => void }) {
  const [form, setForm] = useState<CareerJobPayload>({ ...blankJob });
  const [lists, setLists] = useState({ responsibilities: "", requirements: "", benefits: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!open) return;
    const next = job ? { title: job.title, summary: job.summary || "", company: job.company, department: job.department || "", location: job.location, type: job.type, description: job.description, responsibilities: job.responsibilities || [], requirements: job.requirements || [], benefits: job.benefits || [], isRemote: job.isRemote, howToApply: job.howToApply || blankJob.howToApply, status: job.status, applicationDeadline: job.applicationDeadline } : { ...blankJob };
    setForm(next);
    setLists({ responsibilities: next.responsibilities.join("\n"), requirements: next.requirements.join("\n"), benefits: next.benefits.join("\n") });
    setError("");
  }, [job, open]);
  const save = async () => {
    if (!form.title.trim() || !form.company.trim() || !form.location.trim() || !form.description.trim()) { setError("Title, company, location and description are required."); return; }
    const split = (value: string) => value.split("\n").map((item) => item.trim()).filter(Boolean);
    const payload = { ...form, responsibilities: split(lists.responsibilities), requirements: split(lists.requirements), benefits: split(lists.benefits) };
    try { setSaving(true); const response = job ? await updateCareerJob(job._id, payload) : await createCareerJob(payload); onSaved(response.job); }
    catch (saveError) { setError(saveError instanceof Error ? saveError.message : "Unable to save the opportunity."); }
    finally { setSaving(false); }
  };
  return <Dialog open={open} onClose={saving ? undefined : onClose} maxWidth="md" fullWidth><DialogTitle sx={{ bgcolor: "#071a33", color: "white", fontWeight: 900 }}>{job ? "Edit opportunity" : "Create an opportunity"}</DialogTitle><DialogContent dividers sx={{ pt: 3 }}>{error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}<Grid container spacing={2}>
    <Grid item xs={12} sm={8}><TextField required fullWidth label="Opportunity title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /></Grid><Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Status</InputLabel><Select label="Status" value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as CareerJobPayload["status"] })}><MenuItem value="draft">Draft</MenuItem><MenuItem value="published">Published</MenuItem><MenuItem value="closed">Closed</MenuItem></Select></FormControl></Grid>
    <Grid item xs={12}><TextField fullWidth label="Short summary" helperText="Used on the public opportunity card." value={form.summary} onChange={(event) => setForm({ ...form, summary: event.target.value })} /></Grid>
    <Grid item xs={12} sm={6}><TextField required fullWidth label="Company" value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} /></Grid><Grid item xs={12} sm={6}><TextField fullWidth label="Department / team" value={form.department} onChange={(event) => setForm({ ...form, department: event.target.value })} /></Grid>
    <Grid item xs={12} sm={6}><TextField required fullWidth label="Location" value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} /></Grid><Grid item xs={12} sm={6}><FormControl fullWidth><InputLabel>Type</InputLabel><Select label="Type" value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value as CareerJobType })}><MenuItem value="fulltime">Full time</MenuItem><MenuItem value="parttime">Part time</MenuItem><MenuItem value="contract">Contract / assignment</MenuItem><MenuItem value="internship">Internship</MenuItem></Select></FormControl></Grid>
    <Grid item xs={12} sm={6}><TextField fullWidth type="date" label="Application deadline" InputLabelProps={{ shrink: true }} value={form.applicationDeadline?.slice(0, 10) || ""} onChange={(event) => setForm({ ...form, applicationDeadline: event.target.value || undefined })} /></Grid><Grid item xs={12} sm={6}><FormControlLabel control={<Checkbox checked={form.isRemote} onChange={(event) => setForm({ ...form, isRemote: event.target.checked })} />} label="Remote opportunity" /></Grid>
    <Grid item xs={12}><TextField required fullWidth multiline minRows={5} label="Full description" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></Grid>
    <Grid item xs={12} md={4}><TextField fullWidth multiline minRows={5} label="Responsibilities" helperText="One item per line." value={lists.responsibilities} onChange={(event) => setLists({ ...lists, responsibilities: event.target.value })} /></Grid><Grid item xs={12} md={4}><TextField fullWidth multiline minRows={5} label="Requirements" helperText="One item per line." value={lists.requirements} onChange={(event) => setLists({ ...lists, requirements: event.target.value })} /></Grid><Grid item xs={12} md={4}><TextField fullWidth multiline minRows={5} label="Benefits" helperText="One item per line." value={lists.benefits} onChange={(event) => setLists({ ...lists, benefits: event.target.value })} /></Grid>
  </Grid></DialogContent><DialogActions sx={{ p: 2, gap: 1 }}><ActionButton variant="secondary" onClick={onClose} disabled={saving}>Cancel</ActionButton><ActionButton variant="primary" onClick={() => void save()} disabled={saving}>{saving ? "Saving..." : job ? "Save changes" : "Create opportunity"}</ActionButton></DialogActions></Dialog>;
}

function ApplicationDialog({ application, onClose, onStatus }: { application: CareerApplication | null; onClose: () => void; onStatus: (status: CareerApplicationStatus) => void }) {
  return <Dialog open={Boolean(application)} onClose={onClose} maxWidth="md" fullWidth><DialogTitle sx={{ bgcolor: "#071a33", color: "white", fontWeight: 900 }}>Application review</DialogTitle><DialogContent dividers>{application && <Box sx={{ display: "grid", gap: 2 }}><Box><Typography variant="h5" fontWeight={900}>{application.fullName}</Typography><Typography color="text.secondary">{application.kind === "spontaneous" ? "Spontaneous application" : application.jobTitle}</Typography></Box><Grid container spacing={2}><Grid item xs={12} sm={6}><Info label="Email" value={application.email} /></Grid><Grid item xs={12} sm={6}><Info label="Phone / WhatsApp" value={application.phone} /></Grid><Grid item xs={12} sm={6}><Info label="Country / city" value={application.country} /></Grid><Grid item xs={12} sm={6}><Info label="Desired role" value={application.desiredRole} /></Grid><Grid item xs={12} sm={6}><Info label="Experience" value={application.experience} /></Grid><Grid item xs={12} sm={6}><Info label="Availability" value={application.availability} /></Grid></Grid><Info label="Skills" value={application.skills} /><Info label="Message" value={application.message} /><Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>{application.linkedin && <Chip component="a" href={application.linkedin} target="_blank" clickable label="Open LinkedIn" />}{application.portfolio && <Chip component="a" href={application.portfolio} target="_blank" clickable label="Open CV / portfolio" />}</Box><FormControl fullWidth><InputLabel>Application status</InputLabel><Select label="Application status" value={application.status} onChange={(event) => void onStatus(event.target.value as CareerApplicationStatus)}>{applicationStatuses.map((status) => <MenuItem key={status} value={status}>{words(status)}</MenuItem>)}</Select></FormControl></Box>}</DialogContent><DialogActions><ActionButton variant="secondary" onClick={onClose}>Close</ActionButton></DialogActions></Dialog>;
}

function Info({ label, value }: { label: string; value?: string }) { return <Box><Typography variant="caption" color="text.secondary" fontWeight={800}>{label}</Typography><Typography sx={{ whiteSpace: "pre-wrap" }}>{value || "—"}</Typography></Box>; }
