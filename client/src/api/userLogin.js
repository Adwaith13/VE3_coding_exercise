import axios from "axios";

//function for user login
export const userLogin = async (userData) => {
  //api url
  const apiURL = import.meta.env.VITE_BACKEND_URL;
  try {
    //passing user data
    const payload = await axios.post(`${apiURL}/login`, userData);
    //extracting login token from data object
    const loginToken = payload.data.loginToken;
    //saving token in localstorage
    localStorage.setItem("loginToken", loginToken);
    return payload.data;
  } catch (error) {
    console.log(error);
  }
};
