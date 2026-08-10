import { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  FormControl,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  InputLabel,
  Chip,
  Stack,
} from "@mui/material";
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";

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
}

interface EditJobModalProps {
  open: boolean;
  handleClose: () => void;
  handleUpdate: (updatedJob: Omit<Job, '_id'>) => Promise<void>;
  existingJob: Job;
}

export default function EditJobModal({ 
  open, 
  handleClose, 
  handleUpdate, 
  existingJob 
}: EditJobModalProps) {
  const [title, setTitle] = useState(existingJob.title);
  const [company, setCompany] = useState(existingJob.company);
  const [location, setLocation] = useState(existingJob.location);
  const [type, setType] = useState(existingJob.type);
  const [description, setDescription] = useState(existingJob.description);
  const [isRemote, setIsRemote] = useState(existingJob.isRemote);
  const [howToApply, setHowToApply] = useState(existingJob.howToApply);
  const [responsibilities, setResponsibilities] = useState(existingJob.responsibilities);
  const [requirements, setRequirements] = useState(existingJob.requirements);
  const [benefits, setBenefits] = useState(existingJob.benefits);
  const [newItem, setNewItem] = useState({ resp: "", req: "", benefit: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Update form fields when existingJob changes
    setTitle(existingJob.title);
    setCompany(existingJob.company);
    setLocation(existingJob.location);
    setType(existingJob.type);
    setDescription(existingJob.description);
    setIsRemote(existingJob.isRemote);
    setHowToApply(existingJob.howToApply);
    setResponsibilities(existingJob.responsibilities);
    setRequirements(existingJob.requirements);
    setBenefits(existingJob.benefits);
  }, [existingJob]);

  const handleSubmit = async () => {
    if (!title.trim() || !company.trim() || !description.trim()) {
      setError("Title, company, and description are required!");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    const updatedJob = {
      title,
      company,
      location,
      type,
      description,
      responsibilities,
      requirements,
      benefits,
      isRemote,
      howToApply,
    };

    try {
      await handleUpdate(updatedJob);
      setSuccess("Job updated successfully!");
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update job posting");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addListItem = (type: 'resp' | 'req' | 'benefit') => {
    if (newItem[type].trim()) {
      switch (type) {
        case 'resp':
          setResponsibilities([...responsibilities, newItem.resp]);
          break;
        case 'req':
          setRequirements([...requirements, newItem.req]);
          break;
        case 'benefit':
          setBenefits([...benefits, newItem.benefit]);
          break;
      }
      setNewItem({ ...newItem, [type]: "" });
    }
  };

  const removeListItem = (type: 'resp' | 'req' | 'benefit', index: number) => {
    switch (type) {
      case 'resp':
        setResponsibilities(responsibilities.filter((_, i) => i !== index));
        break;
      case 'req':
        setRequirements(requirements.filter((_, i) => i !== index));
        break;
      case 'benefit':
        setBenefits(benefits.filter((_, i) => i !== index));
        break;
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          maxHeight: "90vh",
          overflow: "auto",
          bgcolor: "background.paper",
          p: 3,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="success.main" sx={{ mb: 2 }}>
            {success}
          </Typography>
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6">✏️ Edit Job Posting</Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>

        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Job Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            fullWidth
            label="Company"
            variant="outlined"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <TextField
            fullWidth
            label="Location"
            variant="outlined"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <FormControl fullWidth>
            <InputLabel>Job Type</InputLabel>
            <Select
              value={type}
              label="Job Type"
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="fulltime">Full Time</MenuItem>
              <MenuItem value="parttime">Part Time</MenuItem>
              <MenuItem value="contract">Contract</MenuItem>
              <MenuItem value="internship">Internship</MenuItem>
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Switch
                checked={isRemote}
                onChange={(e) => setIsRemote(e.target.checked)}
              />
            }
            label="Remote Position"
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Job Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Responsibilities Section */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Responsibilities</Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
              <TextField
                fullWidth
                size="small"
                value={newItem.resp}
                onChange={(e) => setNewItem({ ...newItem, resp: e.target.value })}
                placeholder="Add responsibility"
              />
              <Button onClick={() => addListItem('resp')} startIcon={<Add />}>
                Add
              </Button>
            </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {responsibilities.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => removeListItem('resp', index)}
                  sx={{ mb: 1 }}
                />
              ))}
            </Stack>
          </Box>

          {/* Requirements Section */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Requirements</Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
              <TextField
                fullWidth
                size="small"
                value={newItem.req}
                onChange={(e) => setNewItem({ ...newItem, req: e.target.value })}
                placeholder="Add requirement"
              />
              <Button onClick={() => addListItem('req')} startIcon={<Add />}>
                Add
              </Button>
            </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {requirements.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => removeListItem('req', index)}
                  sx={{ mb: 1 }}
                />
              ))}
            </Stack>
          </Box>

          {/* Benefits Section */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Benefits</Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
              <TextField
                fullWidth
                size="small"
                value={newItem.benefit}
                onChange={(e) => setNewItem({ ...newItem, benefit: e.target.value })}
                placeholder="Add benefit"
              />
              <Button onClick={() => addListItem('benefit')} startIcon={<Add />}>
                Add
              </Button>
            </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {benefits.map((item, index) => (
                <Chip
                  key={index}
                  label={item}
                  onDelete={() => removeListItem('benefit', index)}
                  sx={{ mb: 1 }}
                />
              ))}
            </Stack>
          </Box>

          <TextField
            fullWidth
            label="How to Apply"
            variant="outlined"
            value={howToApply}
            onChange={(e) => setHowToApply(e.target.value)}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button 
              onClick={handleClose} 
              color="error"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              variant="contained" 
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Job"}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
}
