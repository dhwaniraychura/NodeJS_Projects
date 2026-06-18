const User = require("../models/User");
const Complaint = require("../models/Complaint");
const Visitor = require("../models/Visitor");
const Bill = require("../models/Bill");

exports.getAdminStats = async (req, res) => {
  try {
    const residents = await User.countDocuments({ role: "resident" });
    const complaints = await Complaint.countDocuments();
    const visitors = await Visitor.countDocuments();
    const bills = await Bill.countDocuments();

    res.json({
      residents,
      complaints,
      visitors,
      bills
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getResidents = async (req, res) => {
  try {
    const residents = await User.find({ role: "resident" })
      .select("-password");

    res.json(residents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("resident", "name email");

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find();

    res.json(visitors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBills = async (req, res) => {
  try {
    const bills = await Bill.find()
      .populate("resident", "name email");

    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};