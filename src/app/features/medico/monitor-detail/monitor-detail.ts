// monitor-detail.ts - Componente para mostrar detalles de un ventilador específico, con datos en tiempo real o simulados
import {

  Component,
  inject,
  OnInit,
  OnDestroy,
  ChangeDetectorRef

} from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

import {

  interval,
  Subscription

} from 'rxjs';

import {

  RealtimeService

} from '../../../core/services/realtime.service';

@Component({

  selector: 'app-monitor-detail',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './monitor-detail.html',

  styleUrls: ['./monitor-detail.scss']

})

export class MonitorDetailComponent
implements OnInit, OnDestroy {

  // =====================================
  // INJECTS
  // =====================================

  private route =
    inject(ActivatedRoute);

  private realtimeService =
    inject(RealtimeService);

  private cdr =
    inject(ChangeDetectorRef);

  // =====================================
  // VARIABLES
  // =====================================

  ventilatorId!: number;

  refreshSub?: Subscription;

  measurement: any = {

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
  };

  // =====================================
  // INIT
  // =====================================

  ngOnInit(): void {

    this.ventilatorId = Number(

      this.route.snapshot
        .paramMap.get('id')

    );

    // =================================
    // SI ES EL REALTIME
    // =================================

    if (this.ventilatorId === 1) {

      this.loadRealtime();

      this.refreshSub =

        interval(1000)

        .subscribe(() => {

          this.loadRealtime();

        });
    }

    // =================================
    // SIMULADOS
    // =================================

    else {

      this.loadSimulated();
    }
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

  loadRealtime(): void {

    this.realtimeService

      .getLatest()

      .subscribe({

        next: (response: any) => {

          console.log(
            'DETAIL REALTIME:',
            response
          );

          // =============================
          // NO DATA
          // =============================

          if (!response.data) {
            this.measurement = {

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
            };

            this.cdr.detectChanges();

            return;
          }

          // =============================
          // DATA
          // =============================

          const d = response.data;

          this.measurement = {

            modo:
              d.modo || '--',

            ppico:
              d.ppico || '--',

            volMinEsp:
              d.volMinEsp || '--',

            vte:
              d.vte || '--',

            fTotal:
              d.fTotal || '--',

            nombreParametro:
              d.nombreParametro || '--',

            valorParametro:
              d.valorParametro || '--',

            peep:
              d.peep || '--',

            oxigeno:
              d.oxigeno || '--',
            
            gsImage:
              d.gsImage,

            giImage:
              d.giImage,

            ginfImage:
              d.ginfImage,

            activo: true
          };

          this.cdr.detectChanges();
        },

        error: (err) => {

          console.error(err);
        }
      });
  }

  // =====================================
  // SIMULADOS
  // =====================================

  loadSimulated(): void {

    const simulated: any = {

      2: {

        modo: 'SIMV+',

        ppico: 18,

        volMinEsp: 7.1,

        vte: 520,

        fTotal: 18,

        nombreParametro: 'Vt',

        valorParametro: 520,

        peep: 8,

        oxigeno: 40
      },

      3: {

        modo: 'PCV+',

        ppico: 22,

        volMinEsp: 8.4,

        vte: 480,

        fTotal: 20,

        nombreParametro: 'Pcontrol',

        valorParametro: 22,

        peep: 10,

        oxigeno: 65
      },

      4: {

        modo: 'PSIMV+',

        ppico: 16,

        volMinEsp: 5.9,

        vte: 430,

        fTotal: 17,

        nombreParametro: 'Pinsp',

        valorParametro: 16,

        peep: 6,

        oxigeno: 45
      }
    };

    this.measurement =

      simulated[this.ventilatorId];
  }
}