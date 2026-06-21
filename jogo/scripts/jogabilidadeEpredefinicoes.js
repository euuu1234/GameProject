const TamanhoTpx = 768 / 50;

const grafico = (x) => x * TamanhoTpx;

let subir = null;
let gravidade = null;
let objetoNoChao = true;
let frente = false;
let cima = false;
let atraz = false;

let linhaAtual = 425;
let colunaAtual = 20;

let limite_baixo = 768;
let pulo = 150;
let tamanhoOBJ = 50;
let alturaInicialPulo = null;


(()=>{
    imagemPersonagem = document.createElement('img');
    imagemPersonagem.id = "bola";
    imagemPersonagem.src = "jogo/img/animacoes/lab1.png";
    imagemPersonagem.style.position = "absolute"

    document.querySelector("#tela_de_jogo").appendChild(imagemPersonagem);
})()

const personagem1 = document.querySelector("#bola");
const principal = document.querySelector("#tela_de_jogo");

if (!personagem1 || !principal) {
    throw new Error("Elemento #bola ou #tela_de_jogo não encontrado.");
}

//personagem1.style.width = tamanhoOBJ + "px";
personagem1.style.height = tamanhoOBJ + "px";
personagem1.style.position = "absolute";
personagem1.style.left = colunaAtual + "px";
personagem1.style.top = linhaAtual + "px";

function criarBloco(localizacao_X, localizacao_Y, altura, largura) {
    const div = document.createElement("div");

    div.style.width = grafico(largura) + "px";
    div.style.height = grafico(altura) + "px";
    div.style.position = "absolute";
    div.style.left = grafico(localizacao_X) + "px";
    div.style.top = grafico(localizacao_Y) + "px";
    div.style.backgroundColor = "red";

    principal.appendChild(div);
}

function retanguloColide(ax, ay, aw, ah, bx, by, bw, bh) {
    return (
        ax < bx + bw &&
        ax + aw > bx &&
        ay < by + bh &&
        ay + ah > by
    );
}

function colideEm(posX, posY) {
    return blocos.some((element) => {
        const blocoX = grafico(element[0]);
        const blocoY = grafico(element[1]);
        const blocoW = grafico(element[3]);
        const blocoH = grafico(element[2]);

        return retanguloColide(
            posX,
            posY,
            tamanhoOBJ,
            tamanhoOBJ,
            blocoX,
            blocoY,
            blocoW,
            blocoH
        );
    });
}

function cair() {
    if (gravidade != null) return;

    objetoNoChao = null

    gravidade = setInterval(() => {
        const proximaLinha = linhaAtual + TamanhoTpx;

        if (proximaLinha >= limite_baixo || colideEm(colunaAtual, proximaLinha)) {
            clearInterval(gravidade);
            objetoNoChao = true;
            gravidade = null;
            return;
        }

        linhaAtual = proximaLinha;
        personagem1.style.top = linhaAtual + "px";
    }, 60);
}

function movimentar(tipoMovimento) {
    if (
        tipoMovimento == "frente" ||
        tipoMovimento == "atraz" ||
        tipoMovimento == "atras" ||
        tipoMovimento == "inicial"
    ) {
        if (tipoMovimento == "frente") {
            const novaColuna = Math.min(768 - tamanhoOBJ, colunaAtual + TamanhoTpx);

            if (!colideEm(novaColuna, linhaAtual)) {
                colunaAtual = novaColuna;
            }
        } else if (tipoMovimento == "atraz" || tipoMovimento == "atras") {
            const novaColuna = Math.max(0, colunaAtual - TamanhoTpx);

            if (!colideEm(novaColuna, linhaAtual)) {
                colunaAtual = novaColuna;
            }
        }

        personagem1.style.left = colunaAtual + "px";
        personagem1.style.top = linhaAtual + "px";

        if(subir == null && gravidade == null){
            cair();
        }
    } else if (tipoMovimento == "pulo") {
        if(!objetoNoChao) return;
        if (subir) return;

        if (gravidade != null) {
            clearInterval(gravidade);
            gravidade = null;
        }

        alturaInicialPulo = linhaAtual;
        const limiteSuperiorPulo = Math.max(0, alturaInicialPulo - pulo);

        subir = setInterval(() => {
            const proximaLinha = linhaAtual - TamanhoTpx;

            if (proximaLinha <= limiteSuperiorPulo || colideEm(colunaAtual, proximaLinha)) {
                clearInterval(subir);
                subir = null;
                cair();
                return;
            }

            linhaAtual = proximaLinha;
            personagem1.style.top = linhaAtual + "px";
            personagem1.style.left = colunaAtual + "px";
        }, 60);
    }
}

// desenhar os blocos
blocos.forEach((element) => {
    criarBloco(element[0], element[1], element[2], element[3]);
});

// posição inicial
movimentar("inicial");

const teclas = {
    CIMA: ['KeyW', 'ArrowUp'],
    A: 'KeyA',
    S: 'KeyS',
    D: 'KeyD',
}

// teclado
window.addEventListener("keydown", (event) => {
    switch (event.code) {
        case teclas.CIMA[0]:
        case teclas.CIMA[1]:
            movimentar("pulo");
            break;
        case teclas.A:
            movimentar("atraz");
            break;
        case teclas.D:
            movimentar("frente");
            break;
    }
});

// Primeira versão
// teclado
// window.addEventListener("keydown", (event) => {
//     switch (event.key) {
//         case "ArrowUp":
//             movimentar("pulo");
//             break;
//         case "ArrowLeft":
//             movimentar("atraz");
//             break;
//         case "ArrowRight":
//             movimentar("frente");
//             break;
//     }
// });

