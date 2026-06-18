const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    resident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    facility: {
      type: String,
      enum: [
        "clubhouse",
        "gym",
        "hall",
        "pool",
        "sports-court",
        "garden"
      ]
    },
    bookingDate: Date,
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);