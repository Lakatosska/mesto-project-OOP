export default class Card {
  constructor(data, selector) {
    this._cardData = card.Data;
    this._selector = selector;
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

    this._setEventListeners(cardImage);

    return this._element;
  }

  _setEventListeners(element) {
    element.addEventListener("click", this._handleClickImage);
  }
  _handleClickImage() {
    console.log("click");
  }

}




