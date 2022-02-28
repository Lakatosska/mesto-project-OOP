import "../index.css";
import {
  fetchConfig,
  validationConfig,
  userSelectors,
  btnEditProfile,
  btnAddPlace,
  profileAvatarContainer,
} from "../utils/constants.js";
import Api from "../components/api.js";
import Section from "../components/Section.js";
import Card from "../components/card.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";
import PopupConfirm from "../components/PopupConfirm.js";

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    new FormValidator(config, formElement).enableValidation();
  });
}

function handleCardClick(card) {
  popupImage.open(card);
}

function handleClickToTrashIcon(card) {
  popupConfirmDeleteCard.open(card);
}

function handleDeleteClick(event, card) {
  event.preventDefault();
  popupConfirmDeleteCard.renderLoading(true, "Да", "Удаление...");
  api
    .deleteCard(card.getCardId())
    .then(() => {
      card.removeCard();
      popupConfirmDeleteCard.close();
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    })
    .finally(() =>
      popupConfirmDeleteCard.renderLoading(false, "Да", "Удаление...")
    );
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

const popupConfirmDeleteCard = new PopupConfirm({
  popupSelector: ".popup_for_delete-card",
  handler: handleDeleteClick,
});

const popupEditProfile = new PopupWithForm({
  popupSelector: ".popup_type_edit-profile",
  handler: (event) => {
    event.preventDefault();
    popupEditProfile.renderLoading(true);
    const { fullname, mission } = popupEditProfile.getInputValues();
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
        popupEditProfile.renderLoading(false);
      });
  },
});

const popupNewPlace = new PopupWithForm({
  popupSelector: ".popup_type_new-place",
  handler: (event) => {
    event.preventDefault();
    popupNewPlace.renderLoading(true, "Создать", "Создание...");
    const { place, url_link } = popupNewPlace.getInputValues();
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
        popupNewPlace.renderLoading(false);
      });
  },
});

const popupEditAvatar = new PopupWithForm({
  popupSelector: ".popup_type_edit-avatar",
  handler: (event) => {
    event.preventDefault();
    popupEditAvatar.renderLoading(true);
    const { avatar_url } = popupEditAvatar.getInputValues();
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
        popupEditAvatar.renderLoading(false);
      });
  },
});

const cardsList = new Section(
  {
    renderer: (item) => {
      return new Card({
        data: item,
        selector: ".template-card",
        handleCardClick,
        handleClickToTrashIcon,
        toggleLike,
        userId: userInfo.getUserInfo().userId,
      }).generate();
    },
  },
  ".cards__list"
);

// page initialization
api
  .getAppInfo()
  .then(([cardData, userData]) => {
    userInfo.setUserInfo(userData);
    cardsList.renderItems(cardData);
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

enableValidation(validationConfig);

//Listeners
btnEditProfile.addEventListener("click", () => {
  popupEditProfile.setCurrentValues({
    fullname: userInfo.getUserInfo().name,
    mission: userInfo.getUserInfo().about,
  });
  popupEditProfile.open();
});

btnAddPlace.addEventListener("click", () => {
  popupNewPlace.open();
});

profileAvatarContainer.addEventListener("click", () => {
  popupEditAvatar.open();
});
