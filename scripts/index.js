// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

function createCard(card, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardContent = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const deleteCardButton = cardContent.querySelector(".card__delete-button");
  const cardImage = cardContent.querySelector(".card__image");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardContent.querySelector(".card__title").textContent = card.name;

  deleteCardButton.addEventListener("click", () => {
    deleteCard(cardContent);
  });

  return cardContent;
}

// @todo: Функция удаления карточки

function deleteCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу

const placesList = document.querySelector(".places__list");

initialCards.forEach((el) => {
  const card = createCard(el, deleteCard);
  placesList.append(card);
});
