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
  existingBlog: { title: string; content: string; coverImage?: string }; // Existing blog data
}

export default function EditBlogModal({ open, handleClose, handleUpdate, existingBlog }: EditBlogModalProps) {
  const [title, setTitle] = useState(existingBlog.title);
  const [content, setContent] = useState(existingBlog.content);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(existingBlog.coverImage || null);

  useEffect(() => {
    // Update modal fields when the existing blog changes
    setTitle(existingBlog.title);
    setContent(existingBlog.content);
    setPreviewImage(existingBlog.coverImage || null);
  }, [existingBlog]);

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content are required!");
      return;
    }

    const updatedBlog = { title, content, coverImage };
    handleUpdate(updatedBlog);
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
          width: 500,
          bgcolor: "background.paper",
          p: 3,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
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
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Update Blog
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
