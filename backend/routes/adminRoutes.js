const express = require("express");
const router = express.Router();

const {
  createFlat,
  getFlats,
  createNotice,
  generateBill
} = require("../controllers/adminController");

router.post("/flat", createFlat);
router.get("/flats", getFlats);
router.post("/notice", createNotice);
router.post("/bill", generateBill);

module.exports = router;