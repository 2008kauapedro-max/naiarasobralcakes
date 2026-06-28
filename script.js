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


/* GALERIA DO CATÁLOGO - CATEGORIA ABRE CARROSSEL */
const whatsappBase = "https://wa.me/5561985167596?text=";

const galeriaDados = {
    bolos: {
        nome: "Bolos",
        descricao: "Bolos decorados e personalizados para datas especiais.",
        pedido: "Olá! Vim pelo site da Naiara Sobral Cakes e gostaria de fazer um orçamento de bolo.",
        fotos: [
            "img/bolos/bolo01.jpeg",
            "img/bolos/bolo02.jpeg",
            "img/bolos/bolo03.jpeg",
            "img/bolos/bolo04.jpeg"
        ]
    },
    doces: {
        nome: "Doces",
        descricao: "Docinhos, sobremesas e doces para festas.",
        pedido: "Olá! Vim pelo site da Naiara Sobral Cakes e gostaria de fazer um pedido/orçamento de doces.",
        fotos: [
            "img/doces/doce01.jpeg",
            "img/doces/doce02.jpeg",
            "img/doces/doce03.jpeg",
            "img/doces/doce04.png"
        ]
    },
    lanches: {
        nome: "Lanches",
        descricao: "Salgados, lanches e opções para o dia a dia.",
        pedido: "Olá! Vim pelo site da Naiara Sobral Cakes e gostaria de fazer um pedido/orçamento de lanches.",
        fotos: [
            "img/lanches/lanche01.png",
            "img/lanches/lanche02.png",
            "img/lanches/lanche03.png",
            "img/lanches/lanche04.png"
        ]
    },
    dindin: {
        nome: "Dindins",
        descricao: "Sabores cremosos: pudim, ninho com Nutella, maracujá com chocolate e frutas vermelhas com chocolate.",
        pedido: "Olá! Vim pelo site da Naiara Sobral Cakes e gostaria de pedir dindins.",
        fotos: [
            "img/dindin/dindinpudim.png",
            "img/dindin/dindinnutella.png",
            "img/dindin/dindinmaracuja.png",
            "img/dindin/dindinfrutasvermelhas.png"
        ]
    }
};

let categoriaAtual = "bolos";
let itemAtual = 0;
let touchStartX = 0;

function montarLinkPedido(texto){
    return whatsappBase + encodeURIComponent(texto);
}

function abrirCategoria(categoria){
    categoriaAtual = categoria;
    itemAtual = 0;
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
    const lista = galeriaDados[categoriaAtual].fotos;
    itemAtual = (itemAtual + direcao + lista.length) % lista.length;
    atualizarModalGaleria();
}

function atualizarModalGaleria(){
    const categoria = galeriaDados[categoriaAtual];
    const foto = categoria.fotos[itemAtual];
    const img = document.getElementById("galeriaModalImg");

    img.style.animation = "none";
    img.offsetHeight;
    img.src = foto;
    img.alt = categoria.nome;
    img.style.animation = "fotoEntrar 0.22s ease both";

    document.getElementById("galeriaModalTitulo").textContent = categoria.nome;
    document.getElementById("galeriaModalDesc").textContent = categoria.descricao;
    document.getElementById("galeriaContador").textContent = `${itemAtual + 1} de ${categoria.fotos.length}`;
    document.getElementById("galeriaPedido").href = montarLinkPedido(categoria.pedido);
}

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
