export default class Card {
  constructor({
    data,
    selector,
    handleCardClick,
    toggleLike,
    userId,
    popupImage,
  }) {
    this._cardData = data;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._toggleLike = toggleLike;
    this._userId = userId;
    this._popupImage = popupImage;
  }

  _getElement() {
    const templateCard = document.querySelector(this._selector);
    const cardElement = templateCard.content
      .querySelector(".card-element")
      .cloneNode(true);
    return cardElement;
  }

  generate() {
    this._element = this._getElement();

    const cardImage = this._element.querySelector(".card__image");
    const cardTitle = this._element.querySelector(".card__title");
    const likeBtn = this._element.querySelector(".card__like");
    const deleteCardBtn = this._element.querySelector(".card__trash-icon");
    const counterLikeCard = this._element.querySelector(".card__like-counter");
    cardImage.src = this._cardData.link;
    cardImage.alt = this._cardData.name;
    cardTitle.textContent = this._cardData.name;

    if (Object.is(this._cardData.owner._id, this._userId)) {
      deleteCardBtn.classList.add("card__trash-icon_visible");
    }

    counterLikeCard.textContent = this._cardData.likes.length;

    if (
      this._cardData.likes.some((like) => {
        return Object.is(like._id, this._userId);
      })
    ) {
      likeBtn.classList.add("card__like_active");
    }
    this._setEventListeners(cardImage, cardTitle, likeBtn, counterLikeCard);
    return this._element;
  }

  _setEventListeners(cardImage, cardTitle, likeBtn, counterLikeCard) {
    cardImage.addEventListener("click", () => {
      this._handleCardClick(
        {
          image: cardImage.src,
          title: cardTitle.textContent,
        },
        this._popupImage
      );
    });
    likeBtn.addEventListener("click", (event) => {
      this._toggleLike(event, this._cardData, counterLikeCard);
    });
  }
}
