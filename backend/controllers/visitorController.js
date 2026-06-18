const Visitor = require("../models/Visitor");


// Register Visitor
exports.addVisitor = async (req, res) => {

    try {

        const visitor = await Visitor.create({
            visitorName: req.body.visitorName,
            phone: req.body.phone,
            purpose: req.body.purpose,
            resident: req.body.resident
        });

        res.status(201).json({
            success: true,
            visitor
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Get All Visitors
exports.getVisitors = async (req, res) => {

    try {

        const visitors = await Visitor.find()
            .populate("resident", "name flatNumber");

        res.status(200).json({
            success: true,
            visitors
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};