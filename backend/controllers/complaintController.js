const Complaint = require("../models/Complaint");

exports.createComplaint = async (req, res) => {
  try {
    const { resident, category, description } = req.body;

    const complaint = await Complaint.create({
      resident,
      category,
      description
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("resident", "name email");

    res.json(complaints);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};