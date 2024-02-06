import axios from "axios";

export const addTask = async (taskData) => {
  const apiURL = import.meta.env.VITE_BACKEND_URL;
  try {
    const payload = await axios.post(`${apiURL}/task`, taskData);
    return payload.data;
  } catch (error) {
    console.log(error);
  }
};
