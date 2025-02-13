import { placesList, createCard, deleteCard, likeCard } from "./cards";

const editProfileForm = document.forms["edit-profile"];
const editFormName = editProfileForm.elements.name;
const editFormDescription = editProfileForm.elements.description;

const newPlaceForm = document.forms["new-place"];

function handleFormSubmit(e) {
    e.preventDefault();

    const profileTitle = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");

    profileTitle.textContent = editFormName.value;
    profileDescription.textContent = editFormDescription.value;
}

editProfileForm.addEventListener("submit", handleFormSubmit);

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