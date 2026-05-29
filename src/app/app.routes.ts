// app.routes.ts

import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { ShellComponent } from './core/layout/shell/shell';

export const routes: Routes = [

  // =========================
  // REDIRECT INICIAL
  // =========================
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login'
  },

  // =========================
  // AUTH
  // =========================
  {
    path: 'auth',

    children: [

      {
        path: 'login',

        loadComponent: () =>
          import('./features/auth/login/login')
            .then((m) => m.LoginComponent),
      },

    ],
  },

  // =========================
  // LAYOUT PRINCIPAL
  // =========================
  {
    path: '',

    component: ShellComponent,

    canActivate: [authGuard],

    children: [

      // =========================
      // HOME
      // =========================
      {
        path: 'home',

        loadComponent: () =>
          import('./features/home/home')
            .then((m) => m.HomeComponent),
      },

      // =========================
      // DASHBOARD
      // =========================
      {
        path: 'medico/dashboard',

        loadComponent: () =>
          import('./features/medico/dashboard/dashboard')
            .then((m) => m.DashboardComponent),
      },

      // =========================
      // DETALLE MONITOR
      // =========================
      {
        path: 'monitor/:id',

        loadComponent: () =>
          import('./features/medico/monitor-detail/monitor-detail')
            .then((m) => m.MonitorDetailComponent),
      },

      // =========================
      // PACIENTES
      // =========================
      {
        path: 'patients',

        loadComponent: () =>
          import('./features/patients/patients')
            .then((m) => m.PatientsComponent),
      },

      // =========================
      // VENTILADORES
      // =========================
      {
        path: 'ventilators',

        loadComponent: () =>
          import('./features/ventilators/ventilators')
            .then((m) => m.VentilatorsComponent),
      },

    ],
  },

  // =========================
  // 404
  // =========================
  {
    path: '**',
    redirectTo: 'auth/login'
  },

];