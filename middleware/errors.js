const res = require("express/lib/response");

function errorHandler(err, req, next) {
    if (typeof err === "string") {
        return res.status(400).json({ message: err });
    }

    if (err.name === "ValidationError") {
        return res.status(400).json({ message: err.message });
    }

    if (err.name === "UnauthorizedError") {
        return res.status(401).json({ message: "Token not valid" });
    }

    return res.status(500).json({ message: err.message });

}

module.exports = {
    errorHandler,
};