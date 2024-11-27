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
      required: false,
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
    repeatDate: {
      type: Date,
      required: false,
    },
    repeatInterval: {
      type: String,
      required: false,
      default: "None",
    },
    addOnRepeatlist: {
      type: Boolean,
      required: false,
      default: false,
    },
    isRepeat: {
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

taskSchema.index({
  title: "text",
  description: "text",
  priority: "text",
  category: "text",
  repeatInterval: "text",
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
