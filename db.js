const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
});

pool.on("error", (err) => {
  console.error("Error connecting to database:", err);
});

pool.on("connect", () => {
  console.log("Connected to the database");
});

module.exports = pool;