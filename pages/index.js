"use strict";

const profile = document.querySelector(".profile");
const popupEditProfile = document.querySelector(".popup_name_edit-profile");
const popupAddPlace = document.querySelector(".popup_name_new-place");
const btnEditProfile = profile.querySelector(".profile__edit-button");
const btnAddPlace = profile.querySelector(".profile__add-button");
const btnClosePopup = document.querySelectorAll(".popup__close-button");
const opened = "popup_opened";

//Открытие popup
function popupOpen() {
  function openPopup(el, str) {
    el.classList.add(str);
  }

  btnEditProfile.addEventListener("click", () =>
    openPopup(popupEditProfile, opened)
  );

  btnAddPlace.addEventListener("click", () => openPopup(popupAddPlace, opened));
}

//Закрытие попап
function popupClose() {
  for (let btn of btnClosePopup) {
    btn.addEventListener("click", function () {
      popupEditProfile.classList.remove(opened);
      popupAddPlace.classList.remove(opened);
    });
  }
}

//Редактирование формы
function formEdit() {
  const formEdit = document.querySelector(".form_type_edit-profile");
  const formNameItem = formEdit.querySelector(".form__item_type_name");
  const formMissionItem = formEdit.querySelector(".form__item_type_mission");
  const profileName = profile.querySelector(".profile__name");
  const profileMission = profile.querySelector(".profile__mission");

  formNameItem.value = profileName.textContent;
  formMissionItem.value = profileMission.textContent;

  function formSubmitHandler(event) {
    event.preventDefault();
    profileName.textContent = formNameItem.value;
    profileMission.textContent = formMissionItem.value;
    popupEditProfile.classList.remove(opened);
    popupAddPlace.classList.remove(opened);
  }

  formEdit.addEventListener("submit", formSubmitHandler);
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

  for (let i = 0; i <= 5; i++) {
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
}

//Добавление карточек через форму
function addCardsForm() {
  const formNewPlace = document.querySelector(".form_type_new-place");
  const formPlaceTitle = formNewPlace.querySelector(".form__item_type_place");
  const formPlaceUrl = formNewPlace.querySelector(".form__item_type_url");
  const cardList = document.querySelector(".cards__list");

  function formSubmitHandler(event) {
    event.preventDefault();

    cardList.insertAdjacentHTML(
      "afterbegin",
      `<li>
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
      </li>`
    );
    likeCards();
    removeCard();
    popupEditProfile.classList.remove(opened);
    popupAddPlace.classList.remove(opened);
  }
  formNewPlace.addEventListener("submit", formSubmitHandler);
}

//Удаление карточки по клику на корзину
function removeCard() {
  const removeBtns = document.querySelectorAll(".card__trash-icon");
  for (let btn of removeBtns) {
    btn.addEventListener("click", function (event) {
      btn.parentElement.parentElement.remove();
    });
  }
}

//Лайки карточек
function likeCards() {
  const btnsLike = document.querySelectorAll(".card__like");
  function eventBtn(event) {
    event.target.classList.toggle("card__like_active");
  }

  for (let like of btnsLike) {
    if (!like.classList.contains("added-js")) {
      like.addEventListener("click", eventBtn);
      like.classList.add("added-js");
    }
  }
}

addCardsInition();
popupOpen();
popupClose();
formEdit();
addCardsForm();
removeCard();
likeCards();
