export const profileAvatarContainer = document.querySelector(
  ".profile__avatar-container"
);
export const btnAddPlace = document.querySelector(".profile__add-button");
export const btnEditProfile = document.querySelector(".profile__edit-button");

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

export const userSelectors = {
  profileName: ".profile__name",
  profileMission: ".profile__mission",
  profileAvatar: ".profile__avatar",
};

export const formSelectors = {
  formEditProfile: ".form_type_edit-profile",
  formNewPlace: ".form_type_new-place",
  formEditAvatar: ".form_type_edit-avatar",
};
