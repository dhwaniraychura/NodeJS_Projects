const Complaint = require("../models/Complaint");

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

exports.updateComplaintStatus = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found"
      });
    }

    complaint.status = req.body.status;

    await complaint.save();

    res.json({
      message: "Complaint status updated",
      complaint
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};