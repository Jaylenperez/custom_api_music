const express = require('express');
const path = require('path');
const app = express();

const dotenv = require('dotenv');
const exportRouter = require('./routes/export.routes');
const dataRouter = require('./routes/data.routes');
const { errorHandler } = require('./middlewares/errorhandler');
dotenv.config();

// Parse JSON bodies (for API routes)
app.use(express.json());

// still serve your CSS/images/fonts from “public”
app.use(express.static('public'));

app.use('/export', exportRouter);

app.use('/data', dataRouter);

app.use(errorHandler);

module.exports = app;