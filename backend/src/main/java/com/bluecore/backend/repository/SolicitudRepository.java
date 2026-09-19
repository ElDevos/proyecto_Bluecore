package com.bluecore.backend.repository;

import com.bluecore.backend.model.EstadoSolicitud;
import com.bluecore.backend.model.SolicitudCredito;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SolicitudRepository extends JpaRepository<SolicitudCredito, Long> {
    List<SolicitudCredito> findByEstado(EstadoSolicitud estado);
}