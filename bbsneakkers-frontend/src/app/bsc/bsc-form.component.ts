import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-bsc-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './bsc-form.component.html',
  styleUrls: ['./bsc-form.component.css']
})
export class BscFormComponent {
  nombre = '';
  mision = '';
  vision = '';
  unidad_negocio = '';
  mensaje = '';
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  crear() {
    this.mensaje = '';
    this.error = '';

    this.http.post('http://localhost:8000/api/bsc', {
      nombre: this.nombre,
      mision: this.mision,
      vision: this.vision,
      unidad_negocio: this.unidad_negocio
    }).subscribe({
      next: () => {
        this.mensaje = '✅ BSC creado correctamente';
        setTimeout(() => this.router.navigate(['/bsc']), 1500);
      },
      error: err => this.error = '❌ Error al crear BSC'
    });
  }
}
