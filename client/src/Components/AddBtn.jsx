import { Link, useNavigate } from "react-router-dom";
import addTaskStyles from "../styles/addTaskBtn.module.css";

//component to navigate to add task
export default function AddBtn() {
  //using token stored in localstorage
  const loginToken = localStorage.getItem("loginToken");
  const registerToken = localStorage.getItem("registerToken");
  //assigning token
  const token = loginToken || registerToken;

  //navigating to login if token not present
  const navigate = useNavigate();
  const navigateToLogin = (e) => {
    if (!token) {
      e.preventDefault();
      navigate("/login");
    }
  };

  return (
    <>
      <Link
        to="/add"
        className={addTaskStyles.button}
        onClick={navigateToLogin}
      >
        Add New Task
      </Link>
    </>
  );
}
