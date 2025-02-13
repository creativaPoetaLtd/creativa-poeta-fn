import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Button,
  Chip,
} from "@mui/material";
import { Edit, Delete, LocationOn, Business,} from "@mui/icons-material";
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
// @ts-ignore
interface EditJobModalProps {
    open: boolean;
    handleClose: () => void;
    handleUpdate: (updatedJob: Omit<Job, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    existingJob: Job;
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

  const API_URL = "https://creativapoeta-bn.onrender.com/api/jobs";
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

  const handleUpdate = async (updatedJob: Omit<Job, '_id' | 'createdAt' | 'updatedAt'>) => {
    if (!selectedJob || !selectedJob._id) return;
  
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
  
    try {
      const response = await fetch(`${API_URL}/${selectedJob._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(updatedJob),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update job.');
      }
  
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === selectedJob._id ? { ...job, ...updatedJob } : job
        )
      );
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  
    handleEditClose();
  };
  
   if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-500"></div>
      </div>
    );
  }
  
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        💼 Job List
      </Typography>

      {/* Search & Add Job */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="Search Jobs"
          variant="outlined"
          size="small"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleOpen}>
          + Add Job
        </Button>
      </Box>

      {/* Jobs Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Company</b></TableCell>
              <TableCell><b>Location</b></TableCell>
              <TableCell><b>Type</b></TableCell>
              <TableCell><b>Remote</b></TableCell>
              <TableCell><b>Posted Date</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Business fontSize="small" />
                    {job.company}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOn fontSize="small" />
                    {job.location}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={job.type}
                    color={job.type === 'fulltime' ? 'primary' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={job.isRemote ? "Remote" : "On-site"}
                    color={job.isRemote ? "success" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell>{formatDate(job.createdAt)}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditOpen(job)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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