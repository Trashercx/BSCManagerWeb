import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

    getUsers(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/users`);
    }
    register(userData: any) {
        return this.http.post(`${this.apiUrl}/auth/register`, userData);
    }
 

    update(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/users/${id}`, data); // Asegúrate de tener esta ruta en backend
    }

    delete(id: number) {
    return this.http.delete(`${this.apiUrl}/users/${id}`); // Asegúrate también
    }

}
