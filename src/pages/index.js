import "../index.css";
import {
  fetchConfig,
  validationConfig,
  userSelectors,
  btnEditProfile,
  profileName,
  profileMission,
  btnSaveProfile,
  btnAddPlace,
  popupAddPlace,
  formSelectors,
} from "../utils/constants.js";
import { handleCardClick, toggleLike } from "../utils/utils.js";
import Api from "../components/api.js";
import Section from "../components/Section.js";
import Card from "../components/card.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";

// create class instances

const api = new Api(fetchConfig);

const userInfo = new UserInfo(userSelectors);

const popupImage = new PopupWithImage(".popup_type_open-img");

const popupEditProfile = new PopupWithForm({
  popupSelector: ".popup_type_edit-profile",
  handleFormSubmit: (event, button, { fullname, mission }) => {
    event.preventDefault();
    button.textContent = "Сохранение...";
    console.log(fullname, mission);
    api
      .sendUsersData(fullname, mission)
      .then((userData) => {
        userInfo.getUserInfo(userData);
        userInfo.setUserInfo();
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  },
});

//const formNewPlaceButton = formSelectors.formNewPlace.querySelector(".form__button");
//const formNewPlace = document.querySelector(".form_type_new-place");
//const formNewPlaceButton = formNewPlace.querySelector(".form__button");

const popupNewPlace = new PopupWithForm({
  popupSelector: ".popup_type_new-place",
  handleFormSubmit: (event, button, { place, url_link }) => {
    event.preventDefault();
    button.textContent = "Сохранение...";
    api.postDataCard(place, url_link)
    console.log(place, url_link)
      .then((cardData) => {
        cardsList.setItem(cardData);
        popupNewPlace.close();
        /*
        setDisabledButton(
          formNewPlaceButton,
          validationConfig.inactiveButtonClass
        );
        */
      })
      .catch((err) => {
        //openPopup(popupError);
        // handleErrors(err, errorTitle, errorText);
        button.textContent = "Создать";
        console.log(`Error: ${err}`);
      });
  }
})



const editProfileFormValidator = new FormValidator(
  validationConfig,
  formSelectors.formEditProfile
);
const newPlaceFormValidator = new FormValidator(
  validationConfig,
  formSelectors.formNewPlace
);
const editAvatarFormValidator = new FormValidator(
  validationConfig,
  formSelectors.formEditAvatar
);

// index.js
editProfileFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();
editAvatarFormValidator.enableValidation()



popupNewPlace.setEventListeners();




const cardsList = new Section(
  {
    renderer: (item) => {
      const card = new Card({
        data: item,
        selector: ".template-card",
        handleCardClick: handleCardClick,
        toggleLike: toggleLike,
        userId: userInfo.getUserInfo()._id,
        popupImage: popupImage,
      });
      const cardElement = card.generate();

      cardsList.addItem(cardElement);
    },
  },
  ".cards__list"
);

// page initialization
api.getAppInfo().then(([cardData, userData]) => {
  userInfo.getUserInfo(userData);
  userInfo.setUserInfo();
  cardsList.renderItems(cardData);
});

//Listeners
btnEditProfile.addEventListener("click", () => {
  btnSaveProfile.textContent = "Сохранить";
  popupEditProfile.setCurrentValues({
    fullname: profileName,
    mission: profileMission,
  });
  popupEditProfile.open();
});

btnAddPlace.addEventListener("click", () => {
  popupNewPlace.open();
})
