const axios = require("axios");
const Task = require("./models/Task"); // Adjust path if needed
require("dotenv").config();

const checkTaskCompletion = async () => {
  try {
    const auth = Buffer.from(`${process.env.API_USERNAME}:${process.env.API_PASSWORD}`).toString("base64");

    const response = await axios({
      method: "get",
      url: "https://api.dataforseo.com/v3/serp/google/organic/tasks_ready",
      auth: {
        username: process.env.API_USERNAME,
        password: process.env.API_PASSWORD,
      },
    });
    // console.log(response.data.tasks[0].result)
    if (response.data.tasks && response.data.tasks[0].result.length > 0) {
      const completedTaskIds = response.data.tasks[0].result.map(task => task.id);

      // Update all matching tasks in MongoDB to "Completed"
      const updated = await Task.updateMany(
        { task_id: { $in: completedTaskIds }, status: "Pending" },
        { $set: { status: "Completed" } }
      );
    //   console.log(updated,"updated>>")
      if(updated.modifiedCount){
          console.log(`Updated ${updated.modifiedCount} tasks to Completed.`);
      }
    }
  } catch (error) {
    console.error("Error checking task completion:", error.message);
  }
};

// Run the worker every 10 seconds
setInterval(checkTaskCompletion, 10000);

module.exports = { checkTaskCompletion };
