export const profileName = document.querySelector(".profile__name");
export const profileMission = document.querySelector(".profile__mission");
export const profileAvatarContainer = document.querySelector(
  ".profile__avatar-container"
);
export const profileAvatar =
  profileAvatarContainer.querySelector(".profile__avatar");
export const btnAddPlace = document.querySelector(".profile__add-button");
export const btnEditProfile = document.querySelector(".profile__edit-button");
export const popupEditProfile = document.querySelector(
  ".popup_type_edit-profile"
);
export const popupEditAvatar = document.querySelector(
  ".popup_type_edit-avatar"
);
export const formEditProfile = document.querySelector(
  ".form_type_edit-profile"
);
export const btnSaveProfile = formEditProfile.querySelector(".form__button");
export const formEditAvatar = document.querySelector(".form_type_edit-avatar");
export const inputUrlAvatar = formEditAvatar.querySelector(
  ".form__item_type_url-avatar"
);
export const btnSaveAvatar = formEditAvatar.querySelector(".form__button");
export const inputName = document.querySelector(".form__item_type_name");
export const inputMission = document.querySelector(".form__item_type_mission");
export const popups = document.querySelectorAll(".popup");
export const popupError = document.querySelector(".popup_type_error");
export const errorTitle = popupError.querySelector(".popup__title_for_error");
export const errorText = popupError.querySelector(".popup__text-error");
export const formNewPlace = document.querySelector(".form_type_new-place");
export const formNewPlaceButton = formNewPlace.querySelector(".form__button");
export const cardsList = document.querySelector(".cards__list");
export const inputPlaceTitle = formNewPlace.querySelector(
  ".form__item_type_place"
);
export const inputPlaceUrl = formNewPlace.querySelector(".form__item_type_url");
export const popupAddPlace = document.querySelector(".popup_type_new-place");
export const popupDeleteCard = document.querySelector(".popup_for_delete-card");
export const btnConfirmDeleteCard =
  popupDeleteCard.querySelector(".form__button");
export const CARD__LIKE_ACTIVE = "card__like_active";
export const popupImage = document.querySelector(".popup_type_open-img");
export const popupTitle = popupImage.querySelector(".popup__title");
export const popupImg = popupImage.querySelector(".popup__image");
export const POPUP_OPENED = "popup_opened";
export const validationConfig = {
  formSelector: ".form",
  errorClass: "form__error-message_visible",
  inputSelector: ".form__item",
  inputErrorClass: "form__item_invalid",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
};
export const fetchConfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-6/",
  headers: {
    authorization: "65d32b7f-c1f2-44b3-9a5c-d1cd8d3f9a2c",
    "Content-Type": "application/json",
  },
};
