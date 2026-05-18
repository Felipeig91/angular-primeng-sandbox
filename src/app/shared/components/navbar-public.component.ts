import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';

/**
 * NAVBAR PÚBLICO - Avisolocal.cl
 * Navegación principal para clientes
 * Colores: Verde Bosque + Ámbar
 */

@Component({
  selector: 'app-navbar-public',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ButtonModule],
  template: `
    <nav class="bg-white border-b border-stone-200 px-6 py-4 sticky top-0 z-50 shadow-sm">
      <div class="max-w-7xl mx-auto flex justify-between items-center">

        <!-- Logo -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-black text-lg">A</span>
          </div>
          <div>
            <h1 class="text-lg font-black text-stone-900">Avisolocal.cl</h1>
            <p class="text-xs text-emerald-600 font-semibold">Comercio Local</p>
          </div>
        </div>

        <!-- Links Centrales -->
        <div class="hidden md:flex gap-8 items-center">
          <a routerLink="/" routerLinkActive="text-emerald-600 font-bold" [routerLinkActiveOptions]="{ exact: true }"
             class="text-sm text-stone-600 hover:text-emerald-600 transition-colors">
            Inicio
          </a>
          <a routerLink="/directorio" routerLinkActive="text-emerald-600 font-bold"
             class="text-sm text-stone-600 hover:text-emerald-600 transition-colors">
            Directorio
          </a>
          <a routerLink="/quienes-somos" routerLinkActive="text-emerald-600 font-bold"
             class="text-sm text-stone-600 hover:text-emerald-600 transition-colors">
            Quiénes Somos
          </a>
          <a routerLink="/servicios" routerLinkActive="text-emerald-600 font-bold"
             class="text-sm text-stone-600 hover:text-emerald-600 transition-colors">
            Servicios
          </a>
          <a routerLink="/cupones" routerLinkActive="text-emerald-600 font-bold"
             class="text-sm text-stone-600 hover:text-emerald-600 transition-colors">
            Cupones
          </a>
          <a routerLink="/contacto" routerLinkActive="text-emerald-600 font-bold"
             class="text-sm text-stone-600 hover:text-emerald-600 transition-colors">
            Contacto
          </a>
        </div>

        <!-- CTA Button -->
        <div class="flex gap-3 items-center">
          <a routerLink="/registrar">
            <button pButton type="button" label="Registrar Negocio"
                    class="!bg-amber-600 !border-amber-600 hover:!bg-amber-700"
                    icon="pi pi-plus"></button>
          </a>
        </div>

      </div>
    </nav>
  `
})
export class NavbarPublicComponent {}
