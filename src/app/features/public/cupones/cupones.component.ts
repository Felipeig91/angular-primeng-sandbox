import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cupones',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <h1 class="text-4xl font-black text-stone-900 mb-4">Cupones y Ofertas</h1>
        <p class="text-lg text-stone-600 mb-12">Descubre todas las promociones vigentes de nuestros comercios afiliados.</p>

        <!-- Grid de Cupones (Placeholder) -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-linear-to-br from-emerald-100 to-emerald-50 p-6 rounded-xl border-2 border-emerald-600">
            <div class="flex justify-between items-start mb-4">
              <h3 class="font-bold text-stone-900">20% Descuento</h3>
              <span class="bg-emerald-600 text-white px-2 py-1 rounded text-xs font-bold">En Stock</span>
            </div>
            <p class="text-stone-600 text-sm mb-4">Alpha Tech Support - Mantenimiento de Computadores</p>
            <p class="text-emerald-700 font-bold">Código: ALPHA20</p>
          </div>

          <div class="bg-linear-to-br from-amber-100 to-amber-50 p-6 rounded-xl border-2 border-amber-600">
            <div class="flex justify-between items-start mb-4">
              <h3 class="font-bold text-stone-900">Muffin Gratis</h3>
              <span class="bg-amber-600 text-white px-2 py-1 rounded text-xs font-bold">Limitado</span>
            </div>
            <p class="text-stone-600 text-sm mb-4">Café Central - Café Gourmet y Pastelería</p>
            <p class="text-amber-700 font-bold">Código: CAFE10</p>
          </div>

          <div class="bg-linear-to-br from-stone-100 to-stone-50 p-6 rounded-xl border-2 border-stone-600">
            <div class="flex justify-between items-start mb-4">
              <h3 class="font-bold text-stone-900">15% Descuento</h3>
              <span class="bg-stone-600 text-white px-2 py-1 rounded text-xs font-bold">Activo</span>
            </div>
            <p class="text-stone-600 text-sm mb-4">Boutique Urbana - Ropa y Accesorios</p>
            <p class="text-stone-700 font-bold">Código: URBANA15</p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class CuponesComponent {}
