"use strict";

const profileName = document.querySelector(".profile__name");
const profileMission = document.querySelector(".profile__mission");
const btnAddPlace = document.querySelector(".profile__add-button");
const btnEditProfile = document.querySelector(".profile__edit-button");
const cardsList = document.querySelector(".cards__list");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const closeBtnEditProfile = popupEditProfile.querySelector(
  ".popup__close-button"
);
const popupAddPlace = document.querySelector(".popup_type_new-place");
const closeBtnAddPlace = popupAddPlace.querySelector(".popup__close-button");
const popupOpenImage = document.querySelector(".popup_type_open-img");
const closeBtnOpenImage = popupOpenImage.querySelector(".popup__close-button");
const formNewPlace = document.querySelector(".form_type_new-place");
const formNameItem = document.querySelector(".form__item_type_name");
const formMissionItem = document.querySelector(".form__item_type_mission");
const POPUP_OPENED = "popup_opened";

//Открытие попапа
function openPopup(el) {
  el.classList.add(POPUP_OPENED);
}

//Закрытие попап
function closePopup(el) {
  el.classList.remove(POPUP_OPENED);
}

//Редактирование профиля

formNameItem.value = profileName.textContent;
formMissionItem.value = profileMission.textContent;

function formProfileSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = formNameItem.value;
  profileMission.textContent = formMissionItem.value;
  closePopup(popupEditProfile);
}

//Создание карточки

function createCard(cardName, cardLink) {
  const templateCard = document.querySelector("#template-card");
  const cardElement = templateCard.content
    .querySelector("#card-element")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitile = cardElement.querySelector(".card__title");
  const likeBtn = cardElement.querySelector(".card__like");
  const deleteCardBtn = cardElement.querySelector(".card__trash-icon");

  cardImage.src = cardLink;
  cardImage.alt = cardName;
  cardTitile.textContent = cardName;

  cardImage.addEventListener("click", openImage);
  likeBtn.addEventListener("click", toggleLike);
  deleteCardBtn.addEventListener("click", removeCard);

  return cardElement;
}

//Добавление начальных карточек

function addCardsInition() {
  initialCards.forEach((el) => {
    addCard(cardsList, createCard(el.name, el.link));
  });
}

//Добавление карточек через форму

function formPlaceSubmitHandler(event) {
  event.preventDefault();

  const formPlaceTitle = formNewPlace.querySelector(
    ".form__item_type_place"
  ).value;
  const formPlaceUrl = formNewPlace.querySelector(".form__item_type_url").value;

  addCard(cardsList, createCard(formPlaceTitle, formPlaceUrl));
  closePopup(popupAddPlace);
  event.target.reset();
}

//Добавление карточки
function addCard(container, card) {
  container.prepend(card);
}

//Удаление карточки
function removeCard(event) {
  event.target.closest("#card-element").remove();
}

//Лайки карточек
function toggleLike(event) {
  event.target.classList.toggle("card__like_active");
}

//Открытие фото
function openImage() {
  const popupImage = document.querySelector(".popup_type_open-img");
  const popupTitle = popupImage.querySelector(".popup__title");
  const popupImg = popupImage.querySelector(".popup__image");

  const imgSrc = this.src;
  const imgAlt = this.alt;
  const imgTitle = this.nextElementSibling.firstElementChild.textContent;

  popupTitle.textContent = imgTitle;
  popupImg.alt = imgAlt;
  popupImg.src = imgSrc;

  popupImage.classList.add(POPUP_OPENED);
}

//Обработчики событий
closeBtnEditProfile.addEventListener("click", (event) => {
  closePopup(event.target.closest(".popup"));
});
closeBtnAddPlace.addEventListener("click", (event) => {
  closePopup(event.target.closest(".popup"));
});
closeBtnOpenImage.addEventListener("click", (event) => {
  closePopup(event.target.closest(".popup"));
});
btnEditProfile.addEventListener("click", () => openPopup(popupEditProfile));
btnAddPlace.addEventListener("click", () => openPopup(popupAddPlace));
popupEditProfile.addEventListener("submit", formProfileSubmitHandler);
formNewPlace.addEventListener("submit", formPlaceSubmitHandler);

addCardsInition();
