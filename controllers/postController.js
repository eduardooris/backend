const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const post = new Post({ content, author: req.user.id });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const likeIndex = post.likes.indexOf(req.user.id);
    if (likeIndex === -1) {
      post.likes.push(req.user.id);
    } else {
      post.likes.splice(likeIndex, 1);
    }
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name surname")
      .populate("comments.author", "name surname");
    if (posts.length < 1) {
      return res.status(404).json({ message: "No posts found" });
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.commentPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const comment = { content: req.body.content, author: req.user.id };
    post.comments.push(comment);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await Post.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Post deleted", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req?.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Content is required" });
  }

  const post = {
    content,
  };

  try {
    const updatePost = await Post.updateOne({ _id: id }, post);
    if (updatePost.matchedCount == 0) {
      res.status(200).json({ message: "Não foi possível atualizar!" });
      return;
    }
    res.status(200).json(updatePost);
  } catch (error) {
    res.status(500).json({ status: false, message: "Agenda não encontrada!" });
  }
};
