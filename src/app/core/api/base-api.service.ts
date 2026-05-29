// src/app/core/api/base-api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface ApiResponse<T = any> {
  status: string;
  message?: string;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class BaseApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

 private getUrl(endpoint: string): string {
  const base = this.baseUrl.replace(/\/+$/, '');
  const path = endpoint.replace(/^\/+/, '');
  return `${base}/${path}`;
}
  private toHttpParams(params?: Record<string, any>): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key];
        if (value !== undefined && value !== null) {
          httpParams = httpParams.set(key, String(value));
        }
      });
    }
    return httpParams;
  }

  get<T>(endpoint: string, params?: Record<string, any>): Observable<T> {
    const httpParams = this.toHttpParams(params);
    return this.http
      .get<ApiResponse<T>>(this.getUrl(endpoint), { params: httpParams })
      .pipe(map(response => response.data));
  }

  post<T>(endpoint: string, payload: unknown): Observable<T> {
    return this.http
      .post<ApiResponse<T>>(this.getUrl(endpoint), payload)
      .pipe(map(response => response.data));
  }

  put<T>(endpoint: string, payload: unknown): Observable<T> {
    return this.http
      .put<ApiResponse<T>>(this.getUrl(endpoint), payload)
      .pipe(map(response => response.data));
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http
      .delete<ApiResponse<T>>(this.getUrl(endpoint))
      .pipe(map(response => response.data));
  }
}