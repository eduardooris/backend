const express = require("express");
const authMiddleware = require("./authMiddleware");
const router = express.Router();
const { getUsersByUsername, acceptFriendRequest, sendFriendRequest } = require("../controllers/userController");

router.get("/search/:username", authMiddleware, getUsersByUsername);
router.post("/friend-request", authMiddleware, sendFriendRequest);
router.post("/accept-friend-request", authMiddleware, acceptFriendRequest);

module.exports = router;
