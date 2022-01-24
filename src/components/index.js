import "../index.css";
import {
  handlePlaceFormSubmit,
  addCardsInition,
  listenConfirmDeleteCard,
} from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { enableValidation, setDisabledButton } from "./validate.js";
import { getCards, getUserData, sendUsersData, setAvatar } from "./api";
import {
  profileName,
  profileMission,
  profileAvatarContainer,
  profileAvatar,
  btnAddPlace,
  btnEditProfile,
  popupEditProfile,
  popupEditAvatar,
  formEditProfile,
  btnSaveProfile,
  formEditAvatar,
  inputUrlAvatar,
  btnSaveAvatar,
  inputName,
  inputMission,
  popups,
  popupError,
  errorTitle,
  errorText,
  validationConfig,
  formNewPlaceButton,
  formNewPlace,
  popupAddPlace,
  btnConfirmDeleteCard,
  popupDeleteCard,
} from "./constants";

export let userId;

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
    .then(([cards, userData]) => {
      userId = userData._id;
      addCardsInition(cards);
      profileName.textContent = userData.name;
      profileMission.textContent = userData.about;
      profileAvatar.src = userData.avatar;
    })
    .catch((err) => {
      openPopup(popupError);
      handleErrors(err.message, errorTitle, errorText);
      console.log(`Ошибка: ${err}`);
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
      closePopup(popupEditProfile);
    })
    .catch((err) => {
      openPopup(popupError);
      handleErrors(err.message, errorTitle, errorText);
      console.log(`Error: ${err}`);
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
  inputName.value = profileName.textContent;
  inputMission.value = profileMission.textContent;
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
