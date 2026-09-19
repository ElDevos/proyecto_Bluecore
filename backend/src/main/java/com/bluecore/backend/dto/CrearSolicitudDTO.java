package com.bluecore.backend.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public class CrearSolicitudDTO {

    @NotNull(message = "El monto es obligatorio")
    @DecimalMin(value = "500.00", message = "El monto mínimo permitido es $500")
    @DecimalMax(value = "50000.00", message = "El monto máximo permitido es $50,000")
    private BigDecimal monto;

    @NotNull(message = "El plazo es obligatorio")
    @Min(value = 6, message = "El plazo mínimo es de 6 meses")
    @Max(value = 60, message = "El plazo máximo es de 60 meses")
    private Integer plazoMeses;

    @NotBlank(message = "La cédula del solicitante es obligatoria")
    private String cedula;

    // Getters y Setters
    public BigDecimal getMonto() { return monto; }
    public void setMonto(BigDecimal monto) { this.monto = monto; }

    public Integer getPlazoMeses() { return plazoMeses; }
    public void setPlazoMeses(Integer plazoMeses) { this.plazoMeses = plazoMeses; }

    public String getCedula() { return cedula; }
    public void setCedula(String cedula) { this.cedula = cedula; }
}