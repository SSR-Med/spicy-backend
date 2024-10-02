"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpError = void 0;
exports.errorHandler = errorHandler;
class httpError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.httpError = httpError;
function errorHandler(error, res) {
    console.log(error);
    if (error.statusCode)
        return res.status(error.statusCode).json({ message: error.message });
    else
        return res.status(500).json({ message: "Error" });
}
