import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  Edit,
  Article,
  Add,
  Person,
  CalendarToday,
  Visibility,
} from "@mui/icons-material";
import AddBlogModal from "./AddBlog";
import EditBlogModal from "./EditBlog";
import axios from "axios";
import {
  DashboardCard,
  PageHeader,
  DataTable,
  StatusChip,
  ActionButton,
} from "./components/DashboardComponents";

const API_URL = "https://creativapoeta-bn.onrender.com/api/blogs";

export default function Blogs() {
  const [blogs, setBlogs] = useState<
    {
      _id: string;
      title: string;
      content: string;
      coverImage?: string;
      author?: { name: string };
      createdAt: string;
      status: string;
    }[]
  >([]);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<{
    _id: string;
    title: string;
    content: string;
    coverImage?: string;
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

  const handleEditOpen = (blog: {
    _id: string;
    title: string;
    content: string;
    coverImage?: string;
  }) => {
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
  const handleUpdate = async (updatedBlog: {
    title: string;
    content: string;
    coverImage: File | null;
  }) => {
    if (!selectedBlog || !selectedBlog._id) return; // Ensure selectedBlog and its _id are defined

    const formData = new FormData();
    formData.append("title", updatedBlog.title);
    formData.append("content", updatedBlog.content);
    if (updatedBlog.coverImage) {
      formData.append("image", updatedBlog.coverImage);
    }

    try {
      const response = await axios.patch(
        `${API_URL}/${selectedBlog._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to update blog.");
      }

      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === selectedBlog._id
            ? {
                ...blog,
                ...updatedBlog,
                coverImage: updatedBlog.coverImage
                  ? URL.createObjectURL(updatedBlog.coverImage)
                  : blog.coverImage,
              }
            : blog
        )
      );
    } catch (error) {
      console.error("Error updating blog:", error);
      throw error;
    }

    handleEditClose();
  };

  const handleDelete = async (id: string) => {
    console.log("Delete blog:", id);
    // TODO: Implement delete blog functionality
  };

  const handleView = (id: string) => {
    console.log("View blog:", id);
    // TODO: Implement view blog functionality
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
      <PageHeader
        title="📖 Blog Management"
        subtitle="Create, edit, and manage your blog content"
        action={
          <ActionButton
            variant="primary"
            onClick={handleOpen}
            startIcon={<Add />}
          >
            Add New Blog
          </ActionButton>
        }
      />

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <DashboardCard
            title="Total Blogs"
            value={blogs.length.toString()}
            icon={<Article />}
            trend="up"
            trendValue="12% from last month"
            color="#2196F3"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardCard
            title="Published"
            value={blogs
              .filter((b) => b.status === "published")
              .length.toString()}
            icon={<Visibility />}
            trend="up"
            trendValue="8% from last month"
            color="#4CAF50"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardCard
            title="Draft"
            value={blogs.filter((b) => b.status === "draft").length.toString()}
            icon={<Edit />}
            trend="neutral"
            trendValue="3 pending review"
            color="#FF9800"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <DashboardCard
            title="This Month"
            value={blogs
              .filter((b) => {
                const blogDate = new Date(b.createdAt);
                const currentMonth = new Date().getMonth();
                return blogDate.getMonth() === currentMonth;
              })
              .length.toString()}
            icon={<CalendarToday />}
            trend="up"
            trendValue="5 new posts"
            color="#9C27B0"
          />
        </Grid>
      </Grid>

      {/* Search */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <TextField
            label="Search Blogs"
            variant="outlined"
            size="small"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#EEBA2B" },
                "&.Mui-focused fieldset": { borderColor: "#EEBA2B" },
              },
              "& .MuiInputLabel-root.Mui-focused": { color: "#EEBA2B" },
            }}
          />
        </CardContent>
      </Card>

      {/* Blogs Table */}
      <DataTable
        headers={["Title", "Author", "Date", "Status"]}
        rows={filteredBlogs.map((blog) => ({
          id: blog._id,
          title: (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Article sx={{ fontSize: 20, color: "#EEBA2B" }} />
              <Typography variant="body2" fontWeight="medium">
                {blog.title}
              </Typography>
            </Box>
          ),
          author: (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Person sx={{ fontSize: 20, color: "#EEBA2B" }} />
              <Typography variant="body2">
                {blog.author?.name || "Unknown"}
              </Typography>
            </Box>
          ),
          date: (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CalendarToday sx={{ fontSize: 16, color: "text.secondary" }} />
              <Typography variant="body2">
                {formatDate(blog.createdAt)}
              </Typography>
            </Box>
          ),
          status: (
            <StatusChip
              status={blog.status || "draft"}
              variant={
                blog.status === "published"
                  ? "success"
                  : blog.status === "draft"
                  ? "warning"
                  : "default"
              }
            />
          ),
        }))}
        onView={handleView}
        onEdit={(id) => {
          const blog = blogs.find((b) => b._id === id);
          if (blog) handleEditOpen(blog);
        }}
        onDelete={handleDelete}
        emptyMessage="No blogs found"
      />

      {/* Modals */}
      <AddBlogModal open={open} handleClose={handleClose} />
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
