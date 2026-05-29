import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-ventilators',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './ventilators.html',
  styleUrl: './ventilators.scss',
})
export class VentilatorsComponent implements OnInit {

  private http = inject(HttpClient);

  ventilators: any[] = [];

  loading = true;

  errorMsg = '';

  ngOnInit(): void {

    this.getVentilators();
  }

  getVentilators() {

  this.loading = true;

  this.http.get<any>(

    'http://127.0.0.1:5000/ventiladores/get'

  ).subscribe({

    next: (response) => {

      console.log(
        'VENTILADORES:',
        response
      );

      this.ventilators =

        response.data || [];

      this.loading = false;
    },

    error: (err) => {

      console.error(err);

      this.errorMsg =

        'Error cargando ventiladores';

      this.loading = false;
    }
  });
}
}