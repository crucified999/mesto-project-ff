function openPopup() {

    let popup;
    
    switch (this.classList[0]) {
        case 'profile__add-button':
            popup = document.querySelector('.popup_type_new-card');
            break;
        
        case 'profile__edit-button':
            popup = document.querySelector('.popup_type_edit');
            break;
    }

    popup.style.display = 'flex';

}   

function closePopup(e) {
    if (e.target.classList.contains("popup__close") || e.target.classList.contains("popup")) {
      this.style.display = "none";
    }
  }

export { openPopup, closePopup }