async function carregarAtendimento() {

    const resposta = await fetch("/demandas");
    const demandas = await resposta.json();

    const tabela = document.getElementById("tabelaAtendimento");

    tabela.innerHTML = "";

    demandas.forEach(demanda => {

        if(demanda.status === "CONCLUIDA"){
            return;
        }

        tabela.innerHTML += `
            <tr>
                <td>${demanda.protocolo}</td>
                <td>${demanda.categoria}</td>
                <td>
                    <span class="status-badge status-${demanda.status}">
                        ${formatarStatus(demanda.status)}
                    </span>
                </td>
                <td>
                    <div class="attendance-actions">
                        <button class="btn-attendance"
                                onclick="visualizarDemanda(${demanda.id})">
                            Visualizar
                        </button>

                        <select id="status-${demanda.id}" class="status-select">
                            <option value="">Status</option>
                            <option value="PENDENTE">Pendente</option>
                            <option value="EM_ANALISE">Em análise</option>
                            <option value="EM_ANDAMENTO">Em andamento</option>
                            <option value="CONCLUIDA">Concluída</option>
                        </select>

                        <button class="btn-attendance btn-status"
                                onclick="atualizarStatus(${demanda.id})">
                            Atualizar
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
}

function visualizarDemanda(id) {
    window.location.href = `detalhes_solicitacao.html?id=${id}`;
}

async function atualizarStatus(id) {

    const novoStatus = document.getElementById(`status-${id}`).value;

    if (!novoStatus) {
        alert("Selecione um status antes de atualizar.");
        return;
    }

    await fetch(`/demandas/${id}/status?status=${novoStatus}`, {
        method: "PUT"
    });

    carregarAtendimento();
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

carregarAtendimento();