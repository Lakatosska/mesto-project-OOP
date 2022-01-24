import "../index.css";
import {
  handlePlaceFormSubmit,
  addCardsInition,
  formNewPlace,
  popupAddPlace,
  listenConfirmDeleteCard,
  btnConfirmDeleteCard,
  popupDeleteCard,
  formNewPlaceButton,
} from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { enableValidation, setDisabledButton } from "./validate.js";
import { getCards, getUserData, sendUsersData, setAvatar } from "./api";

const profileName = document.querySelector(".profile__name");
const profileMission = document.querySelector(".profile__mission");
const profileAvatarContainer = document.querySelector(
  ".profile__avatar-container"
);
const profileAvatar = profileAvatarContainer.querySelector(".profile__avatar");
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
const popupError = document.querySelector(".popup_for_error");
const errorTitle = popupError.querySelector(".popup__title_for_error");
const errorText = popupError.querySelector(".popup__text-error");

export const validationConfig = {
  formSelector: ".form",
  errorClass: "form__error-message_visible",
  inputSelector: ".form__item",
  inputErrorClass: "form__item_invalid",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
};

//Функция обработки ошибок
export function handleErrors(err, errorTitle, errorText) {
  switch (err) {
    case "400":
      errorTitle.textContent = "Проверьте введенный адресс";
      errorText.textContent = "Код ошибки 400";
      break;
    case "403":
      errorTitle.textContent = "Доступ запрещен";
      errorText.textContent = "Код ошибки 403";
      break;
    case "404":
      errorTitle.textContent = "Ресурс не найден";
      errorText.textContent = "Код ошибки: 404. Проверьте URL ";
      break;
    case "500":
      errorTitle.textContent = "Ошибка сервера";
      errorText.textContent = "Попробуйте повторить позже";
      break;
    default:
      errorTitle.textContent = "Ошибка";
      errorText.textContent = `Код ошибки ${err}`;
  }
}

//Получение и установка начальных данных страницы
function setInitialPage() {
  Promise.all([getCards(), getUserData()])
    .then((data) => {
      addCardsInition(data[0]);
      profileName.textContent = data[1].name;
      profileMission.textContent = data[1].about;
      profileAvatar.src = data[1].avatar;
    })
    .catch((err) => {
      openPopup(popupError);
      handleErrors(err.message, errorTitle, errorText);
      console.log(`Ошибка: ${err}`);
    });
}

//Запись данных профиля в поля формы
function setInputData() {
  getUserData()
    .then((data) => {
      inputName.value = data.name;
      inputMission.value = data.about;
    })
    .catch((err) => {
      openPopup(popupError);
      handleErrors(err.message, errorTitle, errorText);
      console.log(`Error: ${err}`);
    });
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
    .catch((err) => {
      openPopup(popupError);
      handleErrors(err.message, errorTitle, errorText);
      console.log(`Error: ${err}`);
    })
    .finally(() => {
      closePopup(popupEditProfile);
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
    .catch((err) => {
      openPopup(popupError);
      handleErrors(err.message, errorTitle, errorText);
      console.log(`Error: ${err}`);
    })
    .finally(() => {
      closePopup(popupEditAvatar);
      formEditAvatar.reset();
      setDisabledButton(btnSaveAvatar, validationConfig.inactiveButtonClass);
    });
}

//Обработчики событий
btnEditProfile.addEventListener("click", () => {
  btnSaveProfile.textContent = "Сохранить";
  setInputData();
  openPopup(popupEditProfile);
});
btnAddPlace.addEventListener("click", () => {
  formNewPlaceButton.textContent = "Создать";
  openPopup(popupAddPlace);
});
formEditProfile.addEventListener("submit", handleProfileFormSubmit);
formNewPlace.addEventListener("submit", handlePlaceFormSubmit);
profileAvatarContainer.addEventListener("click", () => {
  btnSaveAvatar.textContent = "Сохранить";
  openPopup(popupEditAvatar);
});
formEditAvatar.addEventListener("submit", handleAvatarFormSubmit);

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("popup_opened")) {
      closePopup(popup);
      if (event.target.classList.contains("popup_for_delete-card")) {
        btnConfirmDeleteCard.removeEventListener(
          "click",
          listenConfirmDeleteCard
        );
      }
    }
    if (event.target.classList.contains("popup__close-button")) {
      if (popupDeleteCard.classList.contains("popup_opened")) {
        btnConfirmDeleteCard.removeEventListener(
          "click",
          listenConfirmDeleteCard
        );
      }
      closePopup(popup);
    }
  });
});

setInitialPage();
enableValidation(validationConfig);
