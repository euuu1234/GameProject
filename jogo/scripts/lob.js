import configuracoes from "../dados/scripts/configuracoes.js"

//--------------------------------------------------------------função de criação------------------------------------------------------//

const criarElemento = (tipo, classe, pai, texto, id) =>{
    let elementoCriado = document.createElement(`${tipo}`)
    
    elementoCriado.id = `${id}`
    elementoCriado.classList = classe
    elementoCriado.style.textTransform = ("uppercase")
    elementoCriado.innerText = (`${texto}`)
    
    document.querySelector(`#${pai}`).appendChild(elementoCriado)
}

//--------------------------------------------------------------------criar menu opcao de config--------------//

const criarMenuConfig = (pai, texto, id) =>{
    criarElemento("div", pai, "lateralDireito", texto, id)
}

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

//-----------------------------------------------------------esconder elementos------------------------------------------------------------//

function esconderElemento(id){
    document.querySelector("#" + id).style.display = "none"
}

//-----------------------------------------------------------criação de btn internos--------------------------------------------------//

function botaoInterno(texto, id, encremento){
    criarElemento("div", "botoes_internos", "lateralDireito", texto, id)
    document.querySelector(`#${id}`).innerHTML += encremento
    document.querySelector(`#${id}`).classList.add("botao_interno")
}

//-----------------------------------------------------------reaparecer elementos-----------------------------------------------------//

function reaparecer(elemento){
    document.querySelector("#" + elemento).style.display = "block"
}

//-----------------------------------------------------------exclusão de elementos-----------------------------------------------------//

function excluirElemento(elemento){
    document.querySelector(`#${elemento}`).remove()
}

//-----------------------------------------------------------click em config-----------------------------------------------------------------//

const btnDeConfiguracoes = document.querySelector("#configuracoes")

btnDeConfiguracoes.addEventListener("click", ()=>{
    //esconderElemento do menu principal
    esconderElemento("configuracoes")
    esconderElemento("audio")
    esconderElemento("menu")

    //criar menu secundario
    criarElemento("div", "menu_segundario", "principal", "", "configTela")

    criarElemento("div", "lateral_menu", "configTela", "", "lateralEsquerdo")
    criarElemento("div", "lateral_menu", "configTela", "", "lateralDireito")

    //criar botões de opções do menu secundario
    criarElemento("div", "botao_segudario", "lateralEsquerdo", "tela", "tela")
    criarElemento("div", "botao_segudario", "lateralEsquerdo", "controle", "controle")
    criarElemento("div", "botao_segudario", "lateralEsquerdo", "teclado", "teclado")

    //criar botões internos das opções do menu secundario
    botaoInterno(
        "Resolução de Tela",
        "ResolucaoDeTela",
        " <select id='Resolucao'><option value='1'>1920 x 1080</option><option value='2'>2560 x 1440</option><option value='3'>3840 x 2160</option></select>"
    )

    //criação do botão de sair
    function botaoSair(){
        criarElemento("img", "", "lateralDireito", "", "imagemX")
        
        const imagemX = document.querySelector("#imagemX")

        //adicionar evento ao botão de sair
        imagemX.src = "../img/icones/imagemX.png"
        imagemX.addEventListener("click", ()=>{
            excluirElemento("configTela")
            reaparecer("configuracoes")
            reaparecer("audio")
            reaparecer("menu")
        })

        return imagemX;
    }

    botaoSair()

    //adicionar evento ao botão de Resolução de Tela
    const btnResolucaoDeTela = document.querySelector("#tela")
    btnResolucaoDeTela.addEventListener("click", ()=>{
        const lateralDireito = document.querySelector("#lateralDireito")
        lateralDireito.innerHTML = ""
        botaoInterno("Resolução de Tela", "ResolucaoDeTela", " <select id='Resolucao'><option value='1'>1920 x 1080</option><option value='2'>2560 x 1440</option><option value='3'>3840 x 2160</option></select>")

        botaoSair()
    })
    
    //adicionar evento ao botão de teclado
    const btnTeclado = document.querySelector("#teclado")
    btnTeclado.addEventListener("click", ()=>{
        const lateralDireito = document.querySelector("#lateralDireito")
        lateralDireito.innerHTML = ""
        botaoInterno("teclado", "teclas", " <select id='teclas'><option value='1'>WASD</option><option value='2'>Setas</option></select>")

        botaoSair()
    })
    
    //adicionar evento ao botão de controle
    const btnControle = document.querySelector("#controle")
    btnControle.addEventListener("click", ()=>{
        const lateralDireito = document.querySelector("#lateralDireito")
        lateralDireito.innerHTML = ""
        botaoInterno("controle", "botoes", " opcao")

        botaoSair()
    })
})
