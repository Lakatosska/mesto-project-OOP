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

  close(findPopup) {
    if (findPopup) {
      document
        .querySelector(`.${Popup._POPUP_OPENED}`)
        .classList.remove(Popup._POPUP_OPENED);
    } else {
      this._popup.classList.remove(Popup._POPUP_OPENED);
    }
  }

  setEventListeners() {
    document.addEventListener("keydown", (event) => {
      this._handleEscClose(event);
    });
    document.querySelectorAll(Popup._POPUP).forEach((popup) => {
      popup.addEventListener("mousedown", (event) => {
        this._handleClose(event);
      });
    });
    Popup._needSetEventListener = false;
  }

  _handleEscClose(event) {
    if (Object.is(event.key, "Escape")) {
      this.close(true);
    }
  }

  _handleClose(event) {
    if (event.target.classList.contains("popup_opened")) {
      this.close(true);
    }
    if (event.target.classList.contains("popup__close-button")) {
      this.close(true);
    }
  }
}
