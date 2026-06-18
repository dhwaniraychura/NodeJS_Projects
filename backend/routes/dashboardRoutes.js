const express = require("express");
const router = express.Router();

const {
  getAdminStats,
  getResidents,
  getComplaints,
  getVisitors,
  getBills
} = require("../controllers/dashboardController");

router.get("/admin-stats", getAdminStats);
router.get("/residents", getResidents);
router.get("/complaints", getComplaints);
router.get("/visitors", getVisitors);
router.get("/bills", getBills);

module.exports = router;