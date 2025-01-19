// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

function createCard(card, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardContent = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteCardButton = cardContent.querySelector('.card__delete-button');
  
    cardContent.querySelector('.card__image').src = card.link;
    cardContent.querySelector('.card__image').alt = card.name;
    cardContent.querySelector('.card__title').textContent = card.name;
  
    deleteCardButton.addEventListener('click', e => {
        deleteCard(e.target.parentElement);
    });

    return cardContent;
  }

// @todo: Функция удаления карточки

function deleteCard(card) {

    card.remove();

}


// @todo: Вывести карточки на страницу

initialCards.forEach(el => {
    
    const card = createCard(el, deleteCard);

    document.querySelector('.places__list').append(card);
    
})