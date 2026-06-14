/**
 * Rutas para operaciones CRUD de Negocios
 * GET /api/businesses - Obtener todos
 * POST /api/businesses - Crear nuevo (con soporte para imagen)
 * GET /api/businesses/:id - Obtener uno
 * PUT /api/businesses/:id - Actualizar
 * DELETE /api/businesses/:id - Eliminar
 */

import { Router, Request, Response } from 'express';
import {
  getAllBusinesses,
  getBusinessById,
  createBusiness,
  updateBusiness,
  deleteBusiness,
  incrementViews
} from '../data-storage';
import { asyncHandler } from '../middleware/error-handler';
import { upload } from '../middleware/upload';
import { ApiResponse } from '../types';

const router = Router();

/**
 * GET /api/businesses
 * Obtiene todos los negocios registrados
 */
router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const businesses = await getAllBusinesses();
  const response: ApiResponse<any> = {
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
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const business = await getBusinessById(req.params.id);

  if (!business) {
    return res.status(404).json({
      success: false,
      message: 'Negocio no encontrado'
    });
  }

  // Incrementar vistas
  await incrementViews(req.params.id);

  const response: ApiResponse<any> = {
    success: true,
    message: 'Negocio obtenido exitosamente',
    data: business
  };
  res.json(response);
}));

/**
 * POST /api/businesses
 * Crea un nuevo negocio con imagen opcional
 * FormData:
 * {
 *   image?: File,
 *   name: string,
 *   category: string,
 *   description: string,
 *   contact?: string,
 *   phone?: string,
 *   address?: string,
 *   coupons?: string (JSON array)
 * }
 */
router.post('/', upload.single('image'), asyncHandler(async (req: Request, res: Response) => {
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
    } catch (e) {
      parsedCoupons = [];
    }
  }

  const business = await createBusiness({
    name,
    category,
    description,
    contact,
    phone,
    address,
    image: imagePath,
    coupons: parsedCoupons
  });

  const response: ApiResponse<any> = {
    success: true,
    message: 'Negocio creado exitosamente',
    data: business
  };
  res.status(201).json(response);
}));

/**
 * PUT /api/businesses/:id
 * Actualiza un negocio existente (con soporte para cambiar imagen)
 */
router.put('/:id', upload.single('image'), asyncHandler(async (req: Request, res: Response) => {
  const existing = await getBusinessById(req.params.id);

  if (!existing) {
    return res.status(404).json({
      success: false,
      message: 'Negocio no encontrado'
    });
  }

  const updateData = { ...req.body };

  // Si se subió una nueva imagen, usar esa ruta
  if (req.file) {
    updateData.image = `/uploads/${req.file.filename}`;
  }

  const updated = await updateBusiness(req.params.id, updateData);

  const response: ApiResponse<any> = {
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
router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
  const deleted = await deleteBusiness(req.params.id);

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: 'Negocio no encontrado'
    });
  }

  const response: ApiResponse<null> = {
    success: true,
    message: 'Negocio eliminado exitosamente'
  };
  res.json(response);
}));

export default router;
