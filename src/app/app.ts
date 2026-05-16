import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'; // 👈 Añade estos dos
import { PrimeImportsModule } from './prime-imports';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, PrimeImportsModule], // 👈 Agrégalos aquí
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'mi-nuevo-proyecto';
}
