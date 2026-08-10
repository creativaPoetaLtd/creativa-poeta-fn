import axios from "axios";

const BASE_URL = "https://creativa-poeta-bn-phi.vercel.app/api/jobs";

export interface CreateJobPayload {
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  isRemote: boolean;
  howToApply: string;
}

export const CreateJob = async (jobData: CreateJobPayload) => {
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
