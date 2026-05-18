/**
 * MODELO DE USUARIO PARA ADMIN
 * Preparado para integración con OAuth (Google/GitHub)
 */

export type UserRole = 'admin' | 'manager' | 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminLoginCredentials {
  email: string;
  password: string;
}

export interface OAuthProvider {
  provider: 'google' | 'github';
  providerUserId: string;
  accessToken: string;
}
