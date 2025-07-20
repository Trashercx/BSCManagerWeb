// dashboard.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private refreshDashboard$ = new Subject<string>();
  
  // Observable que otros componentes pueden suscribirse
  refreshDashboard = this.refreshDashboard$.asObservable();

  // Método para notificar que se debe refrescar el dashboard
  triggerRefresh(bscId: string) {
    this.refreshDashboard$.next(bscId);
  }
}