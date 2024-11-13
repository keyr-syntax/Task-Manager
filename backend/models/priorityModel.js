const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prioritySchema = new Schema(
  {
    priority: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Priority = mongoose.model("Priority", prioritySchema);
module.exports = Priority;
