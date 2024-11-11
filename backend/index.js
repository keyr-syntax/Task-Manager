const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;
const cors = require("cors");
const connectDB = require("./config/database.js");
const taskRoutes = require("./routes/taskRoutes.js");

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://task-management-frontend-two-dun.vercel.app/",
    // origin: "*",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Task Manager created successfuly!",
  });
});
app.use("/api/task", taskRoutes);

app.listen(PORT, (error) => {
  if (error) {
    console.log("Error while connecting to PORT: ", error);
  } else {
    console.log(`Server is running on http://localhost:${PORT}`);
  }
});
