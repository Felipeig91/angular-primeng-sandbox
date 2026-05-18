import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { BusinessService } from '../../../core/services/business.service';

/**
 * ADMIN DASHBOARD
 * Analíticas y métricas de negocios registrados
 */

@Component({
  selector: 'app-business-dashboard',
  standalone: true,
  imports: [CommonModule, ChartModule, TableModule],
  template: `
    <div class="space-y-8">

      <!-- Encabezado -->
      <div>
        <h1 class="text-3xl font-black text-stone-900">Panel de Analíticas</h1>
        <p class="text-stone-600 mt-2">Monitoreo en tiempo real del rendimiento de negocios locales</p>
      </div>

      <!-- Grid de Métricas -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

        <!-- Visualizaciones -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-stone-200 flex justify-between items-center">
          <div>
            <span class="text-xs font-semibold text-stone-500 uppercase">Total Visualizaciones</span>
            <h3 class="text-3xl font-black text-stone-900 mt-2">{{ totalViews() }}</h3>
          </div>
          <div class="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-2xl">
            👁️
          </div>
        </div>

        <!-- Cupones Reclamados -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-stone-200 flex justify-between items-center">
          <div>
            <span class="text-xs font-semibold text-stone-500 uppercase">Cupones Reclamados</span>
            <h3 class="text-3xl font-black text-stone-900 mt-2">{{ totalClicks() }}</h3>
          </div>
          <div class="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center text-2xl">
            🎟️
          </div>
        </div>

        <!-- Servicios Activos -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-stone-200 flex justify-between items-center">
          <div>
            <span class="text-xs font-semibold text-stone-500 uppercase">Servicios Activos</span>
            <h3 class="text-3xl font-black text-stone-900 mt-2">{{ activeServices() }}</h3>
          </div>
          <div class="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center text-2xl">
            🏢
          </div>
        </div>

      </div>

      <!-- Gráficos -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        <!-- Gráfico de Barras -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
          <h2 class="text-lg font-bold text-stone-900 mb-4">Cupones por Comercio</h2>
          <p-chart type="bar" [data]="barChartData" [options]="chartOptions" style="height: 300px"></p-chart>
        </div>

        <!-- Gráfico Pie -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
          <h2 class="text-lg font-bold text-stone-900 mb-4">Comercios por Categoría</h2>
          <p-chart type="pie" [data]="pieChartData" [options]="chartOptions" style="height: 300px"></p-chart>
        </div>

      </div>

      <!-- Tabla de Rendimiento -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
        <h2 class="text-lg font-bold text-stone-900 mb-4">Rendimiento por Comercio</h2>

        <p-table [value]="businesses()" responsiveLayout="scroll"
                 styleClass="p-datatable-striped" [paginator]="true" [rows]="10">
          <ng-template pTemplate="header">
            <tr class="bg-stone-50">
              <th class="text-stone-700 font-semibold text-left">Negocio</th>
              <th class="text-stone-700 font-semibold text-left">Categoría</th>
              <th class="text-stone-700 font-semibold text-center">Visitas</th>
              <th class="text-stone-700 font-semibold text-center">Cupones</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-business>
            <tr class="border-b border-stone-200">
              <td class="text-stone-900 font-semibold">{{ business.name }}</td>
              <td>
                <span class="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">
                  {{ business.category }}
                </span>
              </td>
              <td class="text-center text-indigo-600 font-bold">{{ business.views }}</td>
              <td class="text-center text-amber-600 font-bold">{{ business.clicks }}</td>
            </tr>
          </ng-template>
          <ng-template pTemplate="emptymessage">
            <tr>
              <td colspan="4" class="text-center text-stone-500 py-8">Sin datos disponibles</td>
            </tr>
          </ng-template>
        </p-table>
      </div>

    </div>
  `
})
export class BusinessDashboardComponent {
  private businessService = inject(BusinessService);
  businesses = this.businessService.businesses;

  chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const
      }
    }
  };

  barChartData = computed(() => {
    const businessesList = this.businesses();
    return {
      labels: businessesList.map(b => b.name),
      datasets: [
        {
          label: 'Cupones Reclamados',
          data: businessesList.map(b => b.clicks),
          backgroundColor: 'rgba(217, 119, 6, 0.6)',
          borderColor: 'rgba(217, 119, 6, 1)',
          borderWidth: 1,
          borderRadius: 6
        }
      ]
    };
  });

  pieChartData = computed(() => {
    const businessesList = this.businesses();
    const categoryCount: { [key: string]: number } = {};

    businessesList.forEach(b => {
      categoryCount[b.category] = (categoryCount[b.category] || 0) + 1;
    });

    const colors = [
      'rgba(5, 150, 105, 0.6)',    // Emerald
      'rgba(217, 119, 6, 0.6)',    // Amber
      'rgba(139, 92, 246, 0.6)',   // Purple
      'rgba(239, 68, 68, 0.6)',    // Red
      'rgba(59, 130, 246, 0.6)'    // Blue
    ];

    return {
      labels: Object.keys(categoryCount),
      datasets: [
        {
          data: Object.values(categoryCount),
          backgroundColor: colors.slice(0, Object.keys(categoryCount).length),
          borderColor: colors.slice(0, Object.keys(categoryCount).length),
          borderWidth: 2
        }
      ]
    };
  });

  totalViews(): number {
    return this.businesses().reduce((acc, b) => acc + b.views, 0);
  }

  totalClicks(): number {
    return this.businesses().reduce((acc, b) => acc + b.clicks, 0);
  }

  activeServices(): number {
    return this.businesses().length;
  }
}
