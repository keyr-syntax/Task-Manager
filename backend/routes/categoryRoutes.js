const express = require("express");
const router = express.Router();
const {
  createcategory,
  updatecategory,
  deletecategory,
  fetchallcategory,
  fetchonecategory,
} = require("../controllers/categoryControllers.js");

router.post("/createcategory", createcategory);
router.put("/updatecategory/:_id", updatecategory);
router.delete("/deletecategory/:_id", deletecategory);
router.get("/fetchallcategory", fetchallcategory);
router.get("/fetchcategory/:_id", fetchonecategory);

module.exports = router;
