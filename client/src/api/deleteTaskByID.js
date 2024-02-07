import axios from "axios";

//function to delete task by id
export const deleteTaskByID = async (token, id) => {
  //api url
  const apiURL = import.meta.env.VITE_BACKEND_URL;
  try {
      //passing task id and token
    const payload = await axios.delete(`${apiURL}/deletetask/${id}`, {
      headers: {
        token: `${token}`,
      },
    });
    return payload.data;
  } catch (error) {
    console.log(error);
  }
};
