"use strict"

const popupEditProfile = document.querySelector(".popup_name_edit-profile");
const popupAddPlace = document.querySelector(".popup_name_new-place");
const profile = document.querySelector(".profile");
const btnEditProfile = profile.querySelector(".profile__edit-button");
const btnAddPlace = profile.querySelector(".profile__add-button");
const btnClosePopup = document.querySelectorAll(".popup__close-button");

btnEditProfile.addEventListener("click", function () {
  popupEditProfile.classList.add("popup_opened");
})

btnAddPlace.addEventListener("click", function () {
  popupAddPlace.classList.add("popup_opened");
})

for (let btn of btnClosePopup) {
  btn.addEventListener("click", function (ev) {
     ev.path[2].classList.remove("popup_opened");

  })
}
