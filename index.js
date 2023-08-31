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

    let pares = numeroFibrasPrimario * quantidadeBackbonesPrimario;
    let fibrasTotal = pares * 2;

    let quantidadeDIO = Math.ceil((numeroFibrasPrimario / 2) / 24);
    let acoplador = numeroFibrasPrimario * quantidadeBackbonesPrimario;
    let pigTail = fibrasTotal;
    let bandejaEmenda = Math.ceil(fibrasTotal / 12);


    /*
    let acoplador = numeroFibrasPrimario * 2;
    let pigTail = numeroFibrasPrimario * 2;
    */
    
    distanciaFibra = (distanciaFibra * quantidadeBackbonesPrimario) * 1.2;

    adicionarResultado(1, "Cabo de fibra óptica - Loose - " + caracteristicaFibraPrimario + "", distanciaFibra, "m");
    adicionarResultado(2, "Caixa DIO (24 portas)", quantidadeDIO, "unid.");
    adicionarResultado(3, "Acoplador óptico "+ caracteristicaFibraPrimario +" - LC - duplo", acoplador, "unid.");
    adicionarResultado(4, "Pig tail - " + caracteristicaFibraPrimario + " - LC - duplo", pigTail, "unid.");
    adicionarResultado(5, "Bandeja emenda - (12 portas)", bandejaEmenda, "unid.");

    let etiquetasCOP = pigTail + acoplador;
    let etiquetasDIO = pigTail;

    adicionarResultadoMiscelania(1, "Etiqueta para os cordões ópticos e pigtails", etiquetasCOP, "Unidades");
    adicionarResultadoMiscelania(2, "Etiqueta para Portas do DIO", etiquetasDIO, "Unidades");
}

function calcularBackboneSecundario() {

    let numeroPavimentos = parseInt(document.querySelector("#numeroPavimentos").value);
    let numeroFibras = parseInt(document.querySelector("#numeroFibras").value);
    let tamanhoPeDireito = parseInt(document.querySelector("#tamanhoPeDireito").value);
    let especificacaoCabo = document.querySelector("#especificacaoCabo").value;
    let caracteristicaFibra = document.querySelector("#caracteristicaFibra").value;
    let quantidadeBackbones = parseInt(document.querySelector("#quantidadeBackbones").value);

    let paresPorAndar = numeroFibras * quantidadeBackbones;
    let paresTotal = paresPorAndar * (numeroPavimentos - 1);

    let fibrasPorAndar = paresPorAndar * 2;  
    let fibrasTotal = paresTotal * 2;

    let caboFibra = 0;
    for (let j = 1; j <= numeroPavimentos - 1; j++) {
        caboFibra += tamanhoPeDireito * (j + 2);
    }
    caboFibra = Math.ceil(caboFibra * 1.2);

    let quantidadeDio = Math.ceil(paresTotal / 24);
    let acoplador = paresPorAndar * (numeroPavimentos - 1);
    let bandejaEmenda = Math.ceil(fibrasTotal / 12);
    let terminadores = Math.ceil(fibrasPorAndar / 8) * (numeroPavimentos - 1);
    let pigTail = fibrasTotal;
    let cordaoOptico = numeroFibras * (numeroPavimentos - 1);

    adicionarResultado(1, "Cabo de fibra óptica - " + especificacaoCabo + " - " + caracteristicaFibra + "", caboFibra, "m");
    adicionarResultado(2, "Caixa DIO (24 portas)", quantidadeDio, "unid.");
    adicionarResultado(3, "Acopladore Óptico - " + caracteristicaFibra + "- LC - Duplo", acoplador, "unid.");
    adicionarResultado(4, "Bandeja de emenda - (12 portas)", bandejaEmenda, "unid.");
    adicionarResultado(5, "Terminadores Ópticos (8 fibras)", terminadores, "unid.");
    adicionarResultado(6, "Pig tail - " + caracteristicaFibra + " - LC - Duplo", pigTail, "unid.");
    adicionarResultado(8, "Cordão óptico - " + caracteristicaFibra + " - LC - Duplo", cordaoOptico, "unid.");

    let etiquetasCOP = pigTail + acoplador;
    let etiquetasDIO = pigTail;

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



