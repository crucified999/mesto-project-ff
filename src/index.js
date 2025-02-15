import "../pages/index.css";
// import "./components/modals.js"
import { handleFormSubmit } from "./components/forms.js"
import { openModal, closeModal } from "./components/modals";
import { createCard, deleteCard, likeCard, initialCards } from "./components/cards";

"./components/modals.js";

// @todo: Темплейт карточки


// @todo: DOM узлы

const placesList = document.querySelector(".places__list");

const popups = document.querySelectorAll(".popup");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const editProfileForm = document.forms["edit-profile"];
const newPlaceForm = document.forms["new-place"];


profileEditButton.addEventListener("click", openModal);
profileAddButton.addEventListener("click", openModal);

popups.forEach((popup) => {
    popup.classList.add("popup_is-animated");
    popup.addEventListener("click", closeModal);
    popup.addEventListener("submit", (e) => {
        e.preventDefault();

        popup.classList.remove("popup_is-opened");
    });
});

editProfileForm.addEventListener("submit", handleFormSubmit);

newPlaceForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newPlace = {
        name: newPlaceForm.elements["place-name"].value,
        link: newPlaceForm.elements["link"].value,
    }

    const newPlaceCard = createCard(newPlace, deleteCard, likeCard);

    placesList.prepend(newPlaceCard);
    newPlaceForm.reset();
});

// @todo: Функция создания карточки
// @todo: Функция удаления карточки
// @todo: Вывести карточки на страницу

initialCards.forEach((el) => {
    const card = createCard(el, deleteCard, likeCard);
    placesList.append(card);
});