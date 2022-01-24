import { closePopup, openImage, openPopup } from "./modal.js";
import { setDisabledButton } from "./validate.js";
import { handleErrors, userId } from "./index.js";
import { deleteCard, postDataCard, setLike, deleteLike } from "./api.js";
import {
  validationConfig,
  formNewPlace,
  formNewPlaceButton,
  cardsList,
  inputPlaceTitle,
  inputPlaceUrl,
  popupAddPlace,
  popupDeleteCard,
  btnConfirmDeleteCard,
  CARD__LIKE_ACTIVE,
} from "./constants.js";
let listenConfirmDeleteCard;

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

function removeListenerDeleteBtn() {
  btnConfirmDeleteCard.removeEventListener("click", listenConfirmDeleteCard);
}

//Удаление карточки
function removeCard(event, id) {
  deleteCard(id)
    .then(() => {
      event.target.closest(".card-element").remove();
      closePopup(popupDeleteCard);
      removeListenerDeleteBtn();
    })
    .catch((err) => {
      openPopup(popupError);
      handleErrors(err.message, errorTitle, errorText);
      console.log(`Error: ${err}`);
    });
}

//Лайки карточек
function toggleLike(event, card, counter) {
  if (event.target.classList.contains(CARD__LIKE_ACTIVE)) {
    deleteLike(card._id)
      .then((card) => {
        event.target.classList.remove(CARD__LIKE_ACTIVE);
        setLikesCounter(counter, card);
      })
      .catch((err) => {
        openPopup(popupError);
        handleErrors(err.message, errorTitle, errorText);
        console.log(`Error: ${err}`);
      });
  } else {
    setLike(card._id)
      .then((card) => {
        event.target.classList.add(CARD__LIKE_ACTIVE);
        setLikesCounter(counter, card);
      })
      .catch((err) => {
        openPopup(popupError);
        handleErrors(err.message, errorTitle, errorText);
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

  if (Object.is(card.owner._id, userId)) {
    deleteCardBtn.classList.add("card__trash-icon_visible");
  }

  if (
    card.likes.some((like) => {
      return Object.is(like._id, userId);
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
    btnConfirmDeleteCard.textContent = "Да";
    openPopup(popupDeleteCard);
    btnConfirmDeleteCard.addEventListener(
      "click",
      (listenConfirmDeleteCard = () => {
        btnConfirmDeleteCard.textContent = "Удаление...";
        removeCard(event, card._id);
      })
    );
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
  formNewPlaceButton.textContent = "Сохранение...";
  postDataCard(inputPlaceTitle, inputPlaceUrl)
    .then((data) => {
      addCard(cardsList, createCard(data));
      closePopup(popupAddPlace);
      formNewPlace.reset();
      setDisabledButton(
        formNewPlaceButton,
        validationConfig.inactiveButtonClass
      );
    })
    .catch((err) => {
      openPopup(popupError);
      handleErrors(err.message, errorTitle, errorText);
      console.log(`Error: ${err}`);
    });
}

export {
  handlePlaceFormSubmit,
  addCardsInition,
  removeListenerDeleteBtn,
  listenConfirmDeleteCard,
};
