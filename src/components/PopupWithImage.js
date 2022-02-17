import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  _title = document.querySelector(".popup__title_for_image");
  _image = document.querySelector(".popup__image");
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(card) {
    super.open();
    this._title.textContent = card.title;
    this._image.src = card.image;
  }
}
