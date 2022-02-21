(()=>{"use strict";var e=document.querySelector(".profile__name"),t=document.querySelector(".profile__mission"),n=document.querySelector(".profile__avatar-container"),r=(n.querySelector(".profile__avatar"),document.querySelector(".profile__add-button")),o=document.querySelector(".profile__edit-button"),i=(document.querySelector(".form_type_edit-avatar"),document.querySelector(".form__item_type_name"),document.querySelector(".form__item_type_mission"),document.querySelector(".popup_type_open-img"),{formSelector:".form",errorClass:"form__error-message_visible",inputSelector:".form__item",inputErrorClass:"form__item_invalid",submitButtonSelector:".form__button",inactiveButtonClass:"form__button_disabled"});function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var s=function(){function e(t){var n=t.baseUrl,r=t.headers;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._baseUrl=n,this._headers=r}var t,n;return t=e,(n=[{key:"_checkResponse",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}},{key:"getAppInfo",value:function(){return Promise.all([this._getCards(),this._getUserData()])}},{key:"deleteCard",value:function(e){return fetch("".concat(this._baseUrl,"cards/").concat(e),{method:"DELETE",headers:this._headers}).then(this._checkResponse)}},{key:"postDataCard",value:function(e,t){return fetch("".concat(this._baseUrl,"cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e,link:t})}).then(this._checkResponse)}},{key:"_getCards",value:function(){return fetch("".concat(this._baseUrl,"cards"),{headers:this._headers}).then(this._checkResponse)}},{key:"_getUserData",value:function(){return fetch("".concat(this._baseUrl,"users/me"),{headers:this._headers}).then(this._checkResponse)}},{key:"sendUsersData",value:function(e,t){return fetch("".concat(this._baseUrl,"users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e,about:t})}).then(this._checkResponse)}},{key:"setLike",value:function(e){return fetch("".concat(this._baseUrl,"cards/likes/").concat(e),{method:"PUT",headers:this._headers}).then(this._checkResponse)}},{key:"deleteLike",value:function(e){return fetch("".concat(this._baseUrl,"cards/likes/").concat(e),{method:"DELETE",headers:this._headers}).then(this._checkResponse)}},{key:"setAvatar",value:function(e){return fetch("".concat(this._baseUrl,"users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then(this._checkResponse)}}])&&a(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var u=function(){function e(t,n){var r=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=r,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"renderItems",value:function(e){var t=this;e.forEach((function(e){return t._renderer(e)}))}},{key:"addItem",value:function(e,t){t?this._container.prepend(e):this._container.append(e)}}])&&c(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var f=function(){function e(t){var n=t.data,r=t.selector,o=t.handleCardClick,i=t.handleDeleteClick,a=t.toggleLike,s=t.userId;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._cardData=n,this._likes=n.likes,this._selector=r,this._handleCardClick=o,this._handleDeleteClick=i,this._toggleLike=a,this._userId=s}var t,n;return t=e,(n=[{key:"generate",value:function(){this._element=this._getElement(),this._likeBtn=this._element.querySelector(".card__like");var e=this._element.querySelector(".card__image"),t=this._element.querySelector(".card__title"),n=this._element.querySelector(".card__trash-icon");return e.src=this._cardData.link,e.alt=this._cardData.name,t.textContent=this._cardData.name,this._showTrashIcon(n),this._updateLikesView(),this._setEventListeners(e,t,n),this._element}},{key:"removeCard",value:function(){this._element.remove(),this._element=null}},{key:"updateLikes",value:function(e){this._likes=e.likes,this._updateLikesView()}},{key:"_showTrashIcon",value:function(e){this._isOurCard()&&e.classList.add("card__trash-icon_visible")}},{key:"isLiked",value:function(){var e=this;return this._likes.some((function(t){return Object.is(t._id,e._userId)}))}},{key:"_isOurCard",value:function(){return Object.is(this._cardData.owner._id,this._userId)}},{key:"_getElement",value:function(){return document.querySelector(this._selector).content.querySelector(".card-element").cloneNode(!0)}},{key:"_updateLikesView",value:function(){this._element.querySelector(".card__like-counter").textContent=this._likes.length,this.isLiked()?this._likeBtn.classList.add("card__like_active"):this._likeBtn.classList.remove("card__like_active")}},{key:"_setEventListeners",value:function(e,t,n){var r=this;e.addEventListener("click",(function(){r._handleCardClick({image:e.src,title:t.textContent})})),this._likeBtn.addEventListener("click",(function(){r._toggleLike(r._cardData)})),n.addEventListener("click",(function(){r._handleDeleteClick(r._cardData)}))}}])&&l(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var h=function(){function e(t){var n=t.profileName,r=t.profileMission,o=t.profileAvatar;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=document.querySelector(n),this._about=document.querySelector(r),this._avatar=document.querySelector(o)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(e){return e?(this._user=e,this._user):this._user}},{key:"setUserInfo",value:function(){this._name.textContent=this._user.name,this._about.textContent=this._user.about,this._avatar.src=this._user.avatar}}])&&p(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function _(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var y=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add(e._POPUP_OPENED)}},{key:"close",value:function(t){t?document.querySelector(".".concat(e._POPUP_OPENED)).classList.remove(e._POPUP_OPENED):this._popup.classList.remove(e._POPUP_OPENED)}},{key:"setEventListeners",value:function(){var e=this;document.addEventListener("keydown",(function(t){e._handleEscClose(t)})),this._popup.addEventListener("mousedown",(function(t){e._handleClose(t)}))}},{key:"_handleEscClose",value:function(e){Object.is(e.key,"Escape")&&this.close(!0)}},{key:"_handleClose",value:function(e){console.log(e.target.classList.contains("popup__close-button")),e.target.classList.contains("popup_opened")&&this.close(!0),e.target.classList.contains("popup__close-button")&&this.close(!0)}}])&&_(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function v(e){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},v(e)}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function b(){return b="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=k(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},b.apply(this,arguments)}function k(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=S(e)););return e}function g(e,t){return g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},g(e,t)}function w(e,t){if(t&&("object"===v(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return E(e)}function E(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function S(e){return S=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},S(e)}function O(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}d(y,"_POPUP_OPENED","popup_opened"),d(y,"_POPUP",".popup");var C=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&g(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=S(r);if(o){var n=S(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return w(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),O(E(t=i.call(this,e)),"_title",document.querySelector(".popup__title_for_image")),O(E(t),"_image",document.querySelector(".popup__image")),t}return t=a,(n=[{key:"open",value:function(e){b(S(a.prototype),"open",this).call(this),this._title.textContent=e.title,this._image.src=e.image}}])&&m(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(y);function P(e){return P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},P(e)}function L(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function j(){return j="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=D(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},j.apply(this,arguments)}function D(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=U(e)););return e}function I(e,t){return I=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},I(e,t)}function q(e,t){if(t&&("object"===P(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function U(e){return U=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},U(e)}var R=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&I(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=U(r);if(o){var n=U(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return q(this,e)});function a(e){var t,n=e.popupSelector,r=e.handleFormSubmit;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,n))._form=t._popup.querySelector(".form"),t._inputList=t._popup.querySelectorAll(".form__item"),t._handleFormSubmit=r,t}return t=a,(n=[{key:"_getInputValues",value:function(){var e=this;return this._formValues={},this._inputList.forEach((function(t){e._formValues[t.name]=t.value})),this._formValues}},{key:"setCurrentValues",value:function(e){this._inputList.forEach((function(t){t.value=e[t.name].textContent}))}},{key:"setEventListeners",value:function(){var e=this;j(U(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){e._handleFormSubmit(t,e._getInputValues())}))}},{key:"close",value:function(){j(U(a.prototype),"close",this).call(this),this._form.reset()}}])&&L(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(y);function B(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var T=function(){function e(t,n){var r=t.formSelector,o=t.errorClass,i=t.inputSelector,a=t.inputErrorClass,s=t.submitButtonSelector,c=t.inactiveButtonClass;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._form=document.querySelector(n),this._formSelector=r,this._errorClass=o,this._inputSelector=i,this._inputErrorClass=a,this._submitButtonSelector=s,this._inactiveButtonClass=c,this._button=this._form.querySelector(this._submitButtonSelector)}var t,n;return t=e,(n=[{key:"_hasInvalidInput",value:function(e){return e.some((function(e){return!e.validity.valid}))}},{key:"_setDisabledButton",value:function(){this._button.classList.add(this._inactiveButtonClass),this._button.setAttribute("disabled","disabled")}},{key:"_removeDisabledButton",value:function(){this._button.classList.remove(this._inactiveButtonClass),this._button.removeAttribute("disabled")}},{key:"_toggleButtonState",value:function(e){this._hasInvalidInput(e)?this._setDisabledButton():this._removeDisabledButton()}},{key:"_showErrorMessage",value:function(e,t){e.classList.add(this._errorClass),t.classList.add(this._inputErrorClass),e.textContent=t.validationMessage}},{key:"_hideErrorMessage",value:function(e,t){e.classList.remove(this._errorClass),t.classList.remove(this._inputErrorClass),e.textContent=""}},{key:"_handlerInputValidity",value:function(e){var t=this._form.querySelector("#error-".concat(e.id));e.validity.valid?this._hideErrorMessage(t,e):this._showErrorMessage(t,e)}},{key:"_setEventListener",value:function(){var e=this,t=Array.from(this._form.querySelectorAll(this._inputSelector));t.forEach((function(n){n.addEventListener("input",(function(){e._handlerInputValidity(n),e._toggleButtonState(t)})),e._form.addEventListener("reset",(function(){e._setDisabledButton()}))}))}},{key:"enableValidation",value:function(){this._setEventListener()}}])&&B(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function A(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Сохранение...",o=document.querySelector(".".concat(e," .form__button"));t?(o.textContent=r,o.setAttribute("disabled",!0)):(o.textContent=n,o.removeAttribute("disabled"))}function x(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function V(e){return new f({data:e,selector:".template-card",handleCardClick:N,toggleLike:F,handleDeleteClick:M,userId:H.getUserInfo()._id,popupImage:z}).generate()}function N(e){z.open(e)}function M(e){J.deleteCard(e._id).then(this.removeCard()).catch((function(e){console.log("Error: ".concat(e))}))}function F(e){var t=this;this.isLiked()?J.deleteLike(e._id).then((function(e){t.updateLikes(e)})).catch((function(e){console.log("Error: ".concat(e))})):J.setLike(e._id).then((function(e){t.updateLikes(e)})).catch((function(e){console.log("Error: ".concat(e))}))}var J=new s({baseUrl:"https://nomoreparties.co/v1/plus-cohort-6/",headers:{authorization:"65d32b7f-c1f2-44b3-9a5c-d1cd8d3f9a2c","Content-Type":"application/json"}}),H=new h({profileName:".profile__name",profileMission:".profile__mission",profileAvatar:".profile__avatar"}),z=new C(".popup_type_open-img");z.setEventListeners();var $=new R({popupSelector:".popup_type_edit-profile",handleFormSubmit:function(e,t){var n=t.fullname,r=t.mission;e.preventDefault(),A("popup_type_edit-profile",!0),J.sendUsersData(n,r).then((function(e){H.getUserInfo(e),H.setUserInfo(),$.close()})).catch((function(e){console.log("Error: ".concat(e))}))}});$.setEventListeners();var G=new R({popupSelector:".popup_type_new-place",handleFormSubmit:function(e,t){var n=t.place,r=t.url_link;e.preventDefault(),A("popup_type_new-place",!0,"Создать","Создание..."),J.postDataCard(n,r).then((function(e){var t=V(e);Y.addItem(t,!0),G.close()})).catch((function(e){console.log("Error: ".concat(e))}))}});G.setEventListeners();var K=new R({popupSelector:".popup_type_edit-avatar",handleFormSubmit:function(e,t){var n=t.avatar_url;e.preventDefault(),A("popup_type_edit-avatar",!0),J.setAvatar(n).then((function(e){H.getUserInfo(e),H.setUserInfo(),K.close()})).catch((function(e){console.log("Error: ".concat(e))}))}});K.setEventListeners();var Q=new T(i,".form_type_edit-profile"),W=new T(i,".form_type_new-place"),X=new T(i,".form_type_edit-avatar"),Y=new u({renderer:function(e){var t=V(e);Y.addItem(t)}},".cards__list");J.getAppInfo().then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,s=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){s=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(s)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return x(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?x(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];H.getUserInfo(i),H.setUserInfo(),Y.renderItems(o)})),Q.enableValidation(),W.enableValidation(),X.enableValidation(),o.addEventListener("click",(function(){A("popup_type_edit-profile",!1),$.setCurrentValues({fullname:e,mission:t}),$.open()})),r.addEventListener("click",(function(){A("popup_type_new-place",!1,"Создать","Создание..."),G.open()})),n.addEventListener("click",(function(){A("popup_type_edit-avatar",!1),K.open()}))})();