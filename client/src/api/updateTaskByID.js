import axios from "axios";

// function to update tasks by id
export const updateTaskByID = async (id, taskData, token) => {
  //api url
  const apiURL = import.meta.env.VITE_BACKEND_URL;
  try {
    //passing task id,data and token to
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
