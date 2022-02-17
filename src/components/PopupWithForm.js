import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".form");
    // this._popup = document.querySelector(popupSelector);
    this._submitButton = this._popup.querySelector(".form__button");
    this._inputList = this._popup.querySelectorAll(".form__item");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setCurrentValues(values) {
    this._inputList.forEach((input) => {
      input.value = values[input.name].textContent;
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      this._handleFormSubmit(event, this._submitButton, this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}

// const popupEditProfile = new PopupWithForm({
//   popupSelector: popupSelectors.popupEditProfile,
//   handleFormSubmit: (event, button, { fullname, mission }) => {
//     event.preventDefault();
//     button.textContent = "Сохранение...";
//     api.sendUsersData(fullname, mission)
//       .then((userData) => {
//         userInfo.setUserInfo(userData);
//         popupEditProfile.close();
//       })
//       .catch((err) => {
//         console.log(`Error: ${err}`);
//       });
//     }
// })

// btnEditProfile.addEventListener("click", () => {
//   btnSaveProfile.textContent = "Сохранить";
//   popupEditProfile.open();
// });

// popupEditProfile.setEventListeners();

// //const formNewPlaceButton = formSelectors.formNewPlace.querySelector(".form__button");
// const formNewPlace = document.querySelector(".form_type_new-place");
// const formNewPlaceButton = formNewPlace.querySelector(".form__button");

// const popupNewPlace = new PopupWithForm({
//   popupSelector: popupSelectors.popupNewPlace,
//   handleFormSubmit: (data, event) => {
//     formNewPlaceButton.textContent = "Сохранение...";
//     api.postDataCard(inputPlaceTitle, inputPlaceUrl)
//       .then((data) => {
//         addCard(cardsList, setCards(data));
//         popupSelectors.popupNewPlace.close();
//         formNewPlace.reset();
//         setDisabledButton(
//           formNewPlaceButton,
//           validationConfig.inactiveButtonClass
//         );
//       })
//       .catch((err) => {
//         openPopup(popupError);
//         // handleErrors(err, errorTitle, errorText);
//         formNewPlaceButton.textContent = "Создать";
//         console.log(`Error: ${err}`);
//       });
//     }
// })

// popupNewPlace.setEventListeners();

// const popupEditAvatar = new PopupWithForm({
//   popupSelector: popupSelectors.popupEditAvatar,
//   handleFormSubmit: (data, event) => {

//     btnSaveAvatar.textContent = "Сохранение...";
//     api.setAvatar(inputUrlAvatar.value)
//       .then((data) => {
//         profileAvatar.src = data.avatar;
//         popupEditAvatar.close();
//         formEditAvatar.reset();
//         setDisabledButton(btnSaveAvatar, validationConfig.inactiveButtonClass);
//       })
//       .catch((err) => {
//         handleErrors(err, errorTitle, errorText);
//         btnSaveAvatar.textContent = "Сохранить";
//         console.log(`Error: ${err}`);
//       });
//     }
// })
// popupEditAvatar.setEventListeners();
