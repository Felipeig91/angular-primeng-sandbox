import { Routes } from '@angular/router';
import { PublicLayoutComponent } from './layout/public-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout.component';
import { AdminGuard } from './core/guards/admin.guard';

/**
 * RUTAS REFACTORIZADAS - v2.1.0-architecture
 *
 * Estructura:
 * - PUBLIC LAYER: Rutas públicas con PublicLayoutComponent (navbar + footer)
 * - ADMIN LAYER: Rutas protegidas con AdminLayoutComponent (sidebar + topbar)
 */

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },

      // Public Pages
      {
        path: 'inicio',
        loadComponent: () => import('./features/public/inicio/inicio.component').then(m => m.InicioComponent)
      },
      {
        path: 'quienes-somos',
        loadComponent: () => import('./features/public/quienes-somos/quienes-somos.component').then(m => m.QuienesSomosComponent)
      },
      {
        path: 'servicios',
        loadComponent: () => import('./features/public/servicios/servicios.component').then(m => m.ServiciosComponent)
      },
      {
        path: 'cupones',
        loadComponent: () => import('./features/public/cupones/cupones.component').then(m => m.CuponesComponent)
      },
      {
        path: 'contacto',
        loadComponent: () => import('./features/public/contacto/contacto.component').then(m => m.ContactoComponent)
      },
      {
        path: 'directorio',
        loadComponent: () => import('./features/public/directorio/business-directory.component').then(m => m.BusinessDirectoryComponent)
      },
      {
        path: 'registrar',
        loadComponent: () => import('./features/public/registro/business-register.component').then(m => m.BusinessRegisterComponent)
      }
    ]
  },

  // ADMIN LAYER
  {
    path: 'admin',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/admin/login/admin-login.component').then(m => m.AdminLoginComponent)
      },
      {
        path: 'dashboard',
        component: AdminLayoutComponent,
        canActivate: [AdminGuard],
        children: [
          {
            path: '',
            loadComponent: () => import('./features/admin/dashboard/business-dashboard.component').then(m => m.BusinessDashboardComponent)
          }
          // Future: /admin/businesses, /admin/coupons, etc.
        ]
      }
    ]
  },

  // 404 Fallback
  { path: '**', redirectTo: 'inicio' }
];
