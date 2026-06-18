const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notice", noticeSchema);