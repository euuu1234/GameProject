//----------------------------------------------
// colocar nas posições

    function styleTable(direcao, alteracao1, alteracao2){
        direcao.style[alteracao1] = "100%"
        direcao.style[alteracao2 ] = "1px"
    }

//------------------------------------------------
// criando linhas e colunas tabela

for(let i = 0; i < 25; i++){
    const principal = document.querySelector("#tela_de_jogo")

    let linha = document.createElement('div')
    let colunas = document.createElement('div')

    linha.classList.add("linhas")
    colunas.classList.add("colunas")

    linha.style.top = `${i * 20}px`;
    colunas.style.left = `${i * 20}px`;

    linha.style.position = "absolute"
    colunas.style.position = "absolute"

    styleTable(linha, 'width', 'height')
    styleTable(colunas, 'height', 'width')

    principal.appendChild(colunas)
    principal.appendChild(linha)
}

/////    aqui se bota o id por linha e coluna

const idLinhas = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y'
]

document.querySelectorAll(".linhas").forEach((element, id) => {
    element.id = (`${idLinhas[id]}`)
});

document.querySelectorAll(".colunas").forEach((element, id) => {
    element.id = `coluna${id + 1}`
});

////////////  aqui se verifica e modifica a posição

let linhaAtual = 24
let colunaAtual = 1
let gravidade = null

const movimentar = (tipoMovimento) => {
    let moColuna = document.querySelector(`#coluna${colunaAtual}`).offsetLeft
    let moLinha = document.querySelector(`#${idLinhas[linhaAtual]}`).offsetTop

    if(tipoMovimento == "lateral" || tipoMovimento == "inicial"){

        document.querySelector(`#bola`).style.left = moColuna + "px"
        document.querySelector(`#bola`).style.top = moLinha + "px"

    }else if(tipoMovimento == "pulo"){

        linhaAtual  = Math.max(0, linhaAtual - 10)

        movimentar("inicial")

        if (gravidade) return;

        gravidade = setInterval(() => {

            if (linhaAtual >= 24) {
                clearInterval(gravidade);
                gravidade = null;
            } else {
                linhaAtual++;
                document.querySelector("#bola").style.top =
                    (linhaAtual * 20) + "px";
            }

        }, 80);

    }

}

movimentar("inicial")


let mover = (direcao) => {
    if(direcao == "subir"){
        movimentar("pulo")
    }else if(direcao == "frente"){
        colunaAtual = Math.min(25, colunaAtual + 1)
        movimentar("lateral")
    }
    else if(direcao == "atraz"){
        colunaAtual = Math.max(1, colunaAtual - 1)
        movimentar("lateral")
    }
    
}


window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            mover("subir")
            break
        case 'ArrowLeft':
            mover("atraz")
            break;
        case 'ArrowRight':
            mover("frente")
            break;
    }
})
            
/*

*/