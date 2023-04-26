const jwt = require("jsonwebtoken");

const errorHandler = (err, req, res, next) => {
    if (err) {
        res.send({
            message: err.message,
            stack: process.env.NODE_ENV === "development" ? err.stack : null
        });
    }
};

const isAuth = (req, res, next) => {
    const token = req.headers?.authorization;

    if (!token) {
        throw new Error("You are not authorized.");
    }

    const splittedToken = token.split(" ")[1];

    if (!jwt.verify(splittedToken, process.env.JWT_SECRET)) {
        throw new Error("You are not authorized.");
    }

    next();
}

module.exports = {
    errorHandler,
    isAuth,
};
