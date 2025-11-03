import axios from "axios";

export const ApplyJob = async (data: any) => {
  try {
    const response = await axios.post(
      `https://creativa-poeta-bn-phi.vercel.app/api/job/apply`,
      data
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
