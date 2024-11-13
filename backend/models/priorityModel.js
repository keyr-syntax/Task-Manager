const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prioritySchema = new Schema(
  {
    priorityname: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Priority = mongoose.model("Priority", prioritySchema);
module.exports = Priority;
