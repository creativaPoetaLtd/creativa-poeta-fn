import axios from "axios";

const BASE_URL = "https://creativapoeta-bn.onrender.com/api/jobs";

export const CreateJob = async (jobData: any) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(BASE_URL, jobData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to create job");
    }
    throw error;
  }
};