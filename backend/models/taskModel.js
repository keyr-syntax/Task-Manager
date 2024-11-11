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
    },
    priority: {
      type: String,
      required: true,
      default: "low",
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
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
