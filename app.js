const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const exportRouter = require('./routes/export.routes');
const { errorHandler } = require('./middlewares/errorhandler');
dotenv.config();

app.use(express.json());

app.use(express.static('public'));

app.use('/export', exportRouter);

app.use(errorHandler);

module.exports = app;