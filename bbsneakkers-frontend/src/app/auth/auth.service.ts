import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // cambia si usas otro puerto

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.access_token);
        }),
        switchMap(() => this.http.get(`${this.apiUrl}/auth/me`)), // 👈 aquí pedimos los datos del usuario
        tap(user => {
          localStorage.setItem('user', JSON.stringify(user)); // 👈 guardamos el usuario
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserInfo() {
  return this.http.get<any>(`${this.apiUrl}/auth/me`);
  }
  getProfile() {
    return this.http.get<any>(`${this.apiUrl}/auth/me`);
  }
  getUserFromToken() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getUserRole(): string | null {
    const user = this.getUserFromToken();
    return user?.role?.name ?? null; // o user?.role_id si usas id
  }

}
