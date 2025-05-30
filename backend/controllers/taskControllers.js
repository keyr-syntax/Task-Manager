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
      repeatInterval,
      addOnRepeatlist,
      repeatDate,
    } = req.body;

    const newTask = await Task.create({
      title,
      description,
      scheduledFor,
      priority,
      category,
      reminder,
      addOnReminderlist,
      repeatInterval,
      addOnRepeatlist,
      repeatDate,
    });

    if (newTask) {
      return res.status(201).json({
        success: true,
        message: "Task added successfully",
        task: newTask,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Task not added",
      });
    }
  } catch (error) {
    console.log("Error while creating task", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating task",
    });
  }
};
const updateTask = async (req, res) => {
  try {
    const {
      title,
      description,
      scheduledFor,
      priority,
      category,
      reminder,
      addOnReminderlist,
      repeatInterval,
      addOnRepeatlist,
      repeatDate,
    } = req.body;

    const tasktobeUpdated = await Task.findByIdAndUpdate(
      { _id: req.params._id },
      {
        title,
        description,
        scheduledFor,
        priority,
        category,
        reminder,
        addOnReminderlist,
        repeatInterval,
        addOnRepeatlist,
        repeatDate,
      },
      {
        new: true,
      }
    );

    if (tasktobeUpdated) {
      return res.json({
        success: true,
        message: "Task updated successfully",
        task: tasktobeUpdated,
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Task Update failed" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while updating task",
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
const fetchonetask = async (req, res) => {
  try {
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
      res.status(404).json({
        success: false,
        message: "No Tasks on the reminder list",
      });
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
const turnoffrepeat = async (req, res) => {
  try {
    const taskonrepeatlist = await Task.findById({
      _id: req.params._id,
    });

    if (taskonrepeatlist) {
      taskonrepeatlist.addOnRepeatlist = false;
      taskonrepeatlist.repeatDate = null;
      taskonrepeatlist.isRepeat = false;
      await taskonrepeatlist.save();
      return res.json({
        success: true,
        message: "Repeat turned-off successfully",
        task: taskonrepeatlist,
      });
    } else {
      res.status(404);
      throw new Error("Task not found");
    }
  } catch (error) {
    console.log("Error while turning off repeat", error);
  }
};
// const fetchtaskbydate = async (req, res) => {
//   try {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const tomorrow = new Date(today);
//     tomorrow.setDate(today.getDate() + 1);
//     const tasksfortoday = await Task.find({
//       scheduledFor: {
//         $gte: today,
//         $lt: tomorrow,
//       },
//     });
//     if (tasksfortoday) {
//       return res.json({
//         success: true,
//         message: "Tasks scheduled for today is fetched successfully",
//         task: tasksfortoday,
//       });
//     } else {
//       res.status(404);
//       throw new Error("No tasks scheduled for today found");
//     }
//   } catch (error) {
//     console.log("Error while fetching tasks by date", error);
//   }
// };
const fetchtaskbydate = async (req, res) => {
  try {
    // Set up today's date range in UTC
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tasksfortoday = await Task.find({
      scheduledFor: { $gte: today, $lt: tomorrow },
    });

    if (tasksfortoday.length > 0) {
      return res.json({
        success: true,
        message: "Tasks scheduled for today is fetched successfully",
        task: tasksfortoday,
      });
    } else {
      res.status(404);
      throw new Error("No tasks scheduled for today found");
    }
  } catch (error) {
    console.log("Error while fetching tasks by date", error);
  }
};
// to search by indexing, use the following function
// const searchtasks = async (req, res) => {
//   try {
//     const { keyword } = req.query;

//     if (!keyword) {
//       return res.json({
//         success: false,
//         message: "Please write something in the search box",
//       });
//     }
//     const searchtasksbykeyword = await Task.find({
//       $text: { $search: keyword },
//     });

//     if (searchtasksbykeyword.length === 0) {
//       return res.json({
//         success: false,
//         message: "No Tasks match your search",
//       });
//     } else {
//       return res.json({
//         success: true,
//         message: "Tasks matching your search are fetched successfully",
//         task: searchtasksbykeyword,
//       });
//     }
//   } catch (error) {
//     console.log("Server error while searching tasks by keyword", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error while searching tasks by keyword",
//     });
//   }
// };
const searchtasks = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.json({
        success: false,
        message: "Please write something in the search box",
      });
    }
    const regex = new RegExp(keyword.trim(), "i");

    const searchtasksbykeyword = await Task.find({
      $or: [
        { title: regex },
        { description: regex },
        { priority: regex },
        { category: regex },
        { repeatInterval: regex },
      ],
    });

    if (searchtasksbykeyword.length === 0) {
      return res.json({
        success: false,
        message: "No Tasks match your search",
      });
    } else {
      return res.json({
        success: true,
        message: "Tasks matching your search are fetched successfully",
        task: searchtasksbykeyword,
      });
    }
  } catch (error) {
    console.log("Server error while searching tasks by keyword", error);
    res.status(500).json({
      success: false,
      message: "Server error while searching tasks by keyword",
    });
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
  fetchtaskbydate,
  searchtasks,
  turnoffrepeat,
};
