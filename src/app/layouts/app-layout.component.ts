import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, ButtonModule, TooltipModule],
  template: `
    <div class="min-h-screen bg-slate-50 flex">

      <!-- Sidebar Navegación Admin -->
      <aside class="w-64 bg-slate-900 text-white shadow-lg flex flex-col">

        <!-- Logo/Branding -->
        <div class="p-6 border-b border-slate-700">
          <h2 class="text-2xl font-black tracking-tight">
            <span class="text-indigo-400">Admin</span>Hub
          </h2>
          <p class="text-xs text-slate-400 mt-1">Panel de Control</p>
        </div>

        <!-- Menú de Navegación -->
        <nav class="flex-1 p-6 space-y-2">

          <a
            routerLink="/admin/dashboard"
            routerLinkActive="bg-indigo-600"
            [routerLinkActiveOptions]="{ exact: true }"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <i class="pi pi-chart-bar text-lg"></i>
            <span class="font-semibold">Dashboard</span>
          </a>

          <!-- Placeholder para futuras rutas admin -->
          <a
            href="javascript:void(0)"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors opacity-50 cursor-not-allowed"
          >
            <i class="pi pi-inbox text-lg"></i>
            <span class="font-semibold">Gestión de Cupones</span>
          </a>

          <a
            href="javascript:void(0)"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors opacity-50 cursor-not-allowed"
          >
            <i class="pi pi-users text-lg"></i>
            <span class="font-semibold">Gestión de Negocios</span>
          </a>

        </nav>

        <!-- Footer Sidebar -->
        <div class="p-6 border-t border-slate-700 text-xs text-slate-400">
          <p>🚀 Avisolocal.cl v2.0.0</p>
          <p class="mt-1">Panel Administrativo</p>
        </div>

      </aside>

      <!-- Contenedor Principal -->
      <main class="flex-1 flex flex-col">

        <!-- Top Bar -->
        <header class="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center shadow-xs">
          <h3 class="text-lg font-semibold text-slate-700">Workspace Admin</h3>
          <div class="flex items-center gap-4">
            <button pButton type="button" icon="pi pi-bell" class="p-button-rounded p-button-text"></button>
            <button pButton type="button" icon="pi pi-user" class="p-button-rounded p-button-text"></button>
          </div>
        </header>

        <!-- Contenido Dinámico (Children Routes) -->
        <div class="flex-1 overflow-auto">
          <router-outlet></router-outlet>
        </div>

      </main>

    </div>
  `
})
export class AppLayoutComponent {}
