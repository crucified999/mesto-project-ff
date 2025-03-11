import {
    inputProfileName,
    intputProfileDescription
} from "../index";


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

const changeAvatar = (avatarUrl) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarUrl,
        })
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }

            return Promise.reject(`Ошибка ${response.status}`);
        })
}

const likeCardRequest = (cardId) => {

        return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: config.headers,

        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }

                return Promise.reject(`Ошибка ${response.status}`);
            })
}

const unlikeCardRequest = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: config.headers,
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }

            return Promise.reject(`Ошибка ${response.status}`);
        })
}

const deleteCardRequest = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: config.headers
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }

            return Promise.reject(`Ошибка ${response.status}`);
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
        .then((response) => {
            if (response.ok) {
                return response.json();
            }

            return Promise.reject(`Ошибка ${response.status}`);
        })
}

export {
    getInitialCards,
    getProfileInfo,
    changeProfileInfo,
    createNewCard,
    changeAvatar,
    likeCardRequest,
    unlikeCardRequest,
    deleteCardRequest
};