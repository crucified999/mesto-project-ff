function openModal(popup) {
    popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", closeOnEsc);
}

function closeModal(popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closeOnEsc);
}

function closeOnEsc(e) {
    if (e.key === "Escape") {
        const popup = document.querySelector(".popup_is-opened");

        popup.classList.remove("popup_is-opened");
    }
}

export { openModal, closeModal };