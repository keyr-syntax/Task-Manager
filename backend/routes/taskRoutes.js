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
  fetchtaskonreminderlist,
  turnoffreminder,
  turnoffrepeat,
  fetchtaskbydate,
  searchtasks,
} = require("../controllers/taskControllers.js");

router.post("/createtask", createTask);
router.get("/fetchalltasks", fetchAllTasks);
router.get("/fetchonetask/:_id", fetchonetask);
router.get("/fetchtasksonreminderlist", fetchtaskonreminderlist);
router.get("/fetchtasksfortoday", fetchtaskbydate);
router.get("/searchtasks", searchtasks);
router.delete("/deletetask/:_id", deleteTask);
router.put("/markascompleted/:_id", markascompleted);
router.put("/markaspending/:_id", markaspending);
router.put("/updatetask/:_id", updateTask);
router.put("/turnoffreminder/:_id", turnoffreminder);
router.put("/turnoffrepeat/:_id", turnoffrepeat);
module.exports = router;
