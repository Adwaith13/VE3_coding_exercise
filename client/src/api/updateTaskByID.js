import axios from "axios";

export const updateTaskByID = async (id, taskData) => {
  const apiURL = import.meta.env.VITE_BACKEND_URL;
  try {
    const payload = await axios.put(`${apiURL}/updatetask/${id}`, taskData);
    return payload.data;
  } catch (error) {
    console.log(error);
  }
};
