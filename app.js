// Declarando as variaveis que serao utilizadas

let amigos = [];
let inputAmigo = document.getElementById('amigo');
let listaAmigosElement = document.getElementById('listaAmigos');
let resultadoDiv = document.getElementById('resultado');
let botaoSortear = document.querySelector('.button-draw');

// Desabilita o botão de sortear ate que seja incluido um amigo
botaoSortear.disabled = true;

function adicionarAmigo() {
    let nomeAmigo = inputAmigo.value.trim();

    // Se o nome do amigo nao estiver vazio
    if (nomeAmigo !== "") {
        amigos.push(nomeAmigo);
        atualizarListaAmigos();
        inputAmigo.value = "";
        // Habilita o botão de sortear quando houver pelo menos 2 amigos
        botaoSortear.disabled = amigos.length < 2;
    } else {
        alert("ATENÇÃO - É necessário que um nome seja digitado.");
    }
}

function atualizarListaAmigos() {
    // Limpa a lista anterior
    listaAmigosElement.innerHTML = ""; 

    amigos.forEach(function(amigo) {
        let listItem = document.createElement('li');
        listItem.textContent = amigo;
        listaAmigosElement.appendChild(listItem);
    });

    // Informa no console para acompanhar a lista, se necessario
    console.log("Lista de amigos:", amigos);
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("ATENÇÃO: Para efetuar o sorteio, é necessário dois amigos ou mais...");
        return;
    }

    // Embaralhando o array de amigos (copia do algoritmo de Fisher-Yates)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    // Cria uma cópia para não alterar o original
    let amigosEmbaralhados = amigos.slice(); 

    // Gera um indice aleatorio e realiza a troca dos nomes para que os nomes nao se repitam - funcao nova
    shuffleArray(amigosEmbaralhados);

    let resultados = {};
    for (let i = 0; i < amigosEmbaralhados.length; i++) {
        let amigoAtual = amigosEmbaralhados[i];
        let proximoIndice = (i + 1) % amigosEmbaralhados.length;
        let amigoSecreto = amigosEmbaralhados[proximoIndice];
        resultados[amigoAtual] = amigoSecreto;
    }

    exibirResultados(resultados);
}

// Esta funcao efetua a apresentacao dos resultados do sorteio
function exibirResultados(resultados) {
    // Limpa os resultados anteriores
    resultadoDiv.innerHTML = ''; 
    for (let amigo in resultados) {
        let paragrafoResultado = document.createElement('p');
        paragrafoResultado.textContent = amigo + ' tirou: ' + resultados[amigo];
        resultadoDiv.appendChild(paragrafoResultado);
    }
}