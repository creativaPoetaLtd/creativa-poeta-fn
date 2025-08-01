import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export async function CreateBlog(formData: FormData) {
  const token = localStorage.getItem("token"); // Ensure token is retrieved

  if (!token) {
    throw new Error("User is not authenticated");
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/api/blogs/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating blog:", error);
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "Failed to create blog";
    } else {
      throw "Failed to create blog";
    }
  }
}

// Fetch all blogs (no authentication required)
export async function fetchBlogs() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/blogs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "Failed to fetch blogs";
    } else {
      throw "Failed to fetch blogs";
    }
  }
}

// Fetch single blog (no authentication required)
export async function fetchSingleBlog(blogId: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/blogs/${blogId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "Failed to fetch blog";
    } else {
      throw "Failed to fetch blog";
    }
  }
}

// Add comment to blog (no authentication required)
export async function addCommentToBlog(
  blogId: string,
  commentData: { name: string; email: string; text: string }
) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/blogs/${blogId}/comment`,
      commentData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding comment:", error);
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "Failed to add comment";
    } else {
      throw "Failed to add comment";
    }
  }
}

// Get comments for a blog (no authentication required)
export async function getBlogComments(blogId: string) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/blogs/${blogId}/comments`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "Failed to fetch comments";
    } else {
      throw "Failed to fetch comments";
    }
  }
}
