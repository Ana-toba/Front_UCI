import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';

export interface MeasurementDto {
  id: number;
  patient_id: number;
  ventilator_id: number;
  fecha_hora: string;
  modo: string;
  Ppico: number;
  VolMinEsp: number;
  VTE: number;
  fTotal: number;
  parametro_modo: number;
  PEEP: number;
  Oxigeno: number;
}

@Injectable({ providedIn: 'root' })

export class MedicionesApiService {

  private readonly api = inject(BaseApiService);

  getMediciones(): Observable<MeasurementDto[]> {
    return this.api.get<MeasurementDto[]>('/Mediciones/get');}

  getMedicionById(id:number): Observable<MeasurementDto> {
    return this.api.get<MeasurementDto>(`/Mediciones/get/${id}`);}

  getMedicionesByPaciente(patientId:number): Observable<MeasurementDto[]> {
    return this.api.get<MeasurementDto[]>(`/Mediciones/patient/${patientId}`);}

  getMedicionesByVentilador(ventilatorId:number): Observable<MeasurementDto[]> {
    return this.api.get<MeasurementDto[]>(`/Mediciones/ventilator/${ventilatorId}`);}

  createMedicion(payload: Partial<MeasurementDto>): Observable<MeasurementDto> {
    return this.api.post<MeasurementDto>('/Mediciones/create', payload);}

  updateMedicion(id:number, payload: Partial<MeasurementDto>): Observable<MeasurementDto> {
    return this.api.put<MeasurementDto>(`/Mediciones/update/${id}`, payload);}

  deleteMedicion(id:number): Observable<any> {
    return this.api.delete<any>(`/Mediciones/delete/${id}`);}

}