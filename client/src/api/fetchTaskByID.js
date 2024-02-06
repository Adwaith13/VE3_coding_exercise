import axios from "axios";

export const fetchTaskByID = async (id) => {
  const apiURL = import.meta.env.VITE_BACKEND_URL;
  try {
    const payload = await axios.get(`${apiURL}/task/${id}`);
    return payload.data;
  } catch (error) {
    console.log(error);
  }
};
