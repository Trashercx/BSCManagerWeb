import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  standalone: true,
  selector: 'app-bsc-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './bsc-detail.component.html',
  styleUrls: ['./bsc-detail.component.css']
  
})

export class BscDetailComponent implements OnInit {
  bscId!: number;
  bsc: any;
  error = '';
  nuevaPerspectiva = '';
  objetivosPorPerspectiva: { [key: number]: string } = {};
  sugerenciasObjetivos = [
  'Incrementar ventas',
  'Reducir costos',
  'Mejorar satisfacción del cliente',
  'Optimizar procesos internos',
  'Capacitación del personal',
  'Innovación en productos'
  ];
  modalObjetivo: any = null; // contiene objetivo completo
  formKPI = {
    nombre: '',
    meta: null,
    unidad_medida: '',
    frecuencia: ''
  };

  modalEditarObjetivo: boolean = false;
  objetivoEditando: any = null;
  nuevoNombreObjetivo: string = '';
  objetivoAEliminar: { id: number, nombre: string } | null = null;


  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    this.bscId = paramId ? +paramId : 0;

    if (!this.bscId || isNaN(this.bscId)) {
      this.error = 'ID de BSC inválido';
      return;
    }

    this.cargarBSC();
  }


  cargarBSC() {
    this.http.get(`http://localhost:8000/api/bsc/${this.bscId}`).subscribe({
      next: (res) => this.bsc = res,
      error: () => this.error = 'Error al cargar el BSC'
    });
  }

  agregarPerspectiva() {
    if (!this.nuevaPerspectiva.trim()) return;

    this.http.post(`http://localhost:8000/api/bsc/${this.bscId}/perspectivas`, {
      nombre: this.nuevaPerspectiva
    }).subscribe({
      next: () => {
        this.nuevaPerspectiva = '';
        this.cargarBSC(); // Recargar datos
      },
      error: () => this.error = 'Error al crear perspectiva'
    });
  }
  agregarObjetivo(perspectivaId: number) {
  const nombre = this.objetivosPorPerspectiva[perspectivaId]?.trim();
  if (!nombre) return;

  this.http.post(`http://localhost:8000/api/perspectivas/${perspectivaId}/objetivos`, {
    nombre
  }).subscribe({
    next: () => {
      this.objetivosPorPerspectiva[perspectivaId] = '';
      this.cargarBSC();
    },
    error: () => this.error = 'Error al agregar objetivo'
  });
}
  editarObjetivo(perspectivaId: number, objetivo: any) {
    this.objetivoEditando = { ...objetivo };
    this.nuevoNombreObjetivo = objetivo.nombre;
    this.modalEditarObjetivo = true;
  }


  eliminarObjetivo(perspectivaId: number, objetivoId: number) {
    if (!confirm('¿Estás seguro de eliminar este objetivo?')) return;

    this.http.delete(`http://localhost:8000/api/objetivos/${objetivoId}`)
      .subscribe(() => this.cargarBSC());
  }
  abrirModal(objetivo: any) {
  this.modalObjetivo = objetivo;

  
  if (objetivo.kpis && objetivo.kpis.length > 0) {
    const kpi = objetivo.kpis[0];
    this.formKPI = {
      nombre: kpi.nombre,
      meta: kpi.meta,
      unidad_medida: kpi.unidad_medida,
      frecuencia: kpi.frecuencia
    };
  } else {
    
    this.formKPI = {
      nombre: '',
      meta: null,
      unidad_medida: '',
      frecuencia: ''
    };
  }
}



 cerrarModal() {
  this.modalObjetivo = null;
}

guardarKPI() {
  if (!this.modalObjetivo) return;

  const kpiExistente = this.modalObjetivo.kpis?.[0];

  const url = kpiExistente
    ? `http://localhost:8000/api/kpis/${kpiExistente.id}`
    : `http://localhost:8000/api/objetivos/${this.modalObjetivo.id}/kpis`;

  const request = kpiExistente
    ? this.http.put(url, this.formKPI)
    : this.http.post(url, this.formKPI);

  request.subscribe({
    next: () => {
      this.cerrarModal();
      this.cargarBSC();
    },
    error: () => alert('Error al guardar KPI')
  });
}


  guardarEdicionObjetivo() {
  if (!this.objetivoEditando || !this.nuevoNombreObjetivo.trim()) return;

  const id = this.objetivoEditando.id;

  this.http.put(`http://localhost:8000/api/objetivos/${id}`, {
    nombre: this.nuevoNombreObjetivo.trim()
  }).subscribe(() => {
    this.modalEditarObjetivo = false;
    this.objetivoEditando = null;
    this.nuevoNombreObjetivo = '';
    this.cargarBSC();
  });
}
abrirModalEliminarObjetivo(objetivo: any) {
  this.objetivoAEliminar = objetivo;
}

cerrarModalEliminarObjetivo() {
  this.objetivoAEliminar = null;
}
confirmarEliminarObjetivo() {
  if (!this.objetivoAEliminar) return;

  this.http.delete(`http://localhost:8000/api/objetivos/${this.objetivoAEliminar.id}`)
    .subscribe({
      next: () => {
        this.cerrarModalEliminarObjetivo();
        this.cargarBSC();
      },
      error: () => alert('Error al eliminar objetivo')
    });
}
eliminarKPI() {
  if (!this.modalObjetivo || !this.modalObjetivo.kpis?.length) return;

  const kpiId = this.modalObjetivo.kpis[0].id;

  if (!confirm('¿Estás seguro de eliminar este KPI?')) return;

  this.http.delete(`http://localhost:8000/api/kpis/${kpiId}`)
    .subscribe({
      next: () => {
        this.cerrarModal();
        this.cargarBSC();
      },
      error: () => alert('Error al eliminar KPI')
    });
}
exportar(tipo: 'excel' | 'pdf') {
  const url = `http://localhost:8000/api/export/bsc/${this.bscId}/${tipo}`;

  this.http.get(url, { responseType: 'blob' }).subscribe(blob => {
    const file = new Blob([blob], {
      type: tipo === 'excel' ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : 'application/pdf'
    });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = `bsc_${this.bscId}.${tipo === 'excel' ? 'xlsx' : 'pdf'}`;
    a.click();
    URL.revokeObjectURL(a.href);
  }, err => {
    console.error('Error al descargar archivo', err);
    alert('No se pudo descargar el archivo');
  });
}


}
