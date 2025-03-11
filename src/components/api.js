import { createCard, deleteCard, likeCard } from "./card";
import {
    openImagePopup,
    placesList,
    profileDescription,
    profileTitle,
    profileImage,
    editProfileFormSubmitButton,
    inputProfileName, intputProfileDescription, editPopup
} from "../index";
import {closeModal} from "./modal";

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-34',
    headers: {
        authorization: 'dc9d655b-4c4c-4981-8e4a-cbe7891c9e9e',
        'Content-Type': 'application/json'
    }
}

const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }

            return Promise.reject(`Ошибка ${response.status}`);
        })
}

const getProfileInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }

            return Promise.reject(`Ошибка ${response.status}`);
        })
}

const changeProfileInfo = () => {

    return fetch(`${config.baseUrl}/users/me`, {

        method: 'PATCH',

        headers: config.headers,

        body: JSON.stringify({
            name: inputProfileName.value,
            about: intputProfileDescription.value
        })
    })

}

const changeAvatar = (avatrUrl) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatrUrl,
        })
    })
}

const likeCardRequest = (e, cardId, counter) => {

    if (!e.target.classList.contains("card__like-button_is-active")) {
        counter.textContent = Number(counter.textContent) + 1;
        e.target.classList.add("card__like-button_is-active");

        fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: config.headers,
        });

    } else {
        counter.textContent = Number(counter.textContent) - 1;
        e.target.classList.remove("card__like-button_is-active");

        fetch(`https://nomoreparties.co/v1/wff-cohort-34/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: {
                authorization: "dc9d655b-4c4c-4981-8e4a-cbe7891c9e9e",
            }
        });
    }

}

const deleteCardRequest = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: config.headers
    })
}

const createNewCard = (newPlace) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: newPlace.name,
            link: newPlace.link
        }),
    })
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
    getInitialCards,
    getProfileInfo,
    changeProfileInfo,
    renderLoading,
    createNewCard,
    changeAvatar,
    likeCardRequest,
    deleteCardRequest
};