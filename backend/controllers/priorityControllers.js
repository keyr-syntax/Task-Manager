const Priority = require("../models/priorityModel.js");

const createpriority = async (req, res) => {
  try {
    const priority = req.body.priority;
    const newpriority = await Priority.create({
      priority: priority,
    });
    if (newpriority) {
      return res.json({
        success: true,
        message: "Priority created successfully",
        priority: newpriority,
      });
    } else {
      res.status(404);
      throw new Error("Priority creation failed");
    }
  } catch (error) {
    console.log("Error while creating priority", error);
  }
};
const updatepriority = async (req, res) => {
  try {
    const { _id } = req.params._id;
    const { priority } = req.body.priority;
    const findpriority = await Priority.findById({
      _id: req.params._id,
    });
    if (findpriority) {
      findpriority.priority = priority;
      const priorityUpdated = await findpriority.save();
      return res.json({
        success: true,
        message: "Priority updated successfully",
        priority: priorityUpdated,
      });
    } else {
      res.status(404);
      throw new Error("Priority not found");
    }
  } catch (error) {
    console.log("Error while updating priority", error);
  }
};
const deletepriority = async (req, res) => {
  try {
    const { _id } = req.params._id;
    const findanddeletepriority = await Priority.findByIdAndDelete({
      _id: req.params._id,
    });
    if (findanddeletepriority) {
      return res.json({
        success: true,
        message: "Priority deleted successfully",
      });
    } else {
      res.status(404);
      throw new Error("Priority not deleted");
    }
  } catch (error) {
    console.log("Error while deleting priority", error);
  }
};
const fetchallpriority = async (req, res) => {
  try {
    const findallpriority = await Priority.find({});
    if (findallpriority) {
      return res.json({
        success: true,
        message: "All Priorities fetched successfully",
        priority: findallpriority,
      });
    } else {
      res.status(404);
      throw new Error("Priorities not found");
    }
  } catch (error) {
    console.log("Error while fetching all priorities", error);
  }
};
const fetchonepriority = async (req, res) => {
  try {
    const { _id } = req.params._id;
    const findonepriority = await Priority.findById({
      _id: req.params._id,
    });
    if (findonepriority) {
      return res.json({
        success: true,
        message: "Priority fetched successfully",
        priority: findonepriority,
      });
    } else {
      res.status(404);
      throw new Error("Priority not found");
    }
  } catch (error) {
    console.log("Error while fetching  Priority", error);
  }
};

module.exports = {
  createpriority,
  updatepriority,
  deletepriority,
  fetchallpriority,
  fetchonepriority,
};
