const express = require("express");
const {
  register,
  login,
  refreshToken,
  getUserProfile,
} = require("../controllers/authController");
const authMiddleware = require("./authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.get("/profile", authMiddleware, getUserProfile);
module.exports = router;
