"use strict";

const profile = document.querySelector(".profile");

//Открытие и закрытие popup
function popupOpenClose() {
  const popupEditProfile = document.querySelector(".popup_name_edit-profile");
  const popupAddPlace = document.querySelector(".popup_name_new-place");
  const btnEditProfile = profile.querySelector(".profile__edit-button");
  const btnAddPlace = profile.querySelector(".profile__add-button");
  const btnClosePopup = document.querySelectorAll(".popup__close-button");
  const opened = "popup_opened";

  function openPopup(el, str) {
    el.classList.add(str);
  }

  btnEditProfile.addEventListener("click", () =>
    openPopup(popupEditProfile, opened)
  );
  btnAddPlace.addEventListener("click", () => openPopup(popupAddPlace, opened));

  for (let btn of btnClosePopup) {
    btn.addEventListener("click", function () {
      popupEditProfile.classList.remove(opened);
      popupAddPlace.classList.remove(opened);
    });
  }
}

popupOpenClose();
