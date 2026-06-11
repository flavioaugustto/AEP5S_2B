package com.example.aep.dto;

import java.time.LocalDateTime;

public class AtualizacaoDTO {

    private String protocolo;
    private String titulo;
    private String descricao;
    private LocalDateTime dataRegistro;

    public AtualizacaoDTO(String protocolo, String titulo, String descricao, LocalDateTime dataRegistro) {
        this.protocolo = protocolo;
        this.titulo = titulo;
        this.descricao = descricao;
        this.dataRegistro = dataRegistro;
    }

    public String getProtocolo() {
        return protocolo;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public LocalDateTime getDataRegistro() {
        return dataRegistro;
    }
}