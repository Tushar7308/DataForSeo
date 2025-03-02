require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { checkTaskCompletion } = require("./taskWorker");
const taskRoutes = require("./routes/TaskRoutes");
const utilsRoutes = require("./routes/utilsRoutes");


const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.use("/tasks", taskRoutes);
app.use("/utils", utilsRoutes)
// Start worker process
checkTaskCompletion(); // Runs once on startup
console.log("Task worker started...");
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
