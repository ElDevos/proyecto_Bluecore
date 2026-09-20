import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudService } from '../services/solicitud'; 

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
export class Lista implements OnInit {
  filtroEstado: string = 'TODOS';
  

  solicitudes: Solicitud[] = [];

  constructor(
    private solicitudService: SolicitudService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  // Método GET - Obtener lista desde backend
  cargarSolicitudes(): void {
    this.solicitudService.obtenerSolicitudes().subscribe({
      next: (data: any[]) => {
        this.solicitudes = data.map(item => ({
          id: item.id,
          cedula: item.cedula,
          monto: item.monto,
          plazo: item.plazoMeses ?? item.plazo, 
          estado: item.estado ? (item.estado.charAt(0).toUpperCase() + item.estado.slice(1).toLowerCase()) : 'Pendiente'
        }));

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar las solicitudes desde el servidor:', err);
      }
    });
  }

  //Filtros de estados
  get solicitudesFiltradas(): Solicitud[] {
    if (this.filtroEstado === 'TODOS') {
      return this.solicitudes;
    }
    return this.solicitudes.filter(s => s.estado === this.filtroEstado);
  }

  //Botones
  aprobar(solicitud: Solicitud): void {
    this.cambiarEstadoBackend(solicitud, 'APROBADA');
  }

  rechazar(solicitud: Solicitud): void {
    this.cambiarEstadoBackend(solicitud, 'RECHAZADA');
  }

  cancelar(solicitud: Solicitud): void {
    this.cambiarEstadoBackend(solicitud, 'PENDIENTE');
  }

  // Método para actualizar estado
  private cambiarEstadoBackend(solicitud: Solicitud, nuevoEstadoAPI: string): void {
    this.solicitudService.actualizarEstado(solicitud.id, nuevoEstadoAPI).subscribe({
      next: () => {
        if (nuevoEstadoAPI === 'APROBADA') solicitud.estado = 'Aprobada';
        else if (nuevoEstadoAPI === 'RECHAZADA') solicitud.estado = 'Rechazada';
        else solicitud.estado = 'Pendiente';

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al actualizar el estado en el servidor:', err);
        alert('No se pudo actualizar el estado de la solicitud.');
      }
    });
  }
}