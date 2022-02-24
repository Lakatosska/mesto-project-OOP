export default class Popup {
  static _POPUP_OPENED = "popup_opened";
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add(Popup._POPUP_OPENED);
  }

  close() {
    this._popup.classList.remove(Popup._POPUP_OPENED);
  }

  setEventListeners() {
    document.addEventListener("keydown", (event) => {
      this._handleEscClose(event);
    });
    this._popup.addEventListener("mousedown", (event) => {
      this._handleClose(event);
    });
  }

  _handleEscClose(event) {
    if (Object.is(event.key, "Escape")) {
      this.close();
    }
  }

  _handleClose(event) {
    if (event.target.classList.contains("popup_opened")) {
      this.close();
    }
    if (event.target.classList.contains("popup__close-button")) {
      this.close();
    }
  }
}
