import { useState } from "react";
import { addTask } from "../api/addTask";
import moment from "moment";

export default function AddTask() {
  const [taskData, setTaskData] = useState({
    task_title: "",
    task_description: "",
    priority: "",
    assigned_To: "",
    due_date: "",
    status: "",
  });

  const postTask = async (e) => {
    e.preventDefault();
    try {
      const task = await addTask(taskData);
      console.log(task);
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
      <h1>Add task</h1>
      <form onSubmit={postTask}>
        <span>Task Title</span>{" "}
        <input
          type="text"
          name="task_title"
          value={taskData.task_title}
          onChange={(e) => {
            setTaskData({ ...taskData, task_title: e.target.value });
          }}
          placeholder="title"
        ></input>
        <br />
        <span>Task Description</span>{" "}
        <textarea
          name="task_description"
          value={taskData.task_description}
          onChange={(e) => {
            setTaskData({ ...taskData, task_description: e.target.value });
          }}
          placeholder="description"
        ></textarea>
        <br />
        <span>Priority</span>{" "}
        <input
          type="text"
          name="priority"
          value={taskData.priority}
          onChange={(e) => {
            setTaskData({ ...taskData, priority: e.target.value });
          }}
          placeholder="priority"
        ></input>
        <br />
        <span>Assign To</span>{" "}
        <input
          type="text"
          name="assigned_To"
          value={taskData.assigned_To}
          onChange={(e) => {
            setTaskData({ ...taskData, assigned_To: e.target.value });
          }}
          placeholder="assign to"
        ></input>
        <br />
        <span>Due Date</span>{" "}
        <input
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
        <span>Status</span>{" "}
        <input
          type="text"
          name="status"
          value={taskData.status}
          onChange={(e) => {
            setTaskData({ ...taskData, status: e.target.value });
          }}
          placeholder="status"
        ></input>
        <br />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}
