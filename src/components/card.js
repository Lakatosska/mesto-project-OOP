import { closePopup, openImage } from "./modal.js";
import { setDisabledButton } from "./validate.js";
import { validationConfig, fetchConfig } from "./index.js";

const formNewPlace = document.querySelector(".form_type_new-place");
const formNewPlaceButton = formNewPlace.querySelector(".form__button");
const cardsList = document.querySelector(".cards__list");
const inputPlaceTitle = formNewPlace.querySelector(".form__item_type_place");
const inputPlaceUrl = formNewPlace.querySelector(".form__item_type_url");
const popupAddPlace = document.querySelector(".popup_type_new-place");
const CARD__LIKE_ACTIVE = "card__like_active";

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
  fetch(`${fetchConfig.baseUrl}cards/${id}`, {
    method: fetchConfig.delete,
    headers: {
      authorization: fetchConfig.authorization,
    },
  });
}

//Лайки карточек
function toggleLike(event) {
  event.target.classList.toggle(CARD__LIKE_ACTIVE);
}

//Создание карточки
function createCard(card, ownCard) {
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

  if (ownCard) {
    deleteCardBtn.classList.add("card__trash-icon_visible");
  }

  if (card.likes.length) {
    counterLikeCard.textContent = card.likes.length;
    if (card.likes.length > 0) {
      likeBtn.classList.add(CARD__LIKE_ACTIVE);
    }
  }
  cardImage.addEventListener("click", () => openImage(card));
  likeBtn.addEventListener("click", toggleLike);
  deleteCardBtn.addEventListener("click", (event) => {
    removeCard(event, card._id);
  });

  return cardElement;
}

//Добавление начальных карточек
function addCardsInition(data) {
  data.forEach((card) => {
    addCard(cardsList, createCard(card), true);
  });
}

//Добавление карточек через форму
function handlePlaceFormSubmit(event) {
  event.preventDefault();
  fetch(`${fetchConfig.baseUrl}cards`, {
    method: fetchConfig.post,
    headers: {
      authorization: fetchConfig.authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: inputPlaceTitle.value,
      link: inputPlaceUrl.value,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      addCard(cardsList, createCard(data, true));
    });
  closePopup(popupAddPlace);
  formNewPlace.reset();
  setDisabledButton(formNewPlaceButton, validationConfig.inactiveButtonClass);
}

export { handlePlaceFormSubmit, addCardsInition, formNewPlace, popupAddPlace };
