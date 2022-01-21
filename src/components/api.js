const fetchConfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-6/",
  headers: {
    authorization: "65d32b7f-c1f2-44b3-9a5c-d1cd8d3f9a2c",
    "Content-Type": "application/json",
  },
  ownerId: "a40dc32b197666cc70ed64f0",
};

//Удаление карточки
function deleteCard(id) {
  return fetch(`${fetchConfig.baseUrl}cards/${id}`, {
    method: "DELETE",
    headers: fetchConfig.headers,
  });
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
  }).then((res) => {
    return res.json();
  });
}

//Получение  карточек
function getCards() {
  return fetch(`${fetchConfig.baseUrl}cards`, {
    headers: fetchConfig.headers,
  }).then((res) => {
    return res.json();
  });
}

//Получение данных пользователя
function getUserData() {
  return fetch(`${fetchConfig.baseUrl}users/me`, {
    headers: fetchConfig.headers,
  }).then((res) => {
    return res.json();
  });
}

//Отправка изменненых данных пользователя
function sendUsersData() {
  return fetch(`${fetchConfig.baseUrl}users/me`, {
    method: "PATCH",
    headers: fetchConfig.headers,
    body: JSON.stringify({
      name: inputName.value,
      about: inputMission.value,
    }),
  }).then((res) => {
    return res.json();
  });
}

export {
  fetchConfig,
  deleteCard,
  postDataCard,
  getCards,
  getUserData,
  sendUsersData,
};
