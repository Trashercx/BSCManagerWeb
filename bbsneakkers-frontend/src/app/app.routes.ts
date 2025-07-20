import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'dashboard/:bscId', loadComponent: () => import('./dashboard/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'bsc', loadComponent: () => import('./bsc/bsc-list/bsc-list.component').then(m => m.BscListComponent) },
  { path: 'seguimiento', loadComponent: () => import('./seguimiento/seguimiento-list/seguimiento-list.component').then(m => m.SeguimientoListComponent) },
  { path: 'usuarios', loadComponent: () => import('./users/user-list.component').then(m => m.UserListComponent) },
  { path: 'usuarios/crear', loadComponent: () => import('./users/user-form.component').then(m => m.UserFormComponent) },
  { path: 'bsc/crear', loadComponent: () => import('./bsc/bsc-form.component').then(m => m.BscFormComponent) },
  { path: 'bsc/:id', loadComponent: () => import('./bsc/bsc-detail.component').then(m => m.BscDetailComponent) },
  { path: 'kpi/:id/detalle', loadComponent: () => import('./pages/kpi-detail/kpi-detail.component').then(m => m.KpiDetailComponent)
}


];
