import axios from "axios";

export const contactUs = async (data: any) => {
  try {
    const response = await axios.post(`https://creativapoeta-bn.onrender.com/api/contact/send`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};