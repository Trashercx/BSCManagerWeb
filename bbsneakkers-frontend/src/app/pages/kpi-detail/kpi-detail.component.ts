// kpi-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  standalone: true,
  selector: 'app-kpi-detail',
  templateUrl: './kpi-detail.component.html',
  styleUrls: ['./kpi-detail.component.css'],
  imports: [CommonModule, NgxChartsModule]
})
export class KpiDetailComponent implements OnInit {
  kpiId: string = '';
  kpi: any = null;
  historial: any[] = [];
  chartData: any[] = [];

  view: [number, number] = [700, 350];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.kpiId = this.route.snapshot.paramMap.get('id') || '';

    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };

    this.http.get<any>(`http://localhost:8000/api/kpi/${this.kpiId}/historial`, { headers })
      .subscribe(res => {
        this.kpi = res.kpi;
        this.historial = res.historial;

        this.chartData = [
          {
            name: 'Valor Actual',
            series: this.historial.map(s => ({
              name: this.formatearFecha(s.fecha),
              value: s.valor
            }))
          },
          {
            name: 'Meta',
            series: this.historial.map(s => ({
              name: this.formatearFecha(s.fecha),
              value: res.kpi.meta
            }))
          }
        ];
      });
  }

  formatearFecha(fecha: string): string {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-PE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }
}
