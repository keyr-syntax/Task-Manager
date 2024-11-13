const express = require("express");
const router = express.Router();
const {
  createpriority,
  updatepriority,
  deletepriority,
  fetchallpriority,
  fetchonepriority,
} = require("../controllers/priorityControllers.js");

router.post("/createpriority", createpriority);
router.put("/updatepriority/:_id", updatepriority);
router.delete("/deletepriority/:_id", deletepriority);
router.get("/fetchallpriority", fetchallpriority);
router.get("/fetchpriority/:_id", fetchonepriority);

module.exports = router;
