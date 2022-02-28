import PopupConfirm from "./PopupConfirm.js";

export default class PopupWithForm extends PopupConfirm {
  constructor({ popupSelector, handler }) {
    super({ popupSelector, handler });
    this._inputsList = this._popup.querySelectorAll(".form__item");
    this._handleSubmit = handler;
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
