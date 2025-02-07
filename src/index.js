import "../pages/index.css";
import "./components/modals.js"
import "./components/forms.js"
import { createCard, likeCard, deleteCard } from "./components/cards.js";

// @todo: Темплейт карточки
// @todo: DOM узлы

// @todo: Функция создания карточки
// @todo: Функция удаления карточки
// @todo: Вывести карточки на страницу

const popupTypeImage = document.querySelector(".popup_type_image");
const cardImages = document.querySelectorAll(".card__image");

cardImages.forEach((cardImage) =>  {
  cardImage.addEventListener("click", (e) => {
    const popupImage = document.querySelector(".popup__image");

    popupImage.src = cardImage.src;
  })
})



