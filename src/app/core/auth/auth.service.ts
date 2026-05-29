// auth/auth.service.ts
import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

type LoginApiResponse = {
  status: 'success' | 'error';
  message?: string;
  data?: {
    access_token?: string;
    user?: any;
  };
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'naticloud_token';
  private readonly USER_KEY = 'naticloud_user';

  private _token = signal<string | null>(this.getToken());
  token = computed(() => this._token());

  private _user = signal<any | null>(this.getUser());
  user = computed(() => this._user());

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {

  return this.http.post<any>(
    `${environment.apiBaseUrl}/Auth/login`,
    {
      email: email.trim(),
      password: password.trim()
    }
  ).pipe(

    tap((res) => {

      const token = res.data.access_token;
      const user = res.data.user;

      localStorage.setItem(
        'naticloud_token',
        token
      );

      localStorage.setItem(
        'naticloud_user',
        JSON.stringify(user)
      );

    })

  );
}

  logout() {
    this.clearToken();
    localStorage.removeItem(this.USER_KEY);
    this._user.set(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): any | null {
    const raw = localStorage.getItem(this.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  private setUser(user: any) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this._user.set(user);
  }

  private setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
    this._token.set(token);
  }

  private clearToken() {
    localStorage.removeItem(this.TOKEN_KEY);
    this._token.set(null);
  }
}
