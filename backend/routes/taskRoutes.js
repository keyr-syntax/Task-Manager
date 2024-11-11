const express = require("express");
const router = express.Router();

const {
  createTask,
  updateTask,
  fetchAllTasks,
  deleteTask,
  fetchonetask,
  markascompleted,
  markaspending,
} = require("../controllers/taskControllers.js");

router.post("/createtask", createTask);
router.put("/updatetask/:_id", updateTask);
router.get("/fetchalltasks", fetchAllTasks);
router.delete("/deletetask/:_id", deleteTask);
router.get("/fetchonetask/:_id", fetchonetask);
router.put("/markascompleted/:_id", markascompleted);
router.put("/markaspending/:_id", markaspending);

module.exports = router;
