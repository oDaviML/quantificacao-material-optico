function updateBackboneLimit() {
    var numeroFibras = document.getElementById("numeroFibras");
    var quantidadeBackbones = document.getElementById("quantidadeBackbones");
    quantidadeBackbones.max = numeroFibras.value;
}

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

    let tabelaResultadoMiscelania = document.querySelector("#resultadoMiscelania");
    tabelaResultadoMiscelania.innerHTML = "";


    let acopladores, cordoes, pigtails;

    if (caracteristicaFibra === "Duplo") {
        acopladores = (numeroPavimentos * quantidadeBackbones) / 2;
        cordoes = (numeroPavimentos * quantidadeBackbones) / 2;
        pigtails = (numeroPavimentos * quantidadeBackbones) / 2;
    }
    else {
        acopladores = (numeroPavimentos * quantidadeBackbones);
        cordoes = (numeroPavimentos * quantidadeBackbones);
        pigtails = (numeroPavimentos * quantidadeBackbones);
    }
    let caboFibra;

    if (verificacaoBackbone) {
        caboFibra = (numeroPavimentos * numeroFibras) + (numeroFibras * tamanhoPeDireito) * 2;
    } else {
        caboFibra = (numeroPavimentos * numeroFibras) + (numeroFibras * tamanhoPeDireito);
    }
    
    let terminadores = Math.ceil((numeroPavimentos * quantidadeBackbones) / quantidadeBackbones);
    let dio = Math.ceil((numeroPavimentos * quantidadeBackbones) / 24);
    let bandejaEmenda = Math.ceil((numeroPavimentos * quantidadeBackbones) / 12);
    let etiquetasCOP = (numeroPavimentos * quantidadeBackbones);
    let etiquetasDIO = (numeroPavimentos * quantidadeBackbones);

    if (especificacaoCabo === "Multimodo 50/125μm") {
        adicionarResultado(1, "Cabo de Fibra Óptica (FOMMIG) 50/125μm", caboFibra, "Metros");
        adicionarResultado(2, "Caixa DIO (24 portas)", dio, "Unidades");
        adicionarResultado(3, "Bandeja emenda (12 emendas)", bandejaEmenda, "Unidades");
        adicionarResultado(4, "Acopladores Ópticos 50/125μm - "+ caracteristicaFibra +" - Lc", acopladores, "Unidades");
        adicionarResultado(5, "Terminadores Ópticos (8 fibras)", terminadores, "Unidades");
        adicionarResultado(6, "Cordões Ópticos 50/125μm - "+ caracteristicaFibra +" - Lc", cordoes, "Unidades");
        adicionarResultado(7, "Pigtails 50/125μm - "+ caracteristicaFibra +" - Lc", pigtails, "Unidades");
        adicionarResultadoMiscelania(1, "Etiqueta para os cordões ópticos e pigtails", etiquetasCOP, "Unidades");
        adicionarResultadoMiscelania(2, "Etiqueta para Portas do DIO", etiquetasDIO, "Unidades");
    }
    else {
        adicionarResultado(1, "Cabo de Fibra Óptica (FOSMIG) 9/125μm", caboFibra, "Metros");
        adicionarResultado(2, "Caixa DIO (24 portas)", dio, "Unidades");
        adicionarResultado(3, "Bandeja emenda (até 12)", bandejaEmenda, "Unidades");
        adicionarResultado(4, "Acopladores Ópticos 9/125μm - "+ caracteristicaFibra +" - Lc", acopladores, "Unidades");
        adicionarResultado(5, "Terminadores Ópticos", terminadores, "Unidades");
        adicionarResultado(6, "Cordões Ópticos 9/125μm - "+ caracteristicaFibra +" - Lc", cordoes, "Unidades");
        adicionarResultado(7, "Pigtails 9/125μm - "+ caracteristicaFibra +" - Lc", pigtails, "Unidades");
        adicionarResultadoMiscelania(1, "Etiqueta para os cordões ópticos e pigtails", etiquetasCOP, "Unidades");
        adicionarResultadoMiscelania(2, "Etiqueta para Portas do DIO", etiquetasDIO, "Unidades");
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

    function adicionarResultadoMiscelania(numero, item, quantidade, medida) {
        let linha = document.createElement("tr");
        linha.innerHTML = `
                <th scope="row">${numero}</th>
                <td>${item}</td>
                <td>${quantidade}</td>
                <td>${medida}</td>
            </tr>
        `;
        tabelaResultadoMiscelania.appendChild(linha);
    }
}

document.querySelector("#calcularBtn").addEventListener("click", calcularQuantificacao);
