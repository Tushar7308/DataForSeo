const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  task_id: String,
  status: String,
  keyword: String,
  location: String,
  language: String,
  priority: Number,
  results: Array,
});

module.exports = mongoose.model("Task", TaskSchema);
