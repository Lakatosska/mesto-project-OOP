//  import { fetchConfig } from "./constants.js";

//  function checkResponse(res) {
//    if (res.ok) {
//      return res.json();
//    }

//    throw new Error(res.status);
//  }

// //Удаление карточки
// function deleteCard(cardId) {
//   return fetch(`${fetchConfig.baseUrl}cards/${cardId}`, {
//     method: "DELETE",
//     headers: fetchConfig.headers,
//   }).then(checkResponse);
// }

// //Отправка данных карточки
// function postDataCard(inputTitle, inputUrl) {
//   return fetch(`${fetchConfig.baseUrl}cards`, {
//     method: "POST",
//     headers: fetchConfig.headers,
//     body: JSON.stringify({
//       name: inputTitle.value,
//       link: inputUrl.value,
//     }),
//   }).then(checkResponse);
// }

// //Получение  карточек
// function getCards() {
//   return fetch(`${fetchConfig.baseUrl}cards`, {
//     headers: fetchConfig.headers,
//   }).then(checkResponse);
// }

// //Получение данных пользователя
// function getUserData() {
//   return fetch(`${fetchConfig.baseUrl}users/me`, {
//     headers: fetchConfig.headers,
//   }).then(checkResponse);
// }

// //Отправка изменненых данных пользователя
// function sendUsersData(inputName, inputMission) {
//   return fetch(`${fetchConfig.baseUrl}users/me`, {
//     method: "PATCH",
//     headers: fetchConfig.headers,
//     body: JSON.stringify({
//       name: inputName.value,
//       about: inputMission.value,
//     }),
//   }).then(checkResponse);
// }

// //Отправка лайка
// function setLike(cardId) {
//   return fetch(`${fetchConfig.baseUrl}cards/likes/${cardId}`, {
//     method: "PUT",
//     headers: fetchConfig.headers,
//   }).then(checkResponse);
// }

// //Удаление лайка
// function deleteLike(cardId) {
//   return fetch(`${fetchConfig.baseUrl}cards/likes/${cardId}`, {
//     method: "DELETE",
//     headers: fetchConfig.headers,
//   }).then(checkResponse);
// }

// //Отправка аватара
// function setAvatar(url) {
//   return fetch(`${fetchConfig.baseUrl}users/me/avatar`, {
//     method: "PATCH",
//     headers: fetchConfig.headers,
//     body: JSON.stringify({
//       avatar: url,
//     }),
//   }).then(checkResponse);
// }

// export {
//   setLike,
//   deleteLike,
//   deleteCard,
//   postDataCard,
//   getCards,
//   getUserData,
//   sendUsersData,
//   setAvatar,
// };

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(checkResponse);
  }

  postDataCard(inputTitle, inputUrl) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: inputTitle.value,
        link: inputUrl.value,
      }),
    }).then(checkResponse);
  }

  getCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers,
    }).then(checkResponse);
  }

  getUserData() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers,
    }).then(checkResponse);
  }

  sendUsersData(inputName, inputMission) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: inputName.value,
        about: inputMission.value,
      }),
    }).then(checkResponse);
  }

  setLike(cardId) {
    return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(checkResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(checkResponse);
  }

  setAvatar(url) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: url,
      }),
    }).then(checkResponse);
  }
}
