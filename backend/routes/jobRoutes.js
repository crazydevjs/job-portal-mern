const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createJob,
  getAllJobs,
  getJobById,
} = require("../controllers/jobController");

router.post(
  "/create",
  protect,
  createJob
);

router.get("/", getAllJobs);
router.get("/:id", getJobById);

module.exports = router;