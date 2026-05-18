import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarPublicComponent } from '../shared/components/navbar-public.component';
import { FooterComponent } from '../shared/components/footer.component';

/**
 * LAYOUT PÚBLICO
 * Estructura: Navbar + router-outlet + Footer
 * Usado por todas las rutas públicas
 */

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarPublicComponent, FooterComponent],
  template: `
    <div class="flex flex-col min-h-screen bg-stone-50">
      <app-navbar-public></app-navbar-public>

      <main class="flex-grow">
        <router-outlet></router-outlet>
      </main>

      <app-footer></app-footer>
    </div>
  `
})
export class PublicLayoutComponent {}
