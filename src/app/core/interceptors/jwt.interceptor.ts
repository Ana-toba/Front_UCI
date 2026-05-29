import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.getToken();

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((err: any) => {
      const status = err?.status;

      // Flask-JWT-Extended:
      // - 401: token expired / missing / invalid (común)
      // - 422: invalid token (a veces)
      if (status === 401 || status === 422) {
        const url = router.url || '';
        auth.logout();

        // Evita loop si ya estás en el login real (/auth/login)
        if (!url.startsWith('/auth/login')) {
          // microtask para evitar choque con navegación en curso
          setTimeout(() => {
            router.navigateByUrl('/auth/login?reason=expired');
          }, 0);
        }
      }

      return throwError(() => err);
    })
  );
};
