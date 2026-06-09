const express = require("express");

const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

const protect = require("../middleware/authMiddleware");

router.get(
  "/profile",
  protect,
  getProfile,
);
router.put(
  "/profile",
  protect,
  updateProfile
);

module.exports = router;