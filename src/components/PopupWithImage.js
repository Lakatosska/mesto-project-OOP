import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._title = document.querySelector(".popup__title_for_image");
    this._image = document.querySelector(".popup__image");
  }

  open({ title, image }) {
    super.open();
    this._title.textContent = title;
    this._image.alt = title;
    this._image.src = image;
  }
}
