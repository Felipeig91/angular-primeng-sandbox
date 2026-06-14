"use strict";
/**
 * Rutas para operaciones CRUD de Negocios
 * GET /api/businesses - Obtener todos
 * POST /api/businesses - Crear nuevo (con soporte para imagen)
 * GET /api/businesses/:id - Obtener uno
 * PUT /api/businesses/:id - Actualizar
 * DELETE /api/businesses/:id - Eliminar
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_storage_1 = require("../data-storage");
const error_handler_1 = require("../middleware/error-handler");
const upload_1 = require("../middleware/upload");
const router = (0, express_1.Router)();
/**
 * GET /api/businesses
 * Obtiene todos los negocios registrados
 */
router.get('/', (0, error_handler_1.asyncHandler)(async (req, res) => {
    const businesses = await (0, data_storage_1.getAllBusinesses)();
    const response = {
        success: true,
        message: 'Negocios obtenidos exitosamente',
        data: businesses
    };
    res.json(response);
}));
/**
 * GET /api/businesses/:id
 * Obtiene un negocio específico por ID
 */
router.get('/:id', (0, error_handler_1.asyncHandler)(async (req, res) => {
    const business = await (0, data_storage_1.getBusinessById)(req.params.id);
    if (!business) {
        return res.status(404).json({
            success: false,
            message: 'Negocio no encontrado'
        });
    }
    // Incrementar vistas
    await (0, data_storage_1.incrementViews)(req.params.id);
    const response = {
        success: true,
        message: 'Negocio obtenido exitosamente',
        data: business
    };
    res.json(response);
}));
/**
 * POST /api/businesses
 * Crea un nuevo negocio SIN imagen (JSON directo)
 */
router.post('/', (0, error_handler_1.asyncHandler)(async (req, res) => {
    const { name, category, description, contact, phone, address, coupons } = req.body;
    // Validaciones básicas
    if (!name || !category || !description) {
        return res.status(400).json({
            success: false,
            message: 'Faltan campos requeridos: name, category, description'
        });
    }
    const business = await (0, data_storage_1.createBusiness)({
        name,
        category,
        description,
        contact,
        phone,
        address,
        image: null,
        coupons: Array.isArray(coupons) ? coupons : []
    });
    const response = {
        success: true,
        message: 'Negocio creado exitosamente',
        data: business
    };
    res.status(201).json(response);
}));
/**
 * POST /api/businesses/upload
 * Crea un nuevo negocio CON imagen (FormData + Multer)
 */
router.post('/upload', upload_1.upload.single('image'), (0, error_handler_1.asyncHandler)(async (req, res) => {
    const { name, category, description, contact, phone, address, coupons } = req.body;
    // Validaciones básicas
    if (!name || !category || !description) {
        return res.status(400).json({
            success: false,
            message: 'Faltan campos requeridos: name, category, description'
        });
    }
    // Procesar imagen si se subió
    let imagePath = null;
    if (req.file) {
        imagePath = `/uploads/${req.file.filename}`;
    }
    // Parsear cupones si vienen como string (desde FormData)
    let parsedCoupons = coupons;
    if (typeof coupons === 'string') {
        try {
            parsedCoupons = JSON.parse(coupons);
        }
        catch (e) {
            parsedCoupons = [];
        }
    }
    const business = await (0, data_storage_1.createBusiness)({
        name,
        category,
        description,
        contact,
        phone,
        address,
        image: imagePath,
        coupons: parsedCoupons
    });
    const response = {
        success: true,
        message: 'Negocio creado exitosamente',
        data: business
    };
    res.status(201).json(response);
}));
/**
 * PUT /api/businesses/:id
 * Actualiza un negocio existente (JSON sin imagen)
 */
router.put('/:id', (0, error_handler_1.asyncHandler)(async (req, res) => {
    const existing = await (0, data_storage_1.getBusinessById)(req.params.id);
    if (!existing) {
        return res.status(404).json({
            success: false,
            message: 'Negocio no encontrado'
        });
    }
    const updated = await (0, data_storage_1.updateBusiness)(req.params.id, req.body);
    const response = {
        success: true,
        message: 'Negocio actualizado exitosamente',
        data: updated
    };
    res.json(response);
}));
/**
 * PUT /api/businesses/:id/upload
 * Actualiza un negocio con nueva imagen (FormData)
 */
router.put('/:id/upload', upload_1.upload.single('image'), (0, error_handler_1.asyncHandler)(async (req, res) => {
    const existing = await (0, data_storage_1.getBusinessById)(req.params.id);
    if (!existing) {
        return res.status(404).json({
            success: false,
            message: 'Negocio no encontrado'
        });
    }
    const updateData = { ...req.body };
    // Si se subió una nueva imagen
    if (req.file) {
        updateData.image = `/uploads/${req.file.filename}`;
    }
    const updated = await (0, data_storage_1.updateBusiness)(req.params.id, updateData);
    const response = {
        success: true,
        message: 'Negocio actualizado exitosamente',
        data: updated
    };
    res.json(response);
}));
/**
 * DELETE /api/businesses/:id
 * Elimina un negocio
 */
router.delete('/:id', (0, error_handler_1.asyncHandler)(async (req, res) => {
    const deleted = await (0, data_storage_1.deleteBusiness)(req.params.id);
    if (!deleted) {
        return res.status(404).json({
            success: false,
            message: 'Negocio no encontrado'
        });
    }
    const response = {
        success: true,
        message: 'Negocio eliminado exitosamente'
    };
    res.json(response);
}));
exports.default = router;
