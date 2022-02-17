import "../index.css";
import { fetchConfig } from "../utils/constants.js";
import Api from "../components/Api.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";

const api = new Api(fetchConfig);

api.getCards().then((res) => {
  const cardsList = new Section(
    {
      items: res,
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
  cardsList.renderItems();
});
