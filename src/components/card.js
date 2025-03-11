import { likeCardRequest, unlikeCardRequest, deleteCardRequest } from "./api"

function createCard(card, deleteCard, likeCard, openImagePopup, userId) {
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

    if (card.ownerId !== userId) {
        deleteCardButton.style.display = "none";
    }

    deleteCardButton.addEventListener("click", () => {
        deleteCard(card.id, cardContent);
    });

    likeCardButton.addEventListener("click", (e) => {
        likeCard(e, card.id, cardLikesAmount);
    });

    return cardContent;
}

function likeCard(e, cardId, counter) {

    if (!e.target.classList.contains("card__like-button_is-active")) {
        likeCardRequest(cardId)
            .then((data) => {
                counter.textContent = data.likes.length;
                e.target.classList.add("card__like-button_is-active");
            })
            .catch((err) => {
                console.log(err);
            })

    } else {
        unlikeCardRequest(cardId)
            .then((data) => {
                counter.textContent = data.likes.length;
                e.target.classList.remove("card__like-button_is-active");
            })
            .catch((err) => {
                console.log(err);
            })
    }


}

function deleteCard(cardId, cardContent) {
    deleteCardRequest(cardId)
        .then(() => {
            cardContent.remove();
        })
        .catch((err) => {
            console.log(err);
        })

}

export { createCard, likeCard, deleteCard }