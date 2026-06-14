export interface Coupon {
  id: string;
  title: string;
  discount: string;
  code: string;
  stock: number;
  createdAt?: string;
}

export interface Business {
  id: string;
  name: string;
  category: 'Gastronomía' | 'Soporte Técnico' | 'Moda' | 'Salud' | 'Educación';
  description: string;
  image: string;
  views: number;
  clicks: number;
  coupons: Coupon[];
}
