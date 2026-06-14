import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Business, BusinessFormData } from '../models/business.model';

/**
 * SERVICIO DE GESTIÓN DE NEGOCIOS
 * Maneja: CRUD de negocios, cupones, estadísticas
 */

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private http = inject(HttpClient);
  private API_URL = 'http://localhost:3001/api';

  private businessesState = signal<Business[]>([]);

  public businesses = this.businessesState.asReadonly();

  constructor() {
    this.loadBusinesses();
  }

  /**
   * CARGAR NEGOCIOS DEL BACKEND
   */
  loadBusinesses(): void {
    this.http.get<any>(`${this.API_URL}/businesses`).subscribe({
      next: (response) => {
        if (response?.data && Array.isArray(response.data)) {
          const businesses = response.data.map((b: any) => ({
            ...b,
            createdAt: new Date(b.createdAt),
            updatedAt: new Date(b.updatedAt)
          }));
          this.businessesState.set(businesses);
          console.log('✅ Negocios cargados:', businesses.length);
        }
      },
      error: (error) => {
        console.error('❌ Error cargando negocios:', error);
      }
    });
  }

  /**
   * OBTENER TODOS LOS NEGOCIOS
  /**
   * OBTENER TODOS LOS NEGOCIOS
   */
  getAllBusinesses(): Observable<Business[]> {
    return of(this.businessesState());
  }

  /**
   * OBTENER NEGOCIO POR ID
   */
  getBusinessById(id: string): Observable<Business | undefined> {
    return of(this.businessesState().find(b => b.id === id));
  }

  /**
   * CREAR NUEVO NEGOCIO EN BACKEND
   */
  createBusiness(businessData: any): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>(`${this.API_URL}/businesses`, businessData).subscribe({
        next: (response) => {
          console.log('✅ Negocio creado:', response);
          this.loadBusinesses();
          observer.next(response);
          observer.complete();
        },
        error: (error) => {
          console.error('❌ Error creando negocio:', error);
          observer.error(error);
        }
      });
    });
  }

  /**
   * CREAR NUEVO NEGOCIO CON IMAGEN EN BACKEND
   */
  createBusinessWithImage(formData: FormData): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>(`${this.API_URL}/businesses/upload`, formData).subscribe({
        next: (response) => {
          console.log('✅ Negocio con imagen creado:', response);
          this.loadBusinesses();
          observer.next(response);
          observer.complete();
        },
        error: (error) => {
          console.error('❌ Error creando negocio con imagen:', error);
          observer.error(error);
        }
      });
    });
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
