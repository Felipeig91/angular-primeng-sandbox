/**
 * Rutas para estadísticas y dashboard
 * GET /api/stats - Obtener estadísticas generales
 */

import { Router, Request, Response } from 'express';
import { getStats } from '../data-storage';
import { asyncHandler } from '../middleware/error-handler';
import { ApiResponse } from '../types';

const router = Router();

/**
 * GET /api/stats
 * Obtiene estadísticas de la plataforma
 */
router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const stats = await getStats();

  const response: ApiResponse<any> = {
    success: true,
    message: 'Estadísticas obtenidas exitosamente',
    data: stats
  };
  res.json(response);
}));

export default router;
