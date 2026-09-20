import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private apiUrl = 'http://localhost:8080/api/solicitudes';

  constructor(private http: HttpClient) {}

  // Método POST - Forms
  crearSolicitud(solicitud: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, solicitud);
  }

  // Método GET - Listar solicitud
  obtenerSolicitudes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Método PATCH  - Cambiar estado
  actualizarEstado(id: number, estado: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/estado`, { estado });
  }
}

