import { fetchAllTasks } from "../api/fetchAllTasks";
import { useState, useEffect } from "react";
import { Fragment } from "react";
import moment from "moment";
import allTaskStyles from "../styles/allTasks.module.css";

export default function AllTasks() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const apiResult = await fetchAllTasks();
        setData(apiResult.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, []);

  return (
    <div>
      <h1>All Tasks</h1>
      {data.map((task) => (
        <Fragment key={task._id}>
          <div className={allTaskStyles.taskContainer}>
            <h1>Title:{task.task_title}</h1>
            <h1>Description:{task.task_description}</h1>
            <h1>Priority:{task.priority}</h1>
            <h1>Status:{task.status}</h1>
            <h1>Assigned To:{task.assigned_To}</h1>
            <h1>Due:{moment(task.due_date).format("DD-MM-YYYY")}</h1>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
