import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Business, BusinessFormData } from '../models/business.model';

/**
 * SERVICIO DE GESTIÓN DE NEGOCIOS
 * Maneja: CRUD de negocios, cupones, estadísticas
 *
 * PREPARACIÓN BACKEND:
 * - Descomentar HttpClient
 * - Configurar API_URL según entorno
 * - Implementar interceptores de autenticación
 */

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  // PREPARACIÓN PARA BACKEND (comentada, lista para conexión)
  // private API_URL = environment.apiUrl || 'http://localhost:3000/api';
  // constructor(private http: HttpClient) {}

  // POR AHORA: Estado local con Signals
  private businessesState = signal<Business[]>([
    {
      id: '1',
      name: 'Alpha Tech Support',
      category: 'Soporte Técnico',
      description: 'Mantenimiento de computadores, servidores y consultoría informática local.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400',
      responsible: { fullName: 'Carlos Fuentes', phone: '+56912345678', email: 'carlos@alphatech.cl' },
      location: { address: 'Calle Principal 123', city: 'Puerto Montt', region: 'Los Lagos' },
      schedule: { openTime: '09:00', closeTime: '18:00', daysOpen: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'] },
      views: 142,
      clicks: 38,
      coupons: [
        { id: 'c1', title: '20% en tu primer mantenimiento', discount: '20%', code: 'ALPHA20', stock: 15 }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'Café Central',
      category: 'Gastronomía',
      description: 'Café de especialidad, pastelería artesanal y el mejor ambiente de la ciudad.',
      image: 'https://images.unsplash.com/photo-1495474472920-4c0145ca85fe?w=400',
      responsible: { fullName: 'María González', phone: '+56923456789', email: 'maria@cafecentral.cl' },
      location: { address: 'Avenida Costanera 456', city: 'Puerto Montt', region: 'Los Lagos' },
      schedule: { openTime: '08:00', closeTime: '20:00', daysOpen: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'] },
      views: 310,
      clicks: 89,
      coupons: [
        { id: 'c2', title: 'Muffin gratis por la compra de un Capuccino', discount: 'Gratis', code: 'CAFE10', stock: 5 },
        { id: 'c3', title: '10% de descuento en desayunos', discount: '10%', code: 'DESAYUNO', stock: 20 }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      name: 'Boutique Urbana',
      category: 'Moda',
      description: 'Ropa y accesorios con las últimas tendencias urbanas y sostenibles.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      responsible: { fullName: 'Andrea Romero', phone: '+56934567890', email: 'andrea@boutiqueu.cl' },
      location: { address: 'Paseo Pacific 789', city: 'Puerto Montt', region: 'Los Lagos' },
      schedule: { openTime: '10:00', closeTime: '19:00', daysOpen: ['martes', 'miércoles', 'jueves', 'viernes', 'sábado'] },
      views: 95,
      clicks: 12,
      coupons: [
        { id: 'c4', title: '15% de descuento en toda la tienda', discount: '15%', code: 'URBANA15', stock: 8 }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  public businesses = this.businessesState.asReadonly();

  constructor() {}

  /**
   * OBTENER TODOS LOS NEGOCIOS
   * Futuro: return this.http.get<Business[]>(`${this.API_URL}/businesses`);
   */
  getAllBusinesses(): Observable<Business[]> {
    // Temporario: retorna signal como observable
    return of(this.businessesState());
  }

  /**
   * OBTENER NEGOCIO POR ID
   * Futuro: return this.http.get<Business>(`${this.API_URL}/businesses/${id}`);
   */
  getBusinessById(id: string): Observable<Business | undefined> {
    return of(this.businessesState().find(b => b.id === id));
  }

  /**
   * CREAR NUEVO NEGOCIO (Multi-paso)
   * Futuro: return this.http.post<Business>(`${this.API_URL}/businesses`, formData);
   */
  createBusiness(formData: BusinessFormData): Observable<Business> {
    const newBusiness: Business = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      description: formData.description,
      image: formData.imageFile ? URL.createObjectURL(formData.imageFile) : undefined,
      responsible: {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email
      },
      location: {
        address: formData.address,
        city: formData.city,
        region: formData.region
      },
      schedule: {
        openTime: formData.openTime,
        closeTime: formData.closeTime,
        daysOpen: formData.daysOpen
      },
      views: 0,
      clicks: 0,
      coupons: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Actualizar state local
    this.businessesState.update(businesses => [...businesses, newBusiness]);

    return of(newBusiness);
  }

  /**
   * ACTUALIZAR NEGOCIO
   * Futuro: return this.http.put<Business>(`${this.API_URL}/businesses/${id}`, updates);
   */
  updateBusiness(id: string, updates: Partial<Business>): Observable<Business | undefined> {
    const business = this.businessesState().find(b => b.id === id);
    if (business) {
      const updated = { ...business, ...updates, updatedAt: new Date() };
      this.businessesState.update(businesses =>
        businesses.map(b => b.id === id ? updated : b)
      );
      return of(updated);
    }
    return of(undefined);
  }

  /**
   * ELIMINAR NEGOCIO
   * Futuro: return this.http.delete(`${this.API_URL}/businesses/${id}`);
   */
  deleteBusiness(id: string): Observable<void> {
    this.businessesState.update(businesses =>
      businesses.filter(b => b.id !== id)
    );
    return of(void 0);
  }

  /**
   * INCREMENTAR VISTAS
   */
  incrementViews(businessId: string): void {
    const business = this.businessesState().find(b => b.id === businessId);
    if (business) {
      this.businessesState.update(businesses =>
        businesses.map(b =>
          b.id === businessId
            ? { ...b, views: b.views + 1, updatedAt: new Date() }
            : b
        )
      );
    }
  }

  /**
   * RECLAMAR CUPÓN
   */
  claimCoupon(businessId: string, couponId: string): boolean {
    const business = this.businessesState().find(b => b.id === businessId);
    if (!business) return false;

    const coupon = business.coupons.find(c => c.id === couponId);
    if (!coupon || coupon.stock <= 0) return false;

    this.businessesState.update(businesses =>
      businesses.map(b =>
        b.id === businessId
          ? {
              ...b,
              clicks: b.clicks + 1,
              coupons: b.coupons.map(c =>
                c.id === couponId
                  ? { ...c, stock: c.stock - 1 }
                  : c
              ),
              updatedAt: new Date()
            }
          : b
      )
    );
    return true;
  }

  /**
   * OBTENER ESTADÍSTICAS GLOBALES
   */
  getStatistics() {
    const businesses = this.businessesState();
    return {
      totalViews: businesses.reduce((sum, b) => sum + b.views, 0),
      totalClicks: businesses.reduce((sum, b) => sum + b.clicks, 0),
      activeServices: businesses.length,
      businessesByCategory: this.groupByCategory(businesses)
    };
  }

  private groupByCategory(businesses: Business[]): Record<string, number> {
    return businesses.reduce((acc, b) => {
      acc[b.category] = (acc[b.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }
}
