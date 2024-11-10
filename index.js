const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const PORT = 5000;
const cors = require("cors");
// const MONGODB = process.env.MONGODB_LOCAL;
const connectDB = require("./config/database.js");
const taskRoutes = require("./routes/taskRoutes.js");

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(MONGODB);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`Error connecting to MongoDB: ${error.message}`);
//     process.exit(1);
//   }
// };
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"));
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
