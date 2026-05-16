import { Routes } from '@angular/router';

export const routes: Routes = [
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
    path: 'dashboard',
    loadComponent: () => import('./business-dashboard.component') // 👈 Al usar default, queda así de corto
  }
];
