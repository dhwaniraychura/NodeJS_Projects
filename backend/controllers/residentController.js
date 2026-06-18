const Complaint = require("../models/Complaint");
const Booking = require("../models/Booking");
const Bill = require("../models/Bill");
const User = require("../models/User");

exports.createComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.create(req.body);

    res.status(201).json({
      message: "Complaint created successfully",
      complaint
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate("resident");

    res.json(complaints);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    res.status(201).json({
      message: "Booking created successfully",
      booking
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getBills = async (req, res) => {
  try {
    const bills = await Bill.find().populate("resident");

    res.json(bills);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
// Get all residents
exports.getResidents = async (req, res) => {
    try {
        const residents = await User.find({ role: "resident" });

        res.status(200).json({
            success: true,
            residents
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get single resident
exports.getResidentById = async (req, res) => {
    try {
        const resident = await User.findById(req.params.id);

        if (!resident) {
            return res.status(404).json({
                success: false,
                message: "Resident not found"
            });
        }

        res.status(200).json({
            success: true,
            resident
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update resident
exports.updateResident = async (req, res) => {
    try {
        const resident = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            success: true,
            resident
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete resident
exports.deleteResident = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Resident deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};