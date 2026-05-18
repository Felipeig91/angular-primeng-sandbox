import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quienes-somos',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <h1 class="text-4xl font-black text-stone-900 mb-8">Quiénes Somos</h1>
        <p class="text-lg text-stone-600 mb-6">
          Avisolocal.cl es una plataforma comunitaria dedicada a conectar clientes con los mejores negocios locales de la Región de Los Lagos.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="p-6 bg-emerald-50 rounded-lg">
            <h3 class="text-xl font-bold text-emerald-600 mb-2">🌱 Missión</h3>
            <p class="text-stone-600">Fortalecer la economía local conectando negocios con clientes de forma directa y transparente.</p>
          </div>
          <div class="p-6 bg-amber-50 rounded-lg">
            <h3 class="text-xl font-bold text-amber-600 mb-2">🎯 Visión</h3>
            <p class="text-stone-600">Ser la plataforma número uno para el comercio local sustentable en el Sur de Chile.</p>
          </div>
          <div class="p-6 bg-stone-100 rounded-lg">
            <h3 class="text-xl font-bold text-stone-700 mb-2">💚 Valores</h3>
            <p class="text-stone-600">Apoyo a lo local, transparencia, sustentabilidad y comunidad.</p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class QuienesSomosComponent {}
