//--------------------------------------------------------------função de criação------------------------------------------------------//

const criarElemento = (tipo, classe, pai, texto, id) =>{
    let elementoCriado = document.createElement(`${tipo}`)
    
    elementoCriado.id = `${id}`
    elementoCriado.classList = classe
    elementoCriado.style.textTransform = ("uppercase")
    elementoCriado.innerText = (`${texto}`)
    
    document.querySelector(`#${pai}`).appendChild(elementoCriado)
}
//--------------------------------------------------------------------exportação------------------------------------------------------//

export default criarElemento;