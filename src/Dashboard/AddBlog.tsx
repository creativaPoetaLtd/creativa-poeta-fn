import { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface AddBlogModalProps {
  open: boolean;
  handleClose: () => void;
  handleSave: (newBlog: { title: string; content: string; coverImage: File | null }) => void;
  loggedInUser: string; 
}
// @ts-ignore
export default function AddBlogModal({ open, handleClose, handleSave, loggedInUser }: AddBlogModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content are required!");
      return;
    }

    const newBlog = { title, content, coverImage };
    handleSave(newBlog);
    setTitle("");
    setContent("");
    setCoverImage(null);
    handleClose();
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
          bgcolor: "background.paper",
          p: 3,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        {/* Modal Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6">📝 Add New Blog</Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>

        {/* Blog Title */}
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Content Editor */}
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Content</Typography>
        <ReactQuill
          value={content}
          onChange={setContent}
          theme="snow"
          style={{ height: 200, marginBottom: "40px" }}
        />

        {/* Cover Image Upload */}
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Cover Image</Typography>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
        />

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save Blog
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
