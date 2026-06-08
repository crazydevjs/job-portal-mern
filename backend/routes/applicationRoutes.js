const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  applyJob,
  getMyApplications,
  getApplicantsForJob,
  updateApplicationStatus
} = require("../controllers/applicationController");

router.post("/apply", protect, applyJob);

router.get("/my", protect, getMyApplications);

router.get(
  "/job/:jobId",
  protect,
  getApplicantsForJob
);

router.put(
  "/status/:applicationId",
  protect,
  updateApplicationStatus
);

module.exports = router;