const express = require("express");
const router = express.Router();

const {
  registerVisitor,
  getVisitors,
  updateVisitorExit
} = require("../controllers/securityController");

router.post("/visitor", registerVisitor);
router.get("/visitors", getVisitors);
router.put("/visitor/:id/exit", updateVisitorExit);

module.exports = router;