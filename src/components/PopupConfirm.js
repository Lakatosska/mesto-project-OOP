import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor({ popupSelector, handler }) {
    super(popupSelector);
    this._handleSubmit = handler;
    this._form = this._popup.querySelector(".form");
    this._button = this._popup.querySelector(".form__button");
  }

  open(data) {
    super.open();
    this._data = data;
    this._deleteListener = this._addAndRemoveEventListeners(
      this._form,
      "submit",
      this._handleSubmit,
      this._data
    );
  }

  close() {
    super.close();
    this._deleteListener();
    this._form.reset();
  }

  renderLoading(
    isLoading = false,
    text = "Сохранить",
    textLoading = "Сохранение..."
  ) {
    if (isLoading) {
      this._button.textContent = textLoading;
    } else {
      this._button.textContent = text;
    }
  }

  _addAndRemoveEventListeners(element, event, callBack, argument) {
    function fun(evt) {
      callBack(evt, argument);
    }
    element.addEventListener(event, fun);
    return function () {
      element.removeEventListener(event, fun);
    };
  }
}
