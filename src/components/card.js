import { openImagePopup } from "../index";

function createCard(card, deleteCard, likeCard, onOpenImagePopup) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardContent = cardTemplate
        .querySelector(".places__item")
        .cloneNode(true);
    const deleteCardButton = cardContent.querySelector(".card__delete-button");
    const likeCardButton = cardContent.querySelector(".card__like-button");
    const cardImage = cardContent.querySelector(".card__image");

    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardImage.addEventListener('click', () => {
        openImagePopup(card);
    });

    cardContent.querySelector(".card__title").textContent = card.name;

    deleteCardButton.addEventListener("click", () => {
        deleteCard(cardContent);
    });

    likeCardButton.addEventListener("click", likeCard);

    return cardContent;
}

function likeCard(e) {
    e.target.classList.toggle("card__like-button_is-active");
}

function deleteCard(card) {
    card.remove();
}

export { createCard, likeCard, deleteCard }