import { popupImage, popupTitle, popupImg, POPUP_OPENED } from "./constants.js";
import { removeListenerDeleteBtn } from "./card.js";
//Открытие попапа
function openPopup(popup) {
  popup.classList.add(POPUP_OPENED);
  addListenerEsc();
}

//Закрытие попап
function closePopup(popup) {
  popup.classList.remove(POPUP_OPENED);
  removeListenerEsc();
  removeListenerDeleteBtn();
}

function addListenerEsc() {
  document.addEventListener("keydown", closePopupEscape);
}
function removeListenerEsc() {
  document.removeEventListener("keydown", closePopupEscape);
}

// Закрытие попап клавишей Escape
function closePopupEscape(event) {
  if (Object.is(event.key, "Escape")) {
    closePopup(document.querySelector(`.${POPUP_OPENED}`));
  }
}

//Открытие фото
function openImage(card) {
  popupTitle.textContent = card.name;
  popupImg.alt = `Изображение ${card.name}`;
  popupImg.src = card.link;

  openPopup(popupImage);
}

export { openPopup, closePopup, openImage };
