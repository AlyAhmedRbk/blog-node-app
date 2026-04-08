const express = require("express");
const path = require("path");
const postRoutes = require("./routes/postRoutes");
const postModel = require("./models/postModel");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/api/posts", postRoutes);

// Homepage
app.get("/", async (req, res) => {
  const posts = await postModel.getAllPosts(10, 0);
  res.render("index", { posts });
});

// Create page
app.get("/create", (req, res) => {
  res.render("create");
});

// Create post
app.post("/create", async (req, res) => {
  const { title, content } = req.body;
  await postModel.createPost(title, content, 1);
  res.redirect("/");
});

// Single post
app.get("/post/:id", async (req, res) => {
  const post = await postModel.getPostById(req.params.id);
  res.render("post", { post });
});

module.exports = app;