const errorHandle = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (err) {
            console.error("❌ Error in errorHandler:", err);
            console.error("  - Error name:", err.name);
            console.error("  - Error message:", err.message);
            
            // Don't send response if it's already been sent
            if (res.headersSent) {
                return next(err);
            }
            
            // If error has status code, use it
            const statusCode = err.statusCode || err.status || 500;
            
            return res.status(statusCode).json({ 
                message: err.message || "Internal server error",
                error: err.message,
                ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
            });
        }
    };
};

export default errorHandle;