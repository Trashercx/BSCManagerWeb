import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  email = '';
  password = '';
  isLoading = false;
  loadingMessage = 'Iniciando sesión...';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.isLoading = true;
    this.loadingMessage = 'Verificando credenciales...';

    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.loadingMessage = 'Obteniendo información del usuario...';
        
        this.auth.getUserInfo().subscribe({
          next: user => {
            const rol = user?.role?.name;
            this.loadingMessage = 'Redirigiendo...';

            // Pequeño delay para mostrar el mensaje de redirección
            setTimeout(() => {
              if (rol === 'admin' || rol === 'estrategico') {
                this.router.navigate(['/bsc']);
              } else if (rol === 'operativo') {
                this.router.navigate(['/seguimiento']);
              } else {
                this.isLoading = false;
                alert('Rol desconocido');
              }
            }, 500);
          },
          error: () => {
            this.isLoading = false;
            alert('No se pudo obtener la información del usuario');
          }
        });
      },
      error: () => {
        this.isLoading = false;
        alert('Credenciales inválidas');
      }
    });
  }
}