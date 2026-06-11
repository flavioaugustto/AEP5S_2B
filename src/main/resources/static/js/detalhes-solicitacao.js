const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

async function carregarDetalhes() {

    const resposta = await fetch(`/demandas/${id}`);
    const demanda = await resposta.json();

    document.getElementById("detalheProtocolo").textContent =
        `Solicitação #${demanda.protocolo}`;

    document.getElementById("detalheStatus").textContent =
        formatarStatus(demanda.status);

    document.getElementById("detalhePrioridade").textContent =
        `Prioridade ${formatarPrioridade(demanda.prioridade)}`;

    document.getElementById("detalheData").textContent =
        `Criada em ${formatarData(demanda.dataCriacao)}`;

    document.getElementById("detalheTitulo").textContent =
        demanda.titulo;

    document.getElementById("detalheEndereco").textContent =
        demanda.endereco;

    document.getElementById("detalheDescricao").textContent =
        demanda.descricao;

    carregarHistorico(demanda.historico);
}

function carregarHistorico(historico) {

    const container = document.getElementById("detalheHistorico");

    container.innerHTML = "";

    historico
        .sort((a, b) => new Date(b.dataRegistro) - new Date(a.dataRegistro))
        .forEach(item => {

            container.innerHTML += `
                <div class="history-item">
                    <strong>${formatarData(item.dataRegistro)}</strong>
                    <span>${formatarDescricao(item.descricao)}</span>
                </div>
            `;
        });
}

function formatarStatus(status) {

    const nomes = {
        PENDENTE: "Pendente",
        EM_ANALISE: "Em análise",
        EM_ANDAMENTO: "Em andamento",
        CONCLUIDA: "Concluída"
    };

    return nomes[status] || status;
}

function formatarPrioridade(prioridade) {

    const nomes = {
        BAIXA: "Baixa",
        MEDIA: "Média",
        ALTA: "Alta"
    };

    return nomes[prioridade] || prioridade;
}

function formatarDescricao(descricao) {

    return descricao
        .replaceAll("EM_ANALISE", "Em análise")
        .replaceAll("EM_ANDAMENTO", "Em andamento")
        .replaceAll("CONCLUIDA", "Concluída")
        .replaceAll("PENDENTE", "Pendente");
}

function formatarData(data) {

    if (!data) {
        return "";
    }

    return new Date(data).toLocaleDateString("pt-BR");
}

carregarDetalhes();