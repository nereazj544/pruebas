// app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NovedadesComponent } from "./components/novedades/novedades.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NovedadesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Api_Prueba';
}