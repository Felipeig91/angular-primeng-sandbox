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

        <!-- Links Centrales (Desktop) -->
        <div class="hidden lg:flex gap-8 items-center">
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

        <!-- CTA Button + Mobile Menu -->
        <div class="flex gap-3 items-center">
          <a routerLink="/registrar" class="hidden md:block">
            <button pButton type="button" label="Registrar Negocio"
                    class="!bg-amber-600 !border-amber-600 hover:!bg-amber-700"
                    icon="pi pi-plus"></button>
          </a>

          <!-- Mobile Menu Button -->
          <button id="mobileMenuBtn" (click)="mobileMenuOpen = !mobileMenuOpen" pButton type="button"
                  [icon]="mobileMenuOpen ? 'pi pi-times' : 'pi pi-bars'"></button>
        </div>

      </div>

      <!-- Mobile Menu -->
      <div *ngIf="mobileMenuOpen" class="mt-4 pb-4 border-t border-stone-200 pt-4 lg:hidden space-y-3">
        <a routerLink="/" (click)="mobileMenuOpen = false" routerLinkActive="text-emerald-600 font-bold"
           [routerLinkActiveOptions]="{ exact: true }"
           class="block text-sm text-stone-600 hover:text-emerald-600 transition-colors py-2">
          Inicio
        </a>
        <a routerLink="/directorio" (click)="mobileMenuOpen = false" routerLinkActive="text-emerald-600 font-bold"
           class="block text-sm text-stone-600 hover:text-emerald-600 transition-colors py-2">
          Directorio
        </a>
        <a routerLink="/quienes-somos" (click)="mobileMenuOpen = false" routerLinkActive="text-emerald-600 font-bold"
           class="block text-sm text-stone-600 hover:text-emerald-600 transition-colors py-2">
          Quiénes Somos
        </a>
        <a routerLink="/servicios" (click)="mobileMenuOpen = false" routerLinkActive="text-emerald-600 font-bold"
           class="block text-sm text-stone-600 hover:text-emerald-600 transition-colors py-2">
          Servicios
        </a>
        <a routerLink="/cupones" (click)="mobileMenuOpen = false" routerLinkActive="text-emerald-600 font-bold"
           class="block text-sm text-stone-600 hover:text-emerald-600 transition-colors py-2">
          Cupones
        </a>
        <a routerLink="/contacto" (click)="mobileMenuOpen = false" routerLinkActive="text-emerald-600 font-bold"
           class="block text-sm text-stone-600 hover:text-emerald-600 transition-colors py-2">
          Contacto
        </a>
        <hr class="my-2">
        <a routerLink="/registrar" (click)="mobileMenuOpen = false" class="block">
          <button pButton type="button" label="Registrar Negocio"
                  class="!bg-amber-600 !border-amber-600 hover:!bg-amber-700 w-full"
                  icon="pi pi-plus"></button>
        </a>
      </div>
    </nav>
  `,
  styleUrl: './navbar-public.component.css'
})
export class NavbarPublicComponent {
  mobileMenuOpen = false;
}
