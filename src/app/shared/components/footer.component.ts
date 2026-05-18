import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * FOOTER PÚBLICO
 * Pie de página para el sitio público
 */

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="bg-stone-900 text-stone-300 py-12 mt-12">
      <div class="max-w-7xl mx-auto px-6">

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          <!-- Brand -->
          <div>
            <h3 class="text-lg font-bold text-white mb-4">Avisolocal.cl</h3>
            <p class="text-sm text-stone-400">Plataforma de anuncios comunitarios para los negocios locales de la Región de Los Lagos.</p>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="font-semibold text-white mb-4">Navegación</h4>
            <ul class="space-y-2 text-sm">
              <li><a routerLink="/" class="hover:text-emerald-400 transition-colors">Inicio</a></li>
              <li><a routerLink="/directorio" class="hover:text-emerald-400 transition-colors">Directorio</a></li>
              <li><a routerLink="/registrar" class="hover:text-emerald-400 transition-colors">Registrar</a></li>
            </ul>
          </div>

          <!-- Info -->
          <div>
            <h4 class="font-semibold text-white mb-4">Información</h4>
            <ul class="space-y-2 text-sm">
              <li><a routerLink="/quienes-somos" class="hover:text-emerald-400 transition-colors">Quiénes Somos</a></li>
              <li><a routerLink="/contacto" class="hover:text-emerald-400 transition-colors">Contacto</a></li>
              <li class="hover:text-emerald-400 transition-colors cursor-pointer">Privacidad</li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="font-semibold text-white mb-4">Contacto</h4>
            <p class="text-sm mb-2">📧 info@avisolocal.cl</p>
            <p class="text-sm mb-2">📞 +56 9 XXXX XXXX</p>
            <p class="text-sm">📍 Puerto Montt, Los Lagos, Chile</p>
          </div>

        </div>

        <!-- Divider -->
        <hr class="border-stone-700 mb-6">

        <!-- Copyright -->
        <div class="text-center text-sm text-stone-400">
          <p>© 2026 Avisolocal.cl - Todos los derechos reservados. Desarrollado con ❤️ para los negocios locales.</p>
        </div>

      </div>
    </footer>
  `
})
export class FooterComponent {}
