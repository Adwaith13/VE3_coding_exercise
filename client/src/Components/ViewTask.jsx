import { fetchTaskByID } from "../api/fetchTaskByID";
import { useState, useEffect } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import HomeBtn from "./HomeBtn";
import viewTaskStyle from "../styles/viewTask.module.css";

export default function ViewTask() {
  
  //fetching id using params hook
  let { id } = useParams();

  //handling task data state
  const [taskData, setTaskData] = useState([]);

  //fetching task by id using useEffect for side effect 
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const apiResult = await fetchTaskByID(id);
        setTaskData(apiResult.data);
        console.log(taskData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTask();
  }, []);

  return (
    <>
      <h1 className={viewTaskStyle.head}>View Task</h1>
      <HomeBtn />
      <div className={viewTaskStyle.container}>
        <h1 className={viewTaskStyle.title}>
          Task Title: {taskData.task_title}
        </h1>
        <p className={viewTaskStyle.description}>
          Task Description: {taskData.task_description}
        </p>
        <p className={viewTaskStyle.status}>Status: {taskData.status}</p>
        <p className={viewTaskStyle.priority}>
          Priority: {taskData.priority}
        </p>
        <p className={viewTaskStyle.date}>
          Due Date: {moment(taskData.due_date).format("DD-MM-YYYY")}
        </p>
        <p className={viewTaskStyle.assigned}>
          Assigned To: {taskData.assigned_To}
        </p>
      </div>
    </>
  );
}
