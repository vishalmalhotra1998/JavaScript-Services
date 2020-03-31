const errorHandler = (err, req, res, next) => {
    const error = [];
    if (Array.isArray(err)) {
        err.forEach(element => {
            error.push({
                error: element,
                status: 500,
                message: element,
                timestamp: new Date()
            });

        });

        res.send({ error });
    } else {
        res.send({
            error: err.message,
            message: 'error',
            status: 500,
            timestamp: new Date()

        });
    }
};

export default errorHandler;
