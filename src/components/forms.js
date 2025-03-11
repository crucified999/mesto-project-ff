import {
    inputProfileName,
    intputProfileDescription,
    profileTitle,
    profileDescription,
    editPopup,
    editProfileFormSubmitButton,
    renderLoading
} from "../index.js";

import { changeProfileInfo } from "./api"
import { closeModal } from "./modal";

function handleEditFormSubmit(e) {
    e.preventDefault();

    renderLoading(editProfileFormSubmitButton, true);

    changeProfileInfo()
        .then((response) => {
            if (response.ok) {

                return response.json();
            }

            return Promise.reject(`Ошибка ${response.status}`);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(editProfileFormSubmitButton, false);
            closeModal(editPopup);

            profileTitle.textContent = inputProfileName.value;
            profileDescription.textContent = intputProfileDescription.value;
        })

}

export { handleEditFormSubmit }