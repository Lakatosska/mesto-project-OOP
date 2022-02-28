import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmit }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".form");
    this._inputsList = this._popup.querySelectorAll(".form__item");
    this._handleSubmit = handleSubmit;
  }

  close() {
    super.close();
    this._form.reset();
  }

  getInputValues() {
    this._formValues = {};
    this._inputsList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setCurrentValues(values) {
    this._inputsList.forEach((input) => {
      input.value = values[input.name];
    });
  }
}
