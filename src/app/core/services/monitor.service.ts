import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MonitorService {

  private apiUrl =
    'http://127.0.0.1:5000/Mediciones';

  constructor(
    private http: HttpClient
  ) {}

  // =========================
  // DASHBOARD
  // =========================

  getDashboard(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/dashboard`
    );
  }

  // =========================
  // ULTIMA MEDICION
  // =========================

  getLatest(
    patientId: number
  ): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/latest/${patientId}`
    );
  }
}