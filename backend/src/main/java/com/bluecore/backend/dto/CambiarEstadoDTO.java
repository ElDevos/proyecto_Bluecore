package com.bluecore.backend.dto;
import com.bluecore.backend.model.EstadoSolicitud;

import jakarta.validation.constraints.NotNull;

public class CambiarEstadoDTO {

    @NotNull(message = "El estado es obligatorio")
    private EstadoSolicitud estado;

    // Getters y Setters
    public EstadoSolicitud getEstado() { return estado; }
    public void setEstado(EstadoSolicitud estado) { this.estado = estado; }
}