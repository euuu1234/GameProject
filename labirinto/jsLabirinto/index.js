for(let i = 0; i < 25; i++){
    const principal = document.querySelector("#tela_de_jogo")

    let linha = document.createElement('div')
    let colunas = document.createElement('div')

    linha.classList.add("linhas")
    colunas.classList.add("colunas")

    linha.style.top = `${i * 20}px`;
    colunas.style.left = `${i * 20}px`;

    principal.appendChild(colunas)
    principal.appendChild(linha)

}

