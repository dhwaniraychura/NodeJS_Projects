const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema(
  {
    question: String,
    options: [String],
    votes: [Number]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Poll", pollSchema);