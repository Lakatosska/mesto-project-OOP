import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".form");
    this._inputs = this._popup.querySelectorAll(".form__item");
    this._submitButton = this._form.querySelector(".form__button")
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputs.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setCurrentValues(values) {
    this._inputs.forEach((input) => {
      input.value = values[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      this._handleFormSubmit(event, this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading, text='Сохранить', textLoading = "Сохранение...") {
    if (isLoading) {
      this._submitButton.textContent = textLoading;
    } else {
      this._submitButton.textContent = text;
    }
  }
}
