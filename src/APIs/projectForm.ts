import axios from "axios";

export const projectForm = async (data: any) => {
  try {
    const response = await axios.post(`https://creativapoeta-bn.onrender.com/api/project/send-inquiry`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};