import "../pages/index.css";
import { getProfileInfo, createNewCard, changeAvatar, getInitialCards } from "./components/api";
import { handleEditFormSubmit } from "./components/forms.js"
import { openModal, closeModal, closeOnOverlay } from "./components/modal";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { checkValidity, enableValidation, disableSubmitButton, clearFormInputs } from "./components/validation";


// @todo: Темплейт карточки


// @todo: DOM узлы

// const profile = getProfileInfo()
//     .then((data) => {
//     profileTitle.textContent = data.name;
//     profileDescription.textContent = data.about;
//     profileImage.style.backgroundImage = `url(${data.avatar})`;
// })
//     .catch((err) => {
//         console.log(err);
//     });

Promise.all([getProfileInfo(), getInitialCards()])
    .then((response) => {

        const profileInfo = response[0];
        const initialCards = response[1];

        profileTitle.textContent = profileInfo.name;
        profileDescription.textContent = profileInfo.about;
        profileImage.style.backgroundImage = `url(${profileInfo.avatar})`;

        initialCards.forEach((c) => {
            const cardInfo = {
                name: c.name,
                link: c.link,
                likes: c.likes.length,
                id: c["_id"],
            };
            const card = createCard(cardInfo, deleteCard, likeCard, openImagePopup);

            if (c.owner["_id"] !== profileInfo["_id"]) {
                card.querySelector(".card__delete-button").style.display = 'none';
            }

            if (c.likes.some((owner) => owner["_id"] === profileInfo["_id"])) {
                card.querySelector(".card__like-button").classList.add("card__like-button_is-active");
            }

            placesList.append(card);
        });

    })
    .catch((err) => {
        console.log(err);
    })

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
const editProfileFormSubmitButton = editProfileForm.querySelector(".popup__button");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const newPlaceForm = document.forms["new-place"];
const newPlaceFormInputs = newPlaceForm.querySelectorAll(".popup__input");
const newPlaceFormInputName = newPlaceForm.elements["place-name"];
const newPlaceFormInputLink = newPlaceForm.elements["link"];
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

    openModal(editPopup);
});

profileAddButton.addEventListener("click", () => {
    openModal(newCardPopup);
    disableSubmitButton(editProfileFormInputs, editProfileFormSubmitButton, settings.inactiveButtonClass);
    newPlaceFormSubmitButton.classList.add(`${settings.inactiveButtonClass}`);
});

profileImage.addEventListener("click", () => {
    openModal(avatarPopup);
})

avatarForm.addEventListener("submit", (e) => {
    e.preventDefault();

    renderLoading(avatarFormSumbitButton, true);

    changeAvatar(avatarFormInput.value)
        .then(() => {
            profileImage.style.backgroundImage = `url(${avatarFormInput.value})`;

            closeModal(avatarPopup);
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            renderLoading(avatarFormSumbitButton, false);
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

    const cardInfo = {
        name: newPlaceFormInputName.value,
        link: newPlaceFormInputLink.value,
    }

    renderLoading(newPlaceFormSubmitButton, true);

    createNewCard(cardInfo)
        .then((data) => {
            const newPlace = {
                name: data.name,
                link: data.link,
                likes: data.likes.length,
                id: data["_id"]
            }

            const newPlaceCard = createCard(newPlace, deleteCard, likeCard, openImagePopup);

            placesList.prepend(newPlaceCard);
            closeModal(newCardPopup);

        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(newPlaceFormSubmitButton, false);

            clearFormInputs(newPlaceFormInputs, newPlaceFormInputErrors, settings.inputErrorClass, settings.errorClass);
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

function renderLoading(submitButton, isLoading) {

    if (isLoading) {
        submitButton.textContent = "Сохранение...";
        submitButton.disabled = true;
    } else {
        submitButton.textContent = "Сохранить";
        submitButton.disabled = false;
    }

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
    openImagePopup,
    renderLoading
};