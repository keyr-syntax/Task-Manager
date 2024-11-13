const Task = require("../models/taskModel.js");

const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      scheduledFor,
      priority,
      category,
      reminder,
      addOnReminderlist,
    } = req.body;
    const newTask = await Task.create({
      title: title,
      description: description,
      scheduledFor: scheduledFor,
      priority: priority,
      category: category,
      reminder: reminder,
      addOnReminderlist: addOnReminderlist,
    });
    if (newTask) {
      return res.json({
        success: true,
        message: "Task added successfully",
        task: newTask,
      });
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
    const {
      title,
      description,
      scheduledFor,
      priority,
      category,
      reminder,
      addOnReminderlist,
    } = req.body;
    const tasktobeUpdated = await Task.findById({
      _id: req.params._id,
    });

    if (tasktobeUpdated) {
      tasktobeUpdated.title = title;
      tasktobeUpdated.description = description;
      tasktobeUpdated.scheduledFor = scheduledFor;
      tasktobeUpdated.priority = priority;
      tasktobeUpdated.category = category;
      tasktobeUpdated.reminder = reminder;
      tasktobeUpdated.addOnReminderlist = addOnReminderlist;
      await tasktobeUpdated.save();
      return res.json({
        success: true,
        message: "Task updated successfully",
        task: tasktobeUpdated,
      });
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
const fetchtaskonreminderlist = async (req, res) => {
  try {
    const taskonreminderlist = await Task.find({});
    const tasks = taskonreminderlist.filter(
      (task) => task.addOnReminderlist === true && task.isNotified === true
    );
    if (tasks.length > 0) {
      return res.json({
        success: true,
        message: "Tasks on reminder list fetched successfully",
        task: tasks,
      });
    } else {
      res.status(404);
      throw new Error("No tasks on reminder list found");
    }
  } catch (error) {
    console.log("Error while fetching tasks on reminder list", error);
  }
};

const turnoffreminder = async (req, res) => {
  try {
    const { _id } = req.params._id;
    const taskonreminderlist = await Task.findById({
      _id: req.params._id,
    });

    if (taskonreminderlist) {
      taskonreminderlist.addOnReminderlist = false;
      taskonreminderlist.reminder = null;
      taskonreminderlist.isNotified = false;
      await taskonreminderlist.save();
      return res.json({
        success: true,
        message: "Reminder turnedoff successfully",
        task: taskonreminderlist,
      });
    } else {
      res.status(404);
      throw new Error("Task not found");
    }
  } catch (error) {
    console.log("Error while turning off reminder", error);
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
  fetchtaskonreminderlist,
  turnoffreminder,
};
