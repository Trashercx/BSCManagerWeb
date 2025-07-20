import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-user-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  name = '';
  email = '';
  password = '';
  role_id = 2; // Por defecto 'estratégico'

  roles = [
    { id: 1, name: 'admin' },
    { id: 2, name: 'estrategico' },
    { id: 3, name: 'operativo' }
  ];

  mensaje = '';
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  registrar() {
    this.mensaje = '';
    this.error = '';

    this.http.post('http://localhost:8000/api/auth/register', {
      name: this.name,
      email: this.email,
      password: this.password,
      role_id: this.role_id
    }).subscribe({
      next: () => {
      this.mensaje = '✅ Usuario creado correctamente';
      setTimeout(() => this.router.navigate(['/usuarios']), 1500);
    },

      error: err => this.error = '❌ Error: ' + (err.error.message || 'Error desconocido')
    });
  }
}
