import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeImportsModule } from './prime-imports'; // Ajusta si tu archivo se llama diferente
import { BusinessService } from './business.service';

@Component({
  selector: 'app-business-dashboard',
  standalone: true,
  imports: [CommonModule, PrimeImportsModule],
  template: `
    <div class="min-h-screen bg-slate-50 p-6 md:p-12">

      <!-- Encabezado -->
      <header class="max-w-7xl mx-auto mb-10">
        <h1 class="text-4xl font-extrabold text-slate-900 tracking-tight">Panel de Analíticas</h1>
        <p class="text-slate-600 mt-2 text-lg">Monitoreo en tiempo real del rendimiento de los negocios locales.</p>
      </header>

      <!-- Grid de Métricas Globales -->
      <main class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

        <!-- Tarjeta de Visitas -->
        <div class="bg-white p-6 rounded-2xl shadow-xs border border-slate-200 flex justify-between items-center">
          <div>
            <span class="text-sm font-semibold text-slate-400 uppercase">Total Visualizaciones</span>
            <h3 class="text-3xl font-black text-slate-800 mt-1">{{ totalViews() }}</h3>
          </div>
          <div class="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 text-xl">
            👁️
          </div>
        </div>

        <!-- Tarjeta de Clics en Cupones -->
        <div class="bg-white p-6 rounded-2xl shadow-xs border border-slate-200 flex justify-between items-center">
          <div>
            <span class="text-sm font-semibold text-slate-400 uppercase">Cupones Reclamados</span>
            <h3 class="text-3xl font-black text-slate-800 mt-1">{{ totalClicks() }}</h3>
          </div>
          <div class="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 text-xl">
            🎟️
          </div>
        </div>

      </main>

      <!-- Tabla de Rendimiento por Comercio (PrimeNG Table) -->
      <section class="max-w-7xl mx-auto bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden p-6">
        <h2 class="text-xl font-bold text-slate-800 mb-4">Rendimiento por Comercio</h2>

        <p-table [value]="businesses()" [tableStyle]="{ 'min-width': '30rem' }">
          <ng-template pTemplate="header">
            <tr>
              <th>Comercio</th>
              <th>Categoría</th>
              <th>Visitas</th>
              <th>Clicks</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-business>
            <tr>
              <td class="font-semibold text-slate-700">{{ business.name }}</td>
              <td>
                <span class="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-medium">
                  {{ business.category }}
                </span>
              </td>
              <td class="text-indigo-600 font-bold">{{ business.views }}</td>
              <td class="text-amber-600 font-bold">{{ business.clicks }}</td>
            </tr>
          </ng-template>
        </p-table>
      </section>

    </div>
  `
})
export default class BusinessDashboardComponent {
  private businessService = inject(BusinessService);
  businesses = this.businessService.businesses;

  // Usamos funciones simples para computar los totales basados en los Signals del servicio
  totalViews() {
    return this.businesses().reduce((acc, b) => acc + b.views, 0);
  }

  totalClicks() {
    return this.businesses().reduce((acc, b) => acc + b.clicks, 0);
  }
}
