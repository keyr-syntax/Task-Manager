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

    isPending: {
      type: Boolean,
      required: true,
      default: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    scheduledFor: {
      type: Date,
      required: true,
      default: Date.now,
    },
    reminder: {
      type: Date,
      required: false,
      default: null,
    },
    isNotified: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
