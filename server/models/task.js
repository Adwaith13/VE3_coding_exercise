const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task_title: {
    type: String,
    required: true,
  },
  task_description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  assigned_To: {
    type: String,
    required: true,
  },
  due_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
