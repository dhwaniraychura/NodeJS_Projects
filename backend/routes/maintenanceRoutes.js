const express = require("express");
const router = express.Router();

const {
  getComplaints,
  updateComplaintStatus
} = require("../controllers/maintenanceController");

router.get("/complaints", getComplaints);
router.put("/complaint/:id", updateComplaintStatus);

module.exports = router;