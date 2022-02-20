import { CARD__LIKE_ACTIVE } from "./constants.js";

export function handleCardClick(card, popupImage) {
  popupImage.open(card);
}

export function handleDeleteClick(card, api) {
  console.log(card);
  api.deleteCard(card._id)
  //.then(() = > {})

}

export function toggleLike(event, card, counter, api) {
  if (event.target.classList.contains(CARD__LIKE_ACTIVE)) {
    api
      .deleteLike(card._id)
      .then((card) => {
        event.target.classList.remove(CARD__LIKE_ACTIVE);
        counter.textContent = card.likes.length;
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  } else {
    api
      .setLike(card._id)
      .then((card) => {
        event.target.classList.add(CARD__LIKE_ACTIVE);
        counter.textContent = card.likes.length;
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }
}
