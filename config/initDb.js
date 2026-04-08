// config/initDb.js
// Automatically creates database and tables if not exist

const mysql = require("mysql2/promise");
require("dotenv").config();

const initDB = async () => {
  try {
    // Step 1: Connect WITHOUT selecting DB
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT
    });

    console.log("🔌 Connected to MySQL server");

    // Step 2: Create Database if not exists
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`
    );

    console.log(`📦 Database "${process.env.DB_NAME}" ensured`);

    // Step 3: Use DB
    await connection.query(`USE \`${process.env.DB_NAME}\`;`);

    // Step 4: Create users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Step 5: Create posts table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        user_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    console.log("✅ Tables ensured");

    // Optional: insert default user if empty
    const [users] = await connection.query(`SELECT * FROM users LIMIT 1`);

    if (users.length === 0) {
      await connection.query(`
        INSERT INTO users (name, email)
        VALUES ('Admin User', 'admin@example.com');
      `);

      console.log("👤 Default user created");
    }

    await connection.end();

    console.log("🚀 Database ready to use!\n");
  } catch (error) {
    console.error("❌ DB Init Error:", error.message);
    process.exit(1);
  }
};

module.exports = initDB;