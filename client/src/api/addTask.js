import axios from "axios";

//  function to add task
export const addTask = async (token, taskData) => {
  //api url 
  const apiURL = import.meta.env.VITE_BACKEND_URL;
  try {
    //passing task data and token 
    const payload = await axios.post(`${apiURL}/task`, taskData, {
      headers: {
        token: `${token}`,
      },
    });
    return payload.data;
  } catch (error) {
    console.log(error);
  }
};
