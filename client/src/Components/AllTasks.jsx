import { fetchAllTasks } from "../api/fetchAllTasks";
import { deleteTaskByID } from "../api/deleteTaskByID";
import { useState, useEffect } from "react";
import { Fragment } from "react";
import moment from "moment";
import allTaskStyles from "../styles/allTasks.module.css";
import { Link } from "react-router-dom";

export default function AllTasks() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const apiResult = await fetchAllTasks();
        setData(apiResult.data);
        console.log(1);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, []);

  const deleteTask = async (id) => {
    try {
      const result = await deleteTaskByID(id);
      const updatedData = data.filter((task) => task._id !== id);
      setData(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>All Tasks</h1>
      <Link to="/add">
        <button>Add New Task</button>
      </Link>
      {data.map((task) => (
        <Fragment key={task._id}>
          <div className={allTaskStyles.taskContainer}>
            <h1>Title:{task.task_title}</h1>
            <h1>Description:{task.task_description}</h1>
            <h1>Priority:{task.priority}</h1>
            <h1>Status:{task.status}</h1>
            <h1>Assigned To:{task.assigned_To}</h1>
            <h1>Due:{moment(task.due_date).format("DD-MM-YYYY")}</h1>
            <Link to={`/view/${task._id}`}>
              <button>View Task</button>
            </Link>
            <Link to={`/update/${task._id}`}>
              <button>Update Task</button>
            </Link>
            <button onClick={() => deleteTask(task._id)}>Delete Task</button>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
