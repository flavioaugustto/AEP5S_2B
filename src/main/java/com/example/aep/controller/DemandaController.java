package com.example.aep.controller;

import com.example.aep.dto.ComentarioDTO;
import com.example.aep.dto.DashboardDTO;
import com.example.aep.model.enums.Prioridade;
import com.example.aep.service.DemandaService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.aep.dto.CriarDemandaDTO;
import com.example.aep.model.Demanda;
import org.springframework.web.bind.annotation.*;
import com.example.aep.model.enums.StatusDemanda;

import java.util.List;


@RestController
@RequestMapping("/demandas")
public class DemandaController {

    private final DemandaService service;

    public DemandaController(DemandaService service) {
        this.service = service;
    }

    @PostMapping
    public Demanda criarDemanda(
            @RequestBody CriarDemandaDTO dto) {

        return service.criarDemanda(dto);
    }

    @GetMapping
    public List<Demanda> listarDemandas() {
        return service.listarDemandas();
    }

    @GetMapping("/{id}")
    public Demanda buscarPorId(
            @PathVariable Long id) {

        return service.buscarPorId(id);
    }

    @GetMapping("/protocolo/{protocolo}")
    public Demanda buscarPorProtocolo(
            @PathVariable String protocolo) {

        return service.buscarPorProtocolo(protocolo);
    }

    @PutMapping("/{id}/status")
    public Demanda atualizarStatus(
            @PathVariable Long id,
            @RequestParam StatusDemanda status) {

        return service.atualizarStatus(id, status);
    }

    @GetMapping("/dashboard")
    public DashboardDTO dashboard() {
        return service.obterResumoDashboard();
    }

    @GetMapping("/status/{status}")
    public List<Demanda> buscarPorStatus(
            @PathVariable StatusDemanda status) {

        return service.buscarPorStatus(status);
    }

    @GetMapping("/prioridade/{prioridade}")
    public List<Demanda> buscarPorPrioridade(
            @PathVariable Prioridade prioridade) {

        return service.buscarPorPrioridade(prioridade);
    }

    @PutMapping("/{id}/responsavel")
    public Demanda atribuirResponsavel(
            @PathVariable Long id,
            @RequestParam String responsavel) {

        return service.atribuirResponsavel(
                id,
                responsavel
        );
    }

    @PostMapping("/{id}/comentarios")
    public Demanda adicionarComentario(
            @PathVariable Long id,
            @RequestBody ComentarioDTO dto) {

        return service.adicionarComentario(
                id,
                dto.getMensagem()
        );
    }

}