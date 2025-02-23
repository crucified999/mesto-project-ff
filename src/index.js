import "../pages/index.css";
import { handleEditFormSubmit } from "./components/forms.js"
import {openModal, closeModal, closeOnOverlay } from "./components/modal";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { initialCards } from "./components/cards";


// @todo: Темплейт карточки


// @todo: DOM узлы

const placesList = document.querySelector(".places__list");

const popups = document.querySelectorAll(".popup");
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const cardImagePopup = document.querySelector(".popup_type_image");

const popupCaption = cardImagePopup.querySelector(".popup__caption");
const popupImage = cardImagePopup.querySelector(".popup__image");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const editProfileForm = document.forms["edit-profile"];
const inputProfileName = editProfileForm.elements.name;
const intputProfileDescription = editProfileForm.elements.description;

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const newPlaceForm = document.forms["new-place"];


profileEditButton.addEventListener("click", () => {

    inputProfileName.value = profileTitle.textContent;
    intputProfileDescription.value = profileDescription.textContent;

    openModal(editPopup);
});

profileAddButton.addEventListener("click", () => {
    openModal(newCardPopup);
});

popups.forEach((popup) => {
    const popupCloseButton = popup.querySelector(".popup__close");

    popup.classList.add("popup_is-animated");
    popupCloseButton.addEventListener("click", () => closeModal(popup));
    popup.addEventListener("click", closeOnOverlay);
});

editProfileForm.addEventListener("submit", handleEditFormSubmit);

newPlaceForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newPlace = {
        name: newPlaceForm.elements["place-name"].value,
        link: newPlaceForm.elements["link"].value,
    }

    const newPlaceCard = createCard(newPlace, deleteCard, likeCard, openImagePopup);

    placesList.prepend(newPlaceCard);
    closeModal(newCardPopup);
});

// @todo: Функция создания карточки
// @todo: Функция удаления карточки
// @todo: Вывести карточки на страницу

function openImagePopup(e) {

    console.log(e.target);

    popupCaption.textContent = e.target.alt;
    popupImage.src = e.target.src;
    popupImage.alt = e.target.alt;

    openModal(cardImagePopup);
}

initialCards.forEach((el) => {
    const card = createCard(el, deleteCard, likeCard, openImagePopup);
    placesList.append(card);
});

export { inputProfileName, intputProfileDescription, profileTitle, profileDescription, editPopup };