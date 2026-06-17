function criarBloco(localizacao_X, localizacao_Y, altura, largura){

    let div = document.createElement('div')
    let principal = document.querySelector("#tela_de_jogo")

    let BLOC = localizacao_X * TamanhoTpx
    let BLOC1 = localizacao_Y * TamanhoTpx
    let BLOC2 = altura * TamanhoTpx
    let BLOC3 = largura * TamanhoTpx

    div.style.width = BLOC3  + "px"
    div.style.height = BLOC2  + "px"
    div.style.position = "absolute"
    div.style.left = BLOC + "px"
    div.style.top = BLOC1 + "px"
    div.style.backgroundColor = "red"

    principal.appendChild(div)
}

//gravidade

function cair(){
    if(gravidade == null){
        gravidade = setInterval(() => {
                blocos.forEach(element => {
                    chao(element[0], element[1], element[3])
                })

                
            if (linhaAtual >= limite_baixo || colidirChao) {
                clearInterval(gravidade)
                colidirChao = false
                puloColisao = pulo
                gravidade = null
            } else {
                linhaAtual += TamanhoTpx
                document.querySelector("#bola").style.top = linhaAtual + "px"
            }
        }, 60)
    }
}

//  aqui se verifica e modifica a posição
let TamanhoTpx = 10
let limite_baixo = 450
let linhaAtual = 450
let colunaAtual = 20
let gravidade = null
let colidirChao = false
let colidirCima = false
let colidirLado = false
let pulo = 250
let tamanhoOBJ = 50
let puloColisao
let puloNovo

document.querySelector("#bola").style.height = tamanhoOBJ + 'px'

blocos.forEach(element => {
    criarBloco(element[0], element[1], element[2], element[3])
})

//verificar bloco

function chao(localizacao_X, localizacao_Y, largura){
    if(!colidirChao){
        if(
            linhaAtual == ((localizacao_Y * TamanhoTpx) - tamanhoOBJ) &&
            colunaAtual >= (localizacao_X * TamanhoTpx) &&
            colunaAtual <= ((largura * TamanhoTpx) + (localizacao_X * TamanhoTpx))
        ){
                colidirChao = true
            }
    }
}

function ceu(localizacao_X, localizacao_Y, altura, largura){
        if(linhaAtual - (localizacao_Y * TamanhoTpx + altura * TamanhoTpx) < pulo && colunaAtual >= (localizacao_X * TamanhoTpx) && colunaAtual <= ((largura * TamanhoTpx) + (localizacao_X * TamanhoTpx))){
            colidirCima = true
            

            puloNovo = linhaAtual - ((localizacao_Y * TamanhoTpx)+(altura * TamanhoTpx))

            console.log(localizacao_Y, altura)

            if(linhaAtual > (localizacao_Y * TamanhoTpx) && puloColisao > puloNovo || puloColisao == undefined){
                puloColisao = puloNovo
                console.log(puloNovo, puloColisao)
            }
    }
}

function lado(){
    colidirLado = false 
    blocos.forEach(element => {
        console.log("aaaaaaaaa")
    })
}

//movimento do player

const movimentar = (tipoMovimento) => {

    if(tipoMovimento == "frente" || tipoMovimento == "atraz" || tipoMovimento == "inicial"){
        if(!colidirLado && tipoMovimento == "frente"){

            colunaAtual = Math.min((499 - tamanhoOBJ), colunaAtual + TamanhoTpx)

        }else if(!colidirLado && tipoMovimento == "atraz"){

            colunaAtual = Math.max((0), colunaAtual - TamanhoTpx)

        }
        document.querySelector(`#bola`).style.left = colunaAtual + "px"
        document.querySelector(`#bola`).style.top = linhaAtual + "px"
        cair()
    }else if(tipoMovimento == "pulo" && gravidade == null){
        if(tipoMovimento == "pulo"){
            blocos.forEach(element => {
                ceu(element[0], element[1], element[2], element[3])
            });
            if(!colidirCima){
                linhaAtual  = Math.max(0, linhaAtual - pulo)
                movimentar("inicial")
            }else{
                linhaAtual = Math.max(0, linhaAtual - puloColisao)
                movimentar("inicial")
                colidirCima = false
            }
        }
        cair()
    }
}

//colocar na posição correta

movimentar("inicial")

//ouvir evento de click de tecla

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            movimentar("pulo")
            break
        case 'ArrowLeft':
            movimentar("atraz")
            break;
        case 'ArrowRight':
            movimentar("frente")
            break;
    }
})