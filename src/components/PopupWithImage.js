import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  _title = document.querySelector(".popup__title_for_image");
  _image = document.querySelector(".popup__image");
  constructor(popupSelector) {
    super(popupSelector);
  }

  open({ title, image }) {
    super.open();
    this._title.textContent = title;
    this._image.alt = title;
    this._image.src = image;
  }
}
