import "../index.css";
import {
  fetchConfig,
  userSelectors,
  btnEditProfile,
  profileName,
  profileMission,
  btnSaveProfile,
} from "../utils/constants.js";
import { handleCardClick, toggleLike } from "../utils/utils.js";
import Api from "../components/api.js";
import Section from "../components/Section.js";
import Card from "../components/card.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm";

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
