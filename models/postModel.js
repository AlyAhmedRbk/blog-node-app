const db = require("../config/db");

exports.getAllPosts = async (limit = 10, offset = 0) => {
  // Ensure numbers (VERY IMPORTANT)
  limit = parseInt(limit) || 10;
  offset = parseInt(offset) || 0;

  const [rows] = await db.execute(
    `SELECT posts.*, users.name AS author 
     FROM posts 
     LEFT JOIN users ON posts.user_id = users.id
     ORDER BY posts.created_at DESC
     LIMIT ${limit} OFFSET ${offset}`
  );

  return rows;
};

exports.getPostById = async (id) => {
  const [rows] = await db.execute(
    `SELECT posts.*, users.name AS author 
     FROM posts 
     LEFT JOIN users ON posts.user_id = users.id
     WHERE posts.id = ?`,
    [id]
  );
  return rows[0];
};

exports.createPost = async (title, content, user_id) => {
  const [result] = await db.execute(
    `INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)`,
    [title, content, user_id]
  );
  return result.insertId;
};

exports.updatePost = async (id, title, content) => {
  const [result] = await db.execute(
    `UPDATE posts SET title = ?, content = ? WHERE id = ?`,
    [title, content, id]
  );
  return result.affectedRows;
};

exports.deletePost = async (id) => {
  const [result] = await db.execute(
    `DELETE FROM posts WHERE id = ?`,
    [id]
  );
  return result.affectedRows;
};