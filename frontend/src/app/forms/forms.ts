import { Component, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core'; // 1. Importa ChangeDetectorRef
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudService } from '../services/solicitud';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forms.html',
  styleUrl: './forms.css'
})
export class Forms {
  
  solicitud = {
    cedula: '',
    monto: null as number | null,
    plazoMeses: null as number | null
  };

  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  constructor(
    private solicitudService: SolicitudService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef 
  ) {}

  crearSolicitud() {
    if (!isPlatformBrowser(this.platformId)) {
      return; 
    }

    this.mensajeExito = null;
    this.mensajeError = null;
    
    //Validación de datos
    const { cedula, monto, plazoMeses } = this.solicitud;

    if (!cedula || !monto || !plazoMeses) {
      this.mensajeError = 'Por favor, complete todos los campos.';
      return;
    }

    if (monto < 500 || monto > 50000) {
      this.mensajeError = 'El monto debe estar entre $500 y $50,000.';
      return;
    }

    if (plazoMeses < 6 || plazoMeses > 60) {
      this.mensajeError = 'El plazo debe estar entre 6 y 60 meses.';
      return;
    }

    // Petición POST hacia Spring Boot y AWS Aurora
    this.solicitudService.crearSolicitud(this.solicitud).subscribe({
      next: (respuesta: any) => {
        console.log('Respuesta del servidor:', respuesta);
        
        
        this.mensajeExito = `¡Solicitud creada y guardada con éxito! ID: ${respuesta.id}`;
        
        // Limpiar formulario
        this.solicitud = {
          cedula: '',
          monto: null,
          plazoMeses: null
        };

        // Detectar cambios y Pintar alerta
        this.cdr.detectChanges();

        
        setTimeout(() => {
          this.mensajeExito = null;
          this.cdr.detectChanges(); 
        }, 6000);
      },
      error: (err: any) => {
        console.error('Error al conectar con el backend:', err);
        this.mensajeError = 'Ocurrió un error al guardar la solicitud en el servidor.';
        this.cdr.detectChanges(); 
      }
    });
  }
}