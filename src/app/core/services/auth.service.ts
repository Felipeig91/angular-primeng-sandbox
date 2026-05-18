import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User, AdminLoginCredentials } from '../models/user.model';

/**
 * SERVICIO DE AUTENTICACIÓN
 * Maneja: Login, logout, verificación de usuario
 *
 * PREPARACIÓN PARA OAUTH:
 * - Google Sign-In integration
 * - GitHub OAuth
 * - Almacenamiento de tokens en localStorage
 * - Refresh token logic
 */

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Estado de usuario autenticado
  private currentUserState = signal<User | null>(null);
  public currentUser = this.currentUserState.asReadonly();

  // Token de sesión (temporario en memoria, guardar en localStorage después)
  private authToken: string | null = null;

  constructor() {
    // Verificar si hay sesión guardada
    this.checkStoredSession();
  }

  /**
   * LOGIN CON EMAIL Y PASSWORD
   * Futuro: return this.http.post<{user: User, token: string}>(`${this.API_URL}/auth/login`, credentials);
   */
  login(credentials: AdminLoginCredentials): Observable<{ user: User; token: string }> {
    // Validación temporal (demo)
    if (credentials.email === 'admin@avisolocal.cl' && credentials.password === 'demo123') {
      const user: User = {
        id: '1',
        email: credentials.email,
        name: 'Administrador',
        role: 'admin',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const token = 'fake-jwt-token-' + Date.now();

      this.currentUserState.set(user);
      this.authToken = token;
      localStorage.setItem('auth_token', token);
      localStorage.setItem('current_user', JSON.stringify(user));

      return of({ user, token });
    }

    return of({ user: null as any, token: '' });
  }

  /**
   * LOGIN CON GOOGLE
   * Futuro: Integrar con @react-oauth/google o similar
   */
  loginWithGoogle(): Observable<{ user: User; token: string }> {
    // Placeholder para implementación futura
    console.log('Google OAuth - Implementar integraci\u00f3n');
    return of({ user: null as any, token: '' });
  }

  /**
   * LOGIN CON GITHUB
   * Futuro: Integrar con GitHub OAuth
   */
  loginWithGitHub(): Observable<{ user: User; token: string }> {
    // Placeholder para implementación futura
    console.log('GitHub OAuth - Implementar integraci\u00f3n');
    return of({ user: null as any, token: '' });
  }

  /**
   * LOGOUT
   */
  logout(): void {
    this.currentUserState.set(null);
    this.authToken = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
  }

  /**
   * VERIFICAR SI USUARIO ESTÁ AUTENTICADO
   */
  isAuthenticated(): boolean {
    return this.currentUserState() !== null;
  }

  /**
   * OBTENER TOKEN ACTUAL
   */
  getAuthToken(): string | null {
    return this.authToken || localStorage.getItem('auth_token');
  }

  /**
   * VERIFICAR SESIÓN GUARDADA
   */
  private checkStoredSession(): void {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('current_user');

    if (storedToken && storedUser) {
      try {
        const user = JSON.parse(storedUser) as User;
        this.currentUserState.set(user);
        this.authToken = storedToken;
      } catch (e) {
        console.error('Error al recuperar sesión:', e);
        this.logout();
      }
    }
  }
}
