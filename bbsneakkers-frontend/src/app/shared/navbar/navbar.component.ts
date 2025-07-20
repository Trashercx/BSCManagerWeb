import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  user: any;
  darkMode = false;

  constructor(private auth: AuthService, private router: Router) {
    this.user = this.auth.getUserFromToken();
  }

  ngOnInit(): void {
    const modo = localStorage.getItem('darkMode');
    this.darkMode = modo === 'true';
    this.aplicarModo();
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', String(this.darkMode));
    this.aplicarModo();
  }

  aplicarModo() {
    const html = document.documentElement;
    if (this.darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  esAdmin(): boolean {
    return this.user?.role?.name === 'admin';
  }

  esEstrategico(): boolean {
    return this.user?.role?.name === 'estrategico';
  }

  esOperativo(): boolean {
    return this.user?.role?.name === 'operativo';
  }
}
