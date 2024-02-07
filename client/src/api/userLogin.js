import axios from "axios";

export const userLogin = async (userData) => {
  const apiURL = import.meta.env.VITE_BACKEND_URL;
  try {
    const payload = await axios.post(`${apiURL}/login`, userData);
    const loginToken = payload.data.loginToken;
    localStorage.setItem("loginToken", loginToken);
    return payload.data;
  } catch (error) {
    console.log(error);
  }
};
