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
    criarElemento("div", pai, "segundo_menu_direita", texto, id)
}

//--------------------------------------------------------------------exportação------------------------------------------------------//

export default criarElemento;


