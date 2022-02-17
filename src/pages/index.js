import "../index.css";
import { fetchConfig } from "../utils/constants.js";
import Api from "../components/api.js";
import Section from "../components/Section.js";
import Card from "../components/card.js";


// create class instances

const api = new Api(fetchConfig);

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

const userInfo = new UserInfo(userSelectors);

// page initialization
api.getAppInfo().then(([cardData, userData]) => {
  userInfo.getUserInfo(userData);
  userInfo.setUserInfo();
  cardsList.renderItems(cardData);
});


