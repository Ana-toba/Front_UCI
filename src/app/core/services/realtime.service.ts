import {

  Injectable,
  inject

} from '@angular/core';

import {

  HttpClient

} from '@angular/common/http';

@Injectable({

  providedIn: 'root'

})

export class RealtimeService {

  // =========================
  // HTTP
  // =========================

  private http =
    inject(HttpClient);

  // =========================
  // API
  // =========================

  private apiUrl =

    'http://127.0.0.1:5000/realtime';

  // =========================
  // GET LATEST
  // =========================

  getLatest() {

    return this.http.get<any>(

      `${this.apiUrl}/latest`
    );
  }
}