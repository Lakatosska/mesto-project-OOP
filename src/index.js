import {
  formPlaceSubmitHandler,
  addCardsInition,
  formNewPlace,
  popupAddPlace,
} from "./components/card.js";
import {
  openPopup,
  closePopup,
  closePopupOverlay,
  closePopupEscape,
} from "./components/modal.js";

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

popups.forEach((popup) => {
  popup.addEventListener("click", closePopupOverlay);
});

document.addEventListener("keydown", closePopupEscape);

addCardsInition();
