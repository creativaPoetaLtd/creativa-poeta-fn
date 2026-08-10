import { useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Save from "@mui/icons-material/Save";
import { toast } from 'react-toastify';
import { CreateJob } from '../APIs/Jobs';

interface AddJobModalProps {
  open: boolean;
  handleClose: () => void;
}

export default function AddJobModal({ open, handleClose }: AddJobModalProps) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("fulltime");
  const [description, setDescription] = useState("");
  const [isRemote, setIsRemote] = useState(false);
  const [howToApply, setHowToApply] = useState("");
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);
  const [newItem, setNewItem] = useState({ resp: "", req: "", benefit: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setTitle("");
    setCompany("");
    setLocation("");
    setType("fulltime");
    setDescription("");
    setIsRemote(false);
    setHowToApply("");
    setResponsibilities([]);
    setRequirements([]);
    setBenefits([]);
    setNewItem({ resp: "", req: "", benefit: "" });
  };

  const handleSubmit = async () => {
    try {
      // Validation
      if (!title.trim() || !company.trim() || !description.trim()) {
        toast.error("Please fill in all required fields");
        return;
      }

      setIsSubmitting(true);

      const jobData = {
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

      const response = await CreateJob(jobData);

      toast.success(response.message|| "Job posted successfully! 🎉");
      resetForm();
      
      setTimeout(() => {
        handleClose();
      }, 1500);

    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create job posting");
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
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6">💼 Post New Job</Typography>
          <IconButton onClick={handleClose} disabled={isSubmitting}>
            <Close />
          </IconButton>
        </Box>

        <Stack spacing={2}>
          <TextField
            required
            fullWidth
            label="Job Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
          />

          <TextField
            required
            fullWidth
            label="Company"
            variant="outlined"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            disabled={isSubmitting}
          />


          <TextField
            fullWidth
            label="Location"
            variant="outlined"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={isSubmitting}
          />

          <FormControl fullWidth>
            <InputLabel>Job Type</InputLabel>
            <Select
              value={type}
              label="Job Type"
              onChange={(e) => setType(e.target.value)}
                disabled={isSubmitting  }
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
                disabled={isSubmitting}
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
            disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting} 
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
            disabled={isSubmitting}
          />

<Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, gap: 2 }}>
            <Button 
              onClick={handleClose} 
              color="error"
              disabled={isSubmitting}
              variant="outlined"
              startIcon={<Close />}
              sx={{ minWidth: 120 }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              variant="contained" 
              color="primary"
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : <Save />}
              sx={{ 
                minWidth: 120,
                backgroundColor: isSubmitting ? 'grey.400' : 'primary.main',
                '&:hover': {
                  backgroundColor: isSubmitting ? 'grey.400' : 'primary.dark',
                }
              }}
            >
              {isSubmitting ? "Posting..." : "Post Job"}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
}
