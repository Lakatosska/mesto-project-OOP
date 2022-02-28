export default class UserInfo {
  constructor({ profileName, profileMission, profileAvatar }) {
    this._nameElement = document.querySelector(profileName);
    this._aboutElement = document.querySelector(profileMission);
    this._avatarElement = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatar: this._avatarElement.src,
      userId: this._userId,
    }
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    this._avatarElement.src = avatar;
    this._userId = _id;
  }
}
