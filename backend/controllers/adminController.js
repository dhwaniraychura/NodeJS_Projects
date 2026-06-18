const Flat = require("../models/Flat");
const Notice = require("../models/Notice");
const Bill = require("../models/Bill");

exports.createFlat = async (req, res) => {
  try {
    const flat = await Flat.create(req.body);

    res.status(201).json({
      message: "Flat created successfully",
      flat
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getFlats = async (req, res) => {
  try {
    const flats = await Flat.find().populate("resident");

    res.json(flats);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.createNotice = async (req, res) => {
  try {
    const notice = await Notice.create(req.body);

    res.status(201).json({
      message: "Notice created",
      notice
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.generateBill = async (req, res) => {
  try {
    const bill = await Bill.create(req.body);

    res.status(201).json({
      message: "Bill generated",
      bill
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};