/**
 * MODELO DE DATOS PARA AVISOLOCAL.CL
 * Incluye información completa de negocios con datos del responsable, ubicación y horario
 */

export interface Coupon {
  id: string;
  title: string;
  discount: string;
  code: string;
  stock: number;
}

export type BusinessCategory =
  | 'Gastronomía'
  | 'Soporte Técnico'
  | 'Moda'
  | 'Salud'
  | 'Educación'
  | 'Otros';

export interface BusinessResponsible {
  fullName: string;
  phone: string;
  email: string;
}

export interface BusinessLocation {
  address: string;
  city: string;
  region: string;
}

export interface BusinessSchedule {
  openTime: string; // HH:mm
  closeTime: string; // HH:mm
  daysOpen: DayOfWeek[];
}

export type DayOfWeek = 'lunes' | 'martes' | 'miércoles' | 'jueves' | 'viernes' | 'sábado' | 'domingo';

export interface Business {
  id: string;
  name: string;
  category: BusinessCategory;
  description: string;
  image?: string; // File URL después de upload
  // Campos anidados (para compatibilidad con formulario)
  responsible?: BusinessResponsible;
  location?: BusinessLocation;
  schedule?: BusinessSchedule;
  // Campos separados (devueltos por backend)
  address?: string;
  contact?: string;
  phone?: string;
  views: number;
  clicks: number;
  coupons: Coupon[];
  createdAt: Date;
  updatedAt: Date;
}

export interface BusinessFormData {
  // Paso 1: Responsable
  fullName: string;
  phone: string;
  email: string;

  // Paso 2: Negocio
  name: string;
  category: BusinessCategory;
  description: string;
  imageFile?: File;

  // Paso 3: Ubicación
  address: string;
  city: string;
  region: string;

  // Paso 4: Horario
  openTime: string;
  closeTime: string;
  daysOpen: DayOfWeek[];
  acceptTerms: boolean;
}
