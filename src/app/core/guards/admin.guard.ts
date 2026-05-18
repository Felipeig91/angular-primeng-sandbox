import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * GUARDIA DE RUTAS PARA ADMIN
 * Protege las rutas de administración (/admin/*)
 * Redirige a login si no está autenticado
 */

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    if (this.authService.isAuthenticated()) {
      return true;
    }

    // Redirige a login si no está autenticado
    this.router.navigate(['/admin/login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
}
