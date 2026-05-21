import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

/**
 * PÁGINA DE INICIO
 * Hero section con CTA principal
 */

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule],
  template: `
    <section class="min-h-[calc(100vh-80px)] bg-linear-to-br from-emerald-50 via-white to-amber-50 flex items-center">
      <div class="max-w-7xl mx-auto px-6 w-full">

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          <!-- Contenido -->
          <div>
            <h1 class="text-5xl md:text-6xl font-black text-stone-900 mb-6 leading-tight">
              Comercio Local
              <span class="block text-emerald-600">Conectado</span>
            </h1>

            <p class="text-xl text-stone-600 mb-8">
              Descubre los mejores negocios de tu comunidad. Apoya lo local, recibe cupones exclusivos y conecta con tu economía.
            </p>

            <div class="flex gap-4 flex-wrap">
              <a routerLink="/directorio">
                <button pButton type="button" label="Explorar Directorio"
                        class="!bg-emerald-600 !border-emerald-600 !text-white !px-8 !py-3 !text-base"
                        icon="pi pi-th-large"></button>
              </a>
              <a routerLink="/registrar">
                <button pButton type="button" label="Registrar Negocio" severity="secondary"
                        class="!bg-amber-600 !border-amber-600 !text-white !px-8 !py-3 !text-base"
                        icon="pi pi-plus"></button>
              </a>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-4 mt-12">
              <div class="text-center">
                <p class="text-3xl font-black text-emerald-600">150+</p>
                <p class="text-sm text-stone-600">Comercios Activos</p>
              </div>
              <div class="text-center">
                <p class="text-3xl font-black text-amber-600">1000+</p>
                <p class="text-sm text-stone-600">Cupones Vigentes</p>
              </div>
              <div class="text-center">
                <p class="text-3xl font-black text-emerald-600">50K+</p>
                <p class="text-sm text-stone-600">Clientes Activos</p>
              </div>
            </div>
          </div>

          <!-- Imagen Hero -->
          <div class="hidden md:block mt-5 ">
            <div class="bg-white rounded-2xl shadow-lg p-8 border border-stone-200">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop"
                   alt="Comercio Local" class="w-full h-full object-cover rounded-xl">
            </div>
          </div>

        </div>

      </div>
    </section>
  `
})
export class InicioComponent {}
