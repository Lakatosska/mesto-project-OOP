import "../index.css";
import {
  handlePlaceFormSubmit,
  addCardsInition,
  formNewPlace,
  popupAddPlace,
} from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { enableValidation, setDisabledButton } from "./validate.js";
import { getCards, getUserData, sendUsersData, setAvatar } from "./api";

const profileName = document.querySelector(".profile__name");
const profileMission = document.querySelector(".profile__mission");
const profileAvatar = document.querySelector(".profile__avatar");
const btnAddPlace = document.querySelector(".profile__add-button");
const btnEditProfile = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
const formEditProfile = document.querySelector(".form_type_edit-profile");
const btnSaveProfile = formEditProfile.querySelector(".form__button");
const formEditAvatar = document.querySelector(".form_type_edit-avatar");
const inputUrlAvatar = formEditAvatar.querySelector(
  ".form__item_type_url-avatar"
);
const btnSaveAvatar = formEditAvatar.querySelector(".form__button");
const inputName = document.querySelector(".form__item_type_name");
const inputMission = document.querySelector(".form__item_type_mission");
const popups = document.querySelectorAll(".popup");
export const timeDelay = 100;

export const validationConfig = {
  formSelector: ".form",
  errorClass: "form__error-message_visible",
  inputSelector: ".form__item",
  inputErrorClass: "form__item_invalid",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
};

//Получение и установка начальных данных страницы
function setInitialPage() {
  Promise.all([getCards(), getUserData()])
    .then((data) => {
      addCardsInition(data[0]);
      profileName.textContent = data[1].name;
      profileMission.textContent = data[1].about;
      profileAvatar.src = data[1].avatar;
    })
    .catch((err) => console.log(`Error: ${err}`));
}

//Запись данных профиля в поля формы
function setInputData() {
  getUserData()
    .then((data) => {
      inputName.value = data.name;
      inputMission.value = data.about;
    })
    .catch((err) => console.log(`Error: ${err}`));
}

//Редактирование профиля
function handleProfileFormSubmit(event) {
  event.preventDefault();
  btnSaveProfile.textContent = "Сохранение...";
  sendUsersData(inputName, inputMission)
    .then((data) => {
      profileName.textContent = data.name;
      profileMission.textContent = data.about;
    })
    .catch((err) => console.log(`Error: ${err}`))
    .finally(() => {
      closePopup(popupEditProfile);
      setTimeout(() => {
        btnSaveProfile.textContent = "Сохранить";
      }, timeDelay);
    });
}

//Редактирование аватара
function handleAvatarFormSubmit(event) {
  event.preventDefault();
  btnSaveAvatar.textContent = "Сохранение...";
  setAvatar(inputUrlAvatar.value)
    .then((data) => {
      profileAvatar.src = data.avatar;
    })
    .catch((err) => console.log(`Error: ${err}`))
    .finally(() => {
      closePopup(popupEditAvatar);
      setTimeout(() => {
        formEditAvatar.reset();
        setDisabledButton(btnSaveAvatar, validationConfig.inactiveButtonClass);
        btnSaveAvatar.textContent = "Сохранить";
      }, timeDelay);
    });
}

//Обработчики событий
btnEditProfile.addEventListener("click", () => {
  setInputData();
  openPopup(popupEditProfile);
});
btnAddPlace.addEventListener("click", () => openPopup(popupAddPlace));
formEditProfile.addEventListener("submit", handleProfileFormSubmit);
formNewPlace.addEventListener("submit", handlePlaceFormSubmit);
profileAvatar.addEventListener("click", () => openPopup(popupEditAvatar));
formEditAvatar.addEventListener("submit", handleAvatarFormSubmit);

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
