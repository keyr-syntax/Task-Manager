const Task = require("../models/taskModel.js");

const createTask = async (req, res) => {
  try {
    const { title, description, scheduledFor, priority, reminder } = req.body;
    const newTask = await Task.create({
      title: title,
      description: description,
    });
    if (newTask) {
      if (scheduledFor || priority || reminder) {
        newTask.scheduledFor = scheduledFor;
        newTask.priority = priority;
        newTask.reminder = reminder;
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
    const { title, description, scheduledFor, priority, reminder } = req.body;
    const tasktobeUpdated = await Task.findById({
      _id: req.params._id,
    });

    if (tasktobeUpdated && (title || description || scheduledFor || priority)) {
      tasktobeUpdated.title = title;
      tasktobeUpdated.description = description;
      tasktobeUpdated.scheduledFor = scheduledFor;
      tasktobeUpdated.priority = priority;
      if (reminder) {
        tasktobeUpdated.reminder = reminder;
        tasktobeUpdated.isNotified = false;
        await tasktobeUpdated.save();
        return res.json({
          success: true,
          message: "Task updated successfully",
          task: tasktobeUpdated,
        });
      } else {
        await tasktobeUpdated.save();
        return res.json({
          success: true,
          message: "Task updated successfully",
          task: tasktobeUpdated,
        });
      }
    } else {
      res.status(404);
      throw new Error("Task not found");
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Error while updating task",
      error: error,
    });
  }
};
// const updateTask = async (req, res) => {
//   try {
//     const { _id } = req.params;
//     const { title, description, scheduledFor, priority, reminder } = req.body;
//     const tasktobeUpdated = await Task.findByIdAndUpdate(
//       req.params._id,
//       {
//         title,
//         description,
//         scheduledFor,
//         priority,
//         reminder,
//       },
//       {
//         new: true,
//       }
//     );
//     if (tasktobeUpdated) {
//       // console.log("Task updated", tasktobeUpdated);
//       return res.json({
//         success: true,
//         message: "Task update successfully",
//         task: tasktobeUpdated,
//       });
//     } else {
//       res.status(404);
//       throw new Error("Task update failed");
//     }
//   } catch (error) {
//     res.json({
//       success: false,
//       message: "Error while updating task",
//       error: error,
//     });
//   }
// };
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
const fetchonetask = async (req, res) => {
  try {
    const { _id } = req.params;
    const taskbyid = await Task.findById({
      _id: req.params._id,
    });
    if (taskbyid) {
      return res.json({
        success: true,
        message: "Task fetched successfully",
        task: taskbyid,
      });
    } else {
      res.status(404);
      throw new Error("Task not found");
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Error while fetching task",
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
const markascompleted = async (req, res) => {
  try {
    const tasktobecompleted = await Task.findById({ _id: req.params._id });
    if (tasktobecompleted) {
      tasktobecompleted.isPending = false;
      const taskcompleted = await tasktobecompleted.save();
      return res.json({
        success: true,
        message: "Task marked as completed successfully",
        task: taskcompleted,
      });
    } else {
      res.status(404);
      throw new Error("Task not found");
    }
  } catch (error) {
    console.log("Error while marking completed", error);
  }
};
const markaspending = async (req, res) => {
  try {
    const tasktobecompleted = await Task.findById({ _id: req.params._id });
    if (tasktobecompleted) {
      tasktobecompleted.isPending = true;
      const taskpending = await tasktobecompleted.save();
      return res.json({
        success: true,
        message: "Task marked as pending successfully",
        task: taskpending,
      });
    } else {
      res.status(404);
      throw new Error("Task not found");
    }
  } catch (error) {
    console.log("Error while marking pending", error);
  }
};

module.exports = {
  createTask,
  updateTask,
  fetchAllTasks,
  deleteTask,
  fetchonetask,
  markascompleted,
  markaspending,
};
