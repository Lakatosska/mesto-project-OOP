import { closePopup, openImage } from "./modal.js";
const arkhyzImage =
  "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg";

const initialCards = [
  {
    name: "Архыз",
    link: arkhyzImage,
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const formNewPlace = document.querySelector(".form_type_new-place");
const cardsList = document.querySelector(".cards__list");
const inputPlaceTitle = formNewPlace.querySelector(".form__item_type_place");
const inputPlaceUrl = formNewPlace.querySelector(".form__item_type_url");
const popupAddPlace = document.querySelector(".popup_type_new-place");

//Добавление карточки
function addCard(container, card) {
  container.prepend(card);
}

//Удаление карточки
function removeCard(event) {
  event.target.closest(".card-element").remove();
}

//Лайки карточек
function toggleLike(event) {
  event.target.classList.toggle("card__like_active");
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

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  cardImage.addEventListener("click", () => openImage(card));
  likeBtn.addEventListener("click", toggleLike);
  deleteCardBtn.addEventListener("click", removeCard);

  return cardElement;
}

//Добавление начальных карточек
function addCardsInition() {
  initialCards.forEach((card) => {
    addCard(cardsList, createCard(card));
  });
}

//Добавление карточек через форму
function HandlerformPlaceSubmit(event) {
  event.preventDefault();
  addCard(
    cardsList,
    createCard({
      name: inputPlaceTitle.value,
      link: inputPlaceUrl.value,
    })
  );
  closePopup(popupAddPlace);
  formNewPlace.reset();
}

export { HandlerformPlaceSubmit, addCardsInition, formNewPlace, popupAddPlace };
