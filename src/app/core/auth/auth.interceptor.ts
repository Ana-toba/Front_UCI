import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // NO agregar token al login
    if (req.url.includes('/Auth/login')) {
      return next.handle(req);
    }

    const token = this.auth.getToken();

    const authReq = token
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        })
      : req;

    return next.handle(authReq).pipe(

      catchError((err: HttpErrorResponse) => {

        const status = err?.status;

        if (status === 401 || status === 422) {

          const url = this.router.url || '';

          this.auth.logout();

          if (!url.includes('/login')) {

            this.router.navigate(
              ['/login'],
              {
                queryParams: {
                  reason: 'expired'
                },
              }
            );

          }

        }

        return throwError(() => err);

      })

    );
  }
}