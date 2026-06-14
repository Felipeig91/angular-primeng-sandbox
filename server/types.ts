/**
 * Tipos TypeScript para el servidor backend
 * Define las interfaces para negocio, cupones y respuestas API
 */

export interface Coupon {
  id: string;
  title: string;
  discount: string;
  code: string;
  stock: number;
  createdAt: string;
}

export interface Business {
  id: string;
  name: string;
  category: 'Gastronomía' | 'Soporte Técnico' | 'Moda' | 'Salud' | 'Educación';
  description: string;
  image: string;
  contact?: string;
  phone?: string;
  address?: string;
  views: number;
  clicks: number;
  coupons: Coupon[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface CreateBusinessDTO {
  name: string;
  category: string;
  description: string;
  image?: string | null;
  contact?: string;
  phone?: string;
  address?: string;
  coupons?: Partial<Coupon>[];
}

export interface UpdateBusinessDTO {
  name?: string;
  category?: string;
  description?: string;
  contact?: string;
  phone?: string;
  address?: string;
}

export interface CreateCouponDTO {
  title: string;
  discount: string;
  code: string;
  stock: number;
}
