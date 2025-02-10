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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import AddBlogModal from "./AddBlog";
import EditBlogModal from "./EditBlog";
import axios from "axios"; 

const API_URL = "https://creativapoeta-bn.onrender.com/api/blogs"; 

export default function Blogs() {
  const [blogs, setBlogs] = useState<{ 
    _id: string; 
    title: string; 
    content: string; 
    coverImage?: string; 
    author?: { name: string }; 
    createdAt: string; 
    status: string 
  }[]>([]);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<{ 
    _id: string; 
    title: string; 
    content: string; 
    coverImage?: string 
  } | null>(null);

  // Fetch all blogs from the backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(API_URL);
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  // Open/Close Modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditOpen = (blog: { _id: string; title: string; content: string; coverImage?: string }) => {
    setSelectedBlog(blog);
    console.log("selected blog", blog);
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setSelectedBlog(null);
    setEditModalOpen(false);
  };
  const token = localStorage.getItem("token"); // Ensure token is retrieved

  // 🔹 Handle Blog Update
  const handleUpdate = async (updatedBlog: { title: string; content: string; coverImage: File | null }) => {
    if (!selectedBlog || !selectedBlog._id) return; // Ensure selectedBlog and its _id are defined

    const formData = new FormData();
    formData.append("title", updatedBlog.title);
    formData.append("content", updatedBlog.content);
    if (updatedBlog.coverImage) {
      formData.append("image", updatedBlog.coverImage);
    }

    try {
      const response = await axios.patch(`${API_URL}/${selectedBlog._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to update blog.");
      }

      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === selectedBlog._id
            ? { ...blog, ...updatedBlog, coverImage: updatedBlog.coverImage ? URL.createObjectURL(updatedBlog.coverImage) : blog.coverImage }
            : blog
        )
      );
    } catch (error) {
      console.error("Error updating blog:", error);
      throw error;
    }

    handleEditClose();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString();
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">📖 Blog Management</Typography>

      {/* Search & Add Blog */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Search Blogs"
          variant="outlined"
          size="small"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleOpen}>
          + Add Blog
        </Button>
      </Box>

      {/* Blogs Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Author</b></TableCell>
              <TableCell><b>Date</b></TableCell>
              {/* <TableCell><b>Status</b></TableCell> */}
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBlogs.map((blog) => (
              <TableRow key={blog._id}>
                <TableCell>{blog.title}</TableCell>
                <TableCell>{blog.author?.name || "Unknown"}</TableCell>
                <TableCell>{formatDate(blog.createdAt)}</TableCell>
                {/* <TableCell>{blog.status}</TableCell> */}
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditOpen(blog)}><Edit /></IconButton>
                  <IconButton color="error"><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Blog Modal */}
      <AddBlogModal open={open} handleClose={handleClose} />

      {/* Edit Blog Modal */}
      {selectedBlog && (
        <EditBlogModal
          open={isEditModalOpen}
          handleClose={handleEditClose}
          handleUpdate={handleUpdate}
          existingBlog={selectedBlog}
        />
      )}
    </Box>
  );
}
