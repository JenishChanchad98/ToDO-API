const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    duedate: { type: Date, require: true },
    is_completed: { type: Boolean, default: false }, // false-pending true-completed
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", toDoSchema);
