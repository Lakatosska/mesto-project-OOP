import "../index.css";
import { fetchConfig, userSelectors } from "../utils/constants.js";
import { handleCardClick, toggleLike } from "../utils/utils.js";
import Api from "../components/api.js";
import Section from "../components/Section.js";
import Card from "../components/card.js";
import UserInfo from "../components/UserInfo.js";

// create class instances

const api = new Api(fetchConfig);
const userInfo = new UserInfo(userSelectors);

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
