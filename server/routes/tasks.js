const Task = require("../models/task");
const express = require("express");
const isUserAuthenticated = require("../middlewares/isUserAuthenticated");
const router = express.Router();

//adding new task 
router.post("/task", isUserAuthenticated, async (req, res) => {
  try {

    //reading the input of user
    const {
      task_title,
      task_description,
      priority,
      assigned_To,
      due_date, //yyyy-mm-dd format
      status,
    } = req.body;

    //checking if all fields are filled
    if (
      !task_title ||
      !task_description ||
      !priority ||
      !assigned_To ||
      !due_date ||
      !status
    ) {
      return res.status(500).json({
        status: "failed",
        message: "All the fields are required",
      });
    }

    //creating new task
    const newTask = await Task.create({
      task_title,
      task_description,
      priority,
      assigned_To,
      due_date,
      status,
    });

    return res.status(200).json({
      status: "success",
      data: newTask,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
});

//fetching all tasks
router.get("/alltasks", async (req, res) => {
  try {
     //finding all tasks
    const allTasks = await Task.find();

    if (!allTasks) {
      return res.status(500).json({
        status: "failed",
        message: "no tasks found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: allTasks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
});

//fetching tasks using task id
router.get("/task/:id", async (req, res) => {
  try {
    //fetching document id from req object
    const { id } = req.params;

    //finding task by id
    const findTaskByID = await Task.findById(id);

    //if task is not found returning failed
    if (!findTaskByID) {
      return res.status(500).json({
        status: "failed",
        message: "No task found",
      });
    }
    return res.status(200).json({
      status: "success",
      data: findTaskByID,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "success",
      message: "Internal Server Error",
    });
  }
});

//task updating route
router.put("/updatetask/:id", isUserAuthenticated, async (req, res) => {
  try {
     //fetching document id from req object
    const { id } = req.params;

    //user input
    const {
      task_title,
      task_description,
      priority,
      assigned_To,
      due_date, //yyyy-mm-dd format
      status,
    } = req.body;

    //checking if all inputs are filled
    if (
      !task_title ||
      !task_description ||
      !priority ||
      !assigned_To ||
      !due_date ||
      !status
    ) {
      return res.status(500).json({
        status: "failed",
        message: "All the fields are required",
      });
    }

    //updating task using id
    const updateTask = await Task.findByIdAndUpdate(id, {
      task_title,
      task_description,
      priority,
      assigned_To,
      due_date, //yyyy-mm-dd format
      status,
    });

    //if task is not updated
    if (!updateTask) {
      return res.status(500).json({
        status: "failed",
        message: "Something is wrong",
      });
    }

    return res.status(200).json({
      status: "success",
      data: updateTask,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
});

//task deleting route
router.delete("/deletetask/:id", isUserAuthenticated, async (req, res) => {
  try {

     //fetching document id from req object
    const { id } = req.params;

    //finding task using id and deleting the task
    const findTaskandDelete = await Task.findByIdAndDelete(id);

    //if task is not found
    if (!findTaskandDelete) {
      return res.status(500).json({
        status: "failed",
        message: "Task not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Task deleted",
      data: findTaskandDelete,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
});

module.exports = router;
