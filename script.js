const reviews = [
    {
        text: "Atendimento ótimo, organização maravilhosa e ambiente super agradável.",
        author: "Alcides Sipriano"
    },
    {
        text: "Comidas e lanches deliciosos. Parabéns a toda equipe.",
        author: "Alcides Sipriano"
    },
    {
        text: "Local super agradável, comida top e atendimento diferenciado.",
        author: "Elielson Lima"
    },
    {
        text: "Tortas muito boas e feitas com ingredientes de qualidade.",
        author: "Luana Araújo"
    },
    {
        text: "Bolos com qualidade excelente, muito saborosos e bem recheados.",
        author: "Carolina Ferreira"
    },
    {
        text: "Experiência incrível, vale a pena frequentar.",
        author: "Doanne Karem"
    },
    {
        text: "Ótimos produtos e excelente atendimento.",
        author: "Samira Nunes"
    }
];

let currentReview = 0;

const reviewText = document.getElementById("review-text");
const reviewAuthor = document.getElementById("review-author");

function changeReview(){
    currentReview = (currentReview + 1) % reviews.length;

    reviewText.style.opacity = 0;
    reviewAuthor.style.opacity = 0;

    setTimeout(() => {
        reviewText.textContent = reviews[currentReview].text;
        reviewAuthor.textContent = "— " + reviews[currentReview].author;

        reviewText.style.opacity = 1;
        reviewAuthor.style.opacity = 1;
    }, 300);
}

reviewText.style.transition = "0.3s";
reviewAuthor.style.transition = "0.3s";

setInterval(changeReview, 5000);

function abrirImagem(src){

    document.getElementById("modalImagem").style.display = "flex";

    document.getElementById("imagemAmpliada").src = src;
}

function fecharImagem(){

    document.getElementById("modalImagem").style.display = "none";
}

/* ABERTURA ANIMADA */
(function(){
    const startIntro = () => {
        const introScreen = document.getElementById("introScreen");
        if(!introScreen) return;

        document.body.classList.add("intro-lock");

        // Força o navegador do Instagram/celular a iniciar as animações antes de remover a tela
        requestAnimationFrame(() => {
            introScreen.classList.add("intro-start");
        });

        setTimeout(() => {
            introScreen.classList.add("intro-hide");
            document.body.classList.remove("intro-lock");
        }, 2300);

        setTimeout(() => {
            introScreen.remove();
        }, 3100);
    };

    if(document.readyState === "loading"){
        document.addEventListener("DOMContentLoaded", startIntro);
    }else{
        startIntro();
    }
})();


/* GALERIA DO CATÁLOGO */
const whatsappBase = "https://wa.me/5561985167596?text=";

const galeriaDados = {
    bolos: [
        { titulo:"Bolo Decorado", img:"img/bolos/bolo01.jpeg" },
        { titulo:"Bolo de Aniversário", img:"img/bolos/bolo02.jpeg" },
        { titulo:"Bolo Especial", img:"img/bolos/bolo03.jpeg" },
        { titulo:"Bolo Personalizado", img:"img/bolos/bolo04.jpeg" }
    ],
    doces: [
        { titulo:"Docinhos Sortidos", img:"img/doces/doce01.jpeg" },
        { titulo:"Doces para Festa", img:"img/doces/doce02.jpeg" },
        { titulo:"Sobremesa Especial", img:"img/doces/doce03.jpeg" },
        { titulo:"Doce da Casa", img:"img/doces/doce04.png" }
    ],
    lanches: [
        { titulo:"Lanche Especial", img:"img/lanches/lanche01.png" },
        { titulo:"Salgado Especial", img:"img/lanches/lanche02.png" },
        { titulo:"Combo de Lanches", img:"img/lanches/lanche03.png" },
        { titulo:"Lanche da Casa", img:"img/lanches/lanche04.png" }
    ],
    dindin: [
        { titulo:"Dindin de Pudim", img:"img/dindin/dindinpudim.png" },
        { titulo:"Dindin de Ninho com Nutella", img:"img/dindin/dindinnutella.png" },
        { titulo:"Dindin de Maracujá com Chocolate", img:"img/dindin/dindinmaracuja.png" },
        { titulo:"Dindin de Frutas Vermelhas com Chocolate", img:"img/dindin/dindinfrutasvermelhas.png" }
    ]
};

