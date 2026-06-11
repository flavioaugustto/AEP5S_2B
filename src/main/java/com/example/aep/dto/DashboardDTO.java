package com.example.aep.dto;

public class DashboardDTO {

    private long total;

    private long pendentes;

    private long emAnalise;

    private long concluidas;

    public DashboardDTO(long total,
                        long pendentes,
                        long emAnalise,
                        long concluidas) {

        this.total = total;
        this.pendentes = pendentes;
        this.emAnalise = emAnalise;
        this.concluidas = concluidas;
    }

    // getters
    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public long getPendentes() {
        return pendentes;
    }

    public void setPendentes(long pendentes) {
        this.pendentes = pendentes;
    }

    public long getEmAnalise() {
        return emAnalise;
    }

    public void setEmAnalise(long emAnalise) {
        this.emAnalise = emAnalise;
    }

    public long getConcluidas() {
        return concluidas;
    }

    public void setConcluidas(long concluidas) {
        this.concluidas = concluidas;
    }
}
