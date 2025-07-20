// ==========================================
// seguimiento-list.component.ts - MODIFICACIONES
// ==========================================

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Router, NavigationEnd } from '@angular/router';
import { DashboardService } from '../../core/dashboard.service';
@Component({
  standalone: true,
  selector: 'app-seguimiento-list',
  imports: [CommonModule, FormsModule, NgxChartsModule],
  templateUrl: './seguimiento-list.component.html'
})
export class SeguimientoListComponent implements OnInit {
  kpis: any[] = [];
  selectedKPI: any = null;
  valor_actual: number = 0;
  comentario: string = '';
  activeTab: 'formulario' | 'grafico' = 'formulario';

  view: [number, number] = [500, 300];
  chartData: any[] = [];
  xAxisLabel: string = 'Fecha';
  yAxisLabel: string = 'Valor';
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.router.url === '/dashboard') {
        this.cargarMisKpis();
      }
    });
    this.cargarMisKpis();
  }

  cargarMisKpis() {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };

    this.http.get<any[]>('http://localhost:8000/api/mis-kpis', { headers })
      .subscribe(data => this.kpis = data);
  }

  registrar() {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };

    this.http.post(`http://localhost:8000/api/kpis/${this.selectedKPI.id}/seguimientos`, {
      valor_actual: this.valor_actual,
      comentario: this.comentario
    }, { headers }).subscribe({
      next: () => {
        alert('Seguimiento registrado');

        const bscId = this.selectedKPI?.objetivo?.perspectiva?.bsc?.id;

        if (bscId) {
          // 👇 CAMBIO PRINCIPAL: Notificar al dashboard que se actualice
          this.dashboardService.triggerRefresh(bscId.toString());
          
          // Navegar al dashboard
          this.router.navigate(['/dashboard', bscId]);
        } else {
          console.warn('No se encontró el BSC ID en el KPI');
        }

        this.cerrarModal();
      },
      error: () => alert('Error al registrar seguimiento')
    });
  }

  // ... resto de métodos igual
  abrirFormulario(kpi: any) {
    this.selectedKPI = kpi;
    this.valor_actual = 0;
    this.comentario = '';
    this.activeTab = 'formulario';
    this.prepararDatosGrafico();
  }

  cerrarModal() {
    this.selectedKPI = null;
    this.chartData = [];
  }

  cargarSeguimientosActualizados(kpiId: number) {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };

    this.http.get<any>(`http://localhost:8000/api/kpis/${kpiId}`, { headers })
      .subscribe({
        next: (kpiActualizado) => {
          this.selectedKPI = kpiActualizado;
          this.prepararDatosGrafico();
        },
        error: () => alert('Error al cargar seguimientos actualizados')
      });
  }

  prepararDatosGrafico() {
    if (this.selectedKPI && this.selectedKPI.seguimientos) {
      const ordenados = [...this.selectedKPI.seguimientos].sort((a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );

      const series = ordenados.map((seguimiento: any) => ({
        name: this.formatearFecha(seguimiento.fecha_registro),
        value: Number(seguimiento.valor_actual)
      }));

      const metaSeries = ordenados.map((seguimiento: any) => ({
        name: this.formatearFecha(seguimiento.fecha_registro),
        value: Number(this.selectedKPI.meta)
      }));

      this.chartData = [
        { name: 'Valor Actual', series },
        { name: 'Meta', series: metaSeries }
      ];

      this.chartData = [...this.chartData];
    }
  }

  formatearFecha(fecha: string): string {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}
