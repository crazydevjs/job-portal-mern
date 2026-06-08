const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  applyJob,
} = require("../controllers/applicationController");

router.post("/apply", protect, applyJob);

module.exports = router;