import "../index.css";
import {
  HandlerformPlaceSubmit,
  addCardsInition,
  formNewPlace,
  popupAddPlace,
} from "./card.js";
import { openPopup, closePopup, closePopupOverlay } from "./modal.js";
import { enableValidation } from "./validate.js";

const profileName = document.querySelector(".profile__name");
const profileMission = document.querySelector(".profile__mission");
const btnAddPlace = document.querySelector(".profile__add-button");
const btnEditProfile = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const closeBtnEditProfile = popupEditProfile.querySelector(
  ".popup__close-button"
);
const closeBtnAddPlace = popupAddPlace.querySelector(".popup__close-button");
const popupOpenImage = document.querySelector(".popup_type_open-img");
const closeBtnOpenImage = popupOpenImage.querySelector(".popup__close-button");
const formEditProfile = document.querySelector(".form_type_edit-profile");
const inputName = document.querySelector(".form__item_type_name");
const inputMission = document.querySelector(".form__item_type_mission");
const popups = document.querySelectorAll(".popup");
const validationConfig = {
  formSelector: ".form",
  errorClass: "form__error-message_visible",
  inputSelector: ".form__item",
  inputErrorClass: "form__item_invalid",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
};

//Запись данных профиля в поля формы
function setInputData() {
  inputName.value = profileName.textContent;
  inputMission.value = profileMission.textContent;
}

//Редактирование профиля
function handlerFormProfileSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileMission.textContent = inputMission.value;
  closePopup(popupEditProfile);
}

//Обработчики событий
closeBtnEditProfile.addEventListener("click", () => {
  closePopup(popupEditProfile);
});
closeBtnAddPlace.addEventListener("click", () => {
  closePopup(popupAddPlace);
});
closeBtnOpenImage.addEventListener("click", () => {
  closePopup(popupOpenImage);
});
btnEditProfile.addEventListener("click", () => {
  setInputData();
  openPopup(popupEditProfile);
});
btnAddPlace.addEventListener("click", () => openPopup(popupAddPlace));
formEditProfile.addEventListener("submit", handlerFormProfileSubmit);
formNewPlace.addEventListener("submit", HandlerformPlaceSubmit);

popups.forEach((popup) => {
  popup.addEventListener("click", closePopupOverlay);
});

enableValidation(validationConfig);

addCardsInition();
