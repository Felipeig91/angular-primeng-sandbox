import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { AuthService } from '../core/services/auth.service';
import { MessageService } from 'primeng/api';

/**
 * LAYOUT ADMIN - SAKAI STYLE
 * Estructura: Sidebar + TopBar + router-outlet
 * Solo accesible tras autenticación (AdminGuard)
 */

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, ButtonModule, TooltipModule],
  template: `
    <div class="flex h-screen bg-stone-50">

      <!-- SIDEBAR -->
      <aside class="w-64 bg-white border-r border-stone-200 flex flex-col">

        <!-- Header Sidebar -->
        <div class="p-6 border-b border-stone-200">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-black">A</span>
            </div>
            <div>
              <h2 class="text-lg font-black text-stone-900">AdminHub</h2>
              <p class="text-xs text-emerald-600">Panel de Control</p>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-grow p-4 space-y-2">
          <a routerLink="/admin/dashboard" routerLinkActive="bg-emerald-50 text-emerald-600 font-bold"
             class="flex items-center gap-3 px-4 py-3 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors">
            <i class="pi pi-home"></i>
            <span>Dashboard</span>
          </a>
          <a routerLink="/admin/businesses" routerLinkActive="bg-emerald-50 text-emerald-600 font-bold"
             class="flex items-center gap-3 px-4 py-3 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors">
            <i class="pi pi-briefcase"></i>
            <span>Gestión de Comercios</span>
          </a>
          <a routerLink="#"
             class="flex items-center gap-3 px-4 py-3 rounded-lg text-stone-400 cursor-not-allowed opacity-50">
            <i class="pi pi-ticket"></i>
            <span>Gestión de Cupones</span>
          </a>
        </nav>

        <!-- Footer Sidebar -->
        <div class="p-4 border-t border-stone-200 bg-stone-50">
          <p class="text-sm font-semibold text-stone-900">🚀 Avisolocal.cl v2.1.0</p>
          <p class="text-xs text-stone-500">Panel Administrativo</p>
        </div>

      </aside>

      <!-- MAIN CONTENT -->
      <div class="flex-1 flex flex-col">

        <!-- TOP BAR -->
        <header class="bg-white border-b border-stone-200 px-6 py-4 flex justify-between items-center">
          <div>
            <h1 class="text-xl font-bold text-stone-900">Workspace Admin</h1>
          </div>
          <div class="flex gap-3 items-center">
            <button pButton type="button" icon="pi pi-bell" severity="secondary" text class="!text-stone-600"></button>
            <button pButton type="button" icon="pi pi-user" severity="secondary" text
                    class="!text-stone-600" (click)="onLogout()"></button>
          </div>
        </header>

        <!-- CONTENT AREA -->
        <main class="flex-grow overflow-auto p-6">
          <router-outlet></router-outlet>
        </main>

      </div>

    </div>
  `
})
export class AdminLayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  currentUser = this.authService.currentUser;

  onLogout(): void {
    this.authService.logout();
    this.messageService.add({
      severity: 'info',
      summary: 'Sesión Cerrada',
      detail: 'Has cerrado sesión exitosamente',
      life: 2000
    });
    setTimeout(() => this.router.navigate(['/admin/login']), 800);
  }
}
