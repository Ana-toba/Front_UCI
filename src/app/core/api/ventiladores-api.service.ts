import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';

export interface VentilatorDto {
  id: number;
  modelo: string;
  marca: string;
  ubicacion: string;
  patient_id: number;
}

@Injectable({ providedIn: 'root' })

export class VentiladoresApiService {

  private readonly api = inject(BaseApiService);

  getVentiladores(): Observable<VentilatorDto[]> {
    return this.api.get<VentilatorDto[]>('/Ventiladores/get');
  }

  getVentiladorById(id:number): Observable<VentilatorDto> {
    return this.api.get<VentilatorDto>(`/Ventiladores/get/${id}`);
  }

  createVentilador(payload: Partial<VentilatorDto>): Observable<VentilatorDto> {
    return this.api.post<VentilatorDto>('/Ventiladores/create', payload);
  }

  updateVentilador(id:number, payload: Partial<VentilatorDto>): Observable<VentilatorDto> {
    return this.api.put<VentilatorDto>(`/Ventiladores/update/${id}`, payload);
  }

  deleteVentilador(id:number): Observable<any> {
    return this.api.delete<any>(`/Ventiladores/delete/${id}`);
  }

}