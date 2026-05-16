import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeImportsModule } from './prime-imports';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PrimeImportsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent { // 👈 Asegúrate de que diga 'AppComponent'
  title = 'mi-nuevo-proyecto';
}
