"use strict";

const profile = document.querySelector(".profile");
const popupEditProfile = document.querySelector(".popup_name_edit-profile");
const popupAddPlace = document.querySelector(".popup_name_new-place");

const opened = "popup_opened";

//Добавление класса для открытия попапа
function addClassOpenedPopup() {
  const btnAddPlace = profile.querySelector(".profile__add-button");
  const btnEditProfile = profile.querySelector(".profile__edit-button");

  function addClass(el, str) {
    el.classList.add(str);
  }

  btnEditProfile.addEventListener("click", () =>
    addClass(popupEditProfile, opened)
  );

  btnAddPlace.addEventListener("click", () => addClass(popupAddPlace, opened));
}

//Удаление класса для закрытия попапа
function removeClassOpenedPopup() {
  const btnClosePopup = document.querySelectorAll(".popup__close-button");
  for (let btn of btnClosePopup) {
    btn.addEventListener("click", () => {
      popupEditProfile.classList.remove(opened);
      popupAddPlace.classList.remove(opened);
    });
  }
}

//Редактирование формы
function editForm() {
  const formEditProfile = document.querySelector(".form_type_edit-profile");
  const formNameItem = formEditProfile.querySelector(".form__item_type_name");
  const formMissionItem = formEditProfile.querySelector(
    ".form__item_type_mission"
  );
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

  formEditProfile.addEventListener("submit", formSubmitHandler);
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
  addLikeInitialCards();
}

//Добавление карточек через форму
function addCardsForm() {
  const formNewPlace = document.querySelector(".form_type_new-place");
  const formPlaceTitle = formNewPlace.querySelector(".form__item_type_place");
  const formPlaceUrl = formNewPlace.querySelector(".form__item_type_url");
  const cardList = document.querySelector(".cards__list");

  function formSubmitHandler(event) {
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

    cardList.insertAdjacentHTML("afterbegin", cardStrHtml);
    const cardLike = document.querySelector(".card__like");
    cardLike.addEventListener("click", btnLikeToggleClass);
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
function btnLikeToggleClass(event) {
  event.target.classList.toggle("card__like_active");
}
function addLikeInitialCards() {
  const btnsLike = document.querySelectorAll(".card__like");
  for (let btn of btnsLike) {
    btn.addEventListener("click", btnLikeToggleClass);
  }
}

addCardsInition();
addClassOpenedPopup();
removeClassOpenedPopup();
editForm();
addCardsForm();
removeCard();
