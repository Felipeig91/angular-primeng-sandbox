import { Injectable, signal } from '@angular/core';
import { Business } from './business.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  // Usamos Signals de Angular 21 para un manejo de estado reactivo y limpio
  private businessesState = signal<Business[]>([
    {
      id: '1',
      name: 'Alpha Tech Support',
      category: 'Soporte Técnico',
      description: 'Mantenimiento de computadores, servidores y consultoría informática local.',
      image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=500',
      views: 142,
      clicks: 38,
      coupons: [
        { id: 'c1', title: '20% en tu primer mantenimiento', discount: '20%', code: 'TECH20', stock: 15 }
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
        { id: 'c2', title: 'Muffin gratis por la compra de un Capuccino', discount: '100% Muffin', code: 'COFFEETIME', stock: 5 },
        { id: 'c3', title: '10% de descuento en desayunos', discount: '10%', code: 'DESAYUNO10', stock: 20 }
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
        { id: 'c4', title: '15% de descuento en toda la tienda', discount: '15%', code: 'MODA15', stock: 8 }
      ]
    }
  ]);

  // Exponemos el Signal público como lectura para los componentes
  businesses = this.businessesState.asReadonly();

  // Método para aumentar las visualizaciones de una tienda
  incrementViews(businessId: string) {
    this.businessesState.update(list =>
      list.map(b => b.id === businessId ? { ...b, views: b.views + 1 } : b)
    );
  }

  // Método para reclamar un cupón (resta stock y suma un click de éxito)
  claimCoupon(businessId: string, couponId: string): boolean {
    let success = false;

    this.businessesState.update(list =>
      list.map(b => {
        if (b.id === businessId) {
          const updatedCoupons = b.coupons.map(c => {
            if (c.id === couponId && c.stock > 0) {
              success = true;
              return { ...c, stock: c.stock - 1 };
            }
            return c;
          });

          return success
            ? { ...b, clicks: b.clicks + 1, coupons: updatedCoupons }
            : b;
        }
        return b;
      })
    );

    return success;
  }

  // Método para registrar un nuevo negocio
  // Recibe datos del formulario y los persiste en el estado (simulando JSON)
  registerNewBusiness(newBusinessData: Partial<Business>): Business {
    const newBusiness: Business = {
      id: Date.now().toString(), // ID único basado en timestamp
      name: newBusinessData.name || 'Sin nombre',
      category: newBusinessData.category || 'Educación',
      description: newBusinessData.description || '',
      image: newBusinessData.image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500',
      views: 0,
      clicks: 0,
      coupons: []
    };

    // Mutación inmutable del estado usando .update() y spread operator
    this.businessesState.update(list => [...list, newBusiness]);

    return newBusiness;
  }
}
