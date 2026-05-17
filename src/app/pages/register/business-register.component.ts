import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PrimeImportsModule } from '../../prime-imports';
import { BusinessService } from '../../business.service';

@Component({
  selector: 'app-business-register',
  standalone: true,
  imports: [CommonModule, PrimeImportsModule],
  template: `
    <div class="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-6 md:p-12 flex items-center justify-center">
      <div class="w-full max-w-2xl">
        <!-- Card Principal -->
        <div class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">

          <!-- Encabezado -->
          <div class="bg-linear-to-r from-indigo-600 to-indigo-700 px-8 py-8 text-white">
            <h1 class="text-4xl font-extrabold tracking-tight">Registra tu Negocio</h1>
            <p class="text-indigo-100 mt-2 text-lg">Únete a la comunidad local y aumenta tu visibilidad</p>
          </div>

          <!-- Formulario -->
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="p-8">

            <!-- Campo: Nombre del Negocio -->
            <div class="mb-6">
              <label for="businessName" class="block text-sm font-semibold text-slate-700 mb-2">
                Nombre del Negocio
              </label>
              <input
                pInputText
                id="businessName"
                type="text"
                formControlName="name"
                placeholder="Ej: Café Central"
                class="w-full"
              />
              <div *ngIf="isFieldInvalid('name')" class="text-red-500 text-sm mt-2">
                El nombre es requerido (mínimo 3 caracteres)
              </div>
            </div>

            <!-- Campo: Rubro/Categoría -->
            <div class="mb-6">
              <label for="category" class="block text-sm font-semibold text-slate-700 mb-2">
                Rubro/Categoría
              </label>
              <p-select
                id="category"
                [options]="categories"
                formControlName="category"
                optionLabel="label"
                optionValue="value"
                placeholder="Selecciona una categoría"
                class="w-full"
              ></p-select>
              <div *ngIf="isFieldInvalid('category')" class="text-red-500 text-sm mt-2">
                Debes seleccionar una categoría
              </div>
            </div>

            <!-- Campo: Descripción -->
            <div class="mb-6">
              <label for="description" class="block text-sm font-semibold text-slate-700 mb-2">
                Descripción del Negocio
              </label>
              <textarea
                pTextarea
                id="description"
                formControlName="description"
                placeholder="Cuéntanos sobre tu negocio..."
                rows="4"
                class="w-full"
              ></textarea>
              <div *ngIf="isFieldInvalid('description')" class="text-red-500 text-sm mt-2">
                La descripción es requerida (mínimo 10 caracteres)
              </div>
            </div>

            <!-- Botones -->
            <div class="flex gap-4 pt-6 border-t border-slate-200">
              <button
                pButton
                type="button"
                label="Cancelar"
                severity="secondary"
                class="flex-1"
                (click)="onCancel()"
              ></button>
              <button
                pButton
                type="submit"
                label="Registrar Negocio"
                [disabled]="registerForm.invalid || isSubmitting"
                class="flex-1"
              ></button>
            </div>

          </form>

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
export class BusinessRegisterComponent {
  private businessService = inject(BusinessService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);

  registerForm: FormGroup;
  isSubmitting = false;

  categories = [
    { label: 'Gastronomía', value: 'Gastronomía' },
    { label: 'Soporte Técnico', value: 'Soporte Técnico' },
    { label: 'Moda', value: 'Moda' },
    { label: 'Salud', value: 'Salud' },
    { label: 'Educación', value: 'Educación' }
  ];

  constructor() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // Valida si un campo es inválido y ha sido tocado
  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // Envío del formulario
  onSubmit() {
    if (this.registerForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      try {
        // Invoca el servicio para registrar el nuevo negocio
        const newBusiness = this.businessService.registerNewBusiness(
          this.registerForm.value
        );

        // Muestra notificación de éxito
        this.messageService.add({
          severity: 'success',
          summary: 'Negocio Registrado',
          detail: `${newBusiness.name} ha sido registrado exitosamente en el directorio`,
          life: 3000
        });

        // Redirecciona al directorio (la nueva tarjeta se renderizará automáticamente)
        setTimeout(() => {
          this.router.navigate(['/directorio']);
        }, 1000);
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error de Registro',
          detail: 'No se pudo registrar el negocio. Intenta nuevamente.',
          life: 4000
        });
        this.isSubmitting = false;
      }
    }
  }

  // Cancelar y volver al directorio
  onCancel() {
    this.router.navigate(['/directorio']);
  }
}
