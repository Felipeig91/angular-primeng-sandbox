"use strict";
/**
 * Servidor Express API Local
 * Backend para la aplicación Business Directory
 *
 * Endpoints disponibles:
 * - GET  /api/businesses - Obtener todos los negocios
 * - POST /api/businesses - Crear nuevo negocio
 * - GET  /api/businesses/:id - Obtener negocio específico
 * - PUT  /api/businesses/:id - Actualizar negocio
 * - DELETE /api/businesses/:id - Eliminar negocio
 * - POST /api/coupons/:businessId - Agregar cupón
 * - PUT  /api/coupons/:businessId/:couponId - Actualizar cupón
 * - DELETE /api/coupons/:businessId/:couponId - Eliminar cupón
 * - POST /api/coupons/:businessId/:couponId/claim - Reclamar cupón
 * - GET  /api/stats - Obtener estadísticas
 *
 * Ejecutar: npm run server
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const businesses_1 = __importDefault(require("./routes/businesses"));
const coupons_1 = __importDefault(require("./routes/coupons"));
const stats_1 = __importDefault(require("./routes/stats"));
const cors_1 = require("./middleware/cors");
const error_handler_1 = require("./middleware/error-handler");
const app = (0, express_1.default)();
const PORT = process.env['PORT'] || 3001;
const API_PORT = 3001; // Puerto separado para la API
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors_1.corsMiddleware);
// Servir archivos estáticos (uploads)
app.use('/uploads', express_1.default.static(path_1.default.join(process.cwd(), 'uploads')));
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'API running', timestamp: new Date().toISOString() });
});
// Rutas API
app.use('/api/businesses', businesses_1.default);
app.use('/api/coupons', coupons_1.default);
app.use('/api/stats', stats_1.default);
// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada',
        path: req.path
    });
});
// Error handler
app.use(error_handler_1.errorHandler);
// Iniciar servidor
const server = app.listen(API_PORT, () => {
    console.log(`\n╔═══════════════════════════════════════════╗`);
    console.log(`║  🚀 API Business Directory               ║`);
    console.log(`║  URL: http://localhost:${API_PORT}              ║`);
    console.log(`║  Health: http://localhost:${API_PORT}/health    ║`);
    console.log(`╚═══════════════════════════════════════════╝\n`);
    console.log(`API Endpoints:`);
    console.log(`  GET    /api/businesses`);
    console.log(`  POST   /api/businesses`);
    console.log(`  GET    /api/businesses/:id`);
    console.log(`  PUT    /api/businesses/:id`);
    console.log(`  DELETE /api/businesses/:id`);
    console.log(`  POST   /api/coupons/:businessId`);
    console.log(`  PUT    /api/coupons/:businessId/:couponId`);
    console.log(`  DELETE /api/coupons/:businessId/:couponId`);
    console.log(`  POST   /api/coupons/:businessId/:couponId/claim`);
    console.log(`  GET    /api/stats\n`);
});
// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
exports.default = app;
