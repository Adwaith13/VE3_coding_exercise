import axios from "axios";

export const fetchAllTasks = async () => {
  const apiURL = import.meta.env.VITE_BACKEND_URL;
  try {
    const payload = await axios.get(`${apiURL}/alltasks`);
    return payload.data;
  } catch (error) {
    console.log("Error fetching the Api");
    console.log(error);
  }
};
