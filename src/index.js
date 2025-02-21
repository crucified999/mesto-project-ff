import "../pages/index.css";
import { handleEditFormSubmit } from "./components/forms.js"
import { openModal, closeModal } from "./components/modal";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { initialCards } from "./components/cards";


// @todo: Темплейт карточки


// @todo: DOM узлы

const placesList = document.querySelector(".places__list");

const popups = document.querySelectorAll(".popup");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const editProfileForm = document.forms["edit-profile"];
const inputProfileName = editProfileForm.elements.name;
const intputProfileDescription = editProfileForm.elements.description;

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const newPlaceForm = document.forms["new-place"];


profileEditButton.addEventListener("click", () => {
    const editPopup = document.querySelector(".popup_type_edit");

    inputProfileName.value = document.querySelector(".profile__title").textContent;
    intputProfileDescription.value = document.querySelector(".profile__description").textContent;

    openModal(editPopup);
});

profileAddButton.addEventListener("click", () => {
    const newCardPopup = document.querySelector(".popup_type_new-card");

    openModal(newCardPopup);
});

popups.forEach((popup) => {
    const popupCloseButton = popup.querySelector(".popup__close");

    popup.classList.add("popup_is-animated");
    popupCloseButton.addEventListener("click", () => closeModal(popup));
    popup.addEventListener("submit", (e) => {
        e.preventDefault();
        closeModal(popup);
    });
});

editProfileForm.addEventListener("submit", handleEditFormSubmit);

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

function openImagePopup(card) {
    const cardImagePopup = document.querySelector(".popup_type_image");

    const popupCaption = cardImagePopup.querySelector(".popup__caption");
    const popupImage = cardImagePopup.querySelector(".popup__image");

    popupCaption.textContent = card.name;
    popupImage.src = card.link;
    popupImage.alt = card.name;

    openModal(cardImagePopup);
}

initialCards.forEach((el) => {
    const card = createCard(el, deleteCard, likeCard, openImagePopup);
    placesList.append(card);
});

export { inputProfileName, intputProfileDescription, profileTitle, profileDescription, openImagePopup };