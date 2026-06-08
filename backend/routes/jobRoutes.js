const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createJob,
  getAllJobs,
} = require("../controllers/jobController");

router.post(
  "/create",
  protect,
  createJob
);

router.get("/", getAllJobs);

module.exports = router;