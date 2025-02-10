import { useState, useEffect } from "react";
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

interface EditBlogModalProps {
  open: boolean;
  handleClose: () => void;
  handleUpdate: (updatedBlog: { title: string; content: string; coverImage: File | null }) => void;
  existingBlog: { _id: string; title: string; content: string; coverImage?: string }; // Existing blog data
}

export default function EditBlogModal({ open, handleClose, handleUpdate, existingBlog }: EditBlogModalProps) {
  const [title, setTitle] = useState(existingBlog.title);
  const [content, setContent] = useState(existingBlog.content);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(existingBlog.coverImage || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Update modal fields when the existing blog changes
    setTitle(existingBlog.title);
    setContent(existingBlog.content);
    setPreviewImage(existingBlog.coverImage || null);
  }, [existingBlog]);
  
  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required!");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    const updatedBlog = { title, content, coverImage };
    try {
      await handleUpdate(updatedBlog); // Send updated data to API
      setSuccess("Blog updated successfully!");
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err) {
      setError("Failed to update blog. Please try again.");
    } finally {
      setIsSubmitting(false);
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
          width: 500,
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

        {/* Modal Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6">✏️ Edit Blog</Typography>
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
          style={{ height: 200, marginBottom: "16px" }}
        />

        {/* Cover Image Upload */}
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Cover Image</Typography>
        {previewImage && (
          <Box sx={{ mb: 1 }}>
            <img src={previewImage} alt="Cover" style={{ width: "100%", borderRadius: "8px" }} />
          </Box>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setCoverImage(file);
            setPreviewImage(file ? URL.createObjectURL(file) : null);
          }}
        />

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button onClick={handleClose} color="error" disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Blog"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
