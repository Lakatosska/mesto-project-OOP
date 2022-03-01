import "../index.css";
import {
  fetchConfig,
  validationConfig,
  userSelectors,
  btnEditProfile,
  btnAddPlace,
  profileAvatarContainer,
  popupSelectors,
} from "../utils/constants.js";
import { renderLoading } from "../utils/utils.js";
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
  renderLoading(popupSelectors.popupDeleteCard, true, "Да", "Удаление...");
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
      renderLoading(popupSelectors.popupDeleteCard, false, "Да", "Удаление...")
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
const popupImage = new PopupWithImage(popupSelectors.popupOpenImage);

const popupConfirmDeleteCard = new PopupConfirm({
  popupSelector: popupSelectors.popupDeleteCard,
  handleDelete: handleDeleteClick,
});

const popupEditProfile = new PopupWithForm({
  popupSelector: popupSelectors.popupEditProfile,
  handleSubmit: (event) => {
    event.preventDefault();
    renderLoading(popupSelectors.popupEditProfile, true);
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
        renderLoading(popupSelectors.popupEditProfile, false);
      });
  },
});

const popupNewPlace = new PopupWithForm({
  popupSelector: popupSelectors.popupNewPlace,
  handleSubmit: (event) => {
    event.preventDefault();
    renderLoading(popupSelectors.popupNewPlace, true, "Создать", "Создание...");
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
        renderLoading(popupSelectors.popupNewPlace, false);
      });
  },
});

const popupEditAvatar = new PopupWithForm({
  popupSelector: popupSelectors.popupEditAvatar,
  handleSubmit: (event) => {
    event.preventDefault();
    renderLoading(popupSelectors.popupEditAvatar, true);
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
        renderLoading(popupSelectors.popupEditAvatar, false);
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

popupImage.setEventListeners();
popupEditProfile.setEventListeners();
popupNewPlace.setEventListeners();
popupEditAvatar.setEventListeners();
popupConfirmDeleteCard.setEventListeners();

btnEditProfile.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();

  popupEditProfile.setCurrentValues({
    fullname: currentUser.name,
    mission: currentUser.about,
  });
  popupEditProfile.open();
});

btnAddPlace.addEventListener("click", () => {
  popupNewPlace.open();
});

profileAvatarContainer.addEventListener("click", () => {
  popupEditAvatar.open();
});
