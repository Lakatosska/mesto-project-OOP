export default class FormValidator {
  constructor(
    {
      formSelector,
      errorClass,
      inputSelector,
      inputErrorClass,
      submitButtonSelector,
      inactiveButtonClass,
    },
    form
  ) {
    this._form = form;
    this._formSelector = formSelector;
    this._errorClass = errorClass;
    this._inputSelector = inputSelector;
    this._inputErrorClass = inputErrorClass;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._button = this._form.querySelector(this._submitButtonSelector);
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputs.forEach(input => {
      this._hideErrorMessage(input);
    });
  }

  enableValidation() {
    this._setEventListener();
  }

  _hasInvalidInput() {
    return this._inputs.some((input) => {
      return !input.validity.valid;
    });
  }

  _setDisabledButton() {
    this._button.classList.add(this._inactiveButtonClass);
    this._button.setAttribute("disabled", "disabled");
  }

  _removeDisabledButton() {
    this._button.classList.remove(this._inactiveButtonClass);
    this._button.removeAttribute("disabled");
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._setDisabledButton();
    } else {
      this._removeDisabledButton();
    }
  }

  _showErrorMessage(errorElement, input) {
    errorElement.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = input.validationMessage;
  }

  _hideErrorMessage(input) {
    const errorElement = this._form.querySelector(`#error-${input.id}`);
    errorElement.classList.remove(this._errorClass);
    input.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
  }

  _handlerInputValidity(input) {
    const errorElement = this._form.querySelector(`#error-${input.id}`);
    if (!input.validity.valid) {
      this._showErrorMessage(errorElement, input);
    } else {
      this._hideErrorMessage(input);
    }
  }

  _setEventListener() {
    const inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {

        this._handlerInputValidity(input);
        this._toggleButtonState(inputs);
      });
      this._form.addEventListener("reset", () => {
        this._setDisabledButton();
      });
    });
  }
}
