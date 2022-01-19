function hasInvalidInput(inputs) {
  return inputs.some((input) => {
    return !input.validity.valid;
  });
}

function setDisabledButton(button, inactiveButtonClass) {
  button.classList.add(inactiveButtonClass);
  button.setAttribute("disabled", "disabled");
}

function removeDisabledButton(button, inactiveButtonClass) {
  button.classList.remove(inactiveButtonClass);
  button.removeAttribute("disabled");
}

function toggleButtonState(
  form,
  inputs,
  { submitButtonSelector, inactiveButtonClass }
) {
  const button = form.querySelector(submitButtonSelector);
  if (hasInvalidInput(inputs)) {
    setDisabledButton(button, inactiveButtonClass);
  } else {
    removeDisabledButton(button, inactiveButtonClass);
  }
}

function showErrorMessage(errorElement, input, errorClass, inputErrorClass) {
  errorElement.classList.add(errorClass);
  input.classList.add(inputErrorClass);
  errorElement.textContent = input.validationMessage;
}

function hideErrorMessage(errorElement, input, errorClass, inputErrorClass) {
  errorElement.classList.remove(errorClass);
  input.classList.remove(inputErrorClass);
  errorElement.textContent = "";
}

function handlerInputValidity(form, input, errorClass, inputErrorClass) {
  const errorElement = form.querySelector(`#error-${input.id}`);
  if (!input.validity.valid) {
    showErrorMessage(errorElement, input, errorClass, inputErrorClass);
  } else {
    hideErrorMessage(errorElement, input, errorClass, inputErrorClass);
  }
}

function setEventListener(
  form,
  { inputSelector, errorClass, inputErrorClass, ...rest }
) {
  const inputs = Array.from(form.querySelectorAll(inputSelector));
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      handlerInputValidity(form, input, errorClass, inputErrorClass);
      toggleButtonState(form, inputs, rest);
    });
  });
}

function enableValidation({ formSelector, ...rest }) {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((form) => {
    setEventListener(form, rest);
  });
}

export { enableValidation, toggleButtonState, setDisabledButton };
