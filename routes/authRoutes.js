const express = require("express");
const {
  register,
  login,
  refreshToken,
  getUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  getUserById
} = require("../controllers/authController");
const authMiddleware = require("./authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile/:id", authMiddleware, getUserProfile);
router.post("/refresh-token", refreshToken);
router.get("/", authMiddleware, getUsers);
router.get("/:id", authMiddleware, getUserById);
router.delete("/:id", authMiddleware, deleteUser);
router.patch("/:id", authMiddleware, updateUser);
module.exports = router;
