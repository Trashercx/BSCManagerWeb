import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { LoadingService } from '../../core/loading.service';
@Component({
  standalone: true,
  selector: 'app-bsc-list',
  templateUrl: './bsc-list.component.html',
  styleUrls: ['./bsc-list.component.css'],
  imports: [CommonModule,RouterModule, FormsModule],
  providers: [AuthService]
})

export class BscListComponent implements OnInit {
  bscs: any[] = [];
  modalVisible = false;
  editando = false;
  formBSC = { nombre: '', unidad_negocio: '', mision: '', vision: '' };
  bscEditId: number | null = null;
  confirmarEliminarId: number | null = null;
  user: any;
  cargando = false;

  constructor(private http: HttpClient, private router: Router, private authService:AuthService, private loadingService:LoadingService) {}

  ngOnInit() {
  this.user = this.authService.getUserFromToken();
  this.cargarBSCs();
  }
  esAdmin(): boolean {
    return this.user?.role?.name === 'admin';
  }

  esEstrategico(): boolean {
    return this.user?.role?.name === 'estrategico';
  }


  verDashboard(bscId: number) {
    this.router.navigate(['/dashboard', bscId]);
  }
  abrirCrear() {
  this.editando = false;
  this.formBSC = { nombre: '', unidad_negocio: '', mision: '', vision: '' };
  this.modalVisible = true;
}

abrirEditar(bsc: any) {
  this.editando = true;
  this.bscEditId = bsc.id;
  this.formBSC = { ...bsc };
  this.modalVisible = true;
}

cerrarModal() {
  this.modalVisible = false;
  this.bscEditId = null;
}

guardarBSC() {
  this.loadingService.show();
  const url = this.editando
    ? `http://localhost:8000/api/bsc/${this.bscEditId}`
    : 'http://localhost:8000/api/bsc';

  const method = this.editando ? this.http.put : this.http.post;

  method.call(this.http, url, this.formBSC).subscribe({
    next: () => {
      this.cerrarModal();
      this.cargarBSCs();
      this.loadingService.hide();
    },
    error: () => {
      alert('Error al guardar BSC');
      this.loadingService.hide();
    }
  });
}


confirmarEliminar(id: number) {
  this.confirmarEliminarId = id;
}

eliminarBSC() {
  this.loadingService.show();
  this.http.delete(`http://localhost:8000/api/bsc/${this.confirmarEliminarId}`).subscribe({
    next: () => {
      this.confirmarEliminarId = null;
      this.cargarBSCs();
      this.loadingService.hide();
    },
    error: () => {
      alert('Error al eliminar');
      this.loadingService.hide();
    }
  });
}

cargarBSCs() {
  this.cargando = true;
  this.http.get<any[]>('http://localhost:8000/api/bsc').subscribe({
    next: (data) => {
      this.bscs = data;
      this.cargando = false;
    },
    error: () => {
      alert('Error al cargar los BSCs');
      this.cargando = false;
    }
  });
}


}
