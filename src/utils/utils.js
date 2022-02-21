export function renderLoading(popupSelector, isLoading = false, text = "Сохранить", textLoading = "Сохранение...") {
  const button = document.querySelector(`.${popupSelector} .form__button`);

  if (isLoading) {
    button.textContent = textLoading;
    button.setAttribute("disabled", true)
  } else {
    button.textContent = text;
    button.removeAttribute("disabled")
  }
}

