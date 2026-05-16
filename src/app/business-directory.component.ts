import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessService } from './business.service';
import { Business, Coupon } from './business.model';
import { PrimeImportsModule } from './prime-imports';

@Component({
  selector: 'app-business-directory',
  standalone: true,
  imports: [CommonModule, PrimeImportsModule], // 👈 Lo inyectas aquí y ya tienes acceso a TODO PrimeNG y Forms
  templateUrl: './business-directory.component.html'
})
export class BusinessDirectoryComponent {
  // Inyectamos el servicio con el nuevo método inject() de Angular
  private businessService = inject(BusinessService);

  // Accedemos al Signal de negocios (Readonly)
  businesses = this.businessService.businesses;

  // Lista de categorías para el filtro
  categories = ['Todos', 'Gastronomía', 'Soporte Técnico', 'Moda', 'Salud', 'Educación'];
  selectedCategory = 'Todos';

  // Filtramos usando programación reactiva básica basada en el estado del componente
  get filteredBusinesses() {
    if (this.selectedCategory === 'Todos') {
      return this.businesses();
    }
    return this.businesses().filter(b => b.category === this.selectedCategory);
  }

  // Ejecuta la lógica del servicio cuando se interactúa con la UI
  onViewBusiness(businessId: string) {
    this.businessService.incrementViews(businessId);
  }

  onClaimCoupon(businessId: string, coupon: Coupon) {
    if (coupon.stock > 0) {
      const success = this.businessService.claimCoupon(businessId, coupon.id);
      if (success) {
        alert(`¡Cupón ${coupon.code} reclamado con éxito! Guarda tu código.`);
      }
    } else {
      alert('Lo sentimos, este cupón ya no tiene stock disponible.');
    }
  }
}
