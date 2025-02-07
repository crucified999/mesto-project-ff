import { openModal } from "./modals";

const placesList = document.querySelector(".places__list");

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

function createCard(card, deleteCard, likeCard) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardContent = cardTemplate
        .querySelector(".places__item")
        .cloneNode(true);
    const deleteCardButton = cardContent.querySelector(".card__delete-button");
    const likeCardButton = cardContent.querySelector(".card__like-button");
    const cardImage = cardContent.querySelector(".card__image");

    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardImage.addEventListener("click", openModal);

    cardContent.querySelector(".card__title").textContent = card.name;

    deleteCardButton.addEventListener("click", () => {
        deleteCard(cardContent);
    });

    likeCardButton.addEventListener("click", likeCard);

    return cardContent;
}

function likeCard() {
    this.classList.toggle("card__like-button_is-active");
}

function deleteCard(card) {
    card.remove();
}

initialCards.forEach((el) => {
    const card = createCard(el, deleteCard, likeCard);
    placesList.append(card);
});

export { placesList, createCard, likeCard, deleteCard };

