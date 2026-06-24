import configuracoes from "../dados/scripts/configuracoes.js";
import criarElemento from "./interface.js"

//----------------------------------------------------------dimencionando a tela--------------------------------------------------------------//

const principal = document.querySelector("#principal");

principal.style.width = configuracoes["displayWidth"] + "px"

//-----------------------------------------------------------criando menu principal-----------------------------------------------------------//

criarElemento("nav", "principal", "principal", "", "menu");

//-----------------------------------------------------------criando botões principal---------------------------------------------------------//

criarElemento("div", "botoes", "menu", "iniciar", "iniciar")
criarElemento("div", "botoes", "menu", "história", "historia")
criarElemento("div", "botoes", "menu", "amigos", "amigos")
criarElemento("div", "botoes", "menu", "personagem", "personagem")

//-----------------------------------------------------------definindo fase------------------------------------------------------------------//

let faseAtual = 1;

document.querySelector("#historia").addEventListener("click", ()=>{
    window.location.replace(`../fases/fase${faseAtual}.html`)
});

//-----------------------------------------------------------click em config-----------------------------------------------------------------//

const btnDeConfiguracoes = document.querySelector("#configuracoes")

btnDeConfiguracoes.addEventListener("click", ()=>{

    document.querySelector("#menu").style.display = "none"

    criarElemento("div", "menu_segundario", "principal", "", "configTela")

    criarElemento("div", "botao_segudario", "configTela", "tela", "tela")
})