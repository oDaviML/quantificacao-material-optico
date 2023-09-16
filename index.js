const checkbox = document.querySelector("#backboneSecundario");
const divSecundario = document.querySelector("#secundario");
const divPrimario = document.querySelector("#primario");
const inputsSecundario = divSecundario.querySelectorAll("input, select");
const inputsPrimario = divPrimario.querySelectorAll("input, select");

let tabelaResultado = document.querySelector("#resultado");
let tabelaResultadoMiscelania = document.querySelector("#resultadoMiscelania");


checkbox.addEventListener("change", function() {
    if (checkbox.checked) {
        inputsSecundario.forEach(function(input) {
            input.disabled = false;
        });

        inputsPrimario.forEach(function(input) {
            input.disabled = true;
        })
    } else {
        inputsSecundario.forEach(function(input) {
            input.disabled = true;
        });

        inputsPrimario.forEach(function(input) {
            input.disabled = false;
        })
    }
});

function calcularBackbone() {
    tabelaResultado.innerHTML = "";
    tabelaResultadoMiscelania.innerHTML = "";

    if (checkbox.checked) {
        calcularBackboneSecundario();
    } else {
        calcularBackbonePrimario();
    }
}

document.querySelector("#calcularBtn").addEventListener("click", calcularBackbone);


function calcularBackbonePrimario() {

    let caracteristicaFibraPrimario = document.querySelector("#caracteristicaFibraPrimario").value;
    let numeroFibrasPrimario = parseInt(document.querySelector("#numeroFibrasPrimario").value);
    let quantidadeBackbonesPrimario = parseInt(document.querySelector("#quantidadeBackbonesPrimario").value);
    let distanciaFibra = parseInt(document.querySelector("#distanciaFibra").value);
    let especificacaoCaboPrimario = document.querySelector("#especificacaoCaboPrimario").value;

    let pares = numeroFibrasPrimario * quantidadeBackbonesPrimario;
    let fibrasTotal = pares * 2;

    let quantidadeDIO = Math.ceil((numeroFibrasPrimario / 2) / 24) * 2;
    let acoplador = fibrasTotal;
    let pigTail = fibrasTotal * 2;
    let bandejaEmenda = Math.ceil(fibrasTotal / 12) * 2;
    let cordaoOptico = pares * 2;

    distanciaFibra = (distanciaFibra * quantidadeBackbonesPrimario) * 1.2;

    adicionarResultado(1, "Cabo de fibra óptica - "+ especificacaoCaboPrimario +" - " + caracteristicaFibraPrimario, distanciaFibra, "m");
    adicionarResultado(2, "Caixa DIO (24 portas)", quantidadeDIO, "unid.");
    adicionarResultado(3, "Acoplador óptico "+ caracteristicaFibraPrimario +" - LC - simples", acoplador, "unid.");
    adicionarResultado(4, "Pig tail - " + caracteristicaFibraPrimario + " - LC - simples", pigTail, "unid.");
    adicionarResultado(5, "Cordão óptico - " + caracteristicaFibraPrimario + " - LC - duplo", cordaoOptico, "unid.");
    adicionarResultado(6, "Bandeja emenda - (12 portas)", bandejaEmenda, "unid.");

    let etiquetasCOP = pigTail + cordaoOptico;
    let etiquetasDIO = pigTail;

    adicionarResultadoMiscelania(1, "Etiqueta para os cordões ópticos e Pig Tails", etiquetasCOP, "Unidades");
    adicionarResultadoMiscelania(2, "Etiqueta para Portas do DIO", etiquetasDIO, "Unidades");
}

function calcularBackboneSecundario() {

    let numeroPavimentos = parseInt(document.querySelector("#numeroPavimentos").value) - 1;
    let numeroFibras = parseInt(document.querySelector("#numeroFibras").value);
    let tamanhoPeDireito = parseInt(document.querySelector("#tamanhoPeDireito").value);
    let especificacaoCabo = document.querySelector("#especificacaoCabo").value;
    let caracteristicaFibra = document.querySelector("#caracteristicaFibra").value;
    let quantidadeBackbones = parseInt(document.querySelector("#quantidadeBackbones").value);

    let paresAndar = numeroFibras * quantidadeBackbones;
    let paresTotal = paresAndar * numeroPavimentos;

    let fibrasPorAndar = paresAndar * 2;  
    let fibrasTotal = paresTotal * 2;

    let caboFibra = 0;
    for (let j = 1; j <= numeroPavimentos - 1; j++) {
        caboFibra += tamanhoPeDireito * (j + 2);
    }
    caboFibra = Math.ceil(caboFibra * 1.2);

    let quantidadeDio = Math.ceil(paresTotal / 24);
    let acoplador = paresTotal;
    let bandejaEmenda = Math.ceil(fibrasTotal / 12);
    let terminadores = Math.ceil(fibrasPorAndar / 8) * numeroPavimentos;
    let pigTailDio = fibrasTotal;   
    let pigTail = paresTotal;
    let cordaoOptico = numeroFibras * numeroPavimentos;

    adicionarResultado(1, "Cabo de fibra óptica - " + especificacaoCabo + " - " + caracteristicaFibra + "", caboFibra, "m");
    adicionarResultado(2, "Caixa DIO (24 portas)", quantidadeDio, "unid.");
    adicionarResultado(3, "Acoplador Óptico - " + caracteristicaFibra + "- LC - Duplo", acoplador, "unid.");
    adicionarResultado(4, "Pig tail - " + caracteristicaFibra + " - LC - Simples", pigTailDio, "unid.");
    adicionarResultado(5, "Pig tail - " + caracteristicaFibra + " - LC - Duplo", pigTail, "unid.");
    adicionarResultado(6, "Cordão óptico - " + caracteristicaFibra + " - LC - Duplo", cordaoOptico, "unid.");
    adicionarResultado(7, "Terminadores Ópticos (8 fibras)", terminadores, "unid.");
    adicionarResultado(8, "Bandeja de emenda - (12 portas)", bandejaEmenda, "unid.");

    let etiquetasCOP = pigTail + cordaoOptico;
    let etiquetasDIO = pigTailDio;

    adicionarResultadoMiscelania(1, "Etiqueta para os cordões ópticos e Pig Tails", etiquetasCOP, "Unidades");
    adicionarResultadoMiscelania(2, "Etiqueta para Portas do DIO", etiquetasDIO, "Unidades");

}

function adicionarResultado(numero, item, quantidade, medida) {
    let linha = document.createElement("tr");
    linha.innerHTML = `
        <th scope="row">${numero}</th>
        <td>${item}</td>
        <td>${quantidade}</td>
        <td>${medida}</td>
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



