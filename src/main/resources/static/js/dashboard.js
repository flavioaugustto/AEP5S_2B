async function carregarDashboard() {

    try {

        const resposta =
            await fetch("/demandas/dashboard");

        const dados =
            await resposta.json();

        document.getElementById("total")
            .textContent = dados.total;

        document.getElementById("analise")
            .textContent = dados.emAnalise;

        document.getElementById("andamento")
            .textContent = dados.emAndamento;

        document.getElementById("concluidas")
            .textContent = dados.concluidas;

    } catch (erro) {

        console.error(
            "Erro ao carregar dashboard",
            erro
        );

    }
}

carregarDashboard();