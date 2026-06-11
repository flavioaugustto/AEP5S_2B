package com.example.aep.service;

import com.example.aep.dto.CriarDemandaDTO;
import com.example.aep.dto.DashboardDTO;
import com.example.aep.model.*;
import com.example.aep.model.enums.*;
import com.example.aep.repository.DemandaRepository;
import org.springframework.stereotype.Service;
import com.example.aep.dto.AtualizacaoDTO;
import java.util.Comparator;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DemandaService {

    private final DemandaRepository repository;

    public DemandaService(DemandaRepository repository) {
        this.repository = repository;
    }


    public List<Demanda> listarDemandas() {
        return repository.findAll();
    }

    public Demanda buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Demanda não encontrada"));
    }

    public Demanda buscarPorProtocolo(String protocolo) {
        return repository.findByProtocolo(protocolo)
                .orElseThrow(() ->
                        new RuntimeException("Protocolo não encontrado"));
    }

    public Demanda criarDemanda(CriarDemandaDTO dto) {

        Demanda demanda = new Demanda();

        demanda.setTitulo(dto.getTitulo());
        demanda.setDescricao(dto.getDescricao());
        demanda.setEndereco(dto.getEndereco());
        demanda.setCategoria(dto.getCategoria());

        demanda.setPrioridade(dto.getPrioridade());

        demanda.setAnonima(dto.isAnonima());

        demanda.setStatus(StatusDemanda.PENDENTE);

        demanda.setDataCriacao(LocalDateTime.now());

        demanda.setProtocolo(
                "DEM-" + System.currentTimeMillis()
        );

        HistoricoStatus historico = new HistoricoStatus();

        historico.setDescricao(
                "Solicitação criada"
        );

        historico.setDataRegistro(
                LocalDateTime.now()
        );

        demanda.getHistorico().add(historico);

        return repository.save(demanda);
    }

    public Demanda atualizarStatus(Long id, StatusDemanda novoStatus) {

        Demanda demanda = buscarPorId(id);

        demanda.setStatus(novoStatus);

        HistoricoStatus historico = new HistoricoStatus();

        historico.setDescricao(
                "Status alterado para " + novoStatus
        );

        historico.setDataRegistro(
                LocalDateTime.now()
        );

        demanda.getHistorico().add(historico);

        return repository.save(demanda);
    }

    public DashboardDTO obterResumoDashboard() {

        List<Demanda> demandas = repository.findAll();

        long total = demandas.size();

        long emAnalise = demandas.stream()
                .filter(d -> d.getStatus() == StatusDemanda.EM_ANALISE)
                .count();

        long emAndamento = demandas.stream()
                .filter(d -> d.getStatus() == StatusDemanda.EM_ANDAMENTO)
                .count();

        long concluidas = demandas.stream()
                .filter(d -> d.getStatus() == StatusDemanda.CONCLUIDA)
                .count();

        return new DashboardDTO(
                total,
                emAnalise,
                emAndamento,
                concluidas
        );
    }

    public List<Demanda> buscarPorStatus(StatusDemanda status) {

        return repository.findByStatus(status);
    }

    public List<Demanda> buscarPorPrioridade(Prioridade prioridade) {

        return repository.findByPrioridade(prioridade);
    }

    public Demanda atribuirResponsavel(
            Long id,
            String responsavel) {

        Demanda demanda = buscarPorId(id);

        demanda.setResponsavel(responsavel);

        HistoricoStatus historico =
                new HistoricoStatus();

        historico.setDescricao(
                "Responsável atribuído: " + responsavel
        );

        historico.setDataRegistro(
                LocalDateTime.now()
        );

        demanda.getHistorico().add(historico);

        return repository.save(demanda);
    }

    public Demanda adicionarComentario(
            Long id,
            String mensagem) {

        Demanda demanda = buscarPorId(id);

        Comentario comentario =
                new Comentario();

        comentario.setMensagem(mensagem);

        comentario.setDataCriacao(
                LocalDateTime.now()
        );

        demanda.getComentarios()
                .add(comentario);

        return repository.save(demanda);
    }

    public List<AtualizacaoDTO> obterUltimasAtualizacoes() {

        return repository.findAll()
                .stream()
                .flatMap(demanda ->
                        demanda.getHistorico()
                                .stream()
                                .map(historico ->
                                        new AtualizacaoDTO(
                                                demanda.getProtocolo(),
                                                demanda.getTitulo(),
                                                historico.getDescricao(),
                                                historico.getDataRegistro()
                                        )
                                )
                )
                .sorted(Comparator.comparing(AtualizacaoDTO::getDataRegistro).reversed())
                .toList();
    }
}
