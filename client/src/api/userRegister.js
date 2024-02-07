import axios from "axios";

//function for user registration
export const userRegister = async (userData) => {
  //api url
  const apiURL = import.meta.env.VITE_BACKEND_URL;
  try {
    //passing user data
    const payload = await axios.post(`${apiURL}/register`, userData);
    //extracting register token from data object
    const registerToken = payload.data.registerToken;
    //storing token in local storage
    localStorage.setItem("registerToken", registerToken);
    return payload.data;
  } catch (error) {
    console.log(error);
  }
};
