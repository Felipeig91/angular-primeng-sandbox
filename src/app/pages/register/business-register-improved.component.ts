/**
 * Componente de Registro de Negocio Mejorado
 * Con Stepper, gestión de cupones y integración API
 */

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PrimeImportsModule } from '../../prime-imports';
import { ApiService } from '../../core/services/api.service';

interface CouponForm {
  title: string;
  discount: string;
  code: string;
  stock: number;
}

@Component({
  selector: 'app-business-register-improved',
  standalone: true,
  imports: [CommonModule, PrimeImportsModule],
  template: `
    <div class="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4 md:p-8 flex items-center justify-center">
      <div class="w-full max-w-4xl">
        <!-- Card Principal -->
        <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">

          <!-- Encabezado -->
          <div class="bg-linear-to-r from-indigo-600 via-indigo-700 to-purple-700 px-8 py-8 text-white">
            <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight">📋 Registra tu Negocio</h1>
            <p class="text-indigo-100 mt-2 text-lg">Completa los pasos para unirte a la comunidad local</p>
          </div>

          <!-- Stepper -->
          <div class="p-8">
            <p-stepper [activeIndex]="currentStep()" (activeIndexChange)="onStepChange(\$event)" [linear]="true">

              <!-- PASO 1: Información Básica -->
              <p-stepperPanel header="Información Básica" headerIcon="pi pi-building" [stepperOptions]="{ index: 0 }">
                <form [formGroup]="basicInfoForm" class="space-y-6">

                  <!-- Nombre del Negocio -->
                  <div>
                    <label class="block text-sm font-semibold text-slate-700 mb-2">
                      <span class="text-red-500">*</span> Nombre del Negocio
                    </label>
                    <input
                      pInputText
                      type="text"
                      formControlName="name"
                      placeholder="Ej: Café Central"
                      class="w-full"
                    />
                    <small class="text-red-500 block mt-1" *ngIf="isFieldInvalid(basicInfoForm, 'name')">
                      El nombre es requerido (mínimo 3 caracteres)
                    </small>
                  </div>

                  <!-- Categoría -->
                  <div>
                    <label class="block text-sm font-semibold text-slate-700 mb-2">
                      <span class="text-red-500">*</span> Rubro/Categoría
                    </label>
                    <p-select
                      [options]="categories"
                      formControlName="category"
                      optionLabel="label"
                      optionValue="value"
                      placeholder="Selecciona una categoría"
                      class="w-full"
                    ></p-select>
                    <small class="text-red-500 block mt-1" *ngIf="isFieldInvalid(basicInfoForm, 'category')">
                      Debes seleccionar una categoría
                    </small>
                  </div>

                  <!-- Descripción -->
                  <div>
                    <label class="block text-sm font-semibold text-slate-700 mb-2">
                      <span class="text-red-500">*</span> Descripción del Negocio
                    </label>
                    <textarea
                      pTextarea
                      formControlName="description"
                      placeholder="Cuéntanos sobre tu negocio, servicios, horarios, etc..."
                      rows="4"
                      class="w-full"
                    ></textarea>
                    <small class="text-red-500 block mt-1" *ngIf="isFieldInvalid(basicInfoForm, 'description')">
                      La descripción es requerida (mínimo 10 caracteres)
                    </small>
                  </div>

                  <!-- Botones -->
                  <div class="flex gap-4 pt-4 border-t border-slate-200">
                    <button pButton type="button" label="Cancelar" severity="secondary" (click)="onCancel()" class="flex-1"></button>
                    <button pButton type="button" label="Siguiente" (click)="goToStep(1)" [disabled]="basicInfoForm.invalid" class="flex-1"></button>
                  </div>
                </form>
              </p-stepperPanel>

              <!-- PASO 2: Información de Contacto -->
              <p-stepperPanel header="Información de Contacto" headerIcon="pi pi-phone" [stepperOptions]="{ index: 1 }">
                <form [formGroup]="contactForm" class="space-y-6">

                  <!-- Correo de Contacto -->
                  <div>
                    <label class="block text-sm font-semibold text-slate-700 mb-2">
                      <span class="text-red-500">*</span> Correo de Contacto
                    </label>
                    <input
                      pInputText
                      type="email"
                      formControlName="contact"
                      placeholder="contacto@tunegocio.com"
                      class="w-full"
                    />
                    <small class="text-red-500 block mt-1" *ngIf="isFieldInvalid(contactForm, 'contact')">
                      Correo válido requerido
                    </small>
                  </div>

                  <!-- Teléfono -->
                  <div>
                    <label class="block text-sm font-semibold text-slate-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      pInputText
                      type="tel"
                      formControlName="phone"
                      placeholder="+1 234 567 8900"
                      class="w-full"
                    />
                  </div>

                  <!-- Dirección -->
                  <div>
                    <label class="block text-sm font-semibold text-slate-700 mb-2">
                      Dirección
                    </label>
                    <input
                      pInputText
                      type="text"
                      formControlName="address"
                      placeholder="Calle Principal 123, Apto 4B"
                      class="w-full"
                    />
                  </div>

                  <!-- Botones -->
                  <div class="flex gap-4 pt-4 border-t border-slate-200">
                    <button pButton type="button" label="Anterior" severity="secondary" (click)="goToStep(0)" class="flex-1"></button>
                    <button pButton type="button" label="Siguiente" (click)="goToStep(2)" class="flex-1"></button>
                  </div>
                </form>
              </p-stepperPanel>

              <!-- PASO 3: Cupones (Opcional) -->
              <p-stepperPanel header="Cupones (Opcional)" headerIcon="pi pi-tag" [stepperOptions]="{ index: 2 }">
                <div class="space-y-6">

                  <!-- Toggle para agregar cupones -->
                  <div class="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <label class="block text-sm font-semibold text-slate-700 flex-1">
                      ¿Deseas agregar cupones promocionales?
                    </label>
                    <p-toggleswitch [(ngModel)]="wantsCoupons"></p-toggleswitch>
                  </div>

                  <!-- Formulario de Cupones (si está habilitado) -->
                  <div *ngIf="wantsCoupons" class="space-y-6">

                    <!-- Cupones Agregados -->
                    <div *ngIf="addedCoupons().length > 0" class="space-y-4">
                      <h3 class="font-semibold text-slate-700">Cupones Agregados</h3>
                      <div class="space-y-3">
                        <div *ngFor="let coupon of addedCoupons(); let i = index" class="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                          <div>
                            <p class="font-semibold text-slate-700">{{ coupon.title }}</p>
                            <p class="text-sm text-slate-600">Código: {{ coupon.code }} | Stock: {{ coupon.stock }}</p>
                          </div>
                          <button pButton type="button" icon="pi pi-trash" severity="danger" (click)="removeCoupon(i)" [rounded]="true" [text]="true"></button>
                        </div>
                      </div>
                    </div>

                    <!-- Formulario para agregar nuevo cupón -->
                    <div class="p-4 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
                      <h3 class="font-semibold text-slate-700 mb-4">Agregar Nuevo Cupón</h3>
                      <form [formGroup]="couponForm" (ngSubmit)="addCoupon()" class="space-y-4">

                        <!-- Título del Cupón -->
                        <div>
                          <label class="block text-sm font-medium text-slate-700 mb-1">Título del Cupón</label>
                          <input
                            pInputText
                            formControlName="title"
                            placeholder="Ej: 20% de descuento en primer compra"
                            class="w-full"
                          />
                        </div>

                        <!-- Descuento -->
                        <div class="grid grid-cols-2 gap-4">
                          <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">Descuento/Oferta</label>
                            <input
                              pInputText
                              formControlName="discount"
                              placeholder="Ej: 20% o Gratis"
                              class="w-full"
                            />
                          </div>

                          <!-- Código del Cupón -->
                          <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">Código</label>
                            <input
                              pInputText
                              formControlName="code"
                              placeholder="VERANO20"
                              class="w-full"
                              [ngClass]="{ 'p-invalid': isFieldInvalid(couponForm, 'code') }"
                            />
                          </div>
                        </div>

                        <!-- Stock -->
                        <div>
                          <label class="block text-sm font-medium text-slate-700 mb-1">Cantidad Disponible</label>
                          <p-inputNumber
                            formControlName="stock"
                            placeholder="0"
                            [min]="1"
                            class="w-full"
                          ></p-inputNumber>
                        </div>

                        <!-- Botón Agregar -->
                        <button
                          pButton
                          type="submit"
                          label="+ Agregar Cupón"
                          icon="pi pi-plus"
                          [disabled]="couponForm.invalid"
                          class="w-full"
                        ></button>
                      </form>
                    </div>
                  </div>

                  <!-- Botones Finales -->
                  <div class="flex gap-4 pt-4 border-t border-slate-200">
                    <button pButton type="button" label="Anterior" severity="secondary" (click)="goToStep(1)" class="flex-1"></button>
                    <button
                      pButton
                      type="button"
                      label="Registrar Negocio"
                      severity="success"
                      icon="pi pi-check"
                      (click)="onSubmit()"
                      [loading]="isSubmitting()"
                      [disabled]="basicInfoForm.invalid || contactForm.invalid || isSubmitting()"
                      class="flex-1"
                    ></button>
                  </div>
                </div>
              </p-stepperPanel>

            </p-stepper>
          </div>

        </div>

        <!-- Link de redirección -->
        <p class="text-center text-slate-600 mt-6">
          ¿Ya tienes un negocio registrado?
          <a routerLink="/directorio" class="text-indigo-600 font-semibold hover:text-indigo-700">
            Ir al directorio
          </a>
        </p>

      </div>
    </div>
  `
})
export class BusinessRegisterImprovedComponent {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);

  // Signals para estado reactivo
  currentStep = signal(0);
  isSubmitting = signal(false);
  wantsCoupons = false;
  addedCoupons = signal<CouponForm[]>([]);

  // Formularios
  basicInfoForm: FormGroup;
  contactForm: FormGroup;
  couponForm: FormGroup;

  categories = [
    { label: 'Gastronomía', value: 'Gastronomía' },
    { label: 'Soporte Técnico', value: 'Soporte Técnico' },
    { label: 'Moda', value: 'Moda' },
    { label: 'Salud', value: 'Salud' },
    { label: 'Educación', value: 'Educación' }
  ];

  constructor() {
    this.basicInfoForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.contactForm = this.fb.group({
      contact: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: ['']
    });

    this.couponForm = this.fb.group({
      title: ['', Validators.required],
      discount: ['', Validators.required],
      code: ['', Validators.required],
      stock: [1, [Validators.required, Validators.min(1)]]
    });
  }

  /**
   * Valida si un campo es inválido
   */
  isFieldInvalid(form: FormGroup, fieldName: string): boolean {
    const field = form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  /**
   * Navega a un paso específico
   */
  goToStep(step: number) {
    this.currentStep.set(step);
  }

  /**
   * Maneja cambio de paso en el stepper
   */
  onStepChange(event: any) {
    this.currentStep.set(event);
  }

  /**
   * Agrega un cupón a la lista
   */
  addCoupon() {
    if (this.couponForm.valid) {
      const newCoupon = this.couponForm.value as CouponForm;
      this.addedCoupons.update(coupons => [...coupons, newCoupon]);
      this.couponForm.reset({ stock: 1 });

      this.messageService.add({
        severity: 'success',
        summary: 'Cupón Agregado',
        detail: `"${newCoupon.title}" se agregó exitosamente`,
        life: 3000
      });
    }
  }

  /**
   * Elimina un cupón de la lista
   */
  removeCoupon(index: number) {
    this.addedCoupons.update(coupons => coupons.filter((_, i) => i !== index));
  }

  /**
   * Envío del formulario completo
   */
  async onSubmit() {
    if (this.basicInfoForm.invalid || this.contactForm.invalid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Formulario Incompleto',
        detail: 'Por favor completa todos los campos requeridos',
        life: 3000
      });
      return;
    }

    this.isSubmitting.set(true);

    try {
      // Combinar datos de todos los formularios
      const businessData = {
        ...this.basicInfoForm.value,
        ...this.contactForm.value,
        coupons: this.addedCoupons()
      };

      // Enviar al backend
      const response = await this.apiService.createBusiness(businessData).toPromise();

      if (response?.success) {
        this.messageService.add({
          severity: 'success',
          summary: '✅ ¡Éxito!',
          detail: `"${businessData.name}" ha sido registrado exitosamente`,
          life: 3000
        });

        // Redirigir al directorio después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/directorio']);
        }, 2000);
      }
    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error de Registro',
        detail: error?.message || 'No se pudo registrar el negocio. Intenta nuevamente.',
        life: 4000
      });
      this.isSubmitting.set(false);
    }
  }

  /**
   * Cancelar y volver
   */
  onCancel() {
    if (confirm('¿Deseas cancelar el registro? Se perderán los datos ingresados.')) {
      this.router.navigate(['/directorio']);
    }
  }
}
