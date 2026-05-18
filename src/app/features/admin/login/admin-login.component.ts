import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../../core/services/auth.service';

/**
 * ADMIN LOGIN
 * Pantalla de acceso para administradores
 * Email: admin@avisolocal.cl | Password: demo123
 */

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, ToastModule],
  template: `
    <p-toast></p-toast>

    <div class="min-h-screen bg-linear-to-br from-emerald-600 to-emerald-800 flex items-center justify-center p-4">

      <div class="w-full max-w-md">

        <!-- Card Login -->
        <div class="bg-white rounded-2xl shadow-2xl p-8">

          <!-- Header -->
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-xl mb-4">
              <span class="text-3xl font-black text-white">A</span>
            </div>
            <h1 class="text-3xl font-black text-stone-900">AdminHub</h1>
            <p class="text-stone-500 mt-2">Panel Administrativo</p>
          </div>

          <!-- Form -->
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">

            <!-- Email -->
            <div>
              <label class="block text-sm font-semibold text-stone-700 mb-2">Email</label>
              <input pInputText type="email" formControlName="email" class="w-full"
                     placeholder="admin@avisolocal.cl"
                     [ngClass]="{'ng-invalid ng-touched': loginForm.get('email')?.hasError('required')}">
              <small *ngIf="loginForm.get('email')?.hasError('required')" class="text-red-500">
                Email requerido
              </small>
            </div>

            <!-- Password -->
            <div>
              <label class="block text-sm font-semibold text-stone-700 mb-2">Contraseña</label>
              <input pInputText type="password" formControlName="password" class="w-full"
                     placeholder="••••••••"
                     [ngClass]="{'ng-invalid ng-touched': loginForm.get('password')?.hasError('required')}">
              <small *ngIf="loginForm.get('password')?.hasError('required')" class="text-red-500">
                Contraseña requerida
              </small>
            </div>

            <!-- Remember Me + Forgot Password -->
            <div class="flex justify-between items-center text-sm">
              <label class="flex items-center gap-2 text-stone-600">
                <input type="checkbox" class="rounded">
                <span>Recuérdame</span>
              </label>
              <a href="#" class="text-emerald-600 hover:text-emerald-700 font-semibold">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <!-- Submit Button -->
            <button pButton type="submit" label="Iniciar Sesión" class="w-full !bg-emerald-600 !border-emerald-600"
                    [loading]="isLoading" [disabled]="loginForm.invalid || isLoading"></button>

          </form>

          <!-- Demo Info -->
          <div class="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p class="text-sm font-semibold text-amber-900 mb-2">🔐 Credenciales Demo:</p>
            <p class="text-xs text-amber-800">Email: <span class="font-mono">admin@avisolocal.cl</span></p>
            <p class="text-xs text-amber-800">Password: <span class="font-mono">demo123</span></p>
          </div>

          <!-- OAuth Buttons (Stubs) -->
          <div class="mt-6 space-y-2">
            <p class="text-center text-xs text-stone-500 mb-4">O continúa con:</p>
            <button pButton type="button" label="Google" severity="secondary"
                    class="w-full !text-stone-600 !border-stone-200" icon="pi pi-google"
                    (click)="onGoogleLogin()"></button>
            <button pButton type="button" label="GitHub" severity="secondary"
                    class="w-full !text-stone-600 !border-stone-200" icon="pi pi-github"
                    (click)="onGithubLogin()"></button>
          </div>

        </div>

        <!-- Footer -->
        <p class="text-center text-white text-sm mt-8">
          ¿No eres administrador?
          <a routerLink="/directorio" class="font-bold hover:underline">Vuelve al directorio</a>
        </p>

      </div>

    </div>
  `
})
export class AdminLoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private messageService = inject(MessageService);

  loginForm: FormGroup;
  isLoading = false;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sesión Iniciada',
          detail: `¡Bienvenido, ${response.user.name}!`,
          life: 3000
        });

        // Redirect to returnUrl or /admin/dashboard
        const returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
        setTimeout(() => this.router.navigateByUrl(returnUrl), 500);
      },
      error: (error) => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error de Autenticación',
          detail: 'Email o contraseña incorrectos',
          life: 4000
        });
      }
    });
  }

  onGoogleLogin(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'OAuth no implementado',
      detail: 'Google OAuth estará disponible próximamente',
      life: 3000
    });
  }

  onGithubLogin(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'OAuth no implementado',
      detail: 'GitHub OAuth estará disponible próximamente',
      life: 3000
    });
  }
}
