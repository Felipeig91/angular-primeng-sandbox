import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PrimeImportsModule } from '../../../prime-imports';
import { ApiService } from '../../../core/services/api.service';
import { ChartOptions } from 'chart.js';

/**
 * DASHBOARD ADMIN PRO
 * Features:
 * - Gráficos reales con Chart.js
 * - Tabla de negocios con CRUD
 * - Tabla de cupones separada con CRUD
 * - Estadísticas en tiempo real
 * - Filtros y búsqueda
 */

interface DashboardStats {
  totalBusinesses: number;
  totalCoupons: number;
  totalViews: number;
  totalClicks: number;
  byCategory: Record<string, number>;
}

@Component({
  selector: 'app-business-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PrimeImportsModule],
  template: `
    <div class="space-y-8 p-8 bg-slate-50 min-h-screen">

      <!-- Encabezado -->
      <div class="mb-8">
        <h1 class="text-4xl font-black text-slate-900">📊 Dashboard Admin</h1>
        <p class="text-slate-600 mt-2 text-lg">Gestión completa de negocios y cupones</p>
      </div>

      <!-- Tabs -->
      <div class="grid grid-cols-3 gap-4 mb-8">
        <button pButton label="📈 Overview" [outlined]="selectedTab !== 'overview'" (click)="selectedTab = 'overview'" class="w-full"></button>
        <button pButton label="🏢 Negocios" [outlined]="selectedTab !== 'businesses'" (click)="selectedTab = 'businesses'" class="w-full"></button>
        <button pButton label="🎟️ Cupones" [outlined]="selectedTab !== 'coupons'" (click)="selectedTab = 'coupons'" class="w-full"></button>
      </div>

      <!-- TAB 1: OVERVIEW Y ESTADÍSTICAS -->
      <div *ngIf="selectedTab === 'overview'" class="space-y-8">

            <!-- Métricas KPI -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              <!-- Total Negocios -->
              <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-600">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-slate-600">Total Negocios</p>
                    <h3 class="text-3xl font-bold text-slate-900 mt-2">{{ stats()?.totalBusinesses || 0 }}</h3>
                  </div>
                  <div class="text-4xl">🏢</div>
                </div>
              </div>

              <!-- Total Cupones -->
              <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-amber-600">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-slate-600">Total Cupones</p>
                    <h3 class="text-3xl font-bold text-slate-900 mt-2">{{ stats()?.totalCoupons || 0 }}</h3>
                  </div>
                  <div class="text-4xl">🎟️</div>
                </div>
              </div>

              <!-- Total Vistas -->
              <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-slate-600">Total Vistas</p>
                    <h3 class="text-3xl font-bold text-slate-900 mt-2">{{ stats()?.totalViews || 0 }}</h3>
                  </div>
                  <div class="text-4xl">👁️</div>
                </div>
              </div>

              <!-- Total Clicks -->
              <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-slate-600">Cupones Reclamados</p>
                    <h3 class="text-3xl font-bold text-slate-900 mt-2">{{ stats()?.totalClicks || 0 }}</h3>
                  </div>
                  <div class="text-4xl">✅</div>
                </div>
              </div>

            </div>

            <!-- Gráficos -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

              <!-- Gráfico de Barras - Negocios por Categoría -->
              <div class="bg-white rounded-xl shadow-lg p-6">
                <h2 class="text-lg font-bold text-slate-900 mb-4">Negocios por Categoría</h2>
                <p-chart type="bar" [data]="barChartData" [options]="chartOptions" style="height: 300px"></p-chart>
              </div>

              <!-- Gráfico Pie - Distribución -->
              <div class="bg-white rounded-xl shadow-lg p-6">
                <h2 class="text-lg font-bold text-slate-900 mb-4">Distribución por Categoría</h2>
                <p-chart type="pie" [data]="pieChartData" [options]="chartOptions" style="height: 300px"></p-chart>
              </div>

            </div>

          </div>
      </div>

      <!-- TAB 2: GESTIÓN DE NEGOCIOS -->
      <div *ngIf="selectedTab === 'businesses'" class="space-y-6">

            <!-- Botón Agregar -->
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold text-slate-900">Listado de Negocios</h2>
              <button
                pButton
                type="button"
                label="+ Agregar Negocio"
                icon="pi pi-plus"
                (click)="showBusinessDialog()"
                class="bg-indigo-600"
              ></button>
            </div>

            <!-- Tabla de Negocios -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden">
              <p-table
                [value]="businesses()"
                [paginator]="true"
                [rows]="10"
                [globalFilterFields]="['name', 'category', 'description']"
                responsiveLayout="scroll"
                styleClass="p-datatable-striped"
              >
                <ng-template pTemplate="header">
                  <tr class="bg-slate-100">
                    <th class="p-4! text-left">Negocio</th>
                    <th class="p-4! text-left">Categoría</th>
                    <th class="p-4! text-center">Vistas</th>
                    <th class="p-4! text-center">Cupones</th>
                    <th class="p-4! text-center">Acciones</th>
                  </tr>
                </ng-template>
                <ng-template pTemplate="body" let-business>
                  <tr class="border-b border-slate-200 hover:bg-slate-50">
                    <td class="p-4! font-semibold text-slate-900">{{ business.name }}</td>
                    <td class="p-4!">
                      <span class="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                        {{ business.category }}
                      </span>
                    </td>
                    <td class="p-4! text-center text-slate-600">{{ business.views }}</td>
                    <td class="p-4! text-center">
                      <span class="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full font-medium">
                        {{ business.coupons?.length || 0 }}
                      </span>
                    </td>
                    <td class="p-4! text-center space-x-2">
                      <button
                        pButton
                        type="button"
                        icon="pi pi-eye"
                        class="p-button-rounded p-button-sm p-button-info"
                        (click)="viewBusiness(business)"
                        pTooltip="Ver"
                        tooltipPosition="top"
                      ></button>
                      <button
                        pButton
                        type="button"
                        icon="pi pi-pencil"
                        class="p-button-rounded p-button-sm p-button-warning"
                        (click)="editBusiness(business)"
                        pTooltip="Editar"
                        tooltipPosition="top"
                      ></button>
                      <button
                        pButton
                        type="button"
                        icon="pi pi-trash"
                        class="p-button-rounded p-button-sm p-button-danger"
                        (click)="deleteBusiness(business.id)"
                        pTooltip="Eliminar"
                        tooltipPosition="top"
                      ></button>
                    </td>
                  </tr>
                </ng-template>
                <ng-template pTemplate="emptymessage">
                  <tr>
                    <td colspan="5" class="text-center py-8 text-slate-500">
                      No hay negocios registrados
                    </td>
                  </tr>
                </ng-template>
              </p-table>
            </div>

          </div>

      <!-- TAB 3: GESTIÓN DE CUPONES -->
      <div *ngIf="selectedTab === 'coupons'" class="space-y-6">

            <!-- Filtro por Negocio -->
            <div class="flex gap-4 mb-6">
              <p-select
                [options]="businessOptions()"
                [(ngModel)]="selectedBusinessForCoupons"
                optionLabel="name"
                optionValue="id"
                placeholder="Filtrar por negocio"
                class="w-full md:w-64"
              ></p-select>
            </div>

            <!-- Tabla de Cupones -->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden">
              <p-table
                [value]="filteredCoupons()"
                [paginator]="true"
                [rows]="10"
                responsiveLayout="scroll"
                styleClass="p-datatable-striped"
              >
                <ng-template pTemplate="header">
                  <tr class="bg-slate-100">
                    <th class="p-4! text-left">Negocio</th>
                    <th class="p-4! text-left">Cupón</th>
                    <th class="p-4! text-left">Código</th>
                    <th class="p-4! text-center">Stock</th>
                    <th class="p-4! text-center">Acciones</th>
                  </tr>
                </ng-template>
                <ng-template pTemplate="body" let-coupon let-business="rowData">
                  <tr class="border-b border-slate-200 hover:bg-slate-50">
                    <td class="p-4! font-semibold text-slate-900">{{ coupon.businessName }}</td>
                    <td class="p-4!">{{ coupon.title }}</td>
                    <td class="p-4! font-mono font-bold text-indigo-600">{{ coupon.code }}</td>
                    <td class="p-4! text-center">
                      <span class="inline-block px-3 py-1" [ngClass]="{
                        'bg-green-100 text-green-700': coupon.stock > 5,
                        'bg-yellow-100 text-yellow-700': coupon.stock <= 5 && coupon.stock > 0,
                        'bg-red-100 text-red-700': coupon.stock === 0
                      }">
                        {{ coupon.stock }}
                      </span>
                    </td>
                    <td class="p-4! text-center space-x-2">
                      <button
                        pButton
                        type="button"
                        icon="pi pi-pencil"
                        class="p-button-rounded p-button-sm p-button-warning"
                        (click)="editCoupon(coupon)"
                        pTooltip="Editar"
                        tooltipPosition="top"
                      ></button>
                      <button
                        pButton
                        type="button"
                        icon="pi pi-trash"
                        class="p-button-rounded p-button-sm p-button-danger"
                        (click)="deleteCoupon(coupon)"
                        pTooltip="Eliminar"
                        tooltipPosition="top"
                      ></button>
                    </td>
                  </tr>
                </ng-template>
                <ng-template pTemplate="emptymessage">
                  <tr>
                    <td colspan="5" class="text-center py-8 text-slate-500">
                      No hay cupones registrados
                    </td>
                  </tr>
                </ng-template>
              </p-table>
            </div>


    </div>

    <!-- Dialog para ver/editar negocio -->
    <p-dialog
      [(visible)]="displayBusinessDialog"
      [header]="isEditingBusiness ? 'Editar Negocio' : 'Ver Negocio'"
      [modal]="true"
      [style]="{ width: '90%', maxWidth: '600px' }"
    >
      <div class="space-y-4" *ngIf="selectedBusiness()">
        <div>
          <label class="text-sm font-semibold text-slate-700">Nombre</label>
          <p class="text-slate-900 font-semibold">{{ selectedBusiness()?.name }}</p>
        </div>
        <div>
          <label class="text-sm font-semibold text-slate-700">Categoría</label>
          <p class="text-slate-900">{{ selectedBusiness()?.category }}</p>
        </div>
        <div>
          <label class="text-sm font-semibold text-slate-700">Descripción</label>
          <p class="text-slate-900">{{ selectedBusiness()?.description }}</p>
        </div>
        <div class="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
          <div class="text-center">
            <p class="text-2xl font-bold text-slate-900">{{ selectedBusiness()?.views }}</p>
            <p class="text-sm text-slate-600">Vistas</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-slate-900">{{ selectedBusiness()?.clicks }}</p>
            <p class="text-sm text-slate-600">Clicks</p>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold text-slate-900">{{ selectedBusiness()?.coupons?.length || 0 }}</p>
            <p class="text-sm text-slate-600">Cupones</p>
          </div>
        </div>
      </div>
    </p-dialog>

    <!-- Dialog para editar cupón -->
    <p-dialog
      [(visible)]="displayCouponDialog"
      header="Editar Cupón"
      [modal]="true"
      [style]="{ width: '90%', maxWidth: '500px' }"
    >
      <div class="space-y-4" *ngIf="selectedCoupon()">
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-2">Título del Cupón</label>
          <input
            pInputText
            [(ngModel)]="selectedCoupon().title"
            class="w-full"
          />
        </div>
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-2">Descuento/Oferta</label>
          <input
            pInputText
            [(ngModel)]="selectedCoupon().discount"
            class="w-full"
          />
        </div>
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-2">Código</label>
          <input
            pInputText
            [(ngModel)]="selectedCoupon().code"
            class="w-full"
            disabled
          />
        </div>
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-2">Stock Disponible</label>
          <p-inputNumber
            [(ngModel)]="selectedCoupon().stock"
            [min]="0"
            class="w-full"
          ></p-inputNumber>
        </div>
        <div class="pt-4 border-t border-slate-200 flex gap-2 justify-end">
          <button
            pButton
            type="button"
            label="Cancelar"
            severity="secondary"
            (click)="closeCouponDialog()"
          ></button>
          <button
            pButton
            type="button"
            label="Guardar Cambios"
            severity="success"
            (click)="saveCouponChanges()"
          ></button>
        </div>
      </div>
    </p-dialog>

  `
})
export class BusinessDashboardComponent implements OnInit {
  private apiService = inject(ApiService);
  private messageService = inject(MessageService);

