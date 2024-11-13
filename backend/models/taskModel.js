const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      default: "You haven't added description yet",
    },
    priority: {
      type: String,
      required: true,
      default: "Low",
    },
    category: {
      type: String,
      required: true,
      default: "Miscellaneous",
    },
    isPending: {
      type: Boolean,
      required: true,
      default: true,
    },

    scheduledFor: {
      type: Date,
      required: true,
      default: Date.now,
    },
    reminder: {
      type: Date,
      required: false,
    },
    addOnReminderlist: {
      type: Boolean,
      required: false,
      default: false,
    },
    isNotified: {
      type: Boolean,
      required: false,
      default: false,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
