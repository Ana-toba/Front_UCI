// src/app/core/api/patients-api.service.ts

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';

export interface PatientDto {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
  sexo: string;
  cama: string;
}

@Injectable({
  providedIn: 'root'
})

export class PatientsApiService {

  private readonly api = inject(BaseApiService);

  // Obtener todos los pacientes
  getPatients(): Observable<PatientDto[]> {
    return this.api.get<PatientDto[]>('/Pacientes/get');
  }

  // Obtener paciente por id
  getPatientById(id:number): Observable<PatientDto> {
    return this.api.get<PatientDto>(`/Pacientes/get/${id}`);
  }

  // Crear paciente
  createPatient(payload: Partial<PatientDto>): Observable<PatientDto> {
    return this.api.post<PatientDto>('/Pacientes/create', payload);
  }

  // Actualizar paciente
  updatePatient(id:number, payload: Partial<PatientDto>): Observable<PatientDto> {
    return this.api.put<PatientDto>(`/Pacientes/update/${id}`, payload);
  }

  // Eliminar paciente
  deletePatient(id:number): Observable<any> {
    return this.api.delete<any>(`/Pacientes/delete/${id}`);
  }

}