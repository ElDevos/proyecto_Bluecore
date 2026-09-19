import { Forms } from './forms/forms';
import { Lista } from './lista/lista';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Forms, Lista],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  pantalla: 'forms' | 'lista' = 'forms';

  cambiarPantalla() {
    this.pantalla = this.pantalla === 'forms'
      ? 'lista'
      : 'forms';
  }
}