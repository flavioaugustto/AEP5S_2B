package com.example.aep.repository;

import com.example.aep.model.Demanda;
import com.example.aep.model.enums.Prioridade;
import com.example.aep.model.enums.StatusDemanda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DemandaRepository extends JpaRepository<Demanda, Long> {
    Optional<Demanda> findByProtocolo(String protocolo);

    List<Demanda> findByStatus(StatusDemanda status);

    List<Demanda> findByPrioridade(Prioridade prioridade);
}
