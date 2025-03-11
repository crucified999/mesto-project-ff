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
        .then(() => {
            profileTitle.textContent = inputProfileName.value;
            profileDescription.textContent = intputProfileDescription.value;

            closeModal(editPopup);
        })

        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(editProfileFormSubmitButton, false);
        })

}

export { handleEditFormSubmit }