import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-20 bg-stone-50">
      <div class="max-w-7xl mx-auto px-6">
        <h1 class="text-4xl font-black text-stone-900 mb-8">Nuestros Servicios</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white p-8 rounded-xl shadow-sm border border-stone-200">
            <h3 class="text-2xl font-bold text-emerald-600 mb-4">📂 Directorio Comercial</h3>
            <p class="text-stone-600">Explora todos los negocios registrados, filtrados por categoría y ubicación.</p>
          </div>
          <div class="bg-white p-8 rounded-xl shadow-sm border border-stone-200">
            <h3 class="text-2xl font-bold text-amber-600 mb-4">🎟️ Sistema de Cupones</h3>
            <p class="text-stone-600">Accede a descuentos exclusivos y ofertas especiales de negocios locales.</p>
          </div>
          <div class="bg-white p-8 rounded-xl shadow-sm border border-stone-200">
            <h3 class="text-2xl font-bold text-emerald-600 mb-4">📊 Dashboard Comercial</h3>
            <p class="text-stone-600">Gestiona tu negocio con analytics en tiempo real y herramientas de marketing.</p>
          </div>
          <div class="bg-white p-8 rounded-xl shadow-sm border border-stone-200">
            <h3 class="text-2xl font-bold text-amber-600 mb-4">💬 Comunidad Local</h3>
            <p class="text-stone-600">Conecta con otros emprendedores y construye una red de apoyo mutuo.</p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ServiciosComponent {}
