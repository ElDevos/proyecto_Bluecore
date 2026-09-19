import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forms.html',
  styleUrl: './forms.css'
})
export class Forms {
  // Encapsulamos las propiedades dentro del objeto "solicitud"
  solicitud = {
    cedula: '',
    monto: null as number | null,
    plazo: null as number | null
  };

  crearSolicitud() {
    const { cedula, monto, plazo } = this.solicitud;

    if (!cedula || !monto || !plazo) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    if (monto < 500 || monto > 50000) {
      alert('El monto debe estar entre $500 y $50,000.');
      return;
    }

    if (plazo < 6 || plazo > 60) {
      alert('El plazo debe estar entre 6 y 60 meses.');
      return;
    }

    console.log('Solicitud creada:', this.solicitud);
    alert('Solicitud creada correctamente.');

    // Limpiar formulario
    this.solicitud = {
      cedula: '',
      monto: null,
      plazo: null
    };
  }
}