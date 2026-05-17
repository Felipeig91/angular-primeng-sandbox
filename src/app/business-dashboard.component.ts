import { Component, inject, computed } from '@angular/core';
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
      <main class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

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

        <!-- Tarjeta de Servicios Activos -->
        <div class="bg-white p-6 rounded-2xl shadow-xs border border-slate-200 flex justify-between items-center">
          <div>
            <span class="text-sm font-semibold text-slate-400 uppercase">Servicios Activos</span>
            <h3 class="text-3xl font-black text-slate-800 mt-1">{{ activeServices() }}</h3>
          </div>
          <div class="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 text-xl">
            🏢
          </div>
        </div>

      </main>

      <!-- Gráficos de Estadísticas -->
      <section class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Gráfico de Barras: Clics por Comercio -->
        <div class="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden p-6">
          <h2 class="text-xl font-bold text-slate-800 mb-4">Clics por Comercio</h2>
          <p-chart type="bar" [data]="barChartData" [options]="chartOptions"></p-chart>
        </div>

        <!-- Gráfico de Pie: Distribución por Categoría -->
        <div class="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden p-6">
          <h2 class="text-xl font-bold text-slate-800 mb-4">Comercios por Categoría</h2>
          <p-chart type="pie" [data]="pieChartData" [options]="chartOptions"></p-chart>
        </div>
      </section>

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

  // Configuración de opciones para los gráficos
  chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      }
    }
  };

  // Datos del gráfico de barras (Clics por Comercio)
  barChartData = computed(() => {
    const businessesList = this.businesses();
    return {
      labels: businessesList.map(b => b.name),
      datasets: [
        {
          label: 'Clics en Cupones',
          data: businessesList.map(b => b.clicks),
          backgroundColor: 'rgba(99, 102, 241, 0.6)',
          borderColor: 'rgba(99, 102, 241, 1)',
          borderWidth: 1
        }
      ]
    };
  });

  // Datos del gráfico de pie (Distribución por Categoría)
  pieChartData = computed(() => {
    const businessesList = this.businesses();
    const categoryCount: { [key: string]: number } = {};

    // Contar comercios por categoría
    businessesList.forEach(b => {
      categoryCount[b.category] = (categoryCount[b.category] || 0) + 1;
    });

    const colors = [
      'rgba(99, 102, 241, 0.6)',   // Indigo
      'rgba(34, 197, 94, 0.6)',    // Green
      'rgba(168, 85, 247, 0.6)',   // Purple
      'rgba(239, 68, 68, 0.6)',    // Red
      'rgba(251, 146, 60, 0.6)'    // Orange
    ];

    return {
      labels: Object.keys(categoryCount),
      datasets: [
        {
          data: Object.values(categoryCount),
          backgroundColor: colors.slice(0, Object.keys(categoryCount).length),
          borderColor: colors.slice(0, Object.keys(categoryCount).length),
          borderWidth: 1
        }
      ]
    };
  });

  // Usamos funciones simples para computar los totales basados en los Signals del servicio
  totalViews() {
    return this.businesses().reduce((acc, b) => acc + b.views, 0);
  }

  totalClicks() {
    return this.businesses().reduce((acc, b) => acc + b.clicks, 0);
  }

  activeServices() {
    return this.businesses().length;
  }
}
