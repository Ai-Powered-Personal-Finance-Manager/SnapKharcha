const errorHandler = (err, req, res, next) => {
    // Default to 500
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Prisma errors
    if (err.code === 'P2002') {
        statusCode = 409;
        message = `${err.meta?.target?.join(', ')} already exists`;
    }
    if (err.code === 'P2025') {
        statusCode = 404;
        message = 'Record not found';
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    }
    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
    }

    // Log only unexpected errors
    if (!err.isOperational) {
        console.error('UNEXPECTED ERROR:', err);
    }

    res.status(statusCode).json({
        success: false,
        message,
        // show stack trace only in development
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

export default errorHandler;