  // Signals
  businesses = signal<any[]>([]);
  selectedTab = 'overview';
  stats = signal<DashboardStats | null>(null);
  selectedBusiness = signal<any | null>(null);
  selectedCoupon = signal<any | null>(null);
  displayBusinessDialog = false;
  displayCouponDialog = false;
  isEditingBusiness = false;
  wantsCoupons = false;
  selectedBusinessForCoupons: string | null = null;
  originalCouponData: any = null;

  // Chart data
  barChartData: any = {};
  pieChartData: any = {};
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        labels: { usePointStyle: true }
      }
    }
  };

  constructor() {}

  ngOnInit() {
    this.loadData();
  }

  /**
   * Carga todos los datos
   */
  loadData() {
    this.apiService.getAllBusinesses().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.businesses.set(response.data);
          this.processStats(response.data);
          this.generateCharts(response.data);
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los negocios',
          life: 3000
        });
      }
    });

    this.apiService.getStats().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.stats.set(response.data);
        }
      }
    });
  }

  /**
   * Procesa estadísticas
   */
  private processStats(businesses: any[]) {
    const stats: DashboardStats = {
      totalBusinesses: businesses.length,
      totalCoupons: businesses.reduce((acc, b) => acc + (b.coupons?.length || 0), 0),
      totalViews: businesses.reduce((acc, b) => acc + b.views, 0),
      totalClicks: businesses.reduce((acc, b) => acc + b.clicks, 0),
      byCategory: {}
    };

    businesses.forEach(b => {
      stats.byCategory[b.category] = (stats.byCategory[b.category] || 0) + 1;
    });

    this.stats.set(stats);
  }

  /**
   * Genera gráficos
   */
  private generateCharts(businesses: any[]) {
    const categories = [...new Set(businesses.map(b => b.category))];
    const categoryCounts = categories.map(cat =>
      businesses.filter(b => b.category === cat).length
    );

    // Gráfico de barras
    this.barChartData = {
      labels: categories,
      datasets: [{
        label: 'Negocios por Categoría',
        data: categoryCounts,
        backgroundColor: [
          '#4F46E5', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6'
        ]
      }]
    };

    // Gráfico pie
    this.pieChartData = {
      labels: categories,
      datasets: [{
        data: categoryCounts,
        backgroundColor: [
          '#4F46E5', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6'
        ]
      }]
    };
  }

  /**
   * Opciones para selector de negocios
   */
  businessOptions() {
    return this.businesses();
  }

  /**
   * Cupones filtrados por negocio
   */
  filteredCoupons() {
    return this.businesses()
      .flatMap(b => (b.coupons || []).map((c: any) => ({ ...c, businessName: b.name, businessId: b.id })))
      .filter(c => !this.selectedBusinessForCoupons || c.businessId === this.selectedBusinessForCoupons);
  }

  /**
   * Muestra diálogo para agregar negocio
   */
  showBusinessDialog() {
    this.isEditingBusiness = false;
    this.selectedBusiness.set(null);
    this.displayBusinessDialog = true;
  }

  /**
   * Ver negocio
   */
  viewBusiness(business: any) {
    this.selectedBusiness.set(business);
    this.isEditingBusiness = false;
    this.displayBusinessDialog = true;
  }

  /**
   * Editar negocio
   */
  editBusiness(business: any) {
    this.selectedBusiness.set(business);
    this.isEditingBusiness = true;
    this.displayBusinessDialog = true;
  }

  /**
   * Eliminar negocio
   */
  deleteBusiness(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este negocio?')) {
      this.apiService.deleteBusiness(id).subscribe({
        next: (response) => {
          if (response.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Negocio eliminado correctamente',
              life: 3000
            });
            this.loadData();
          }
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo eliminar el negocio',
            life: 3000
          });
        }
      });
    }
  }

  /**
   * Guarda cambios del negocio
   */
  saveBusiness() {
    const business = this.selectedBusiness();
    if (!business) return;

    this.apiService.updateBusiness(business.id, business).subscribe({
      next: (response) => {
        if (response.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Negocio actualizado correctamente',
            life: 3000
          });
          this.displayBusinessDialog = false;
          this.loadData();
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar el negocio',
          life: 3000
        });
      }
    });
  }

  /**
   * Guarda cambios del cupón (alias para saveCouponChanges)
   */
  saveCoupon() {
    this.saveCouponChanges();
  }

  /**
   * Editar cupón - Abre diálogo
   */
  editCoupon(coupon: any) {
    this.originalCouponData = { ...coupon };
    this.selectedCoupon.set({ ...coupon });
    this.displayCouponDialog = true;
  }

  /**
   * Cierra diálogo de cupón
   */
  closeCouponDialog() {
    this.displayCouponDialog = false;
    this.selectedCoupon.set(null);
    this.originalCouponData = null;
  }

  /**
   * Guarda cambios del cupón
   */
  saveCouponChanges() {
    const coupon = this.selectedCoupon();
    if (!coupon) return;

    const updateData = {
      title: coupon.title,
      discount: coupon.discount,
      stock: coupon.stock
    };

    this.apiService.updateCoupon(coupon.businessId, coupon.id, updateData).subscribe({
      next: (response) => {
        if (response.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Cupón actualizado correctamente',
            life: 3000
          });
          this.closeCouponDialog();
          this.loadData();
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar el cupón',
          life: 3000
        });
      }
    });
  }

  /**
   * Eliminar cupón
   */
  deleteCoupon(coupon: any) {
    if (confirm('¿Estás seguro de que deseas eliminar este cupón?')) {
      this.apiService.deleteCoupon(coupon.businessId, coupon.id).subscribe({
        next: (response) => {
          if (response.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Cupón eliminado correctamente',
              life: 3000
            });
            this.loadData();
          }
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo eliminar el cupón',
            life: 3000
          });
        }
      });
    }
  }
}
