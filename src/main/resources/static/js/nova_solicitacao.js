const formSolicitacao = document.getElementById("formSolicitacao");

formSolicitacao.addEventListener("submit", async function(event) {

    event.preventDefault();

    const demanda = {
        titulo: document.getElementById("titulo").value,
        categoria: document.getElementById("categoria").value,
        endereco: document.getElementById("endereco").value,
        prioridade: document.getElementById("prioridade").value,
        descricao: document.getElementById("descricao").value,
        anonima: document.getElementById("anonima").checked
    };

    const resposta = await fetch("/demandas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(demanda)
    });

    const demandaCriada = await resposta.json();

    const mensagem = document.getElementById("mensagemSucesso");

    mensagem.classList.remove("d-none");

    mensagem.innerHTML =
        `Solicitação registrada com sucesso! Protocolo: <strong>${demandaCriada.protocolo}</strong>`;

    formSolicitacao.reset();
});