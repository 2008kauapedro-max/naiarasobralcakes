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