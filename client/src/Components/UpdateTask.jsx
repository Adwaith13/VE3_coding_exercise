import { useEffect, useState } from "react";
import { updateTaskByID } from "../api/updateTaskByID";
import { fetchTaskByID } from "../api/fetchTaskByID";
import moment from "moment";
import { useParams } from "react-router-dom";
import HomeBtn from "./HomeBtn";
import taskFormStyles from "../styles/taskForm.module.css";

export default function UpdateTask() {
  const { id } = useParams();
  const [taskData, setTaskData] = useState({
    task_title: "",
    task_description: "",
    priority: "",
    assigned_To: "",
    due_date: "",
    status: "",
  });

  useEffect(() => {
    const fetchApibyID = async () => {
      try {
        const apiResult = await fetchTaskByID(id);
        setTaskData(apiResult.data);
        console.log(taskData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApibyID();
  }, [id, taskData]);

  const updateTask = async (e) => {
    e.preventDefault();
    try {
      const updateTask = await updateTaskByID(id, taskData);
      console.log(updateTask);
      setTaskData({
        task_title: "",
        task_description: "",
        priority: "",
        assigned_To: "",
        due_date: "",
        status: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className={taskFormStyles.head}>Update Task</h1>
      <HomeBtn />
      <form onSubmit={updateTask} className={taskFormStyles.form}>
        <span className={taskFormStyles.label}>Task Title</span>{" "}
        <input
          className={taskFormStyles.title}
          type="text"
          name="task_title"
          value={taskData.task_title}
          onChange={(e) => {
            setTaskData({ ...taskData, task_title: e.target.value });
          }}
          placeholder="title"
        ></input>
        <br />
        <span className={taskFormStyles.label}>Task Description</span>{" "}
        <input
          className={taskFormStyles.description}
          type="text"
          name="task_description"
          value={taskData.task_description}
          onChange={(e) => {
            setTaskData({ ...taskData, task_description: e.target.value });
          }}
          placeholder="description"
        ></input>
        <br />
        <span className={taskFormStyles.label}>Priority</span>{" "}
        <select
          className={taskFormStyles.priority}
          name="priority"
          value={taskData.priority}
          onChange={(e) => {
            setTaskData({ ...taskData, priority: e.target.value });
          }}
          placeholder="priority"
        >
          <option disabled>Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <br />
        <span className={taskFormStyles.label}>Assign To</span>{" "}
        <input
          className={taskFormStyles.assign}
          type="text"
          name="assigned_To"
          value={taskData.assigned_To}
          onChange={(e) => {
            setTaskData({ ...taskData, assigned_To: e.target.value });
          }}
          placeholder="assign to"
        ></input>
        <br />
        <span className={taskFormStyles.label}>Due Date</span>{" "}
        <input
          className={taskFormStyles.date}
          type="date"
          name="due_date"
          value={taskData.due_date}
          onChange={(e) => {
            setTaskData({
              ...taskData,
              due_date: moment(e.target.value).format("YYYY-MM-DD"),
            });
          }}
        ></input>
        <br />
        <span className={taskFormStyles.label}>Status</span>{" "}
        <select
          className={taskFormStyles.status}
          name="status"
          value={taskData.status}
          onChange={(e) => {
            setTaskData({ ...taskData, status: e.target.value });
          }}
          placeholder="status"
        >
          <option disabled>Select Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Complete">Complete</option>
        </select>
        <br />
        <button type="submit" className={taskFormStyles.addBtn}>
          Add Task
        </button>
      </form>
    </div>
  );
}
