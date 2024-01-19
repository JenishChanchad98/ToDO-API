const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    files: [{ type: String, required: true }],
    todoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("file", fileSchema);
