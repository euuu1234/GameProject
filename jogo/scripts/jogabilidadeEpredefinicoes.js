import configuracoes from "../dados/scripts/configuracoes.js";

//captura de elementos do DOM

const principal = document.querySelector("#tela_de_jogo");
const playerNoJogo = document.querySelector("#player");



//--------------------------------------configurar body--------------------------------------------------------//

const body = document.querySelector("body")

body.style.width = configuracoes["displayWidth"] + "px"
body.style.height = configuracoes["displayHeight"] + "px"

//-------------------------------------CriarBlocos-------------------------------------------------------------//


function criarBloco(localizacao_X, localizacao_Y, alturaH, larguraL) {

    const div = document.createElement("div");

    div.style.width = (larguraL * modificarProporcaoBloco) + "em";
    div.style.height = (alturaH * modificarProporcaoBloco) + "em";

    div.style.position = "absolute";

    div.style.left = (localizacao_X * modificarProporcaoBloco) + "em";
    div.style.top = (localizacao_Y * modificarProporcaoBloco) + "em";

    div.style.backgroundColor = "red";

    principal.appendChild(div);
}

//variavel de proporcao de blocos na tela

const modificarProporcaoBloco = 5

//chamada de funcao para criar blocos com base na matriz de blocos

elementos.forEach((element) => {
    criarBloco(
        element.posicaoX,
        element.posicaoY,
        element.altura,
        element.largura
    );
});

//------------------------------------------loadPlayer--------------------------------------------------------//

//função para alterar a posição do player no jogo com base nas propriedades do objeto

function alterarPlayerPosition(objetoJogo, objeto){
    objetoJogo.style.left = objeto[`posicaoX`] + 'em'
    objetoJogo.style.top = objeto[`posicaoY`] + 'em'
    objetoJogo.style.height = objeto[`altura`] + 'em'
    objetoJogo.style.width = objeto[`largura`] + 'em'
}

(()=>{
    playerNoJogo.src = "../img/animacoes/andar10.png"
})()
alterarPlayerPosition(playerNoJogo, player)

//-----------------------------------------MOVIMENTO--------------------------------------------------------//

//Entrada do teclado

window.addEventListener("keydown", function (event) {
    if (event.code === "KeyW" || event.code === "ArrowUp") {
        movimentar("pulo", player)
    }
    if (event.code === "KeyS" || event.code === "ArrowDown") {
        movimentar("queda", player)
    }
    if (event.code === "KeyA" || event.code === "ArrowLeft") {
        movimentar("esquerda", player)
    }
    if (event.code === "KeyD" || event.code === "ArrowRight") {
        movimentar("direita", player)
    }
});

function movimentar(direcao, objeto){
    let velocidadeX = objeto["velocidadeX"]
    let velocidadeY = objeto["velocidadeY"]
    let novaLocX = objeto["posicaoX"] + velocidadeX * direcao
    let novaLocY = objeto["posicaoY"] + velocidadeY
    console.log(direcao)
    
}

let pular
let cair
let esquerda
let direita
let localizacaoDoPe

//entrada de teclado
//Calcula velocidade
//Aplica gravidade
//Calcula posição nova
//Resolve colisões
//Atualiza posição
//Atualiza animação
//Renderiza




const verificaColisoes = function (objeto) {
    let ladoDireito = objeto.posicaoX + objeto.largura
    let ladoEsquerdo = objeto.posicaoX
    let ladoSuperior = objeto.posicaoY
    let ladoInferior = objeto.posicaoY + objeto.altura

    elementos.forEach((element) => {

        let ladoDireitoElemento = element.posicaoX * modificarProporcaoBloco + element.largura * modificarProporcaoBloco
        let ladoEsquerdoElemento = element.posicaoX * modificarProporcaoBloco
        let ladoSuperiorElemento = element.posicaoY * modificarProporcaoBloco
        let ladoInferiorElemento = element.posicaoY * modificarProporcaoBloco + element.altura * modificarProporcaoBloco

        if(

            ladoDireito > ladoEsquerdoElemento &&
            ladoEsquerdo < ladoDireitoElemento

        ){
            return "esquerda"
        }else if(

            ladoEsquerdo < ladoDireitoElemento &&
            ladoDireito > ladoEsquerdoElemento

        ){
            return "direita"
        }else if(

            ladoInferior > ladoSuperiorElemento &&
            ladoSuperior < ladoInferiorElemento
            
        ){
            return "cima"
        }else if(
            ladoSuperior < ladoInferiorElemento &&
            ladoInferior > ladoSuperiorElemento
        ){
            return "baixo"
        }
    })
}
