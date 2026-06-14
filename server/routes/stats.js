"use strict";
/**
 * Rutas para estadísticas y dashboard
 * GET /api/stats - Obtener estadísticas generales
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_storage_1 = require("../data-storage");
const error_handler_1 = require("../middleware/error-handler");
const router = (0, express_1.Router)();
/**
 * GET /api/stats
 * Obtiene estadísticas de la plataforma
 */
router.get('/', (0, error_handler_1.asyncHandler)(async (req, res) => {
    const stats = await (0, data_storage_1.getStats)();
    const response = {
        success: true,
        message: 'Estadísticas obtenidas exitosamente',
        data: stats
    };
    res.json(response);
}));
exports.default = router;
