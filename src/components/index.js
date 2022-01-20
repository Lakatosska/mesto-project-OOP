import "../index.css";
import {
  handlePlaceFormSubmit,
  addCardsInition,
  formNewPlace,
  popupAddPlace,
} from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { enableValidation } from "./validate.js";

const profileName = document.querySelector(".profile__name");
const profileMission = document.querySelector(".profile__mission");
const btnAddPlace = document.querySelector(".profile__add-button");
const btnEditProfile = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const formEditProfile = document.querySelector(".form_type_edit-profile");
const inputName = document.querySelector(".form__item_type_name");
const inputMission = document.querySelector(".form__item_type_mission");
const popups = document.querySelectorAll(".popup");
export const validationConfig = {
  formSelector: ".form",
  errorClass: "form__error-message_visible",
  inputSelector: ".form__item",
  inputErrorClass: "form__item_invalid",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
};

export const fetchConfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-6/",
  authorization: "65d32b7f-c1f2-44b3-9a5c-d1cd8d3f9a2c",
  get: "GET",
  patch: "PATCH",
  post: "POST",
  delete: "DELETE",
};

//Получение и установка начальных данных страницы
function setInitialPage() {
  fetch(`${fetchConfig.baseUrl}cards`, {
    method: fetchConfig.get,
    headers: {
      authorization: fetchConfig.authorization,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      addCardsInition(data);
    })
    .catch((err) => console.log(`Error: ${err}`));

  fetch(`${fetchConfig.baseUrl}users/me`, {
    method: fetchConfig.get,
    headers: {
      authorization: fetchConfig.authorization,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileMission.textContent = data.about;
    })
    .catch((err) => console.log(`Error: ${err}`));
}

//Запись данных профиля в поля формы
function setInputData() {
  fetch(`${fetchConfig.baseUrl}users/me`, {
    method: fetchConfig.get,
    headers: {
      authorization: fetchConfig.authorization,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      inputName.value = data.name;
      inputMission.value = data.about;
    });
}

//Редактирование профиля
function handleProfileFormSubmit(event) {
  event.preventDefault();
  fetch(`${fetchConfig.baseUrl}users/me`, {
    method: fetchConfig.patch,
    headers: {
      authorization: fetchConfig.authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: inputName.value,
      about: inputMission.value,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileMission.textContent = data.about;
    });

  closePopup(popupEditProfile);
}

//Обработчики событий
btnEditProfile.addEventListener("click", () => {
  setInputData();
  openPopup(popupEditProfile);
});
btnAddPlace.addEventListener("click", () => openPopup(popupAddPlace));
formEditProfile.addEventListener("submit", handleProfileFormSubmit);
formNewPlace.addEventListener("submit", handlePlaceFormSubmit);

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (event.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});

setInitialPage();
enableValidation(validationConfig);
