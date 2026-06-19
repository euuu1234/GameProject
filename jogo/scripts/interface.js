function criarElemento(tipo, pai, texto, id){
    let elementoCriado = document.createElement(`${tipo}`)

    elementoCriado.id = `${id}`
    elementoCriado.style.textTransform = ("uppercase")
    elementoCriado.innerText = (`${texto}`)

    document.querySelector(`#${pai}`).appendChild(elementoCriado)
}

criarElemento("nav", "principal", "", "menu");

(()=>{
    criarElemento("div", "menu", "iniciar", "iniciar")
    criarElemento("div", "menu", "história", "historia")
    criarElemento("div", "menu", "amigos", "amigos")
    criarElemento("div", "menu", "personagem", "personagem")
})();

let faseAtual = 1;


    document.querySelector("#historia").addEventListener("click", ()=>{
        window.location.replace(`/jogo/fases/fase${faseAtual}.html`)
    });