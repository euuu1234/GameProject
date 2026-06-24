import configuracoes from "../dados/scripts/configuracoes.js";

const principal = document.querySelector("#tela_de_jogo");
const playerNoJogo = document.querySelector("#player");

//variaveis de relatividade de tela

const relatividadeTela = 10

//variaveis da movimentacao

const tmnDoPulo = 40
const tmnDoMovimento = 0.5


//estado de movimento

let andando = null
let andandoPraTras = null
let caindo = null
let subindo = null

//--------------------------------------configurar body--------------------------------------------------------//

const body = document.querySelector("body")

body.style.width = configuracoes["displayWidth"] + "px"
body.style.height = configuracoes["displayHeight"] + "px"

//-------------------------------------CriarBlocos-------------------------------------------------------------//



function criarBloco(localizacao_X, localizacao_Y, alturaH, larguraL) {

    const div = document.createElement("div");

    div.style.width = (larguraL * relatividadeTela) + "em";
    div.style.height = (alturaH * relatividadeTela) + "em";

    div.style.position = "absolute";

    div.style.left = (localizacao_X * relatividadeTela) + "em";
    div.style.top = (localizacao_Y * relatividadeTela) + "em";

    div.style.backgroundColor = "red";

    principal.appendChild(div);
}

//chamada de funcao

blocos.forEach((element) => {
    criarBloco(
        element[0],
        element[1],
        element[2],
        element[3]
    );
});

//------------------------------------------loadPlayer--------------------------------------------------------//

function alterarPlayerPosition(){
    playerNoJogo.style.left = player[`posicaoX`] + 'em'
    playerNoJogo.style.top = player[`posicaoY`] + 'em'
    playerNoJogo.style.height = player[`altura`] + 'em'
    playerNoJogo.style.width = player[`largura`] + 'em'
}

//animações

function aleterarAnimacao(lado){
    if(andandoPraTras == null && andando == null)
    playerNoJogo.src = `../img/animacoes/homem${lado}.png`
}

aleterarAnimacao(1)
alterarPlayerPosition()

//--------------------------------------------COLISAO--------------------------------------------------------//

function verificarColisao(
    playerXnovo,
    playerYnovo,
){

    return blocos.some((element) => {
        const colidiuBloco = 
            playerXnovo + player["largura"] > element[0] * relatividadeTela &&
            playerXnovo < element[0] * relatividadeTela + element[3] * relatividadeTela &&
            playerYnovo + player["altura"] > element[1] * 
            relatividadeTela &&
            playerYnovo < element[1] * 
            relatividadeTela+ element[2] * 
            relatividadeTela;
        
        return colidiuBloco
    })
}


//-----------------------------------------MOVIMENTO--------------------------------------------------------//

//pulo

function subir(){
    let pulo = 0
    if(
        subindo == null  &&
        verificarColisao(player["posicaoX"], (player["posicaoY"] + tmnDoMovimento))
    ){
        aleterarAnimacao(4)
        subindo = setInterval(()=>{

            let novaLocY = player["posicaoY"] - tmnDoMovimento
            if(
                !verificarColisao(player["posicaoX"], novaLocY) &&
                pulo <= tmnDoPulo
            ){
                player["posicaoY"] = novaLocY
                alterarPlayerPosition()
                pulo++
            }else{
                gravidade()
                clearInterval(subindo)
                subindo = null
                pulo = 0
            }
        }, 10)
    }
}

//pra frente

function andar(){
    clearInterval(andandoPraTras)
    andandoPraTras = null

    clearInterval(andando)
    andando = null

    aleterarAnimacao(2)

    andando = setInterval(()=>{

        let novaLocX = player["posicaoX"] + tmnDoMovimento
        if(
            !verificarColisao(novaLocX, player["posicaoY"]) &&
            andandoPraTras == null
        ){
            player["posicaoX"] = novaLocX
            alterarPlayerPosition()
        }else{
            clearInterval(andando)
            andando = null
            gravidade()
        }
        if(
            !verificarColisao(novaLocX, player["posicaoY"]) &&
            (player["posicaoY"] + player["altura"]) !=  
            relatividadeTela * 100)
                return gravidade();

    }, 15)
}

//andar para esquerda

function andarParaTraz(){
    clearInterval(andandoPraTras)
    andandoPraTras = null

    clearInterval(andando)
    andando = null

    aleterarAnimacao(3)

    andandoPraTras = setInterval(()=>{

        let novaLocX = player["posicaoX"] - tmnDoMovimento
        if(
            !verificarColisao(novaLocX, player["posicaoY"]) &&
            andando == null
        ){
            player["posicaoX"] = novaLocX
            alterarPlayerPosition()
        }else{
            clearInterval(andandoPraTras)
            andandoPraTras = null
        }
        if(
            !verificarColisao(novaLocX, player["posicaoY"]) &&
            (player["posicaoY"] + player["altura"]) !=  
            relatividadeTela * 100)
                return gravidade();
    }, 15)
    
}


//---------------------------------------------gravidade------------------------------------------------//

function gravidade(){
    if(caindo == null){
        caindo = setInterval(()=>{

            let novaLocY = player["posicaoY"] + tmnDoMovimento
            if(!verificarColisao(
                player["posicaoX"],
                novaLocY
            )
            ){
                player["posicaoY"] = novaLocY
                alterarPlayerPosition()
            }
            if(verificarColisao(player["posicaoX"], novaLocY) ){
                clearInterval(caindo)
                caindo = null
            }

        }, 30)
    }
}

gravidade()

//------------------------------------CONFIGURACAO DE CONTROLES------------------------------------------//

//btn precionado

window.addEventListener("keydown", (event)=>{
    switch (event.code) {
        case "KeyA":
            andarParaTraz();
            break;

        case "KeyD":
            andar();
            break;

        case "KeyW":
            subir();
            break;
        
        case "Space":
            subir();
            break;
    
        default:
            break;
    }
})

//btn solto

window.addEventListener("keyup", (event)=>{
    switch (event.code) {
        case "KeyA":
            aleterarAnimacao(1)
            clearInterval(andandoPraTras)
            andandoPraTras = null

            break;

        case "KeyD":
            aleterarAnimacao(1)
            clearInterval(andando)
            andando = null

            break;
    
        default:
            break;
    }
})