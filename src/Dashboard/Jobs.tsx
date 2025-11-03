import { useState, useEffect } from "react";
import { Box, TextField } from "@mui/material";
import {
  LocationOn,
  Business,
  Work,
  Schedule,
  Edit,
  Delete,
} from "@mui/icons-material";
import {
  DashboardCard,
  PageHeader,
  DataTable,
  StatusChip,
  ActionButton,
  MenuAction,
} from "./components/DashboardComponents";
import AddJobModal from "./CreateJob";
import EditJobModal from "./EditJob";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  isRemote: boolean;
  howToApply: string;
  createdAt: string;
  updatedAt: string;
}

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  // @ts-ignore
  const [error, setError] = useState<string | null>(null);

  const API_URL = "https://creativa-poeta-bn-phi.vercel.app/api/jobs";

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL);
      const data = await response.json();
      setJobs(data.jobs);
      console.log("Jobs============", data.jobs);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditOpen = (job: Job) => {
    setSelectedJob(job);
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setSelectedJob(null);
    setEditModalOpen(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString();
  };

  const handleUpdate = async (
    updatedJob: Omit<Job, "_id" | "createdAt" | "updatedAt">
  ) => {
    if (!selectedJob || !selectedJob._id) return;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/${selectedJob._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedJob),
      });

      if (!response.ok) {
        throw new Error("Failed to update job.");
      }

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === selectedJob._id ? { ...job, ...updatedJob } : job
        )
      );
    } catch (error) {
      console.error("Error updating job:", error);
      throw error;
    }

    handleEditClose();
  };

  if (loading) {
    return (
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <PageHeader title="💼 Job Management" subtitle="Loading job data..." />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-500"></div>
        </div>
      </Box>
    );
  }

  // Calculate metrics for dashboard cards
  const totalJobs = jobs.length;
  const remoteJobs = jobs.filter((job) => job.isRemote).length;
  const fullTimeJobs = jobs.filter((job) => job.type === "fulltime").length;
  const recentJobs = jobs.filter((job) => {
    const jobDate = new Date(job.createdAt);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return jobDate >= oneWeekAgo;
  }).length;

  // Filter jobs based on search
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase())
  );

  // Prepare table data for DataTable component
  const tableHeaders = [
    "Job Title",
    "Company",
    "Location",
    "Type",
    "Work Mode",
    "Posted Date",
  ];

  const tableRows = filteredJobs.map((job) => ({
    id: job._id,
    "Job Title": (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Work fontSize="small" />
        {job.title}
      </Box>
    ),
    Company: (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Business fontSize="small" />
        {job.company}
      </Box>
    ),
    Location: (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <LocationOn fontSize="small" />
        {job.location}
      </Box>
    ),
    Type: (
      <StatusChip
        status={job.type}
        variant={job.type === "fulltime" ? "success" : "info"}
      />
    ),
    "Work Mode": (
      <StatusChip
        status={job.isRemote ? "Remote" : "On-site"}
        variant={job.isRemote ? "success" : "default"}
      />
    ),
    "Posted Date": (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Schedule fontSize="small" />
        {formatDate(job.createdAt)}
      </Box>
    ),
  }));

  const handleEditJob = (id: string) => {
    const job = jobs.find((j) => j._id === id);
    if (job) handleEditOpen(job);
  };

  const handleDeleteJob = (id: string) => {
    console.log("Delete job:", id);
    // Implement delete functionality
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <PageHeader
        title="💼 Job Management"
        subtitle="Manage job postings and opportunities"
        action={
          <ActionButton variant="primary" onClick={handleOpen}>
            + Add Job
          </ActionButton>
        }
      />

      {/* Summary Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 3,
          mb: 4,
        }}
      >
        <DashboardCard
          title="Total Jobs"
          value={totalJobs.toString()}
          icon={<Work />}
          trend="up"
          trendValue="+12.3%"
          color="#EEBA2B"
        />
        <DashboardCard
          title="Remote Jobs"
          value={remoteJobs.toString()}
          icon={<LocationOn />}
          trend="up"
          trendValue="+25.7%"
          color="#4caf50"
        />
        <DashboardCard
          title="Full-time"
          value={fullTimeJobs.toString()}
          icon={<Business />}
          trend="up"
          trendValue="+8.4%"
          color="#2196f3"
        />
        <DashboardCard
          title="Recent (7 days)"
          value={recentJobs.toString()}
          icon={<Schedule />}
          trend="up"
          trendValue="+15.2%"
          color="#ff9800"
        />
      </Box>

      {/* Search Controls */}
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Search Jobs"
          variant="outlined"
          size="medium"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ maxWidth: 400 }}
        />
      </Box>

      {/* Jobs Table */}
      <DataTable
        headers={tableHeaders}
        hiddenFields={["id"]}
        rows={tableRows}
        customActions={(row) => {
          return (
            <>
              <MenuAction
                icon={<Edit />}
                label="Edit"
                onClick={() => handleEditJob(row.id)}
                color="#EEBA2B"
              />
              <MenuAction
                icon={<Delete />}
                label="Delete"
                onClick={() => handleDeleteJob(row.id)}
                color="#ef4444"
              />
            </>
          );
        }}
        emptyMessage="No jobs found"
      />

      <AddJobModal open={open} handleClose={handleClose} />
      {selectedJob && (
        <EditJobModal
          open={isEditModalOpen}
          handleClose={handleEditClose}
          handleUpdate={handleUpdate}
          existingJob={selectedJob}
        />
      )}
    </Box>
  );
}
