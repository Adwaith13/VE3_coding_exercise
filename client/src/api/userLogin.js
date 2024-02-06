import axios from "axios";

export const userLogin = async (userData) => {
  const apiURL = import.meta.env.VITE_BACKEND_URL;
  try {
    const payload = await axios.post(`${apiURL}/login`, userData);
    return payload.data;
  } catch (error) {
    console.log(error);
  }
};
