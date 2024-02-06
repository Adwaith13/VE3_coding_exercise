import axios from "axios";

export const userRegister = async (userData) => {
  const apiURL = import.meta.env.VITE_BACKEND_URL;
  try {
    const payload = await axios.post(`${apiURL}/register`, userData);
    return payload.data;
  } catch (error) {
    console.log(error);
  }
};
