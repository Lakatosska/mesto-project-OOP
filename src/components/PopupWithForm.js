import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".form");
    this._inputList = this._popup.querySelectorAll(".form__item");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setCurrentValues(values) {
    this._inputList.forEach((input) => {
      input.value = values[input.name].textContent;
    });
  }

  setEventListeners() {
    this._form.addEventListener("submit", (event) => {
      this._handleFormSubmit(event, this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
