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

import express, { Express } from 'express';
import path from 'path';
import businessesRouter from './routes/businesses';
import couponsRouter from './routes/coupons';
import statsRouter from './routes/stats';
import { corsMiddleware } from './middleware/cors';
import { errorHandler } from './middleware/error-handler';

const app: Express = express();
const PORT = process.env.PORT || 3000;
const API_PORT = 3001; // Puerto separado para la API

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);

// Servir archivos estáticos (uploads)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'API running', timestamp: new Date().toISOString() });
});

// Rutas API
app.use('/api/businesses', businessesRouter);
app.use('/api/coupons', couponsRouter);
app.use('/api/stats', statsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    path: req.path
  });
});

// Error handler
app.use(errorHandler);

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

export default app;
