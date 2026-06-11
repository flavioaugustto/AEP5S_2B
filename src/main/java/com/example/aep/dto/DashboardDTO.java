package com.example.aep.dto;

public class DashboardDTO {

    private long total;
    private long emAnalise;
    private long emAndamento;
    private long concluidas;

    public DashboardDTO(long total,
                        long emAnalise,
                        long emAndamento,
                        long concluidas) {

        this.total = total;
        this.emAnalise = emAnalise;
        this.emAndamento = emAndamento;
        this.concluidas = concluidas;
    }

    public long getTotal() {
        return total;
    }

    public long getEmAnalise() {
        return emAnalise;
    }

    public long getEmAndamento() {
        return emAndamento;
    }

    public long getConcluidas() {
        return concluidas;
    }
}
