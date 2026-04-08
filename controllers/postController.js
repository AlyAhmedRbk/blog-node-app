const postModel = require("../models/postModel");

exports.getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;

    const posts = await postModel.getAllPosts(limit, offset);

    res.json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await postModel.getPostById(req.params.id);

    if (!post) return res.status(404).json({ error: "Not found" });

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content, user_id } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title & content required" });
    }

    const id = await postModel.createPost(title, content, user_id);

    res.status(201).json({ message: "Created", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const updated = await postModel.updatePost(
      req.params.id,
      title,
      content
    );

    if (!updated) return res.status(404).json({ error: "Not found" });

    res.json({ message: "Updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const deleted = await postModel.deletePost(req.params.id);

    if (!deleted) return res.status(404).json({ error: "Not found" });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};