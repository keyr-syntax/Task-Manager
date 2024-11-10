const express = require("express");
const router = express.Router();

const {
  createTask,
  updateTask,
  fetchAllTasks,
  deleteTask,
} = require("../controllers/taskControllers.js");

router.post("/createtask", createTask);
router.put("/updatetask/:_id", updateTask);
router.get("/fetchalltasks", fetchAllTasks);
router.delete("/deletetask/:_id", deleteTask);

module.exports = router;
