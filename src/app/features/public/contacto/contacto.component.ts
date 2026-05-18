import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, TextareaModule],
  template: `
    <section class="py-20 bg-stone-50">
      <div class="max-w-4xl mx-auto px-6">
        <h1 class="text-4xl font-black text-stone-900 mb-4">Contacto</h1>
        <p class="text-lg text-stone-600 mb-12">¿Preguntas? Nos encantaría saber de ti.</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">

          <!-- Info de Contacto -->
          <div class="space-y-6">
            <div>
              <h3 class="font-bold text-emerald-600 mb-2">📧 Email</h3>
              <p class="text-stone-600">info@avisolocal.cl</p>
            </div>
            <div>
              <h3 class="font-bold text-emerald-600 mb-2">📞 Teléfono</h3>
              <p class="text-stone-600">+56 9 XXXX XXXX</p>
            </div>
            <div>
              <h3 class="font-bold text-emerald-600 mb-2">📍 Ubicación</h3>
              <p class="text-stone-600">Puerto Montt, Los Lagos, Chile</p>
            </div>
            <div>
              <h3 class="font-bold text-emerald-600 mb-2">⏰ Horario</h3>
              <p class="text-stone-600">Lun-Vie: 09:00 - 18:00</p>
              <p class="text-stone-600">Sab-Dom: Cerrado</p>
            </div>
          </div>

          <!-- Formulario -->
          <form [formGroup]="contactForm" class="bg-white p-8 rounded-xl shadow-sm border border-stone-200">
            <div class="mb-4">
              <label class="block text-sm font-semibold text-stone-700 mb-2">Nombre</label>
              <input pInputText type="text" formControlName="name" class="w-full" placeholder="Tu nombre">
            </div>
            <div class="mb-4">
              <label class="block text-sm font-semibold text-stone-700 mb-2">Email</label>
              <input pInputText type="email" formControlName="email" class="w-full" placeholder="tu@email.com">
            </div>
            <div class="mb-4">
              <label class="block text-sm font-semibold text-stone-700 mb-2">Mensaje</label>
              <textarea pTextarea formControlName="message" rows="5" class="w-full" placeholder="Tu mensaje..."></textarea>
            </div>
            <button pButton type="submit" label="Enviar Mensaje"
                    class="!bg-emerald-600 !border-emerald-600 w-full"
                    [disabled]="contactForm.invalid"></button>
          </form>

        </div>
      </div>
    </section>
  `
})
export class ContactoComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
}
