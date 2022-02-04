import { fetchConfig } from "./constants.js";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

//Удаление карточки
function deleteCard(cardId) {
  return fetch(`${fetchConfig.baseUrl}cards/${cardId}`, {
    method: "DELETE",
    headers: fetchConfig.headers,
  }).then(checkResponse);
}

//Отправка данных карточки
function postDataCard(inputTitle, inputUrl) {
  return fetch(`${fetchConfig.baseUrl}cards`, {
    method: "POST",
    headers: fetchConfig.headers,
    body: JSON.stringify({
      name: inputTitle.value,
      link: inputUrl.value,
    }),
  }).then(checkResponse);
}

//Получение  карточек
function getCards() {
  return fetch(`${fetchConfig.baseUrl}cards`, {
    headers: fetchConfig.headers,
  }).then(checkResponse);
}

//Получение данных пользователя
function getUserData() {
  return fetch(`${fetchConfig.baseUrl}users/me`, {
    headers: fetchConfig.headers,
  }).then(checkResponse);
}

//Отправка изменненых данных пользователя
function sendUsersData(inputName, inputMission) {
  return fetch(`${fetchConfig.baseUrl}users/me`, {
    method: "PATCH",
    headers: fetchConfig.headers,
    body: JSON.stringify({
      name: inputName.value,
      about: inputMission.value,
    }),
  }).then(checkResponse);
}

//Отправка лайка
function setLike(cardId) {
  return fetch(`${fetchConfig.baseUrl}cards/likes/${cardId}`, {
    method: "PUT",
    headers: fetchConfig.headers,
  }).then(checkResponse);
}

//Удаление лайка
function deleteLike(cardId) {
  return fetch(`${fetchConfig.baseUrl}cards/likes/${cardId}`, {
    method: "DELETE",
    headers: fetchConfig.headers,
  }).then(checkResponse);
}

//Отправка аватара
function setAvatar(url) {
  return fetch(`${fetchConfig.baseUrl}users/me/avatar`, {
    method: "PATCH",
    headers: fetchConfig.headers,
    body: JSON.stringify({
      avatar: url,
    }),
  }).then(checkResponse);
}

export {
  setLike,
  deleteLike,
  deleteCard,
  postDataCard,
  getCards,
  getUserData,
  sendUsersData,
  setAvatar,
};
