"use strict";

const profile = document.querySelector(".profile");

//Открытие popup
const popupEditProfile = document.querySelector(".popup_name_edit-profile");
const popupAddPlace = document.querySelector(".popup_name_new-place");
const btnEditProfile = profile.querySelector(".profile__edit-button");
const btnAddPlace = profile.querySelector(".profile__add-button");
const btnClosePopup = document.querySelectorAll(".popup__close-button");
const opened = "popup_opened";

function popupOpen() {
  function openPopup(el, str) {
    el.classList.add(str);
  }

  btnEditProfile.addEventListener("click", () =>
    openPopup(popupEditProfile, opened)
  );

  btnAddPlace.addEventListener("click", () => openPopup(popupAddPlace, opened));
}

//Закрытие попап
function popupClose() {
  for (let btn of btnClosePopup) {
    btn.addEventListener("click", function () {
      popupEditProfile.classList.remove(opened);
      popupAddPlace.classList.remove(opened);
    });
  }
}

//Редактирование формы
function formEdit() {
  const formEdit = document.querySelector(".form_type_edit-profile");
  const formNameItem = formEdit.querySelector(".form__item_type_name");
  const formMissionItem = formEdit.querySelector(".form__item_type_mission");
  const profileName = profile.querySelector(".profile__name");
  const profileMission = profile.querySelector(".profile__mission");

  formNameItem.value = profileName.textContent;
  formMissionItem.value = profileMission.textContent;

  function formSubmitHandler(event) {
    event.preventDefault();
    profileName.textContent = formNameItem.value;
    profileMission.textContent = formMissionItem.value;
    popupEditProfile.classList.remove(opened);
    popupAddPlace.classList.remove(opened);
  }

  formEdit.addEventListener("submit", formSubmitHandler);
}

popupOpen();
popupClose();
formEdit();
