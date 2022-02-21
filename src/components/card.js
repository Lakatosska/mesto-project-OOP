export default class Card {
  constructor({
    data,
    selector,
    handleCardClick,
    handleDeleteClick,
    toggleLike,
    userId,
  }) {
    this._cardData = data;
    this._likes = data.likes;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._toggleLike = toggleLike;
    this._userId = userId;
  }

  generate() {
    this._element = this._getElement();
    this._likeBtn = this._element.querySelector(".card__like");

    const cardImage = this._element.querySelector(".card__image");
    const cardTitle = this._element.querySelector(".card__title");
    const deleteCardBtn = this._element.querySelector(".card__trash-icon");

    cardImage.src = this._cardData.link;
    cardImage.alt = this._cardData.name;
    cardTitle.textContent = this._cardData.name;

    this._showTrashIcon(deleteCardBtn);
    this._updateLikesView();
    this._setEventListeners(cardImage, cardTitle, deleteCardBtn);

    return this._element;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  updateLikes(cardData) {
    this._likes = cardData.likes;
    this._updateLikesView();
  }

  _showTrashIcon(deleteCardBtn) {
    if (this._isOurCard()) {
      deleteCardBtn.classList.add("card__trash-icon_visible");
    }
  }

  isLiked() {
    return this._likes.some((like) => {
      return Object.is(like._id, this._userId);
    });
  }

  _isOurCard() {
    return Object.is(this._cardData.owner._id, this._userId);
  }

  _getElement() {
    const templateCard = document.querySelector(this._selector);
    return templateCard.content.querySelector(".card-element").cloneNode(true);
  }

  _updateLikesView() {
    this._element.querySelector(".card__like-counter").textContent =
      this._likes.length;

    if (this.isLiked()) {
      this._likeBtn.classList.add("card__like_active");
    } else {
      this._likeBtn.classList.remove("card__like_active");
    }
  }

  _setEventListeners(cardImage, cardTitle, deleteCardBtn) {
    cardImage.addEventListener("click", () => {
      this._handleCardClick({
        image: cardImage.src,
        title: cardTitle.textContent,
      });
    });

    this._likeBtn.addEventListener("click", () => {
      this._toggleLike(this._cardData);
    });

    deleteCardBtn.addEventListener("click", () => {
      this._handleDeleteClick(this._cardData);
    });
  }
}
