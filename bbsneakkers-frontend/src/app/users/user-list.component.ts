import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../core/user.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../core/loading.service';

@Component({
  standalone: true,
  selector: 'app-user-list',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {
  users: any[] = [];
  bscs: any[] = [];
  mostrarModal = false;
  modoEdicion = false;
  usuarioEditandoId: number | null = null;

  nuevoUsuario = {
    name: '',
    email: '',
    password: '',
    role_id: '',
    unidad_negocio: ''
  };
  usuarioAEliminar: any = null;

  constructor(
    private userService: UserService, 
    private http: HttpClient, 
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef // Agregar ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Opción 1: Usar setTimeout para diferir la carga
    setTimeout(() => {
      this.cargarUsuarios();
      this.cargarBSCs();
    }, 0);
  }

  // Opción 2: Usar AfterViewInit en lugar de ngOnInit
  ngAfterViewInit(): void {
    // Mover la carga aquí si prefieres esta opción
    // this.cargarUsuarios();
    // this.cargarBSCs();
  }

  cargarUsuarios() {
    this.loadingService.show();
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res;
        this.loadingService.hide();
        // Opción 3: Forzar detección de cambios
        this.cdr.detectChanges();
      },
      error: () => {
        this.loadingService.hide();
        this.cdr.detectChanges();
        alert('Error al cargar usuarios');
      }
    });
  }

  cargarBSCs() {
    this.loadingService.show();
    this.http.get('http://localhost:8000/api/bsc').subscribe({
      next: (res: any) => {
        this.bscs = res;
        this.loadingService.hide();
        this.cdr.detectChanges();
      },
      error: () => {
        this.loadingService.hide();
        this.cdr.detectChanges();
        console.error('Error al cargar BSCs');
      }
    });
  }

  abrirModalEdicion(usuario: any) {
    this.mostrarModal = true;
    this.modoEdicion = true;
    this.usuarioEditandoId = usuario.id;
    this.nuevoUsuario = {
      name: usuario.name,
      email: usuario.email,
      password: '', // no se puede autocompletar por seguridad
      role_id: usuario.role_id,
      unidad_negocio: usuario.unidad_negocio || ''
    };
  }

  abrirModalCreacion() {
    this.mostrarModal = true;
    this.modoEdicion = false;
    this.usuarioEditandoId = null;
    this.nuevoUsuario = {
      name: '',
      email: '',
      password: '',
      role_id: '',
      unidad_negocio: ''
    };
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.usuarioEditandoId = null;
  }

  registrarUsuario() {
    this.loadingService.show();
    this.userService.register(this.nuevoUsuario).subscribe({
      next: () => {
        this.cerrarModal();
        this.cargarUsuarios();
        this.loadingService.hide();
        this.cdr.detectChanges();
      },
      error: () => {
        this.loadingService.hide();
        this.cdr.detectChanges();
        alert('Error al registrar usuario');
      }
    });
  }

  actualizarUsuario() {
    if (!this.usuarioEditandoId) return;
    this.loadingService.show();
    this.userService.update(this.usuarioEditandoId, this.nuevoUsuario).subscribe({
      next: () => {
        this.cerrarModal();
        this.cargarUsuarios();
        this.loadingService.hide();
        this.cdr.detectChanges();
      },
      error: () => {
        this.loadingService.hide();
        this.cdr.detectChanges();
        alert('Error al actualizar usuario');
      }
    });
  }

  eliminarUsuario(id: number) {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;
    this.userService.delete(id).subscribe({
      next: () => {
        this.cargarUsuarios();
        this.cdr.detectChanges();
      },
      error: () => {
        this.cdr.detectChanges();
        alert('Error al eliminar usuario');
      }
    });
  }

  guardarUsuario() {
    this.modoEdicion ? this.actualizarUsuario() : this.registrarUsuario();
  }

  abrirModalEliminarUsuario(usuario: any) {
    this.usuarioAEliminar = usuario;
  }

  confirmarEliminarUsuario() {
    if (!this.usuarioAEliminar) return;
    this.loadingService.show();
    this.userService.delete(this.usuarioAEliminar.id).subscribe({
      next: () => {
        this.usuarioAEliminar = null;
        this.cargarUsuarios();
        this.loadingService.hide();
        this.cdr.detectChanges();
        alert('Usuario eliminado correctamente');
      },
      error: () => {
        this.loadingService.hide();
        this.cdr.detectChanges();
        alert('Error al eliminar usuario');
      }
    });
  }
}