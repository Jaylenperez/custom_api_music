const { Pool } = require("pg");
require("dotenv").config();
const logger = require('./logger');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
});

pool.on("error", (err) => {
  logger.error('Postgres client error', { error: err.message });
});

pool.on("connect", () => {
  logger.info('Connected to Postgres');
});

module.exports = pool;