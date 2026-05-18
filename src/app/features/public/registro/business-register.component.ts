import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { BusinessService } from '../../../core/services/business.service';
import { BusinessCategory, DayOfWeek } from '../../../core/models/business.model';

/**
 * FORMULARIO DE REGISTRO MULTI-PASO
 * Estructura: 4 pasos con navegación manual
 */

@Component({
  selector: 'app-business-register',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    ButtonModule, InputTextModule, InputMaskModule, SelectModule, TextareaModule,
    FileUploadModule, CheckboxModule, ToastModule
  ],
  template: `
    <p-toast></p-toast>

    <section class="min-h-screen bg-linear-to-br from-stone-50 to-stone-100 py-20">
      <div class="max-w-4xl mx-auto px-6">

        <!-- Header -->
        <div class="mb-12 text-center">
          <h1 class="text-4xl font-black text-stone-900 mb-4">Registra tu Servicio</h1>
          <p class="text-lg text-stone-600">Comparte tu negocio con la comunidad local</p>
        </div>

        <!-- Progress -->
        <div class="mb-12 flex justify-center">
          <div class="flex gap-2">
            <button pButton type="button" label="1"
                    [ngClass]="currentStep() >= 1 ? 'bg-emerald-600' : 'bg-stone-300'"
                    class="!text-white !rounded-full !w-10 !h-10" [disabled]="true"></button>
            <button pButton type="button" label="2"
                    [ngClass]="currentStep() >= 2 ? 'bg-emerald-600' : 'bg-stone-300'"
                    class="!text-white !rounded-full !w-10 !h-10" [disabled]="true"></button>
            <button pButton type="button" label="3"
                    [ngClass]="currentStep() >= 3 ? 'bg-emerald-600' : 'bg-stone-300'"
                    class="!text-white !rounded-full !w-10 !h-10" [disabled]="true"></button>
            <button pButton type="button" label="4"
                    [ngClass]="currentStep() >= 4 ? 'bg-emerald-600' : 'bg-stone-300'"
                    class="!text-white !rounded-full !w-10 !h-10" [disabled]="true"></button>
          </div>
        </div>

        <!-- Paso 1 -->
        @if (currentStep() === 1) {
          <div class="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 mb-8">
            <h2 class="text-2xl font-bold text-stone-900 mb-6">Paso 1: Datos del Responsable</h2>
            <form [formGroup]="responsibleForm" class="space-y-6">
              <div>
                <label class="block text-sm font-semibold text-stone-700 mb-2">Nombre Completo</label>
                <input pInputText type="text" formControlName="fullName" class="w-full" placeholder="Ej: María González">
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-stone-700 mb-2">Teléfono</label>
                  <input pInputMask type="text" formControlName="phone" mask="+56 9 9999 9999" class="w-full" placeholder="+56 9 XXXX XXXX">
                </div>
                <div>
                  <label class="block text-sm font-semibold text-stone-700 mb-2">Email</label>
                  <input pInputText type="email" formControlName="email" class="w-full" placeholder="tu@email.com">
                </div>
              </div>

              <div class="flex justify-between">
                <button pButton type="button" label="Cancelar" severity="secondary" (click)="onCancel()"></button>
                <button pButton type="button" label="Siguiente" severity="success" (click)="nextStep()" [disabled]="!responsibleForm.valid"></button>
              </div>
            </form>
          </div>
        }

        <!-- Paso 2 -->
        @if (currentStep() === 2) {
          <div class="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 mb-8">
            <h2 class="text-2xl font-bold text-stone-900 mb-6">Paso 2: Información del Servicio</h2>
            <form [formGroup]="serviceForm" class="space-y-6">
              <div>
                <label class="block text-sm font-semibold text-stone-700 mb-2">Nombre del Negocio</label>
                <input pInputText type="text" formControlName="name" class="w-full" placeholder="Ej: Café Central">
              </div>

              <div>
                <label class="block text-sm font-semibold text-stone-700 mb-2">Categoría</label>
                <p-select [options]="categories" formControlName="category" optionLabel="label" optionValue="value" placeholder="Selecciona categoría" class="w-full"></p-select>
              </div>

              <div>
                <label class="block text-sm font-semibold text-stone-700 mb-2">Descripción del Servicio</label>
                <textarea pTextarea formControlName="description" rows="5" class="w-full" placeholder="Cuéntanos sobre tu negocio..."></textarea>
              </div>

              <div>
                <label class="block text-sm font-semibold text-stone-700 mb-2">Imagen del Negocio</label>
                <p-fileUpload name="image" [multiple]="false" accept="image/*" [maxFileSize]="5000000" (onSelect)="onImageSelect($event)"></p-fileUpload>
              </div>

              <div class="flex justify-between">
                <button pButton type="button" label="Anterior" severity="secondary" (click)="previousStep()"></button>
                <button pButton type="button" label="Siguiente" severity="success" (click)="nextStep()" [disabled]="!serviceForm.valid"></button>
              </div>
            </form>
          </div>
        }

        <!-- Paso 3 -->
        @if (currentStep() === 3) {
          <div class="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 mb-8">
            <h2 class="text-2xl font-bold text-stone-900 mb-6">Paso 3: Ubicación</h2>
            <form [formGroup]="locationForm" class="space-y-6">
              <div>
                <label class="block text-sm font-semibold text-stone-700 mb-2">Dirección</label>
                <input pInputText type="text" formControlName="address" class="w-full" placeholder="Calle, número, ciudad">
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-stone-700 mb-2">Ciudad</label>
                  <input pInputText type="text" formControlName="city" class="w-full" placeholder="Ej: Puerto Montt">
                </div>

                <div>
                  <label class="block text-sm font-semibold text-stone-700 mb-2">Región</label>
                  <p-select [options]="regions" formControlName="region" optionLabel="label" optionValue="value" placeholder="Selecciona región" class="w-full"></p-select>
                </div>
              </div>

              <div class="flex justify-between">
                <button pButton type="button" label="Anterior" severity="secondary" (click)="previousStep()"></button>
                <button pButton type="button" label="Siguiente" severity="success" (click)="nextStep()" [disabled]="!locationForm.valid"></button>
              </div>
            </form>
          </div>
        }

        <!-- Paso 4 -->
        @if (currentStep() === 4) {
          <div class="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 mb-8">
            <h2 class="text-2xl font-bold text-stone-900 mb-6">Paso 4: Horario de Atención</h2>
            <form [formGroup]="scheduleForm" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-stone-700 mb-2">Hora de Apertura</label>
                  <input pInputText type="time" formControlName="openTime" class="w-full">
                </div>
                <div>
                  <label class="block text-sm font-semibold text-stone-700 mb-2">Hora de Cierre</label>
                  <input pInputText type="time" formControlName="closeTime" class="w-full">
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-stone-700 mb-4">Días de Atención</label>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  @for (day of daysOfWeek; track day) {
                    <div class="flex items-center">
                      <p-checkbox [formControl]="getCheckboxControl(day)" [binary]="true" (onChange)="onDayChange()"></p-checkbox>
                      <label class="ml-2 text-stone-700 capitalize">{{ day }}</label>
                    </div>
                  }
                </div>
              </div>

              <div class="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p-checkbox formControlName="acceptTerms" [binary]="true"></p-checkbox>
                <label class="text-sm text-stone-700">Acepto los términos y condiciones</label>
              </div>

              <div class="flex justify-between">
                <button pButton type="button" label="Anterior" severity="secondary" (click)="previousStep()"></button>
                <button pButton type="button" label="Registrar Negocio" severity="success" [disabled]="!isFormValid()" (click)="onSubmit()"></button>
              </div>
            </form>
          </div>
        }

      </div>
    </section>
  `
})
export class BusinessRegisterComponent {
  private fb = inject(FormBuilder);
  private businessService = inject(BusinessService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  currentStep = signal(1);

  responsibleForm: FormGroup;
  serviceForm: FormGroup;
  locationForm: FormGroup;
  scheduleForm: FormGroup;

  categories: { label: string; value: BusinessCategory }[] = [
    { label: 'Gastronomía', value: 'Gastronomía' },
    { label: 'Soporte Técnico', value: 'Soporte Técnico' },
    { label: 'Moda', value: 'Moda' },
    { label: 'Salud', value: 'Salud' },
    { label: 'Educación', value: 'Educación' },
    { label: 'Otros', value: 'Otros' }
  ];

  regions: { label: string; value: string }[] = [
    { label: 'Los Lagos', value: 'Los Lagos' },
    { label: 'Los Ríos', value: 'Los Ríos' },
    { label: 'Aysén', value: 'Aysén' }
  ];

  daysOfWeek: DayOfWeek[] = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
  selectedImage: File | null = null;
  daysChecked: Set<DayOfWeek> = new Set();

  constructor() {
    this.responsibleForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.serviceForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(20)]]
    });

    this.locationForm = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      region: ['', Validators.required]
    });

    this.scheduleForm = this.fb.group({
      openTime: ['09:00', Validators.required],
      closeTime: ['18:00', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
      ...this.createDayControls()
    });
  }

  private createDayControls(): Record<string, any> {
    return this.daysOfWeek.reduce((acc, day) => {
      acc[day] = [false];
      return acc;
    }, {} as Record<string, any>);
  }

  getCheckboxControl(day: DayOfWeek) {
    return this.scheduleForm.get(day) as any;
  }

  onDayChange(): void {
    this.daysChecked.clear();
    this.daysOfWeek.forEach(day => {
      if (this.scheduleForm.get(day)?.value) {
        this.daysChecked.add(day);
      }
    });
  }

  onImageSelect(event: any): void {
    if (event.files && event.files.length > 0) {
      this.selectedImage = event.files[0];
    }
  }

  nextStep(): void {
    if (this.currentStep() < 4) {
      this.currentStep.update(v => v + 1);
    }
  }

  previousStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.update(v => v - 1);
    }
  }

  isFormValid(): boolean {
    return this.responsibleForm.valid && this.serviceForm.valid &&
           this.locationForm.valid && this.scheduleForm.valid && this.daysChecked.size > 0;
  }

  onSubmit(): void {
    if (!this.isFormValid()) return;

    const formData = {
      ...this.responsibleForm.value,
      ...this.serviceForm.value,
      ...this.locationForm.value,
      ...this.scheduleForm.value,
      imageFile: this.selectedImage,
      daysOpen: Array.from(this.daysChecked)
    };

    this.businessService.createBusiness(formData).subscribe({
      next: (business) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Negocio Registrado',
          detail: `${business.name} ha sido registrado exitosamente`,
          life: 3000
        });
        setTimeout(() => this.router.navigate(['/directorio']), 1000);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error de Registro',
          detail: 'No se pudo registrar el negocio',
          life: 4000
        });
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/directorio']);
  }
}
