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
  formSelectors,
  profileAvatarContainer,
  btnSaveAvatar,
  CARD__LIKE_ACTIVE,
} from "../utils/constants.js";
import Api from "../components/api.js";
import Section from "../components/Section.js";
import Card from "../components/card.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";

function createCard(item) {
  const card = new Card({
    data: item,
    selector: ".template-card",
    handleCardClick,
    toggleLike,
    handleDeleteClick,
    userId: userInfo.getUserInfo()._id,
    popupImage,
  });
  return card.generate();
}

function handleCardClick(card) {
  popupImage.open(card);
}

function handleDeleteClick(cardData, card) {
  api
    .deleteCard(cardData._id)
    .then(card.removeCard())
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
}

function toggleLike(event, card, counter) {
  if (event.target.classList.contains(CARD__LIKE_ACTIVE)) {
    api
      .deleteLike(card._id)
      .then((card) => {
        event.target.classList.remove(CARD__LIKE_ACTIVE);
        counter.textContent = card.likes.length;
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  } else {
    api
      .setLike(card._id)
      .then((card) => {
        event.target.classList.add(CARD__LIKE_ACTIVE);
        counter.textContent = card.likes.length;
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }
}
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

const popupNewPlace = new PopupWithForm({
  popupSelector: ".popup_type_new-place",
  handleFormSubmit: (event, button, { place, url_link }) => {
    event.preventDefault();
    button.textContent = "Сохранение...";
    api
      .postDataCard(place, url_link)
      .then((cardData) => {
        const cardElement = createCard(cardData);
        cardsList.addItem(cardElement, true);
        popupNewPlace.close();
      })
      .catch((err) => {
        button.textContent = "Создать";
        console.log(`Error: ${err}`);
      });
  },
});

const popupEditAvatar = new PopupWithForm({
  popupSelector: ".popup_type_edit-avatar",
  handleFormSubmit: (event, button, { avatar_url }) => {
    event.preventDefault();

    button.textContent = "Сохранение...";
    api
      .setAvatar(avatar_url)
      .then((userData) => {
        userInfo.getUserInfo(userData);
        userInfo.setUserInfo();
        popupEditAvatar.close();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  },
});

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

const cardsList = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);

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

//Enable validation
editProfileFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();

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
});

profileAvatarContainer.addEventListener("click", () => {
  btnSaveAvatar.textContent = "Сохранить";
  popupEditAvatar.open();
});

popupEditAvatar.setEventListeners();
popupNewPlace.setEventListeners();
popupEditProfile.setEventListeners();
