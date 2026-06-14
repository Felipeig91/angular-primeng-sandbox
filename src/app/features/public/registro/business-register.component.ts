import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PrimeImportsModule } from '../../../prime-imports';
import { ApiService } from '../../../core/services/api.service';

interface CouponForm {
  title: string;
  discount: string;
  code: string;
  stock: number;
}

/**
 * COMPONENTE DE REGISTRO DE NEGOCIO MEJORADO
 * Features:
 * - Stepper con 3 pasos
 * - Gestión de cupones promocionales
 * - Integración con API backend
 * - Validación reactiva
 * - UX/UI profesional
 */
@Component({
  selector: 'app-business-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PrimeImportsModule,
    RouterLink
  ],
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

          <!-- Progreso Visual -->
          <div class="mb-8">
            <div class="flex justify-between mb-4">
              <div [class]="'step ' + (currentStep() >= 0 ? 'active' : '')">
                <div class="step-number">1</div>
                <div class="step-label">Básica</div>
              </div>
              <div [class]="'step ' + (currentStep() >= 1 ? 'active' : '')">
                <div class="step-number">2</div>
                <div class="step-label">Contacto</div>
              </div>
              <div [class]="'step ' + (currentStep() >= 2 ? 'active' : '')">
                <div class="step-number">3</div>
                <div class="step-label">Cupones</div>
              </div>
            </div>
            <div class="h-1 bg-slate-200 rounded-full">
              <div class="h-full bg-indigo-600 rounded-full transition-all" [style.width]="(currentStep() + 1) * 33.33 + '%'"></div>
            </div>
          </div>

          <!-- Contenido de Pasos -->
          <div>
            <!-- PASO 1: Información Básica -->
            <div *ngIf="currentStep() === 0" class="space-y-6">
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

                  <!-- Imagen del Negocio -->
                  <div>
                    <label class="block text-sm font-semibold text-slate-700 mb-2">
                      Imagen del Negocio (Opcional)
                    </label>
                    <div class="flex items-center gap-4">
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/gif,image/webp"
                        (change)="onFileSelected($event)"
                        #fileInput
                        class="hidden"
                      />
                      <button
                        pButton
                        type="button"
                        label="Seleccionar Imagen"
                        icon="pi pi-upload"
                        (click)="fileInput.click()"
                        severity="secondary"
                      ></button>
                      <span class="text-sm text-slate-600" *ngIf="selectedFile()">
                        ✅ {{ selectedFile()?.name }}
                      </span>
                      <span class="text-sm text-slate-400" *ngIf="!selectedFile()">
                        JPG, PNG, GIF o WebP (máx 5MB)
                      </span>
                    </div>
                  </div>

                  <!-- Botones -->
                  <div class="flex gap-4 pt-4 border-t border-slate-200">
                    <button pButton type="button" label="Cancelar" severity="secondary" (click)="onCancel()" class="flex-1"></button>
                    <button pButton type="button" label="Siguiente" (click)="goToStep(1)" [disabled]="basicInfoForm.invalid" class="flex-1"></button>
                  </div>
                </form>
            </div>

            <!-- PASO 2: Información de Contacto -->
            <div *ngIf="currentStep() === 1">
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
            </div>

            <!-- PASO 3: Cupones (Opcional) -->
            <div *ngIf="currentStep() === 2" class="space-y-6">
              <div>
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
                            <p class="text-sm text-slate-600">Código: <span class="font-mono font-bold">{{ coupon.code }}</span> | Stock: {{ coupon.stock }}</p>
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
  `,
  styles: [`
    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      flex: 1;
    }

    .step-number {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      background: #e2e8f0;
      color: #64748b;
      border: 2px solid transparent;
      transition: all 0.3s ease;
    }

    .step.active .step-number {
      background: #4f46e5;
      color: white;
      border-color: #4f46e5;
    }

    .step-label {
      font-size: 12px;
      font-weight: 600;
      color: #64748b;
      text-align: center;
    }

    .step.active .step-label {
      color: #4f46e5;
    }
  `]
})
export class BusinessRegisterComponent {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);

  // Signals
  currentStep = signal(0);
  isSubmitting = signal(false);
  selectedFile = signal<File | null>(null);
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
      const businessData = {
        name: this.basicInfoForm.get('name')?.value,
        category: this.basicInfoForm.get('category')?.value,
        description: this.basicInfoForm.get('description')?.value,
        contact: this.contactForm.get('contact')?.value,
        phone: this.contactForm.get('phone')?.value,
        address: this.contactForm.get('address')?.value,
        coupons: this.addedCoupons()
      };

      console.log('📤 Enviando datos:', businessData);

      let response;

      // Si hay imagen, usar FormData
      if (this.selectedFile()) {
        const formData = new FormData();
        formData.append('image', this.selectedFile()!);
        formData.append('name', businessData.name);
        formData.append('category', businessData.category);
        formData.append('description', businessData.description);
        formData.append('contact', businessData.contact || '');
        formData.append('phone', businessData.phone || '');
        formData.append('address', businessData.address || '');
        formData.append('coupons', JSON.stringify(businessData.coupons));

        console.log('📸 Con imagen');
        response = await this.apiService.createBusinessWithImage(formData).toPromise();
      } else {
        // Sin imagen, usar JSON directo
        console.log('📝 Sin imagen');
        response = await this.apiService.createBusiness(businessData).toPromise();
      }

      console.log('✅ Respuesta:', response);

      if (response?.success) {
        this.messageService.add({
          severity: 'success',
          summary: '✅ ¡Éxito!',
          detail: `"${businessData.name}" ha sido registrado exitosamente`,
          life: 3000
        });

        setTimeout(() => {
          this.router.navigate(['/directorio']);
        }, 2000);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error de Registro',
          detail: response?.message || 'No se pudo registrar el negocio',
          life: 4000
        });
        this.isSubmitting.set(false);
      }
    } catch (error: any) {
      console.error('❌ Error:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error de Registro',
        detail: error?.message || 'No se pudo registrar el negocio. Intenta nuevamente.',
        life: 4000
      });
      this.isSubmitting.set(false);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      // Validar tamaño (máx 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.messageService.add({
          severity: 'error',
          summary: 'Archivo muy grande',
          detail: 'La imagen no puede exceder 5MB',
          life: 3000
        });
        return;
      }

      // Validar tipo
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Tipo de archivo inválido',
          detail: 'Solo se aceptan JPG, PNG, GIF o WebP',
          life: 3000
        });
        return;
      }

      this.selectedFile.set(file);
    }
  }

  onCancel() {
    if (confirm('¿Deseas cancelar el registro? Se perderán los datos ingresados.')) {
      this.router.navigate(['/directorio']);
    }
  }

  /**
   * Métodos de navegación entre pasos
   */
  goToStep(step: number) {
    this.currentStep.set(step);
  }

  /**
   * Valida si un campo es inválido
   */
  isFieldInvalid(form: FormGroup, fieldName: string): boolean {
    const field = form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  /**
   * Agrega un cupón a la lista
   */
  addCoupon() {
    if (this.couponForm.invalid) return;

    const coupon: CouponForm = {
      ...this.couponForm.value,
      stock: Number(this.couponForm.value.stock)
    };

    this.addedCoupons.set([...this.addedCoupons(), coupon]);
    this.couponForm.reset({ stock: 1 });
  }

  /**
   * Remueve un cupón de la lista
   */
  removeCoupon(index: number) {
    const updated = this.addedCoupons().filter((_, i) => i !== index);
    this.addedCoupons.set(updated);
  }
}
