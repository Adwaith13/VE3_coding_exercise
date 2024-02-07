import { useState } from "react";
import { addTask } from "../api/addTask";
import moment from "moment";
import HomeBtn from "./HomeBtn";
import taskFormStyles from "../styles/taskForm.module.css";
import { useNavigate } from "react-router-dom";

//add task component
export default function AddTask() {
  //using state variables for task form
  const [taskData, setTaskData] = useState({
    task_title: "",
    task_description: "",
    priority: "Low",
    assigned_To: "",
    due_date: "",
    status: "Pending",
  });

  //state variable to update the tasks after adding new task
  const [allTasks, setAllTasks] = useState([]);

  const navigate = useNavigate();

  //function to post task
  const postTask = async (e) => {
    //preventing default behaviour of the browser
    e.preventDefault();
    try {
      /*extracting login token or register token 
      from localstorage and assigning to token variable */
      const loginToken = localStorage.getItem("loginToken");
      const registerToken = localStorage.getItem("registerToken");
      const token = loginToken || registerToken;
      if (!token) {
        navigate("/login");
      }

      //adding task to function and passing token and task data
      const task = await addTask(token, taskData);

      //setting newly added task to task state 
      setAllTasks([...allTasks, task]);
      //resetting the form state
      setTaskData({
        task_title: "",
        task_description: "",
        priority: "Low",
        assigned_To: "",
        due_date: "",
        status: "Pending",
      });
      //if task is added navigate to home page
      if (task) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className={taskFormStyles.head}>Add task</h1>
      <HomeBtn />
      <form onSubmit={postTask} className={taskFormStyles.form}>
        <span className={taskFormStyles.label}>Task Title</span>{" "}
        <input
          required={true}
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
          required={true}
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
          required={true}
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
          required={true}
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
          required={true}
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
          required={true}
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
