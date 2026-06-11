async function carregarGestor() {

    const resposta = await fetch("/demandas");
    const demandas = await resposta.json();

    const tabela =
        document.getElementById("gestorDemandas");

    const select =
        document.getElementById("demandaSelect");

    tabela.innerHTML = "";
    select.innerHTML = "";

    const demandasPendentes = demandas.filter(demanda =>
        demanda.status === "PENDENTE"
    );

    demandasPendentes.forEach(demanda => {

        tabela.innerHTML += `
            <tr>

                <td>${demanda.protocolo}</td>

                <td>${demanda.titulo}</td>

                <td>${demanda.prioridade}</td>

                <td>

                    <button
                        class="btn-view"
                        onclick="visualizarDemanda(${demanda.id})">

                        Visualizar

                    </button>

                </td>

            </tr>
        `;

        select.innerHTML += `
            <option value="${demanda.id}">
                ${demanda.protocolo}
            </option>
        `;
    });

    carregarRelatorios();
}

async function carregarRelatorios(){

    const resposta =
        await fetch("/demandas/dashboard");

    const dashboard =
        await resposta.json();

    document.getElementById("relatoriosRapidos").innerHTML = `

        <p><strong>Total:</strong> ${dashboard.total}</p>

        <p><strong>Em análise:</strong> ${dashboard.emAnalise}</p>

        <p><strong>Em andamento:</strong> ${dashboard.emAndamento}</p>

        <p><strong>Concluídas:</strong> ${dashboard.concluidas}</p>

    `;
}

function visualizarDemanda(id){

    window.location.href =
        `detalhes_solicitacao.html?id=${id}`;
}

async function atribuirResponsavel(){

    const demandaId =
        document.getElementById("demandaSelect").value;

    const responsavel =
        document.getElementById("responsavelSelect").value;

    await fetch(
        `/demandas/${demandaId}/responsavel?responsavel=${responsavel}`,
        {
            method:"PUT"
        }
    );

    alert("Responsável atribuído com sucesso!");
}

carregarGestor();