const Visitor = require("../models/Visitor");

exports.registerVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.create({
      ...req.body,
      entryTime: new Date()
    });

    res.status(201).json({
      message: "Visitor registered successfully",
      visitor
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find().populate("resident");

    res.json(visitors);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.updateVisitorExit = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        message: "Visitor not found"
      });
    }

    visitor.exitTime = new Date();

    await visitor.save();

    res.json({
      message: "Visitor exit recorded",
      visitor
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};