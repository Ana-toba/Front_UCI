// mediciones.service.ts - Servicio para obtener datos de mediciones desde la API
import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicionesService {

  private http = inject(HttpClient);

  private apiUrl =
    'http://127.0.0.1:5000/Mediciones';

  getDashboard() {

    return this.http.get(

      `${this.apiUrl}/dashboard`

    );
  }
}