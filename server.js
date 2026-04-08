// server.js

require("dotenv").config();
const app = require("./app");
const initDB = require("./config/initDb");

const PORT = process.env.PORT || 5000;

// Initialize DB FIRST, then start server
const startServer = async () => {
  await initDB();

  app.listen(PORT, () => {
    console.log(`🌐 Server running on http://localhost:${PORT}`);
  });
};

startServer();