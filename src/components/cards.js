// import { getInitialCards } from "./api";
// import { createCard, deleteCard, likeCard } from "./card";
// import { openImagePopup, placesList, profileTitle } from "../index";
//
// const initialCards = getInitialCards()
//     .then((data) => {
//         data.forEach((el) => {
//             const cardInfo = {
//                 name: el.name,
//                 link: el.link,
//                 likes: el.likes.length,
//                 id: el["_id"],
//             };
//             const card = createCard(cardInfo, deleteCard, likeCard, openImagePopup);
//
//             if (el.owner.name !== profileTitle.textContent) {
//                 card.querySelector(".card__delete-button").style.display = 'none';
//             }
//
//             if (el.likes.some((owner) => owner.name === profileTitle.textContent)) {
//                 card.querySelector(".card__like-button").classList.add("card__like-button_is-active");
//             }
//
//             placesList.append(card);
//         })
//
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// export { initialCards };