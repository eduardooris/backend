const express = require("express");
const {
  createPost,
  likePost,
  commentPost,
  getAllPosts,
  deletePost,
  updatePost,
} = require("../controllers/postController");
const authMiddleware = require("./authMiddleware");
const router = express.Router();

router.post("/posts", authMiddleware, createPost);
router.delete("/posts/:id", authMiddleware, deletePost);
router.post("/posts/:id/like", authMiddleware, likePost);
router.post("/posts/:id/comment", authMiddleware, commentPost);
router.get("/posts", authMiddleware, getAllPosts);
router.patch("/posts/:id", authMiddleware, updatePost);
module.exports = router;
