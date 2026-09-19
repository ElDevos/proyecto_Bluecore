package com.bluecore.backend.dto;

import com.bluecore.backend.model.EstadoSolicitud;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CambiarEstadoDTO {

    @NotNull(message = "El estado es obligatorio")
    private EstadoSolicitud estado;

    @NotBlank(message = "El comentario es obligatorio al cambiar el estado")
    private String comentario;

    // Getters y Setters
    public EstadoSolicitud getEstado() { return estado; }
    public void setEstado(EstadoSolicitud estado) { this.estado = estado; }

    public String getComentario() { return comentario; }
    public void setComentario(String comentario) { this.comentario = comentario; }
}