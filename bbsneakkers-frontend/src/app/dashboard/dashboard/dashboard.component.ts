// dashboard.component.ts - MODIFICACIONES
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxChartsModule, ScaleType, LegendPosition } from '@swimlane/ngx-charts';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { DashboardService } from '../../core/dashboard.service';
import { NavigationEnd } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, NgxChartsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  bscId = '';
  resumen: any[] = [];
  estadoData: any[] = [];
  barChartData: any[] = [];
  kpis: any[] = [];

  selectedTab: 'tabla' | 'pastel' | 'barras' | 'kpis' = 'tabla';

  view: [number, number] = [700, 400];
  legendPosition = LegendPosition.Right;

  // 👇 Agregar subscription
  private refreshSubscription?: Subscription;

  colorScheme = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#22c55e', '#facc15', '#ef4444']
  };

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.bscId = this.route.snapshot.paramMap.get('bscId') || '';
    this.cargarResumen();
    this.cargarKPIs();

    // 👇 Suscribirse a cambios del dashboard
    this.refreshSubscription = this.dashboardService.refreshDashboard.subscribe(bscId => {
      if (bscId === this.bscId) {
        this.cargarResumen();
        this.cargarKPIs();
      }
    });

    // 👇 También escuchar cambios de ruta
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url.includes('/dashboard/')) {
        const newBscId = this.route.snapshot.paramMap.get('bscId') || '';
        if (newBscId !== this.bscId) {
          this.bscId = newBscId;
          this.cargarResumen();
          this.cargarKPIs();
        }
      }
    });
  }

  ngOnDestroy(): void {
    // 👇 Limpiar subscripción para evitar memory leaks
    this.refreshSubscription?.unsubscribe();
  }

  cargarResumen(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>(`http://localhost:8000/api/dashboard/${this.bscId}`, { headers })
      .subscribe(data => {
        this.resumen = data.map(p => ({
          nombre: p.perspectiva,
          cumplimiento: parseFloat(p.cumplimiento_promedio),
          estado: this.getEstadoNombre(p.estado)
        }));

        this.estadoData = [
          { name: 'Bueno', value: this.resumen.filter(p => p.estado === 'Bueno').length },
          { name: 'Regular', value: this.resumen.filter(p => p.estado === 'Regular').length },
          { name: 'Bajo', value: this.resumen.filter(p => p.estado === 'Bajo').length }
        ];

        this.setBarChartData();
      });
  }

  cargarKPIs(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>(`http://localhost:8000/api/bsc/${this.bscId}/kpis`, { headers })
      .subscribe(data => this.kpis = data);
  }

  // ... resto de métodos igual
  setBarChartData() {
    this.barChartData = this.resumen.map(p => ({
      name: p.nombre,
      value: p.cumplimiento
    }));
  }

  getEstadoNombre(color: string): string {
    switch (color) {
      case 'verde': return 'Bueno';
      case 'amarillo': return 'Regular';
      case 'rojo': return 'Bajo';
      default: return 'Sin datos';
    }
  }

  getEstado(cumplimiento: number): string {
    if (cumplimiento >= 80) return 'Bueno';
    if (cumplimiento >= 60) return 'Regular';
    return 'Bajo';
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