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
      const formatted = rows.map(r => {
        r.release_date = r.release_date.toLocaleDateString(undefined, {
            month: 'long',
            day:   'numeric',
            year:  'numeric'
        });
  
        const { hours = 0, minutes = 0, seconds = 0 } = r.duration;
  
        const parts = [];
        if (hours)   parts.push(`${hours}hr`);
        if (minutes) parts.push(`${minutes}min`);
        if (seconds) parts.push(`${seconds}sec`);
  
        r.duration = parts.join(' ') || '0min';  // fallback if everything is zero
        return r;
      });
  
      await sendCsv(res, 'albums.csv', formatted);
    } catch (err) {
      next(err);
    }
  });

// GET /export/songs → songs.csv
router.get('/songs', async (req, res, next) => {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM songs ORDER BY album_id, track_number'
      );
  
      const formatted = rows.map(r => {
        // pull out the parts (interval comes in as { minutes, seconds, … })
        const { hours = 0, minutes = 0, seconds = 0 } = r.duration;
  
        // if you ever have hours on a song, convert to total minutes:
        const totalMinutes = hours * 60 + minutes;
        // pad seconds to two digits:
        const secPadded   = String(seconds).padStart(2, '0');
  
        // build "M:SS"
        r.duration = `${totalMinutes}:${secPadded}`;
  
        return r;
      });
  
      await sendCsv(res, 'songs.csv', formatted);
    } catch (err) {
      next(err);
    }
  });

module.exports = router;

// http://localhost:5000/export/albums
// http://localhost:5000/export/songs