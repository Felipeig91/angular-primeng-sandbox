"use strict";
/**
 * Sistema de almacenamiento de datos en JSON
 * Simula una base de datos persistente en archivo
 * En producción, usar una BD real como MongoDB, PostgreSQL, etc.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBusinesses = getAllBusinesses;
exports.getBusinessById = getBusinessById;
exports.createBusiness = createBusiness;
exports.updateBusiness = updateBusiness;
exports.deleteBusiness = deleteBusiness;
exports.addCoupon = addCoupon;
exports.updateCoupon = updateCoupon;
exports.deleteCoupon = deleteCoupon;
exports.incrementViews = incrementViews;
exports.incrementClicks = incrementClicks;
exports.getStats = getStats;
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
const DATA_DIR = path.join(process.cwd(), 'server', 'data');
const BUSINESSES_FILE = path.join(DATA_DIR, 'businesses.json');
// Inicializar datos de ejemplo
const INITIAL_DATA = [
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
async function readBusinesses() {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
        const data = await fs.readFile(BUSINESSES_FILE, 'utf-8');
        return JSON.parse(data);
    }
    catch (error) {
        // Si el archivo no existe, retornar datos iniciales
        if (error.code === 'ENOENT') {
            await writeBusinesses(INITIAL_DATA);
            return INITIAL_DATA;
        }
        throw error;
    }
}
/**
 * Escribe todos los negocios al archivo
 */
async function writeBusinesses(businesses) {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(BUSINESSES_FILE, JSON.stringify(businesses, null, 2));
}
/**
 * Obtiene todos los negocios
 */
async function getAllBusinesses() {
    return readBusinesses();
}
/**
 * Obtiene un negocio por ID
 */
async function getBusinessById(id) {
    const businesses = await readBusinesses();
    return businesses.find(b => b.id === id) || null;
}
/**
 * Crea un nuevo negocio
 */
async function createBusiness(data) {
    const businesses = await readBusinesses();
    const newBusiness = {
        id: Date.now().toString(),
        name: data.name,
        category: data.category,
        description: data.description,
        image: '/uploads/default-business.jpg',
        contact: data.contact,
        phone: data.phone,
        address: data.address,
        views: 0,
        clicks: 0,
        coupons: data.coupons?.map(c => ({
            ...c,
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
async function updateBusiness(id, data) {
    const businesses = await readBusinesses();
    const index = businesses.findIndex(b => b.id === id);
    if (index === -1)
        return null;
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
async function deleteBusiness(id) {
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
async function addCoupon(businessId, coupon) {
    const business = await getBusinessById(businessId);
    if (!business)
        return null;
    const newCoupon = {
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
async function updateCoupon(businessId, couponId, data) {
    const business = await getBusinessById(businessId);
    if (!business)
        return null;
    const couponIndex = business.coupons.findIndex(c => c.id === couponId);
    if (couponIndex === -1)
        return null;
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
async function deleteCoupon(businessId, couponId) {
    const business = await getBusinessById(businessId);
    if (!business)
        return false;
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
async function incrementViews(businessId) {
    const business = await getBusinessById(businessId);
    if (!business)
        return;
    business.views++;
    await updateBusiness(businessId, business);
}
/**
 * Incrementa clicks de un negocio (cuando se reclama un cupón)
 */
async function incrementClicks(businessId) {
    const business = await getBusinessById(businessId);
    if (!business)
        return;
    business.clicks++;
    await updateBusiness(businessId, business);
}
/**
 * Obtiene estadísticas de la plataforma
 */
async function getStats() {
    const businesses = await readBusinesses();
    return {
        totalBusinesses: businesses.length,
        totalCoupons: businesses.reduce((acc, b) => acc + b.coupons.length, 0),
        totalViews: businesses.reduce((acc, b) => acc + b.views, 0),
        totalClicks: businesses.reduce((acc, b) => acc + b.clicks, 0),
        byCategory: businesses.reduce((acc, b) => {
            acc[b.category] = (acc[b.category] || 0) + 1;
            return acc;
        }, {})
    };
}
