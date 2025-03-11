import { likeCardRequest, deleteCardRequest } from "./api"

function createCard(card, deleteCard, likeCard, openImagePopup) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardContent = cardTemplate
        .querySelector(".places__item")
        .cloneNode(true);
    const deleteCardButton = cardContent.querySelector(".card__delete-button");
    const likeCardButton = cardContent.querySelector(".card__like-button");
    const cardLikesAmount = cardContent.querySelector(".card__likes-amount");
    const cardImage = cardContent.querySelector(".card__image");

    cardLikesAmount.textContent = card.likes;

    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardImage.addEventListener("click", openImagePopup);

    cardContent.querySelector(".card__title").textContent = card.name;

    deleteCardButton.addEventListener("click", () => {

        deleteCardRequest(card.id)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }

                return Promise.reject(`Ошибка ${response.status}`);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                deleteCard(cardContent);
            })
    });

    likeCardButton.addEventListener("click", (e) => {
        likeCard(e, card.id, cardLikesAmount);
    });

    return cardContent;
}

function likeCard(e, cardId, counter) {

    likeCardRequest(e, cardId, counter);

}

function deleteCard(card) {
    card.remove();
}

export { createCard, likeCard, deleteCard }