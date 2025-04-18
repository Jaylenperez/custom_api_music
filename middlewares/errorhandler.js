const {status} = require('http-status');

class CustomError extends Error {
    constructor(message, status){
        super(message)
        this.status = status;
        this.name = this.constructor.name;
    }
}

const errorHandler = (err, req, res, next) =>{
    const statusCode = err.status || status.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Something went wrong'

    res.status(statusCode).json({
        message,
        status: statusCode
    })

}

module.exports = {CustomError, errorHandler};