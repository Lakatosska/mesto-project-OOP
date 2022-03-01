export function renderLoading(
  popupSelector,
  isLoading = false,
  text = "Сохранить",
  textLoading = "Сохранение..."
) {
  const button = document.querySelector(`${popupSelector} .form__button`);
  if (isLoading) {
    button.textContent = textLoading;
  } else {
    button.textContent = text;
  }
}
