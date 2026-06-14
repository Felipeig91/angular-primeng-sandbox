"use strict";
/**
 * Rutas para operaciones CRUD de Cupones
 * POST /api/coupons/:businessId - Agregar cupón
 * PUT /api/coupons/:businessId/:couponId - Actualizar cupón
 * DELETE /api/coupons/:businessId/:couponId - Eliminar cupón
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_storage_1 = require("../data-storage");
const error_handler_1 = require("../middleware/error-handler");
const router = (0, express_1.Router)();
/**
 * POST /api/coupons/:businessId
 * Agrega un nuevo cupón a un negocio
 */
router.post('/:businessId', (0, error_handler_1.asyncHandler)(async (req, res) => {
    const businessId = req.params.businessId;
    const { title, discount, code, stock } = req.body;
    if (!title || !discount || !code || stock === undefined) {
        return res.status(400).json({
            success: false,
            message: 'Faltan campos requeridos: title, discount, code, stock'
        });
    }
    const coupon = await (0, data_storage_1.addCoupon)(businessId, { title, discount, code, stock });
    if (!coupon) {
        return res.status(404).json({
            success: false,
            message: 'Negocio no encontrado'
        });
    }
    const response = {
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
router.put('/:businessId/:couponId', (0, error_handler_1.asyncHandler)(async (req, res) => {
    const businessId = req.params.businessId;
    const couponId = req.params.couponId;
    const coupon = await (0, data_storage_1.updateCoupon)(businessId, couponId, req.body);
    if (!coupon) {
        return res.status(404).json({
            success: false,
            message: 'Cupón o negocio no encontrado'
        });
    }
    const response = {
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
router.delete('/:businessId/:couponId', (0, error_handler_1.asyncHandler)(async (req, res) => {
    const businessId = req.params.businessId;
    const couponId = req.params.couponId;
    const deleted = await (0, data_storage_1.deleteCoupon)(businessId, couponId);
    if (!deleted) {
        return res.status(404).json({
            success: false,
            message: 'Cupón no encontrado'
        });
    }
    const response = {
        success: true,
        message: 'Cupón eliminado exitosamente'
    };
    res.json(response);
}));
/**
 * POST /api/coupons/:businessId/:couponId/claim
 * Reclama un cupón (reduce el stock)
 */
router.post('/:businessId/:couponId/claim', (0, error_handler_1.asyncHandler)(async (req, res) => {
    const businessId = req.params.businessId;
    const couponId = req.params.couponId;
    const business = await (0, data_storage_1.getBusinessById)(businessId);
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
    await (0, data_storage_1.updateCoupon)(businessId, couponId, { stock: coupon.stock - 1 });
    await (0, data_storage_1.incrementClicks)(businessId);
    const response = {
        success: true,
        message: 'Cupón reclamado exitosamente',
        data: coupon
    };
    res.json(response);
}));
exports.default = router;
