import { Injectable, inject, signal, effect } from '@angular/core';
import { Business } from './business.model';
import { ApiService } from './core/services/api.service';
import { Observable } from 'rxjs';

/**
 * Servicio de Negocios
 * Gestiona la obtención y manipulación de datos de negocios
 * Usa API backend en lugar de estado local
 */
@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private apiService = inject(ApiService);

  // Signal para almacenar la lista de negocios
  private businessesState = signal<Business[]>([]);

  // Signal readonly para que los componentes solo lean
  businesses = this.businessesState.asReadonly();

  constructor() {
    // Cargar negocios al iniciar
    this.loadBusinesses();
  }

  /**
   * Carga todos los negocios desde la API
   */
  loadBusinesses() {
    this.apiService.getAllBusinesses().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.businessesState.set(response.data);
        }
      },
      error: (error) => {
        console.error('Error cargando negocios:', error);
        // Usar datos de respaldo
        this.businessesState.set(this.getDefaultBusinesses());
      }
    });
  }

  /**
   * Obtiene un negocio por ID
   */
  getBusinessById(id: string): Observable<any> {
    return this.apiService.getBusinessById(id);
  }

  /**
   * Registra un nuevo negocio
   */
  registerNewBusiness(data: any): Observable<any> {
    return this.apiService.createBusiness(data);
  }

  /**
   * Actualiza un negocio
   */
  updateBusiness(id: string, data: any): Observable<any> {
    return this.apiService.updateBusiness(id, data);
  }

  /**
   * Elimina un negocio
   */
  deleteBusiness(id: string): Observable<any> {
    return this.apiService.deleteBusiness(id);
  }

  /**
   * Incrementa vistas de un negocio (llamado por la API)
   */
  incrementViews(businessId: string) {
    const current = this.businessesState();
    const updated = current.map(b =>
      b.id === businessId ? { ...b, views: b.views + 1 } : b
    );
    this.businessesState.set(updated);
  }

  /**
   * Reclama un cupón
   */
  claimCoupon(businessId: string, couponId: string): Observable<any> {
    return this.apiService.claimCoupon(businessId, couponId);
  }

  /**
   * Datos de respaldo si la API no está disponible
   */
  private getDefaultBusinesses(): Business[] {
    return [
      {
        id: '1',
        name: 'Alpha Tech Support',
        category: 'Soporte Técnico',
        description: 'Mantenimiento de computadores, servidores y consultoría informática local.',
        image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=500',
        views: 142,
        clicks: 38,
        coupons: [
          { id: 'c1', title: '20% en tu primer mantenimiento', discount: '20%', code: 'TECH20', stock: 15, createdAt: new Date().toISOString() }
        ]
      },
      {
        id: '2',
        name: 'Café Central',
        category: 'Gastronomía',
        description: 'Café de especialidad, pastelería artesanal y el mejor ambiente de la ciudad.',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500',
        views: 310,
        clicks: 89,
        coupons: [
          { id: 'c2', title: 'Muffin gratis por la compra de un Capuccino', discount: '100% Muffin', code: 'COFFEETIME', stock: 5, createdAt: new Date().toISOString() },
          { id: 'c3', title: '10% de descuento en desayunos', discount: '10%', code: 'DESAYUNO10', stock: 20, createdAt: new Date().toISOString() }
        ]
      },
      {
        id: '3',
        name: 'Boutique Urbana',
        category: 'Moda',
        description: 'Ropa y accesorios con las últimas tendencias urbanas y sostenibles.',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500',
        views: 95,
        clicks: 12,
        coupons: [
          { id: 'c4', title: '15% de descuento en toda la tienda', discount: '15%', code: 'MODA15', stock: 8, createdAt: new Date().toISOString() }
        ]
      }
    ];
  }
}
