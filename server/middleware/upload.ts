/**
 * Configuración de Multer para manejo de imágenes
 * Almacena archivos en /uploads de forma segura
 */

import multer, { StorageEngine } from 'multer';
import path from 'path';
import * as fs from 'fs/promises';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

// Crear directorio si no existe
async function ensureUploadDir() {
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating upload directory:', error);
  }
}

// Configuración de almacenamiento
const storage: StorageEngine = multer.diskStorage({
  destination: async (req, file, cb) => {
    await ensureUploadDir();
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    // Generar nombre único con timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  }
});

// Filtro de archivos - Solo imágenes
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Tipo de archivo no permitido: ${file.mimetype}. Solo se aceptan imágenes (JPG, PNG, GIF, WebP).`));
  }
};

/**
 * Middleware Multer configurado
 * - Solo acepta 1 archivo
 * - Tamaño máximo: 5MB
 * - Solo imágenes
 */
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

/**
 * Middleware para múltiples archivos
 */
export const uploadMultiple = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

// Asegurar que existe el directorio al importar
ensureUploadDir();
