function handleFormSubmit(e) {
    e.preventDefault();

    const profileTitle = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");
    const editFormName = document.forms["edit-profile"].elements.name;
    const editFormDescription = document.forms["edit-profile"].elements.description;

    profileTitle.textContent = editFormName.value;
    profileDescription.textContent = editFormDescription.value;
}

export { handleFormSubmit }