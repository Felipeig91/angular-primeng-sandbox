import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BusinessService } from '../../../core/services/business.service';
import { Business, Coupon } from '../../../core/models/business.model';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';

/**
 * DIRECTORIO COMERCIAL
 * Catálogo de negocios registrados con cupones
 */

@Component({
  selector: 'app-business-directory',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectButtonModule, ButtonModule],
  template: `
    <section class="min-h-screen bg-stone-50 py-12">
      <div class="max-w-7xl mx-auto px-6">

        <!-- Encabezado -->
        <header class="mb-12 text-center md:text-left">
          <h1 class="text-4xl font-black text-stone-900 tracking-tight">Directorio Comercial Local</h1>
          <p class="text-stone-600 mt-3 text-lg">Explora negocios locales, solicita servicios y aprovecha cupones exclusivos.</p>
        </header>

        <!-- Filtros -->
        <div class="mb-10 flex justify-center md:justify-start">
          <div class="bg-white p-4 rounded-xl shadow-sm border border-stone-200">
            <label class="text-xs font-semibold uppercase text-stone-500 block mb-3">Filtrar por Categoría</label>
            <p-selectButton [options]="categories" [(ngModel)]="selectedCategory" [allowEmpty]="false">
            </p-selectButton>
          </div>
        </div>

        <!-- Grid de Comercios -->
        <main class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          @for (business of filteredBusinesses; track business.id) {
            <div class="bg-white rounded-2xl shadow-md border border-stone-200 overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300">

              <!-- Imagen -->
              <div class="relative h-48 w-full bg-stone-300">
                <img [src]="business.image" [alt]="business.name" class="w-full h-full object-cover"/>
                <span class="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-xs">
                  {{ business.category }}
                </span>
              </div>

              <!-- Contenido -->
              <div class="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div class="flex justify-between items-start mb-3">
                    <h2 class="text-xl font-bold text-stone-900">{{ business.name }}</h2>
                    <span class="text-xs text-stone-500 flex items-center gap-1">
                      👁️ {{ business.views }}
                    </span>
                  </div>
                  <p class="text-stone-600 text-sm line-clamp-3 mb-4">{{ business.description }}</p>

                  <!-- Ubicación -->
                  <p class="text-xs text-stone-500 mb-2">
                    <i class="pi pi-map-marker text-emerald-600"></i> {{ business.location.city }}, {{ business.location.region }}
                  </p>
                </div>

                <!-- Cupones -->
                <div class="border-t border-stone-200 pt-4 mt-4">
                  <h4 class="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">Cupones Vigentes</h4>

                  @for (coupon of business.coupons; track coupon.id) {
                    <div class="bg-amber-50 border border-amber-200 rounded-lg p-3 flex justify-between items-center mb-2">
                      <div>
                        <p class="text-sm font-bold text-amber-900">{{ coupon.title }}</p>
                        <p class="text-xs text-amber-700">Stock: {{ coupon.stock }} unidades</p>
                      </div>
                      <button pButton icon="pi pi-ticket" severity="warn" text size="small"
                              [disabled]="coupon.stock === 0"
                              (onClick)="onClaimCoupon(business.id, coupon); onViewBusiness(business.id)">
                      </button>
                    </div>
                  } @empty {
                    <p class="text-xs text-stone-400 italic">No hay cupones activos.</p>
                  }
                </div>

              </div>
            </div>
          } @empty {
            <div class="col-span-full text-center py-16 bg-white rounded-2xl border border-dashed border-stone-300">
              <i class="pi pi-inbox text-4xl text-stone-300 mb-3 block"></i>
              <p class="text-stone-500 font-medium">No se encontraron comercios en esta categoría.</p>
            </div>
          }

        </main>

      </div>
    </section>
  `
})
export class BusinessDirectoryComponent {
  private businessService = inject(BusinessService);
  private messageService = inject(MessageService);

  businesses = this.businessService.businesses;

  categories = ['Todos', 'Gastronomía', 'Soporte Técnico', 'Moda', 'Salud', 'Educación', 'Otros'];
  selectedCategory = 'Todos';

  get filteredBusinesses() {
    if (this.selectedCategory === 'Todos') {
      return this.businesses();
    }
    return this.businesses().filter(b => b.category === this.selectedCategory);
  }

  onViewBusiness(businessId: string): void {
    this.businessService.incrementViews(businessId);
  }

  onClaimCoupon(businessId: string, coupon: Coupon): void {
    if (coupon.stock > 0) {
      const success = this.businessService.claimCoupon(businessId, coupon.id);
      if (success) {
        this.messageService.add({
          severity: 'success',
          summary: 'Cupón Reclamado',
          detail: `¡Cupón ${coupon.code} reclamado! Guarda el código.`,
          life: 4000
        });
      }
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Cupón Agotado',
        detail: 'Este cupón ya no tiene stock disponible.',
        life: 3000
      });
    }
  }
}
