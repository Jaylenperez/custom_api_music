// routes/data.routes.js
const express = require('express');
const router = express.Router();
const pool   = require('../db');

// GET /data/albums → return all albums as JSON
router.get('/albums', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM albums ORDER BY id');
    res.json({ albums: rows });
  } catch (err) {
    next(err);
  }
});

// GET /data/songs → return all songs as JSON
router.get('/songs', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM songs ORDER BY id');
    res.json({ songs: rows });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

// http://localhost:5000/data/albums
// http://localhost:5000/data/songs