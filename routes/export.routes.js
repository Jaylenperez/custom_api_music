// routes/export.routes.js
const express = require('express');
const pool    = require('../db');
const { Parser } = require('json2csv');

const router = express.Router();

// helper to send CSV
async function sendCsv(res, filename, rows) {
  if (!rows.length) return res.status(204).end();
  const fields = Object.keys(rows[0]);
  const parser = new Parser({ fields });
  const csv    = parser.parse(rows);

  res.header('Content-Type', 'text/csv');
  res.attachment(filename);
  res.send(csv);
}

// GET /export/albums → albums.csv
router.get('/albums', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM albums ORDER BY id');
    await sendCsv(res, 'albums.csv', rows);
  } catch (err) {
    next(err);
  }
});

// GET /export/songs → songs.csv
router.get('/songs', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM songs ORDER BY album_id, track_number');
    await sendCsv(res, 'songs.csv', rows);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
