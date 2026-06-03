/**
 * Rutas para operaciones CRUD de Cupones
 * POST /api/coupons/:businessId - Agregar cupón
 * PUT /api/coupons/:businessId/:couponId - Actualizar cupón
 * DELETE /api/coupons/:businessId/:couponId - Eliminar cupón
 */

import { Router, Request, Response } from 'express';
import {
  addCoupon,
  updateCoupon,
  deleteCoupon,
  getBusinessById,
  incrementClicks
} from '../data-storage';
import { asyncHandler } from '../middleware/error-handler';
import { ApiResponse } from '../types';

const router = Router();

/**
 * POST /api/coupons/:businessId
 * Agrega un nuevo cupón a un negocio
 */
router.post('/:businessId', asyncHandler(async (req: Request, res: Response) => {
  const { businessId } = req.params;
  const { title, discount, code, stock } = req.body;

  if (!title || !discount || !code || stock === undefined) {
    return res.status(400).json({
      success: false,
      message: 'Faltan campos requeridos: title, discount, code, stock'
    });
  }

  const coupon = await addCoupon(businessId, { title, discount, code, stock });

  if (!coupon) {
    return res.status(404).json({
      success: false,
      message: 'Negocio no encontrado'
    });
  }

  const response: ApiResponse<any> = {
    success: true,
    message: 'Cupón agregado exitosamente',
    data: coupon
  };
  res.status(201).json(response);
}));

/**
 * PUT /api/coupons/:businessId/:couponId
 * Actualiza un cupón existente
 */
router.put('/:businessId/:couponId', asyncHandler(async (req: Request, res: Response) => {
  const { businessId, couponId } = req.params;

  const coupon = await updateCoupon(businessId, couponId, req.body);

  if (!coupon) {
    return res.status(404).json({
      success: false,
      message: 'Cupón o negocio no encontrado'
    });
  }

  const response: ApiResponse<any> = {
    success: true,
    message: 'Cupón actualizado exitosamente',
    data: coupon
  };
  res.json(response);
}));

/**
 * DELETE /api/coupons/:businessId/:couponId
 * Elimina un cupón
 */
router.delete('/:businessId/:couponId', asyncHandler(async (req: Request, res: Response) => {
  const { businessId, couponId } = req.params;

  const deleted = await deleteCoupon(businessId, couponId);

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: 'Cupón no encontrado'
    });
  }

  const response: ApiResponse<null> = {
    success: true,
    message: 'Cupón eliminado exitosamente'
  };
  res.json(response);
}));

/**
 * POST /api/coupons/:businessId/:couponId/claim
 * Reclama un cupón (reduce el stock)
 */
router.post('/:businessId/:couponId/claim', asyncHandler(async (req: Request, res: Response) => {
  const { businessId, couponId } = req.params;

  const business = await getBusinessById(businessId);
  if (!business) {
    return res.status(404).json({
      success: false,
      message: 'Negocio no encontrado'
    });
  }

  const coupon = business.coupons.find(c => c.id === couponId);
  if (!coupon) {
    return res.status(404).json({
      success: false,
      message: 'Cupón no encontrado'
    });
  }

  if (coupon.stock <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Cupón sin stock disponible'
    });
  }

  // Reducir stock y incrementar clicks
  await updateCoupon(businessId, couponId, { stock: coupon.stock - 1 });
  await incrementClicks(businessId);

  const response: ApiResponse<any> = {
    success: true,
    message: 'Cupón reclamado exitosamente',
    data: coupon
  };
  res.json(response);
}));

export default router;
