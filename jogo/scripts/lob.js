import configuracoes from "../dados/scripts/configuracoes.js"

//--------------------------------------------------------------função de criação------------------------------------------------------//

const criarElemento = (tipo, classe, pai, texto, id) =>{
    let elementoCriado = document.createElement(`${tipo}`)
    
    elementoCriado.id = `${id}`
    elementoCriado.classList.add(classe)
    elementoCriado.style.textTransform = ("uppercase")
    elementoCriado.innerText = (`${texto}`)
    
    document.querySelector(`#${pai}`).appendChild(elementoCriado)
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

//-----------------------------------------------------------alterar visibilidade dos elementos----------------------------------------//

function alterarVisibilidade(id, display){
    document.querySelector("#" + id).style.display = display
}

//-----------------------------------------------------------criação de btn internos--------------------------------------------------//

function botaoInterno(texto, id, classe, incremento, pai){
    let elementoPai = pai || "lateralDireito"
    criarElemento("div", "botoes_internos", elementoPai, texto, id)

    document.querySelector(`#${id}`).classList.add(classe)
    document.querySelector(`#${id}`).innerHTML += incremento
    document.querySelector(`#${id}`).classList.add("botao_interno")
}

//----------------------------------------------------------criação do botão de sair-------------------------------------------------//
function botaoSair(elementoPai){
    criarElemento("img", "imagemFechar", elementoPai, "", "imagemX")
    
    const imagemX = document.querySelector("#imagemX")
    
    //adicionar evento ao botão de sair
    imagemX.src = "../img/icones/imagemX.png"
    imagemX.addEventListener("click", ()=>{
        excluirElemento("setup")
        menuVisibilidade("block")
    })
    
    return imagemX;
}

//-----------------------------------------------------------exclusão de elementos-----------------------------------------------------//

function excluirElemento(elemento){
    document.querySelector(`#${elemento}`).remove()
}

//-----------------------------------------------------------visibilidade menu---------------------------------------------------------------//

function menuVisibilidade(visibilidade){
    alterarVisibilidade("configuracoes", visibilidade)
    alterarVisibilidade("audio", visibilidade)
    alterarVisibilidade("menu", visibilidade)
}

//-----------------------------------------------------------click em config-----------------------------------------------------------------//

const btnDeConfiguracoes = document.querySelector("#configuracoes")

btnDeConfiguracoes.addEventListener("click", ()=>{
    
    menuVisibilidade("none")

    //criar menu secundario
    criarElemento("div", "menu_segundario", "principal", "", "setup")
    
    criarElemento("div", "lateral_menu", "setup", "", "lateralEsquerdo")
    criarElemento("div", "lateral_menu", "setup", "", "lateralDireito")
    
    //criar botões de opções do menu secundario
    criarElemento("div", "botao_segudario", "lateralEsquerdo", "tela", "tela")
    criarElemento("div", "botao_segudario", "lateralEsquerdo", "controle", "controle")
    criarElemento("div", "botao_segudario", "lateralEsquerdo", "teclado", "teclado")
    
    //criar botões internos das opções do menu secundario
    botaoInterno(
        "Resolução de Tela",
        "ResolucaoDeTela",
        "botao_interno",
        " <select id='Resolucao'><option value='1'>1920 x 1080</option><option value='2'>2560 x 1440</option><option value='3'>3840 x 2160</option></select>"
    )
    
    botaoSair('lateralDireito')
    
    //adicionar evento ao botão de Resolução de Tela
    const btnResolucaoDeTela = document.querySelector("#tela")
    btnResolucaoDeTela.addEventListener("click", ()=>{
        document.querySelector("#lateralDireito").innerHTML = ""

        botaoInterno("Resolução de Tela", "ResolucaoDeTela", "botao_interno", " <select id='Resolucao'><option value='1'>1920 x 1080</option><option value='2'>2560 x 1440</option><option value='3'>3840 x 2160</option></select>")
        
        botaoSair('lateralDireito')
    })
    
    //adicionar evento ao botão de teclado
    const btnTeclado = document.querySelector("#teclado")
    btnTeclado.addEventListener("click", ()=>{
        document.querySelector("#lateralDireito").innerHTML = ""

        botaoInterno("teclado", "teclas", "botao_interno", " <select id='teclas'><option value='1'>WASD</option><option value='2'>Setas</option></select>")
        
        botaoSair('lateralDireito')
    })
    
    //adicionar evento ao botão de controle
    const btnControle = document.querySelector("#controle")
    btnControle.addEventListener("click", ()=>{
        document.querySelector("#lateralDireito").innerHTML = ""

        botaoInterno("controle", "botoes", "botao_interno", " <select id='botoes'><option value='1'>XBOX</option><option value='2'>Playstation</option></select>")
        
        botaoSair('lateralDireito')
    })
})

//-----------------------------------------------------------click em audio-----------------------------------------------------------------//

const btnDeAudio = document.querySelector("#audio")

btnDeAudio.addEventListener("click", ()=>{
    
    menuVisibilidade("none")

    //criar menu secundario
    criarElemento("div", "menu_segundario", "principal", "", "setup")

    const menuSecundario = document.querySelector("#setup")

    menuSecundario.style.flexDirection = "column"
        
    //criar botões internos das opções do menu secundario
    botaoInterno(
        "saida de audio",
        "SaidaDeAudio",
        "botao_interno",
        " <select id='SaidaDeAudio'><option value='1'>Alto Falantes</option><option value='2'>Fone de Ouvido</option></select>",
        "setup"
    )

    botaoInterno(
        "volume",
        "Volume",
        "botao_interno",
        " <input type='range' id='Volume' min='0' max='100' value='50'>",
        "setup"
    )

    botaoInterno(
        "qualidade de audio",
        "QualidadeDeAudio",
        "botao_interno",
        " <select id='QualidadeDeAudio'><option value='1'>Baixa</option><option value='2'>Média</option><option value='3'>Alta</option></select>",
        "setup"
    )

    botaoInterno(
        "ativar efeitos sonoros",
        "AtivarEfeitosSonoros",
        "botao_interno",
        " <select id='AtivarEfeitosSonoros'><option value='1'>Sim</option><option value='2'>Não</option></select>",
        "setup"
    )

    botaoInterno(
        "ativar música de fundo",
        "AtivarMusicaDeFundo",
        "botao_interno",
        " <select id='AtivarMusicaDeFundo'><option value='1'>Sim</option><option value='2'>Não</option></select>",
        "setup"
    )
    
    botaoSair("setup")
    
})