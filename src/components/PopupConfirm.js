import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor({ popupSelector, handleDelete }) {
    super(popupSelector);
    this._handleDelete = handleDelete;
    this._button = this._popup.querySelector(".form__button");
  }

  open(data) {
    super.open();
    this._data = data;
    this._deleteListener = this._addAndRemoveEventListeners(
      this._button,
      "click",
      this._handleDelete,
      this._data
    );
  }

  close() {
    super.close();
    this._deleteListener();
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
