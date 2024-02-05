const Task = require("../models/task");
const express = require("express");
const router = express.Router();

router.post("/task", async (req, res) => {
  try {
    const {
      task_title,
      task_description,
      priority,
      assigned_To,
      due_date, //yyyy-mm-dd format
      status,
    } = req.body;

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

router.get("/alltasks", async (req, res) => {
  try {
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

router.get("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const findTaskByID = await Task.findById(id);
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
    console.log(erorr);
    return res.status(500).json({
      status: "success",
      message: "Internal Server Error",
    });
  }
});

router.put("/updatetask/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      task_title,
      task_description,
      priority,
      assigned_To,
      due_date, //yyyy-mm-dd format
      status,
    } = req.body;

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

    const updateTask = await Task.findByIdAndUpdate(id, {
      task_title,
      task_description,
      priority,
      assigned_To,
      due_date, //yyyy-mm-dd format
      status,
    });

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

router.delete("/deletetask/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const findTaskandDelete = await Task.findByIdAndDelete(id);

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
