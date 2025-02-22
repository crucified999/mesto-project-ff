import { inputProfileName, intputProfileDescription, profileTitle, profileDescription, editPopup } from "../index.js";
import { closeModal } from "./modal";

function handleEditFormSubmit(e) {
    e.preventDefault();

    profileTitle.textContent = inputProfileName.value;
    profileDescription.textContent = intputProfileDescription.value;

    closeModal(editPopup);
}

export { handleEditFormSubmit }