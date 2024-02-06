import axios from "axios";

export const deleteTaskByID = async (id) => {
  const apiURL = import.meta.env.VITE_BACKEND_URL;
  try {
    const payload = await axios.delete(`${apiURL}/deletetask/${id}`);
    return payload.data;
  } catch (error) {
    console.log(error);
  }
};
