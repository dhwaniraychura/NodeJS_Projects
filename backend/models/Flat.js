const mongoose = require("mongoose");

const flatSchema = new mongoose.Schema(
  {
    flatNumber: {
      type: String,
      required: true,
      unique: true
    },
    block: {
      type: String,
      required: true
    },
    floor: {
      type: Number,
      required: true
    },
    occupancyStatus: {
      type: String,
      enum: ["occupied", "vacant"],
      default: "vacant"
    },
    resident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Flat", flatSchema);