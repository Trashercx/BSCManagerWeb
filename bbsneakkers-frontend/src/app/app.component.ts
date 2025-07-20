import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component'; // Ajusta según tu estructura
import { LoadingService } from './core/loading.service';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading$: Observable<boolean>;
  darkMode = false;
  title = "BBSNEAKERS"
  constructor(private router: Router, private loadingService: LoadingService) {
        this.loading$ = this.loadingService.loading$;

  }

  // Esta función devuelve true si la ruta actual es /login
  esLogin(): boolean {
    return this.router.url === '/login';
  }

   toggleDarkMode() {
    this.darkMode = !this.darkMode;

    if (this.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
