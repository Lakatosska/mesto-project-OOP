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
const formEditProfile = document.querySelector(".form_type_edit-profile");
const inputName = document.querySelector(".form__item_type_name");
const inputMission = document.querySelector(".form__item_type_mission");
const inputPlaceTitle = formNewPlace.querySelector(".form__item_type_place");
const inputPlaceUrl = formNewPlace.querySelector(".form__item_type_url");

const POPUP_OPENED = "popup_opened";

//Открытие попапа
function openPopup(popup) {
  popup.classList.add(POPUP_OPENED);
}

//Закрытие попап
function closePopup(popup) {
  popup.classList.remove(POPUP_OPENED);
}

//Запись данных профиля в поля формы
function setInputData() {
  inputName.value = profileName.textContent;
  inputMission.value = profileMission.textContent;
}

//Редактирование профиля
function formProfileSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileMission.textContent = inputMission.value;
  closePopup(popupEditProfile);
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
function formPlaceSubmitHandler(event) {
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

//Открытие фото
function openImage(card) {
  const popupImage = document.querySelector(".popup_type_open-img");
  const popupTitle = popupImage.querySelector(".popup__title");
  const popupImg = popupImage.querySelector(".popup__image");

  popupTitle.textContent = card.name;
  popupImg.alt = `Изображение ${card.name}`;
  popupImg.src = card.link;

  openPopup(popupImage);
}

//Обработчики событий
closeBtnEditProfile.addEventListener("click", (event) => {
  closePopup(popupEditProfile);
});
closeBtnAddPlace.addEventListener("click", (event) => {
  closePopup(popupAddPlace);
});
closeBtnOpenImage.addEventListener("click", (event) => {
  closePopup(popupOpenImage);
});
btnEditProfile.addEventListener("click", () => {
  setInputData();
  openPopup(popupEditProfile);
});
btnAddPlace.addEventListener("click", () => openPopup(popupAddPlace));
formEditProfile.addEventListener("submit", formProfileSubmitHandler);
formNewPlace.addEventListener("submit", formPlaceSubmitHandler);

addCardsInition();
