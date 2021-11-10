"use strict";

const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileMission = profile.querySelector(".profile__mission");
const btnAddPlace = profile.querySelector(".profile__add-button");
const btnEditProfile = profile.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddPlace = document.querySelector(".popup_type_new-place");
const btnsClosePopup = document.querySelectorAll(".popup__close-button");
const formNameItem = document.querySelector(".form__item_type_name");
const formMissionItem = document.querySelector(".form__item_type_mission");
const forms = document.querySelectorAll(".form");
const POPUP_OPENED = "popup_opened";

//Открытие попапа
function openPopup(el) {
  el.classList.add(opened);
}

btnEditProfile.addEventListener("click", () => openPopup(popupEditProfile));
btnAddPlace.addEventListener("click", () => openPopup(popupAddPlace));

//Закрытие попап
function closePopup(el) {
  el.classList.remove(opened);
}

for (let btn of btnsClosePopup) {
  btn.addEventListener("click", () => {
    closePopup(btn.parentElement.parentElement);
  });
}

//Редактирование профиля

formNameItem.value = profileName.textContent;
formMissionItem.value = profileMission.textContent;

function formProfileSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = formNameItem.value;
  profileMission.textContent = formMissionItem.value;
  closePopup(this.parentElement.parentElement);
}

for (let form of forms) {
  form.addEventListener("submit", formProfileSubmitHandler);
}

//Добавление начальных карточек
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
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

function addCardsInition() {
  const cards = document.querySelector(".cards");
  const cardsList = document.createElement("ul");

  cardsList.className = "cards__list";
  cards.prepend(cardsList);

  for (let i = 0; i < initialCards.length; i++) {
    cardsList.insertAdjacentHTML(
      "afterbegin",
      `
    <li>
      <article class="card">
        <img src="${initialCards[i].link}" alt="${initialCards[i].name}" class="card__image" />
        <div class="card__info">
          <h2 class="card__title">${initialCards[i].name}</h2>
          <button
          class="card__like"
          type="button"
          aria-label="Поставить лайк."
          ></button>
        </div>
        <button
          class="card__trash-icon"
          type="button"
          aria-label="Удалить фото"
          ></button>
      </article>
    </li>
    `
    );
  }

  const btnsLike = document.querySelectorAll(".card__like");
  const removeBtns = document.querySelectorAll(".card__trash-icon");
  const cardImages = document.querySelectorAll(".card__image");

  for (let i = 0; i < initialCards.length; i++) {
    btnsLike[i].addEventListener("click", addAndDelLike);
    removeBtns[i].addEventListener("click", () =>
      removeCard(removeBtns[i].parentElement.parentElement)
    );
    cardImages[i].addEventListener("click", openImage);
  }
}

//Добавление карточек через форму

const formNewPlace = document.querySelector(".form_type_new-place");
const formPlaceTitle = formNewPlace.querySelector(".form__item_type_place");
const formPlaceUrl = formNewPlace.querySelector(".form__item_type_url");

function formPlaceSubmitHandler(event) {
  event.preventDefault();

  const cardStrHtml = `<li>
        <article class="card">
          <img
            src="${formPlaceUrl.value}"
            class="card__image"
            alt="${formPlaceTitle.value}"
          />
          <div class="card__info">
            <h2 class="card__title">${formPlaceTitle.value}</h2>
            <button
              class="card__like"
              type="button"
              aria-label="Поставить лайк."
            ></button>
          </div>
          <button
          class="card__trash-icon"
          type="button"
          aria-label="Удалить фото"
          ></button>
        </article>
      </li>`;
  const cardsList = document.querySelector(".cards__list");
  cardsList.insertAdjacentHTML("afterbegin", cardStrHtml);
  const cardLike = document.querySelector(".card__like");
  cardLike.addEventListener("click", addAndDelLike);
  const cardImg = document.querySelector(".card__image");
  cardImg.addEventListener("click", () => openImage(cardImg));
  const removeBtn = document.querySelector(".card__trash-icon");
  removeBtn.addEventListener("click", () =>
    removeCard(removeBtn.parentElement.parentElement)
  );
  closePopup(this.parentElement.parentElement);
}
formNewPlace.addEventListener("submit", formPlaceSubmitHandler);

//Удаление карточки
function removeCard(card) {
  card.remove();
}

//Лайки карточек
function addAndDelLike(event) {
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

  popupImage.classList.add(opened);
}

addCardsInition();
