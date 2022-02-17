export default class UserInfo {
  constructor({ profileName, profileMission, profileAvatar }) {
    this._name = document.querySelector(profileName);
    this._about = document.querySelector(profileMission);
    this._avatar = document.querySelector(profileAvatar);
  }

  getUserInfo(data) {
    if (!this._user) {
      this._user = data;
      return this._user;
    } else {
      return this._user;
    }
  }

  setUserInfo() {
    this._name.textContent = this._user.name;
    this._about.textContent = this._user.about;
    this._avatar.src = this._user.avatar;
  }
}
