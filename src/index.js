import "../pages/index.css";
import { initialCards } from "./cards.js";
import { openPopup, closePopup } from './popup.js';

// @todo: Темплейт карточки

// @todo: DOM узлы

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector(".popup_type_new-card");

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector(".profile__add-button");

profileEditButton.addEventListener('click', openPopup);
popupEditProfile.addEventListener('click', closePopup);

profileAddButton.addEventListener("click", openPopup);
popupNewCard.addEventListener("click", closePopup);

// @todo: Функция создания карточки

function createCard(card, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardContent = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const deleteCardButton = cardContent.querySelector(".card__delete-button");
  const cardImage = cardContent.querySelector(".card__image");

  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardImage.addEventListener('click', openPopup);

  cardContent.querySelector(".card__title").textContent = card.name;

  deleteCardButton.addEventListener("click", () => {
    deleteCard(cardContent);
  });

  console.log(cardImage.link);

  return cardContent;
}

// @todo: Функция удаления карточки

function deleteCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу

const placesList = document.querySelector(".places__list");

initialCards.forEach((el) => {
  const card = createCard(el, deleteCard);
  placesList.append(card);
});
