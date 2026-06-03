/**
 * Sistema de almacenamiento de datos en JSON
 * Simula una base de datos persistente en archivo
 * En producción, usar una BD real como MongoDB, PostgreSQL, etc.
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { Business, Coupon, CreateBusinessDTO, CreateCouponDTO } from './types';

const DATA_DIR = path.join(process.cwd(), 'server', 'data');
const BUSINESSES_FILE = path.join(DATA_DIR, 'businesses.json');

// Inicializar datos de ejemplo
const INITIAL_DATA: Business[] = [
  {
    id: '1',
    name: 'Alpha Tech Support',
    category: 'Soporte Técnico',
    description: 'Mantenimiento de computadores, servidores y consultoría informática local.',
    image: '/uploads/business-1.jpg',
    contact: 'info@alphatech.local',
    phone: '+1 234 567 8900',
    address: 'Calle Principal 123',
    views: 142,
    clicks: 38,
    coupons: [
      {
        id: 'c1',
        title: '20% en tu primer mantenimiento',
        discount: '20%',
        code: 'TECH20',
        stock: 15,
        createdAt: new Date().toISOString()
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

/**
 * Lee todos los negocios desde el archivo
 */
async function readBusinesses(): Promise<Business[]> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const data = await fs.readFile(BUSINESSES_FILE, 'utf-8');
    return JSON.parse(data) as Business[];
  } catch (error) {
    // Si el archivo no existe, retornar datos iniciales
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      await writeBusinesses(INITIAL_DATA);
      return INITIAL_DATA;
    }
    throw error;
  }
}

/**
 * Escribe todos los negocios al archivo
 */
async function writeBusinesses(businesses: Business[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(BUSINESSES_FILE, JSON.stringify(businesses, null, 2));
}

/**
 * Obtiene todos los negocios
 */
export async function getAllBusinesses(): Promise<Business[]> {
  return readBusinesses();
}

/**
 * Obtiene un negocio por ID
 */
export async function getBusinessById(id: string): Promise<Business | null> {
  const businesses = await readBusinesses();
  return businesses.find(b => b.id === id) || null;
}

/**
 * Crea un nuevo negocio
 */
export async function createBusiness(data: CreateBusinessDTO): Promise<Business> {
  const businesses = await readBusinesses();

  const newBusiness: Business = {
    id: Date.now().toString(),
    name: data.name,
    category: data.category as any,
    description: data.description,
    image: '/uploads/default-business.jpg',
    contact: data.contact,
    phone: data.phone,
    address: data.address,
    views: 0,
    clicks: 0,
    coupons: data.coupons?.map(c => ({
      ...c as Coupon,
      id: c.id || Date.now().toString(),
      createdAt: c.createdAt || new Date().toISOString()
    })) || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  businesses.push(newBusiness);
  await writeBusinesses(businesses);

  return newBusiness;
}

/**
 * Actualiza un negocio existente
 */
export async function updateBusiness(id: string, data: Partial<Business>): Promise<Business | null> {
  const businesses = await readBusinesses();
  const index = businesses.findIndex(b => b.id === id);

  if (index === -1) return null;

  const updated = {
    ...businesses[index],
    ...data,
    id: businesses[index].id,
    createdAt: businesses[index].createdAt,
    updatedAt: new Date().toISOString()
  };

  businesses[index] = updated;
  await writeBusinesses(businesses);

  return updated;
}

/**
 * Elimina un negocio
 */
export async function deleteBusiness(id: string): Promise<boolean> {
  const businesses = await readBusinesses();
  const filtered = businesses.filter(b => b.id !== id);

  if (filtered.length === businesses.length) {
    return false; // No se encontró
  }

  await writeBusinesses(filtered);
  return true;
}

/**
 * Agrega un cupón a un negocio
 */
export async function addCoupon(businessId: string, coupon: CreateCouponDTO): Promise<Coupon | null> {
  const business = await getBusinessById(businessId);
  if (!business) return null;

  const newCoupon: Coupon = {
    id: Date.now().toString(),
    ...coupon,
    createdAt: new Date().toISOString()
  };

  business.coupons.push(newCoupon);
  await updateBusiness(businessId, business);

  return newCoupon;
}

/**
 * Actualiza un cupón
 */
export async function updateCoupon(businessId: string, couponId: string, data: Partial<Coupon>): Promise<Coupon | null> {
  const business = await getBusinessById(businessId);
  if (!business) return null;

  const couponIndex = business.coupons.findIndex(c => c.id === couponId);
  if (couponIndex === -1) return null;

  business.coupons[couponIndex] = {
    ...business.coupons[couponIndex],
    ...data,
    id: business.coupons[couponIndex].id,
    createdAt: business.coupons[couponIndex].createdAt
  };

  await updateBusiness(businessId, business);
  return business.coupons[couponIndex];
}

/**
 * Elimina un cupón
 */
export async function deleteCoupon(businessId: string, couponId: string): Promise<boolean> {
  const business = await getBusinessById(businessId);
  if (!business) return false;

  const filtered = business.coupons.filter(c => c.id !== couponId);
  if (filtered.length === business.coupons.length) {
    return false; // No se encontró
  }

  business.coupons = filtered;
  await updateBusiness(businessId, business);
  return true;
}

/**
 * Incrementa vistas de un negocio
 */
export async function incrementViews(businessId: string): Promise<void> {
  const business = await getBusinessById(businessId);
  if (!business) return;

  business.views++;
  await updateBusiness(businessId, business);
}

/**
 * Incrementa clicks de un negocio (cuando se reclama un cupón)
 */
export async function incrementClicks(businessId: string): Promise<void> {
  const business = await getBusinessById(businessId);
  if (!business) return;

  business.clicks++;
  await updateBusiness(businessId, business);
}

/**
 * Obtiene estadísticas de la plataforma
 */
export async function getStats() {
  const businesses = await readBusinesses();

  return {
    totalBusinesses: businesses.length,
    totalCoupons: businesses.reduce((acc, b) => acc + b.coupons.length, 0),
    totalViews: businesses.reduce((acc, b) => acc + b.views, 0),
    totalClicks: businesses.reduce((acc, b) => acc + b.clicks, 0),
    byCategory: businesses.reduce((acc, b) => {
      acc[b.category] = (acc[b.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };
}
