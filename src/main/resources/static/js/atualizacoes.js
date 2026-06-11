function formatarDescricao(descricao){

    return descricao
        .replace("EM_ANALISE", "Em análise")
        .replace("EM_ANDAMENTO", "Em andamento")
        .replace("CONCLUIDA", "Concluída")
        .replace("PENDENTE", "Pendente");
}

async function carregarAtualizacoes() {

    try {

        const resposta =
            await fetch("/demandas/atualizacoes");

        const atualizacoes =
            await resposta.json();

        const container =
            document.getElementById("updatesList");

        container.innerHTML = "";

        atualizacoes.forEach(atualizacao => {

            container.innerHTML += `
                <div class="update-item">

                    <strong>
                        ${atualizacao.protocolo}
                    </strong>

                    <br>

                    ${formatarDescricao(atualizacao.descricao)}

                </div>
            `;

        });

    } catch (erro) {

        console.error(
            "Erro ao carregar atualizações",
            erro
        );

    }

}

carregarAtualizacoes();