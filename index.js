function calcularQuantificacao() {
    let numeroPavimentos = document.querySelector("#numeroPavimentos").value;
    let numeroFibras = document.querySelector("#numeroFibras").value;
    let tamanhoPeDireito = document.querySelector("#tamanhoPeDireito").value;
    let especificacaoCabo = document.querySelector("#especificacaoCabo").value;
    let caracteristicaFibra = document.querySelector("#caracteristicaFibra").value;
    let quantidadeBackbones = document.querySelector("#quantidadeBackbones").value;
    let verificacaoBackbone = document.querySelector("#verificacaoBackbone").checked;

    let tabelaResultado = document.querySelector("#resultado");
    tabelaResultado.innerHTML = "";

    let caboFibra = (numeroPavimentos * numeroFibras) + (numeroFibras * tamanhoPeDireito);
    let acopladores = (numeroPavimentos * numeroFibras) / 2;
    let terminadores = Math.ceil((numeroPavimentos * numeroFibras) / numeroFibras);
    let cordoes = (numeroPavimentos * numeroFibras) / 2;
    let pigtails = (numeroPavimentos * numeroFibras) / 2;
    
    let dio = Math.ceil((numeroPavimentos * numeroFibras) / 24);

    if (especificacaoCabo === "Multimodo 50/125μm") {
        adicionarResultado(1, "Cabo de Fibra Óptica (FOMMIG) 50/125μm", caboFibra, "Metros");
        adicionarResultado(2, "Caixa DIO (24 portas)", dio, "Unidades");
        adicionarResultado(3, "Acopladores Ópticos 50/125μm - Duplo - Lc", acopladores, "Unidades");
        adicionarResultado(4, "Terminadores Ópticos", terminadores, "Unidades");
        adicionarResultado(5, "Cordões Ópticos 50/125μm - Duplo - Lc", cordoes, "Unidades");
        adicionarResultado(6, "Pigtails 50/125μm - Duplo - Lc", pigtails, "Unidades");
    }
    else {
        adicionarResultado(1, "Cabo de Fibra Óptica (FOSMIG) 9/125μm", caboFibra, "Metros");
        adicionarResultado(2, "Caixa DIO (24 portas)", dio, "Unidades");
        adicionarResultado(3, "Acopladores Ópticos 9/125μm - Duplo - Lc", acopladores, "Unidades");
        adicionarResultado(4, "Terminadores Ópticos", terminadores, "Unidades");
        adicionarResultado(5, "Cordões Ópticos 9/125μm - Duplo - Lc", cordoes, "Unidades");
        adicionarResultado(6, "Pigtails 9/125μm - Duplo - Lc", pigtails, "Unidades");
    }

    
    

    if (verificacaoBackbone) {
        let backbones = numeroPavimentos * quantidadeBackbones;
        adicionarResultado(7, "Backbones", backbones, "Unidades");
    }

    function adicionarResultado(numero, item, quantidade, medida) {
        let linha = document.createElement("tr");
        linha.innerHTML = `
                <th scope="row">${numero}</th>
                <td>${item}</td>
                <td>${quantidade}</td>
                <td>${medida}</td>
            </tr>
        `;
        tabelaResultado.appendChild(linha);
    }
}

document.querySelector("#calcularBtn").addEventListener("click", calcularQuantificacao);
