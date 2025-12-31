const errorHandle = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch((err) => {
                console.error("❌ Error in errorHandler:", err);
                return res.status(500).json({ 
                    error: "Internal server error", 
                    errorMessage: err.message,
                    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
                });
            });
    };
};

export default errorHandle;