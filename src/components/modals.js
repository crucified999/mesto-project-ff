import { createCard, deleteCard, likeCard } from "./cards.js";

function closeOnEsc(e) {
    if (e.keyCode == 27) {
        document.querySelector(".popup_is-opened").classList.remove("popup_is-opened");
        window.removeEventListener("keydown", closeOnEsc);
    }
}

function openModal(e) {
    let popup;

    switch (e.target.classList[0]) {
        case "profile__add-button":
            popup = document.querySelector(".popup_type_new-card");

            break;

        case "profile__edit-button":
            popup = document.querySelector(".popup_type_edit");

            const editProfileForm = document.forms["edit-profile"];
            const editFormName = editProfileForm.elements.name;
            const editFormDescription = editProfileForm.elements.description;

            editFormName.value = document.querySelector(".profile__title").textContent;
            editFormDescription.value = document.querySelector(".profile__description").textContent;

            break;

        case "card__image":
            popup = document.querySelector(".popup_type_image");

            const popupCaption = popup.querySelector(".popup__caption");
            const popupImage = popup.querySelector(".popup__image");

            popupCaption.textContent = e.target.alt;
            popupImage.src = e.target.src;
            popupImage.alt = e.target.alt;

            break;
    }
    popup.classList.add("popup_is-opened");
    window.addEventListener("keydown", closeOnEsc);
}

function closeModal(e) {
    if (
        e.target.classList.contains("popup__close") ||
        e.target.classList.contains("popup")
    ) {
        document.querySelector(".popup_is-opened").classList.remove("popup_is-opened");
    }
}

const popups = document.querySelectorAll(".popup");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

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


export { openModal };