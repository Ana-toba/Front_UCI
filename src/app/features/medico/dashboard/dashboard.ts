// dashboard.ts - Componente de dashboard para mostrar datos en tiempo real de ventiladores
import {

  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  inject

} from '@angular/core';

import { CommonModule } from '@angular/common';


import { Router } from '@angular/router';
import {

  RealtimeService

} from '../../../core/services/realtime.service';

import {

  interval,
  Subscription

} from 'rxjs';

import {

  MedicionesService

} from '../../../core/services/mediciones.service';



@Component({

  selector: 'app-dashboard',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './dashboard.html',

  styleUrls: ['./dashboard.scss']

})

export class DashboardComponent
implements OnInit, OnDestroy {

  // =====================================
  // INJECTS
  // =====================================

  private medicionesService =
  inject(MedicionesService);

  private realtimeService =
  inject(RealtimeService);

  private cdr =
    inject(ChangeDetectorRef);

  private router =
    inject(Router);

  // =====================================
  // TIMER
  // =====================================

  refreshSub?: Subscription;

  // =====================================
  // VENTILADORES
  // =====================================

  ventiladores = [

    // =================================
    // REALTIME
    // =================================

    {
      id: 1,
      cama: 'CAMA 1',
      modo: '--',
      ppico: '--',
      volMinEsp: '--',
      vte: '--',
      fTotal: '--',
      nombreParametro: '--',
      valorParametro: '--',
      peep: '--',
      oxigeno: '--',
      gsImage: null,
      giImage: null,
      ginfImage: null,
      activo: false
    },

    // =================================
    // SIMULADOS
    // =================================

    {
      id: 2,

      cama: 'CAMA 2',

      modo: 'SIMV+',

      ppico: 18,

      volMinEsp: 7.1,

      vte: 520,

      fTotal: 18,

      nombreParametro: 'Vt',

      valorParametro: 520,

      peep: 8,

      oxigeno: 40,
      gsImage: null,
      giImage: null,
      ginfImage: null,

      activo: true
    },

    {
      id: 3,

      cama: 'CAMA 3',

      modo: 'PCV+',

      ppico: 22,

      volMinEsp: 8.4,

      vte: 480,

      fTotal: 20,

      nombreParametro: 'Pcontrol',

      valorParametro: 22,

      peep: 10,

      oxigeno: 65,
      gsImage: null,
      giImage: null,
      ginfImage: null,

      activo: false
    },

    {
      id: 4,

      cama: 'CAMA 4',

      modo: 'PSIMV+',

      ppico: 16,

      volMinEsp: 5.9,

      vte: 430,

      fTotal: 17,

      nombreParametro: 'Pinsp',

      valorParametro: 16,

      peep: 6,

      oxigeno: 45,
      gsImage: null,
      giImage: null,
      ginfImage: null,

      activo: true
    },

    {
      id: 5,

      cama: 'CAMA 5',

      modo: 'ASV',

      ppico: 20,

      volMinEsp: 7.8,

      vte: 510,

      fTotal: 19,

      nombreParametro: '%VolMin',

      valorParametro: 120,

      peep: 9,

      oxigeno: 55,
      gsImage: null,
      giImage: null,
      ginfImage: null,

      activo: true
    },

    {
      id: 6,

      cama: 'CAMA 6',

      modo: 'CPAP',

      ppico: 14,

      volMinEsp: 5.4,

      vte: 390,

      fTotal: 14,

      nombreParametro: '--',

      valorParametro: '--',

      peep: 5,

      oxigeno: 35,
      gsImage: null,
      giImage: null,
      ginfImage: null,

      activo: true
    },

    {
      id: 7,

      cama: 'CAMA 7',

      modo: 'APRV',

      ppico: 17,

      volMinEsp: 6.3,

      vte: 470,

      fTotal: 16,

      nombreParametro: '--',

      valorParametro: '--',

      peep: 7,

      oxigeno: 42,
      gsImage: null,
      giImage: null,
      ginfImage: null,

      activo: true
    },

    {
      id: 8,

      cama: 'CAMA 8',

      modo: 'BIPAP',

      ppico: 21,

      volMinEsp: 8.1,

      vte: 540,

      fTotal: 21,

      nombreParametro: '--',

      valorParametro: '--',

      peep: 11,

      oxigeno: 60,
      gsImage: null,
      giImage: null,
      ginfImage: null,

      activo: true
    },

    {
      id: 9,

      cama: 'CAMA 9',

      modo: 'PRVC',

      ppico: 19,

      volMinEsp: 7.4,

      vte: 500,

      fTotal: 18,

      nombreParametro: '--',

      valorParametro: '--',

      peep: 8,

      oxigeno: 48,
      gsImage: null,
      giImage: null,
      ginfImage: null,

      activo: false
    }
  ];

  // =====================================
  // INIT
  // =====================================

  ngOnInit(): void {

    this.loadDashboard();
    this.loadGraphs();

    this.refreshSub =

      interval(1000)

      .subscribe(() => {

        this.loadDashboard();
        this.loadGraphs();

      });
  }

  // =====================================
  // DESTROY
  // =====================================

  ngOnDestroy(): void {

    this.refreshSub?.unsubscribe();
  }

  // =====================================
  // REALTIME
  // =====================================

  loadDashboard(): void {

  this.medicionesService

    .getDashboard()

    .subscribe({

      next: (response: any) => {

        console.log(
          'DASHBOARD:',
          response
        );

        if (

          !response.data ||

          response.data.length === 0

        ) {

          return;
        }

        response.data.forEach(

          (dbVent: any) => {

            const index =

              this.ventiladores.findIndex(

                v => v.id === dbVent.id

              );

            if (index >= 0) {

              this.ventiladores[index] = {

                ...this.ventiladores[index],

                cama:
                  dbVent.cama,

                modo:
                  dbVent.modo,

                ppico:
                  dbVent.Ppico,

                volMinEsp:
                  dbVent.VolMinEsp,

                vte:
                  dbVent.VTE,

                fTotal:
                  dbVent.fTotal,

                nombreParametro:
                  dbVent.nombreParametro,

                valorParametro:
                  dbVent.valorParametro,

                peep:
                  dbVent.PEEP,

                oxigeno:
                  dbVent.Oxigeno,

                activo:
                  dbVent.activo
              };
            }
          }

        );

        this.ventiladores = [

          ...this.ventiladores

        ];

        this.cdr.detectChanges();
      },

      error: (err) => {

        console.error(err);
      }
    });
}
  loadGraphs(): void {

    this.realtimeService

      .getLatest()

      .subscribe({

        next: (response: any) => {

          if (!response.data) {

            return;
          }

          const realtime = response.data;

          const vent = this.ventiladores.find(

              (v: any) => v.id === 1

          ) as any;

          if (!vent) {

            return;
          }

          vent.gsImage =
            realtime.gsImage;

          vent.giImage =
            realtime.giImage;

          vent.ginfImage =
            realtime.ginfImage;

          this.ventiladores = [

            ...this.ventiladores

          ];

          this.cdr.detectChanges();
        },

        error: (err) => {

          console.error(err);
        }
      });
}

  // =====================================
  // OPEN MONITOR
  // =====================================

  openMonitor(id: number): void {

    this.router.navigate([

      '/monitor',
      id

    ]);
  }

  // =====================================
  // FULLSCREEN
  // =====================================

  toggleFullscreen(): void {

    if (!document.fullscreenElement) {

      document.documentElement
        .requestFullscreen();
    }

    else {

      document.exitFullscreen();
    }
  }
}