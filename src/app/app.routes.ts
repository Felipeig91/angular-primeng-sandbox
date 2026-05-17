import { Routes } from '@angular/router';

export const routes: Routes = [
  // ============================================
  // CAPA PÚBLICA (Sin Layout Admin)
  // ============================================
  {
    path: '',
    redirectTo: 'directorio',
    pathMatch: 'full'
  },
  {
    path: 'directorio',
    loadComponent: () => import('./business-directory.component').then(m => m.BusinessDirectoryComponent)
  },
  {
    path: 'registrar',
    loadComponent: () => import('./pages/register/business-register.component').then(m => m.BusinessRegisterComponent)
  },

  // ============================================
  // CAPA PRIVADA/ADMIN (Con Layout Admin)
  // ============================================
  {
    path: 'admin',
    loadComponent: () => import('./layouts/app-layout.component').then(m => m.AppLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./business-dashboard.component').then(m => m.default)
      }
    ]
  },

  // Ruta de fallback (404)
  {
    path: '**',
    redirectTo: 'directorio'
  }
];
