import { fetchAllTasks } from "../api/fetchAllTasks";
import { deleteTaskByID } from "../api/deleteTaskByID";
import { useState, useEffect } from "react";
import { Fragment } from "react";
import moment from "moment";
import allTaskStyles from "../styles/allTasks.module.css";
import { Link } from "react-router-dom";
import AddBtn from "./AddBtn";

export default function AllTasks() {
  const [data, setData] = useState([]);

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

  const deleteTask = async (id) => {
    try {
      const result = await deleteTaskByID(id);
      console.log(result.data);
      const updatedData = data.filter((task) => task._id !== id);
      setData(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Link to="/login" className={allTaskStyles.loginLink}>Login</Link>
      <Link to="/register" className={allTaskStyles.registerLink}>Register</Link>
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
            <Link to={`/update/${task._id}`}>
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
