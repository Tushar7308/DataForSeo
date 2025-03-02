const express = require("express");
const axios = require("axios");
const Task = require("../models/Task");
require("dotenv").config();

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { keyword, language, location, priority } = req.body;
    const auth = Buffer.from(
      `${process.env.API_USERNAME}:${process.env.API_PASSWORD}`
    ).toString("base64");
    console.log(auth, "auth");
    const post_array = [];
    post_array.push({
      language_code: language,
      location_code: location,
      keyword: keyword,
    });
    const response = await axios({
      method: "post",
      url: "https://api.dataforseo.com/v3/serp/google/organic/task_post",
      auth: {
        username: process.env.API_USERNAME,
        password: process.env.API_PASSWORD,
      },
      data: post_array,
      headers: {
        "content-type": "application/json",
      },
    });

    const taskData = response.data.tasks[0];
    if (taskData.status_code === 20100) {
      const newTask = new Task({
        task_id: taskData.id,
        status: "Pending",
        results: [],
        keyword,
        language,
        location,
      });
      await newTask.save();
      res.json(newTask);
    } else {
      res.status(400).json({ message: taskData.status_message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/results/:task_id", async (req, res) => {
  try {
    const { task_id } = req.params;

    const task = await Task.findOne({ task_id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.results && task.results.length > 0) {
      return res.json(task.results);
    }

    const response = await axios({
      method: "get",
      url: `https://api.dataforseo.com/v3/serp/google/organic/task_get/advanced/${task_id}`,
      auth: {
        username: process.env.API_USERNAME,
        password: process.env.API_PASSWORD,
      },
    });
    console.log("response", response.data.tasks[0]);
    const results = response.data.tasks[0]?.result || [];

    task.results = results;
    await task.save();

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/get", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const tasks = await Task.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalTasks = await Task.countDocuments();
    const totalPages = Math.ceil(totalTasks / limit);

    res.json({
      tasks,
      totalPages,
      currentPage: parseInt(page),
      totalTasks,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:task_id", async (req, res) => {
  try {
    const task = await Task.findOne({ task_id: req.params.task_id });

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.status === "Pending") {
      res.status(400).json({ message: "Task is not completed yet", task: [] });
      return
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
