const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
  {
    resident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    amount: Number,
    month: String,
    dueDate: Date,
    status: {
      type: String,
      enum: ["paid", "pending", "overdue"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bill", billSchema);