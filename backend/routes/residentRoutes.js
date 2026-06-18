const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getComplaints,
  createBooking,
  getBills,
  getResidents,
    getResidentById,
    updateResident,
    deleteResident
} = require("../controllers/residentController");

router.post("/complaint", createComplaint);
router.get("/complaints", getComplaints);
router.post("/booking", createBooking);
router.get("/bills", getBills);
router.get("/", getResidents);

router.get("/:id", getResidentById);

router.put("/:id", updateResident);

router.delete("/:id", deleteResident);

module.exports = router;