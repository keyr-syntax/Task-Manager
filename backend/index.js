const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;
const cors = require("cors");
const http = require("http");
const socketIOServer = require("socket.io");
const cron = require("node-cron");
const connectDB = require("./config/database.js");
const taskRoutes = require("./routes/taskRoutes.js");
const Task = require("./models/taskModel.js");

connectDB();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const io = socketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});
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

io.on("connection", (socket) => {
  console.log("socket connected");
  socket.on("disconnect", () => {
    console.log("socket disconnected");
  });
});
// app.set("socketio", io);

// cron.schedule("* * * * *", async () => {
//   const now = new Date();
//   const taskstobereminded = await Task.find({
//     reminder: { $lte: now },
//     isNotified: false,
//   });
//   console.log("scheduler identified set of task", taskstobereminded);
//   taskstobereminded.forEach(async (task) => {
//     task.isNotified = true;
//     const savereminder = await task.save();
//     // const io = req.app.get("socketio");
//     console.log("scheduler identified task", savereminder);
//     io.emit("reminder", {
//       success: true,
//       message: `This is a reminder for your task: "${task.title}"`,
//       task: savereminder,
//     });
//   });
// });
cron.schedule("* * * * *", async () => {
  const now = new Date();
  try {
    const taskstobereminded = await Task.find({});
    console.log("scheduler identified set of task", taskstobereminded);

    taskstobereminded.forEach(async (task) => {
      if (
        task.reminder &&
        task.reminder instanceof Date &&
        task.isNotified === false &&
        now.getTime() >= task.reminder.getTime()
      ) {
        task.isNotified = true;
        const savereminder = await task.save();
        console.log("scheduler task for reminder", savereminder);
        io.emit("reminder", {
          success: true,
          message: `This is a reminder for your task: "${task.title}"`,
          task: savereminder,
        });
      } else {
        console.log("No tasks to be scheduled or reminder not set");
      }
    });
  } catch (error) {
    console.log("Error while scheduling tasks: ", error);
  }
});

server.listen(PORT, (error) => {
  if (error) {
    console.log("Error while connecting to PORT: ", error);
  } else {
    console.log(`Server is running on http://localhost:${PORT}`);
  }
});
