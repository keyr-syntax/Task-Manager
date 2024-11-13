const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;
const cors = require("cors");
const cron = require("node-cron");
const connectDB = require("./config/database.js");
const taskRoutes = require("./routes/taskRoutes.js");
const Task = require("./models/taskModel.js");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Task Manager backend is working  nicely!",
  });
});
app.use("/api/task", taskRoutes);

cron.schedule("* * * * *", async () => {
  const now = new Date();
  try {
    const taskstobereminded = await Task.find({});
    console.log("scheduler identified set of task", taskstobereminded);

    taskstobereminded.forEach(async (task) => {
      if (
        task.reminder &&
        task.reminder instanceof Date &&
        task.addOnReminderlist === true &&
        now.getTime() >= task.reminder.getTime()
      ) {
        task.isNotified = true;
        const savereminder = await task.save();
        console.log("scheduler task for reminder", savereminder);
      } else {
        console.log("No tasks to be scheduled or reminder not set");
      }
    });
  } catch (error) {
    console.log("Error while scheduling tasks: ", error);
  }
});

app.listen(PORT, (error) => {
  if (error) {
    console.log("Error while connecting to PORT: ", error);
  } else {
    console.log(`Server is running on http://localhost:${PORT}`);
  }
});
