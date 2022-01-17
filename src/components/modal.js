const popupImage = document.querySelector(".popup_type_open-img");
const popupTitle = popupImage.querySelector(".popup__title");
const popupImg = popupImage.querySelector(".popup__image");
const POPUP_OPENED = "popup_opened";

//Открытие попапа
function openPopup(popup) {
  popup.classList.add(POPUP_OPENED);
  addListenerEsc();
}

//Закрытие попап
function closePopup(popup) {
  popup.classList.remove(POPUP_OPENED);
  removeListenerEsc();
}

//Закрытие попап при клике на оверлей
function closePopupOverlay(event) {
  if (!Object.is(event.target, event.curentTarget)) {
    closePopup(event.target);
  }
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

export { openPopup, closePopup, closePopupOverlay, openImage };
