import { fetchAllTasks } from "../api/fetchAllTasks";
import { deleteTaskByID } from "../api/deleteTaskByID";
import { useState, useEffect } from "react";
import { Fragment } from "react";
import moment from "moment";
import allTaskStyles from "../styles/allTasks.module.css";
import { Link } from "react-router-dom";
import AddBtn from "./AddBtn";
import { useNavigate } from "react-router-dom";

export default function AllTasks() {

  //initalizing state variables
  const [data, setData] = useState([]);

  //fetching all tasks using useEffect for side effect 
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const apiResult = await fetchAllTasks();
        setData(apiResult.data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, []);

  //assigning token according to availabilty 
  let token;
  const loginToken = localStorage.getItem("loginToken");
  const registerToken = localStorage.getItem("registerToken");
  if (loginToken) {
    token = loginToken;
  } if(registerToken) {
    token = registerToken;
  }

  //use navigate hook for condtionally routing
  const navigate = useNavigate();

  //if token is not present navigate user to login page
  const navigateLogin = (e) => {
    if (!token) {
      e.preventDefault();
      navigate("/login");
    }
  };

  //function to delete task
  const deleteTask = async (id) => {
    try {
      //calling the function and passing token and task id as parameters
      const result = await deleteTaskByID(token, id);
      //if token not present navigate user to  
      if (!token) {
        navigate("/login");
      }
      console.log(result.data);
      //deleting the task from the task array
      const updatedTask = data.filter((task) => task._id !== id);
      setData(updatedTask);
    } catch (error) {
      console.log(error);
    }
  };

  //state to check tokens for logout function
  const [updateToken, setToken] = useState(
    localStorage.getItem("loginToken") || localStorage.getItem("registerToken")
  );

  //logout function
  const logout = () => {
    if (updateToken) {
      localStorage.removeItem("loginToken");
      localStorage.removeItem("registerToken");
      setToken(null);
    }
  };

  return (
    <div>
      {token ? (
        <button className={allTaskStyles.logoutBtn} onClick={logout}>
          Logout
        </button>
      ) : (
        <>
          <Link to="/login" className={allTaskStyles.loginLink}>
            Login
          </Link>
          <Link to="/register" className={allTaskStyles.registerLink}>
            Register
          </Link>
        </>
      )}

      <h1 className={allTaskStyles.header}>All Tasks</h1>
      <AddBtn />
      {data.map((task) => (
        <Fragment key={task._id}>
          <div className={allTaskStyles.taskContainer}>
            <h1 className={allTaskStyles.title}>Title:{task.task_title}</h1>
            <p className={allTaskStyles.priority}>Priority:{task.priority}</p>
            <p className={allTaskStyles.status}>Status:{task.status}</p>
            <p className={allTaskStyles.assigned_To}>
              Assigned To:{task.assigned_To}
            </p>
            <p className={allTaskStyles.date}>
              Due:{moment(task.due_date).format("DD-MM-YYYY")}
            </p>
            <Link to={`/view/${task._id}`}>
              <button className={allTaskStyles.viewBtn}>View Task</button>
            </Link>
            <Link to={`/update/${task._id}`} onClick={navigateLogin}>
              <button className={allTaskStyles.updateBtn}>Update Task</button>
            </Link>
            <button
              onClick={() => deleteTask(task._id)}
              className={allTaskStyles.deleteBtn}
            >
              Delete Task
            </button>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
