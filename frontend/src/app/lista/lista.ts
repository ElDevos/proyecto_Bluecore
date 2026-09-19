import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Solicitud {
  id: number;
  cedula: string;
  monto: number;
  plazo: number;
  estado: 'Pendiente' | 'Aprobada' | 'Rechazada';
}

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista.html',
  styleUrl: './lista.css'
})
export class Lista {
  filtroEstado: string = 'TODOS';

  solicitudes: Solicitud[] = [
    { id: 1, cedula: '8-123-456', monto: 15000, plazo: 24, estado: 'Pendiente' },
    { id: 2, cedula: '4-789-101', monto: 5000, plazo: 12, estado: 'Aprobada' },
    { id: 3, cedula: '3-555-999', monto: 45000, plazo: 60, estado: 'Rechazada' }
  ];

  get solicitudesFiltradas(): Solicitud[] {
    if (this.filtroEstado === 'TODOS') {
      return this.solicitudes;
    }
    return this.solicitudes.filter(s => s.estado === this.filtroEstado);
  }

  aprobar(solicitud: Solicitud): void {
    solicitud.estado = 'Aprobada';
  }

  rechazar(solicitud: Solicitud): void {
    solicitud.estado = 'Rechazada';
  }

  // Permite corregir errores y volver a evaluar la solicitud
  cancelar(solicitud: Solicitud): void {
    solicitud.estado = 'Pendiente';
  }
}