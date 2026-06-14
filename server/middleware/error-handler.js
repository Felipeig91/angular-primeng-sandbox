"use strict";
/**
 * Middleware de manejo de errores
 * Captura y formatea errores de la API
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
exports.asyncHandler = asyncHandler;
function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error interno del servidor';
    const response = {
        success: false,
        message,
        error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    };
    res.status(statusCode).json(response);
}
function asyncHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
