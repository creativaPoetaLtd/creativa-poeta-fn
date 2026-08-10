import { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import Close from "@mui/icons-material/Close";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CreateBlog } from "../APIs/Blogs";

interface AddBlogModalProps {
  open: boolean;
  handleClose: () => void;
  // handleSave: (newBlog: { title: string; content: string; coverImage: File | null }) => void;
  // loggedInUser: string; 
}

export default function AddBlogModal({ open, handleClose }: AddBlogModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setCoverImage(file);
    } else {
      setError("Please select a valid image file");
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError("");
  
      if (!title.trim() || !content.trim()) {
        setError("Title and content are required!");
        setIsSubmitting(false);
        return;
      }
  
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (coverImage) {
        formData.append("image", coverImage);
      }
  
      const response = await CreateBlog(formData);
  
      if (response.blog) {
        setSuccess("Blog post created successfully!");
        setTitle("");
        setContent("");
        setCoverImage(null);
  
        // Close modal after short delay
        setTimeout(() => {
          handleClose();
        }, 1500);
      } else {
        throw new Error(response.message || "Failed to create blog post");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create blog post");
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
          width: 800,
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
          <Typography variant="h6">📝 Add New Blog</Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>

        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Typography variant="subtitle1" sx={{ mb: 1 }}>Content</Typography>
        <ReactQuill
          value={content}
          onChange={setContent}
          theme="snow"
          style={{ height: 200, marginBottom: "40px" }}
        />

        <Typography variant="subtitle1" sx={{ mb: 1 }}>Cover Image</Typography>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
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
            {isSubmitting ? "Saving..." : "Save Blog"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
