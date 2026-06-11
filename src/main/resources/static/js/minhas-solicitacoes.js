let demandas = [];

async function carregarDemandas() {

    const resposta = await fetch("/demandas");
    demandas = await resposta.json();

    renderizarTabela(demandas);
}

function renderizarTabela(lista) {

    const tabela = document.getElementById("tabelaDemandas");

    tabela.innerHTML = "";

    lista.forEach(demanda => {

        tabela.innerHTML += `
            <tr>
                <td>${demanda.protocolo}</td>
                <td>${demanda.titulo}</td>
                <td>${demanda.categoria}</td>
                <td>${demanda.prioridade}</td>
                <td>
                    <span class="status-badge status-${demanda.status}">
                        ${formatarStatus(demanda.status)}
                    </span>
                </td>
                <td>
                    <button
                        class="btn-view"
                        onclick="visualizarDemanda(${demanda.id})">
                        Visualizar
                    </button>
                </td>
            </tr>
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

function aplicarFiltros() {

    const pesquisa = document.getElementById("campoPesquisa").value.toLowerCase();
    const prioridade = document.getElementById("filtroPrioridade").value;
    const status = document.getElementById("filtroStatus").value;

    const filtradas = demandas.filter(demanda => {

        const correspondePesquisa =
            demanda.titulo.toLowerCase().includes(pesquisa) ||
            demanda.protocolo.toLowerCase().includes(pesquisa);

        const correspondePrioridade =
            prioridade === "" || demanda.prioridade === prioridade;

        const correspondeStatus =
            status === "" || demanda.status === status;

        return correspondePesquisa &&
               correspondePrioridade &&
               correspondeStatus;
    });

    renderizarTabela(filtradas);
}

document.getElementById("campoPesquisa").addEventListener("input", aplicarFiltros);
document.getElementById("filtroPrioridade").addEventListener("change", aplicarFiltros);
document.getElementById("filtroStatus").addEventListener("change", aplicarFiltros);

carregarDemandas();

function visualizarDemanda(id) {
    window.location.href = `detalhes_solicitacao.html?id=${id}`;
}