import axios from "axios";

export const updateTaskByID = async (id, taskData, token) => {
  const apiURL = import.meta.env.VITE_BACKEND_URL;
  try {
    const payload = await axios.put(`${apiURL}/updatetask/${id}`, taskData, {
      headers: {
        token: `${token}`,
      },
    });
    return payload.data;
  } catch (error) {
    console.log(error);
  }
};
