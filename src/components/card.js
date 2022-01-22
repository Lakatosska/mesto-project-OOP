import { closePopup, openImage } from "./modal.js";
import { setDisabledButton } from "./validate.js";
import { validationConfig } from "./index.js";
import {
  fetchConfig,
  deleteCard,
  postDataCard,
  setLike,
  deleteLike,
} from "./api.js";

const formNewPlace = document.querySelector(".form_type_new-place");
const formNewPlaceButton = formNewPlace.querySelector(".form__button");
const cardsList = document.querySelector(".cards__list");
const inputPlaceTitle = formNewPlace.querySelector(".form__item_type_place");
const inputPlaceUrl = formNewPlace.querySelector(".form__item_type_url");
const popupAddPlace = document.querySelector(".popup_type_new-place");
const CARD__LIKE_ACTIVE = "card__like_active";

//Установка счетчика лайков
function setLikesCounter(counter, card) {
  counter.textContent = card.likes.length;
}

//Добавление карточки
function addCard(container, card, append) {
  if (append) {
    container.append(card);
  } else {
    container.prepend(card);
  }
}

//Удаление карточки
function removeCard(event, id) {
  event.target.closest(".card-element").remove();
  deleteCard(id).catch((err) => {
    console.log(`Error: ${err}`);
  });
}

//Лайки карточек
function toggleLike(event, card, counter) {
  event.target.classList.toggle(CARD__LIKE_ACTIVE);
  if (event.target.classList.contains(CARD__LIKE_ACTIVE)) {
    setLike(card._id)
      .then((card) => {
        setLikesCounter(counter, card);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  } else {
    deleteLike(card._id)
      .then((card) => {
        setLikesCounter(counter, card);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }
}

//Создание карточки
function createCard(card) {
  const templateCard = document.querySelector(".template-card");
  const cardElement = templateCard.content
    .querySelector(".card-element")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeBtn = cardElement.querySelector(".card__like");
  const deleteCardBtn = cardElement.querySelector(".card__trash-icon");
  const counterLikeCard = cardElement.querySelector(".card__like-counter");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  if (Object.is(card.owner._id, fetchConfig.ownerId)) {
    deleteCardBtn.classList.add("card__trash-icon_visible");
  }

  if (
    card.likes.some((like) => {
      return Object.is(like._id, fetchConfig.ownerId);
    })
  ) {
    likeBtn.classList.add(CARD__LIKE_ACTIVE);
  }

  setLikesCounter(counterLikeCard, card);

  cardImage.addEventListener("click", () => openImage(card));
  likeBtn.addEventListener("click", (event) =>
    toggleLike(event, card, counterLikeCard)
  );
  deleteCardBtn.addEventListener("click", (event) => {
    removeCard(event, card._id);
  });

  return cardElement;
}

//Добавление начальных карточек
function addCardsInition(cards) {
  cards.forEach((card) => {
    addCard(cardsList, createCard(card), true);
  });
}

//Добавление карточек через форму
function handlePlaceFormSubmit(event) {
  event.preventDefault();
  postDataCard(inputPlaceTitle, inputPlaceUrl).then((data) => {
    addCard(cardsList, createCard(data));
  });
  closePopup(popupAddPlace);
  formNewPlace.reset();
  setDisabledButton(formNewPlaceButton, validationConfig.inactiveButtonClass);
}

export { handlePlaceFormSubmit, addCardsInition, formNewPlace, popupAddPlace };
