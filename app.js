const express = require('express');
const morgan = require('morgan');
const logger = require('./logger')
const path = require('path');
const app = express();

const dotenv = require('dotenv');
const exportRouter = require('./routes/export.routes');
const dataRouter = require('./routes/data.routes');
const { errorHandler } = require('./middlewares/errorhandler');
dotenv.config();

// HTTP request logging via morgan -> winston
app.use(morgan('combined', {
    stream: { write: msg => logger.info(msg.trim()) }
}));


// JSON & Static middleware
app.use(express.json());
app.use(express.static('public'));

// Routers
app.use('/export', exportRouter);
app.use('/data', dataRouter);

app.use((err, req, res, next) => {
    logger.error('Unhandled error', { message: err.message, stack: err.stack });
    errorHandler(err, req, res, next);
});

module.exports = app;