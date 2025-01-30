import { useState } from "react";
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

const initialBlogs = [
  { id: 1, title: "How to Use React", author: "John Doe", date: "2024-02-01", status: "Published", content: "Content for How to Use React" },
  { id: 2, title: "Understanding TypeScript", author: "Jane Smith", date: "2024-01-25", status: "Draft", content: "Content for Understanding TypeScript" },
  { id: 3, title: "Material UI Tips", author: "Alice Brown", date: "2024-02-03", status: "Published", content: "Content for Material UI Tips" },
];

export default function Blogs() {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<{ id: number; title: string; content: string; coverImage?: string } | null>(null);

  // Open/Close Modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditOpen = (blog: { id: number; title: string; content: string; coverImage?: string }) => {
    setSelectedBlog(blog);
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setSelectedBlog(null);
    setEditModalOpen(false);
  };

  const handleSaveBlog = (newBlog: { title: string; content: string; coverImage: File | null }): void => {
    const newBlogWithDetails = {
      id: blogs.length + 1,
      title: newBlog.title,
      author: "Auto-assigned Author", // Replace with actual logic to get the logged-in user
      date: new Date().toISOString().split('T')[0],
      status: "Draft",
      content: newBlog.content,
      coverImage: newBlog.coverImage,
    };
    setBlogs([...blogs, newBlogWithDetails]);
    handleClose();
  };

  const handleUpdateBlog = (updatedBlog: { title: string; content: string; coverImage: File | null }) => {
    setBlogs(blogs.map(blog => blog.id === selectedBlog?.id ? { ...blog, ...updatedBlog } : blog));
    handleEditClose();
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
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBlogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>{blog.title}</TableCell>
                <TableCell>{blog.author}</TableCell>
                <TableCell>{blog.date}</TableCell>
                <TableCell>{blog.status}</TableCell>
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
      <AddBlogModal open={open} handleClose={handleClose} handleSave={handleSaveBlog} loggedInUser="Auto-assigned Author" />

      {/* Edit Blog Modal */}
      {selectedBlog && (
        <EditBlogModal
          open={isEditModalOpen}
          handleClose={handleEditClose}
          handleUpdate={handleUpdateBlog}
          existingBlog={selectedBlog}
        />
      )}
    </Box>
  );
}
