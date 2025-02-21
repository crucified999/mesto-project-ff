import { inputProfileName, intputProfileDescription, profileTitle, profileDescription } from "../index.js";

function handleEditFormSubmit(e) {
    e.preventDefault();

    profileTitle.textContent = inputProfileName.value;
    profileDescription.textContent = intputProfileDescription.value;
}

export { handleEditFormSubmit }