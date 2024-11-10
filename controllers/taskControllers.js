const Task = require("../models/taskModel.js");

const createTask = async (req, res) => {
  try {
    const { title, description, scheduledFor } = req.body;
    const newTask = await Task.create({
      title: title,
      description: description,
    });
    if (newTask) {
      if (scheduledFor) {
        newTask.scheduledFor = scheduledFor;
        await newTask.save();
        return res.json({
          success: true,
          message: "Task created successfully with scheduled date",
          task: newTask,
        });
      } else {
        return res.json({
          success: true,
          message: "Task added successfully",
          task: newTask,
        });
      }
    } else {
      res.status(404);
      throw new Error("Task not found");
    }
  } catch (error) {
    console.log("Error while creating task", error);
    res.json({
      success: false,
      message: "Error while creating task",
      error: error,
    });
  }
};
const updateTask = async (req, res) => {
  try {
    const { _id } = req.params;
    const tasktobeUpdated = await Task.findByIdAndUpdate(
      req.params._id,
      {
        title,
        description,
        scheduledFor,
      },
      {
        new: true,
      }
    );
    if (tasktobeUpdated) {
      return res.json({
        success: true,
        message: "Task update successfully",
        task: tasktobeUpdated,
      });
    } else {
      res.status(404);
      throw new Error("Task update failed");
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Error while updating task",
      error: error,
    });
  }
};
const fetchAllTasks = async (req, res) => {
  try {
    const findalltasks = await Task.find({});
    if (findalltasks) {
      return res.json({
        success: true,
        message: "All tasks fetched successfully",
        task: findalltasks,
      });
    } else {
      res.status(404);
      throw new Error("Tasks not found");
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Error while fetching tasks",
      error: error,
    });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { _id } = req.params;
    const deletetask = await Task.findByIdAndDelete(_id);
    if (deletetask) {
      return res.json({
        success: true,
        message: "Task deleted successfully",
      });
    } else {
      res.status(404);
      throw new Error("Task not deleted");
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Error while deleting task",
      error: error,
    });
  }
};

module.exports = {
  createTask,
  updateTask,
  fetchAllTasks,
  deleteTask,
};
