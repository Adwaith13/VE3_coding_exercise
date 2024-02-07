import axios from "axios";

//function to fetch all tasks
export const fetchAllTasks = async () => {
  //api url
  const apiURL = import.meta.env.VITE_BACKEND_URL;
  try {
    const payload = await axios.get(`${apiURL}/alltasks`);
    return payload.data;
  } catch (error) {
    console.log(error);
  }
};
