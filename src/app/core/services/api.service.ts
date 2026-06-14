/**
 * Servicio HTTP para comunicarse con la API local
 * Gestiona todas las peticiones HTTP hacia el backend Express
 *
 * Features:
 * - CRUD completo para negocios y cupones
 * - Upload de imágenes con Multer
 * - Gestión de errores centralizada
 * - Tipado fuerte con TypeScript
 *
 * Endpoints:
 * - GET/POST/PUT/DELETE /api/businesses (con soporte para imágenes)
 * - POST/PUT/DELETE /api/coupons/:businessId
 * - POST /api/coupons/:businessId/:couponId/claim (reclamar cupones)
 * - GET /api/stats (estadísticas)
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3001/api';

  /**
   * Manejo centralizado de errores
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error?.message || `Error ${error.status}: ${error.statusText}`;
    }

    console.error('API Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // =================== BUSINESSES ===================

  /**
   * Obtiene todos los negocios
   */
  getAllBusinesses(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/businesses`)
      .pipe(catchError(error => this.handleError(error)));
  }

  /**
   * Obtiene un negocio específico por ID
   */
  getBusinessById(id: string): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/businesses/${id}`)
      .pipe(catchError(error => this.handleError(error)));
  }

  /**
   * Crea un nuevo negocio
   */
  createBusiness(data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/businesses`, data)
      .pipe(catchError(error => this.handleError(error)));
  }

  /**
   * Actualiza un negocio existente
   */
  updateBusiness(id: string, data: any): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/businesses/${id}`, data)
      .pipe(catchError(error => this.handleError(error)));
  }

  /**
   * Elimina un negocio
   */
  deleteBusiness(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/businesses/${id}`)
      .pipe(catchError(error => this.handleError(error)));
  }

  // =================== COUPONS ===================

  /**
   * Agrega un cupón a un negocio
   */
  addCoupon(businessId: string, coupon: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/coupons/${businessId}`, coupon)
      .pipe(catchError(error => this.handleError(error)));
  }

  /**
   * Actualiza un cupón
   */
  updateCoupon(businessId: string, couponId: string, data: any): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/coupons/${businessId}/${couponId}`, data)
      .pipe(catchError(error => this.handleError(error)));
  }

  /**
   * Elimina un cupón
   */
  deleteCoupon(businessId: string, couponId: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/coupons/${businessId}/${couponId}`)
      .pipe(catchError(error => this.handleError(error)));
  }

  /**
   * Reclama un cupón (reduce stock e incrementa clicks)
   */
  claimCoupon(businessId: string, couponId: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      `${this.apiUrl}/coupons/${businessId}/${couponId}/claim`,
      {}
    ).pipe(catchError(error => this.handleError(error)));
  }

  // =================== STATS ===================

  /**
   * Obtiene estadísticas de la plataforma
   */
  getStats(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/stats`)
      .pipe(catchError(error => this.handleError(error)));
  }

  // =================== UPLOAD DE IMÁGENES ===================

  /**
   * Crea un negocio con imagen usando FormData
   * Útil para uploads de archivos
   *
   * @param formData FormData con campos de negocio e imagen
   * @returns Observable con la respuesta del servidor
   */
  createBusinessWithImage(formData: FormData): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/businesses`, formData)
      .pipe(catchError(error => this.handleError(error)));
  }

  /**
   * Actualiza un negocio con posible cambio de imagen
   *
   * @param id ID del negocio
   * @param formData FormData con campos actualizados
   * @returns Observable con la respuesta del servidor
   */
  updateBusinessWithImage(id: string, formData: FormData): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/businesses/${id}`, formData)
      .pipe(catchError(error => this.handleError(error)));
  }
}
