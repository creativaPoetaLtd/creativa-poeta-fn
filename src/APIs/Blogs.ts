import axios from "axios";

export async function CreateBlog(formData: FormData) {
  const token = localStorage.getItem("token"); // Ensure token is retrieved

  if (!token) {
    throw new Error("User is not authenticated");
  }

  try {
    const response = await axios.post("https://creativapoeta-bn.onrender.com/api/blogs/", formData, {
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
