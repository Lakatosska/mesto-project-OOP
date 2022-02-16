export default class Popup {
  static _POPUP_OPENED = "popup_opened";
  static _needSetEventListener = true;
  static _POPUP = ".popup";
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add(Popup._POPUP_OPENED);
    if (Popup._needSetEventListener) {
      this.setEventListeners();
    }
  }

  close() {
    this._popup.classList.remove(Popup._POPUP_OPENED);
  }

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose.bind(this));
    document.querySelectorAll(Popup._POPUP).forEach((popup) => {
      popup.addEventListener("mousedown", this._handleClose);
    });
    Popup._needSetEventListener = false;
  }

  _handleEscClose(event) {
    if (Object.is(event.key, "Escape")) {
      document
        .querySelector(`.${Popup._POPUP_OPENED}`)
        .classList.remove(Popup._POPUP_OPENED);
    }
  }

  _handleClose(event) {
    if (event.target.classList.contains("popup_opened")) {
      event.target
        .closest(`.${Popup._POPUP_OPENED}`)
        .classList.remove(Popup._POPUP_OPENED);
    }
    if (event.target.classList.contains("popup__close-button")) {
      event.target
        .closest(`.${Popup._POPUP_OPENED}`)
        .classList.remove(Popup._POPUP_OPENED);
    }
  }
}
