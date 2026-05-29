import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './patients.html',
  styleUrl: './patients.scss',
})
export class PatientsComponent implements OnInit {

  private http = inject(HttpClient);

  patients: any[] = [];

  loading = true;

  errorMsg = '';

  ngOnInit(): void {

    this.getPatients();
  }

  getPatients() {

    this.loading = true;

    this.http.get<any>(

      'http://127.0.0.1:5000/Pacientes/get'

    ).subscribe({

      next: (response) => {

        console.log(
          'PACIENTES:',
          response
        );

        this.patients =

          response.data || [];

        this.loading = false;
        console.log(
          'LOADING:',
          this.loading
        );
      },

      error: (err) => {

        console.error(err);

        this.errorMsg =

          'Error cargando pacientes';

        this.loading = false;
      }
    });
  }
}