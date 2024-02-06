import { fetchTaskByID } from "../api/fetchTaskByID";
import { useState, useEffect } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ViewTask() {
  let { id } = useParams();
  const [taskData, setTaskData] = useState([]);

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
  }, [id]);

  return (
    <div>
      <h1>view task</h1>
      <Link to="/">
        <button>Home</button>
      </Link>
      <h1>{taskData.task_title}</h1>
      <h1>{taskData.task_description}</h1>
      <h1>{taskData.status}</h1>
      <h1>{taskData.priority}</h1>
      <h1>{moment(taskData.due_date).format("DD-MM-YYYY")}</h1>
      <h1>{taskData.assigned_To}</h1>
    </div>
  );
}
