import "../index.css";
import {
  fetchConfig,
  validationConfig,
  userSelectors,
  btnEditProfile,
  profileName,
  profileMission,
  profileAvatar,
  btnAddPlace,
  formSelectors,
  profileAvatarContainer,
} from "../utils/constants.js";
import Api from "../components/api.js";
import Section from "../components/Section.js";
import Card from "../components/card.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";

function handleCardClick(card) {
  popupImage.open(card);
}

function handleDeleteClick(card) {
  api
    .deleteCard(card.getCardId())
    .then(() => card.removeCard())
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
}

function toggleLike(card) {
  if (card.isLiked()) {
    api
      .deleteLike(card._cardData._id)
      .then((likes) => {
        card.updateLikes(likes);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  } else {
    api
      .setLike(card._cardData._id)
      .then((likes) => {
        card.updateLikes(likes);
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

popupImage.setEventListeners();

const popupEditProfile = new PopupWithForm({
  popupSelector: ".popup_type_edit-profile",
  handleFormSubmit: (event, { fullname, mission }) => {
    event.preventDefault();
    popupEditProfile.renderLoading(true);
    api
      .sendUsersData(fullname, mission)
      .then((userData) => {
        userInfo.setUserInfo(userData);
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      })
      .finally(() => {
        popupEditProfile.renderLoading(false)
      });
  },
});
popupEditProfile.setEventListeners();

const popupNewPlace = new PopupWithForm({
  popupSelector: ".popup_type_new-place",
  handleFormSubmit: (event, { place, url_link }) => {
    event.preventDefault();
    popupNewPlace.renderLoading(true, "Создать", "Создание...");
    api
      .postDataCard(place, url_link)
      .then((cardData) => {
        cardsList.addItem(cardData, true);
        popupNewPlace.close();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      })
      .finally(() => {
        popupNewPlace.renderLoading(false)
      });
  },
});
popupNewPlace.setEventListeners();

const popupEditAvatar = new PopupWithForm({
  popupSelector: ".popup_type_edit-avatar",
  handleFormSubmit: (event, { avatar_url }) => {
    event.preventDefault();

    popupEditAvatar.renderLoading(true);
    api
      .setAvatar(avatar_url)
      .then((userData) => {
        userInfo.setUserInfo(userData);
        popupEditAvatar.close();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      })
      .finally(() => {
        popupEditAvatar.renderLoading(false)
      });
  },
});

popupEditAvatar.setEventListeners();

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
      return new Card({
        data: item,
        selector: ".template-card",
        handleCardClick,
        toggleLike,
        handleDeleteClick,
        popupImage,
        userId: userInfo.getUserInfo().userId,
      }).generate();
    },
  },
  ".cards__list"
);

// page initialization
api.getAppInfo().then(([cardData, userData]) => {
  userInfo.setUserInfo(userData);
  cardsList.renderItems(cardData);
});

//Enable validation
editProfileFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();

//Listeners
btnEditProfile.addEventListener("click", () => {
  popupEditProfile.setCurrentValues({
    fullname: userInfo.getUserInfo().name,
    mission: userInfo.getUserInfo().about
  });
  popupEditProfile.open();
});

btnAddPlace.addEventListener("click", () => {
  popupNewPlace.open();
});

profileAvatarContainer.addEventListener("click", () => {
  popupEditAvatar.open();
});
