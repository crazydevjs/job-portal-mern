const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createJob,
  getAllJobs,
  getJobById,
  getMyJobs,
  deleteJob,
} = require("../controllers/jobController");

router.post(
  "/create",
  protect,
  createJob
);

router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.get(
  "/my/jobs",
  protect,
  getMyJobs
);

router.delete(
  "/:id",
  protect,
  deleteJob
);

module.exports = router;