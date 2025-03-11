import "../pages/index.css";
import { getProfileInfo, renderLoading, createNewCard, changeAvatar } from "./components/api";
import { handleEditFormSubmit } from "./components/forms.js"
import { openModal, closeModal, closeOnOverlay } from "./components/modal";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { initialCards } from "./components/cards"
import { checkValidity, enableValidation, clearValidation } from "./components/validation";


// @todo: Темплейт карточки


// @todo: DOM узлы

const profile = getProfileInfo()
    .then((data) => {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
    profileImage.style.backgroundImage = `url(${data.avatar})`;

    editProfileFormSubmitButton.textContent = "Сохранить";
})
    .catch((err) => {
        console.log(err);
    });

Promise.all([profile, initialCards])
    .then((response) => {
        console.log("...");
    });

const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    errorMessageSelector: '.popup__error',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

enableValidation(settings);

const placesList = document.querySelector(".places__list");

const popups = document.querySelectorAll(".popup");
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const cardImagePopup = document.querySelector(".popup_type_image");
const avatarPopup = document.querySelector(".popup_type_avatar");

const popupCaption = cardImagePopup.querySelector(".popup__caption");
const popupImage = cardImagePopup.querySelector(".popup__image");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const editProfileForm = document.forms["edit-profile"];
const inputProfileName = editProfileForm.elements.name;
const intputProfileDescription = editProfileForm.elements.description;
const editProfileFormInputs = editProfileForm.querySelectorAll(".popup__input");
const editProfileFormErrors = editProfileForm.querySelectorAll(".popup__error");
const editProfileFormSubmitButton = editProfileForm.querySelector(".popup__button");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const newPlaceForm = document.forms["new-place"];
const newPlaceFormInputs = newPlaceForm.querySelectorAll(".popup__input");
const newPlaceFormInputErrors = newPlaceForm.querySelectorAll(".popup__error");
const newPlaceFormSubmitButton = newPlaceForm.querySelector(".popup__button");

const avatarForm = document.forms["avatar"];
const avatarFormInput = avatarForm.elements.avatar;
const avatarFormSumbitButton = avatarForm.querySelector(".popup__button");

newPlaceFormInputs.forEach((input) => {

    const inputError = newPlaceForm.querySelector(`input[name='${input.name}'] + .popup__error`);

    input.addEventListener("input", () => {
        checkValidity(input, inputError, settings.inputErrorClass, settings.errorClass);
    });

})

profileEditButton.addEventListener("click", () => {

    inputProfileName.value = profileTitle.textContent;
    intputProfileDescription.value = profileDescription.textContent;

    for (let i = 0; i < editProfileFormInputs.length; i++) {
        checkValidity(editProfileFormInputs[i], editProfileFormErrors[i], settings.inputErrorClass, settings.errorClass);
    }

    openModal(editPopup);
});

profileAddButton.addEventListener("click", () => {
    openModal(newCardPopup);

    newPlaceFormSubmitButton.disabled = true;
    newPlaceFormSubmitButton.classList.add(`${settings.inactiveButtonClass}`);
});

profileImage.addEventListener("click", () => {
    openModal(avatarPopup);
})

avatarForm.addEventListener("submit", (e) => {
    e.preventDefault();

    renderLoading(avatarFormSumbitButton, true);

    changeAvatar(avatarFormInput.value)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }

            return Promise.reject(`Ошибка ${response.status}`);
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            renderLoading(avatarFormSumbitButton, false);

            profileImage.style.backgroundImage = `url(${avatarFormInput.value})`;

            closeModal(avatarPopup);
        })

})

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
        likes: 0,
    }

    const newPlaceCard = createCard(newPlace, deleteCard, likeCard, openImagePopup);

    renderLoading(newPlaceFormSubmitButton, true);

    createNewCard(newPlace)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            return Promise.reject(`Ошибка ${response.status}`);
        })
        .then(data => console.log(data))
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(newPlaceFormSubmitButton, false);
            placesList.prepend(newPlaceCard);
            closeModal(newCardPopup);

            for (let i = 0; i < newPlaceFormInputs.length; i++) {
                const input = newPlaceFormInputs[i];
                const inputError = newPlaceFormInputErrors[i];

                clearValidation(input, inputError, settings.inputErrorClass, settings.errorClass);
                input.value = "";
            }
        })

});

// @todo: Функция создания карточки
// @todo: Функция удаления карточки
// @todo: Вывести карточки на страницу

function openImagePopup(e) {

    popupCaption.textContent = e.target.alt;
    popupImage.src = e.target.src;
    popupImage.alt = e.target.alt;

    openModal(cardImagePopup);
}

export {
    editProfileFormSubmitButton,
    inputProfileName,
    intputProfileDescription,
    profileTitle,
    profileDescription,
    profileImage,
    editPopup,
    placesList,
    openImagePopup
};