let categoriaAtual = "bolos";
let itemAtual = 0;
let touchStartX = 0;

function montarLinkPedido(nome){
    return whatsappBase + encodeURIComponent(`Olá! Vim pelo site da Naiara Sobral Cakes e gostaria de pedir/orçar: ${nome}.`);
}

function renderizarGaleria(categoria = "bolos"){
    const grid = document.getElementById("galeriaGrid");
    if(!grid) return;

    categoriaAtual = categoria;
    grid.innerHTML = "";

    galeriaDados[categoria].forEach((item, index) => {
        const card = document.createElement("article");
        card.className = "galeria-card";

        card.innerHTML = `
            <img src="${item.img}" alt="${item.titulo}" onclick="abrirGaleria(${index})">
            <div class="galeria-card-info">
                <h3>${item.titulo}</h3>
                <div class="galeria-acoes">
                    <button class="galeria-ver" type="button" onclick="abrirGaleria(${index})">Ver</button>
                    <a class="galeria-card-pedido" href="${montarLinkPedido(item.titulo)}" target="_blank">Pedir</a>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });

    grid.style.animation = "none";
    grid.offsetHeight;
    grid.style.animation = "galeriaEntrar 0.35s ease both";
}

function abrirGaleria(index){
    itemAtual = index;
    atualizarModalGaleria();

    const modal = document.getElementById("galeriaModal");
    modal.classList.add("ativo");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("galeria-lock");
}

function fecharGaleria(){
    const modal = document.getElementById("galeriaModal");
    if(!modal) return;

    modal.classList.remove("ativo");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("galeria-lock");
}

function mudarGaleria(direcao){
    const lista = galeriaDados[categoriaAtual];
    itemAtual = (itemAtual + direcao + lista.length) % lista.length;
    atualizarModalGaleria();
}

function atualizarModalGaleria(){
    const lista = galeriaDados[categoriaAtual];
    const item = lista[itemAtual];

    document.getElementById("galeriaModalImg").src = item.img;
    document.getElementById("galeriaModalImg").alt = item.titulo;
    document.getElementById("galeriaModalTitulo").textContent = item.titulo;
    document.getElementById("galeriaModalDesc").textContent = "Produto da Naiara Sobral Cakes";
    document.getElementById("galeriaContador").textContent = `${itemAtual + 1} de ${lista.length}`;
    document.getElementById("galeriaPedido").href = montarLinkPedido(item.titulo);
}

const filtrosGaleria = document.querySelectorAll(".galeria-filtro");
filtrosGaleria.forEach(botao => {
    botao.addEventListener("click", () => {
        filtrosGaleria.forEach(b => b.classList.remove("ativo"));
        botao.classList.add("ativo");
        renderizarGaleria(botao.dataset.categoria);
    });
});

const modalGaleria = document.getElementById("galeriaModal");
if(modalGaleria){
    modalGaleria.addEventListener("click", (event) => {
        if(event.target === modalGaleria){
            fecharGaleria();
        }
    });

    modalGaleria.addEventListener("touchstart", (event) => {
        touchStartX = event.changedTouches[0].screenX;
    });

    modalGaleria.addEventListener("touchend", (event) => {
        const touchEndX = event.changedTouches[0].screenX;
        const diferenca = touchEndX - touchStartX;

        if(Math.abs(diferenca) > 50){
            mudarGaleria(diferenca > 0 ? -1 : 1);
        }
    });
}

document.addEventListener("keydown", (event) => {
    const modalAberto = document.getElementById("galeriaModal")?.classList.contains("ativo");
    if(!modalAberto) return;

    if(event.key === "Escape") fecharGaleria();
    if(event.key === "ArrowLeft") mudarGaleria(-1);
    if(event.key === "ArrowRight") mudarGaleria(1);
});

renderizarGaleria("bolos");
