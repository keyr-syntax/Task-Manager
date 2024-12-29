const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;
const cors = require("cors");
const cron = require("node-cron");
const connectDB = require("./config/database.js");
const taskRoutes = require("./routes/taskRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const priorityRoutes = require("./routes/priorityRoutes.js");
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
app.use("/api/category", categoryRoutes);
app.use("/api/priority", priorityRoutes);

cron.schedule("* * * * *", async () => {
  const now = new Date();
  const nowUTC = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  );
  try {
    const taskstobereminded = await Task.find({
      addOnReminderlist: true,
      isNotified: false,
    });
    const taskstobeRepeated = await Task.find({
      addOnRepeatlist: true,
      isNotified: false,
    });
    console.log("taskstobereminded", taskstobereminded);
    for (const task of taskstobereminded) {
      try {
        const reminder = new Date(task.reminder);

        if (reminder instanceof Date && nowUTC >= reminder.getTime()) {
          task.isNotified = true;
          await task.save();
        }
        console.log("task", task);
      } catch (error) {
        console.log("Error while scheduling tasks: ", error);
      }
    }

    for (const task of taskstobeRepeated) {
      const repeatDate = new Date(task.repeatDate);
      if (repeatDate instanceof Date && nowUTC >= repeatDate.getTime()) {
        task.isRepeat = true;
        task.addOnReminderlist = true;
        task.isNotified = true;
        task.reminder = task.repeatDate;
        await task.save();
      }
    }
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
