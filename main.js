(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{b7:()=>_,ay:()=>j,t$:()=>L,O7:()=>C,mo:()=>x,Qn:()=>A,bY:()=>H});var t={baseUrl:"https://nomoreparties.co/v1/wff-cohort-34",headers:{authorization:"dc9d655b-4c4c-4981-8e4a-cbe7891c9e9e","Content-Type":"application/json"}};function n(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",r)}function o(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",r)}function r(e){"Escape"===e.key&&o(document.querySelector(".popup_is-opened"))}function c(e){e.target.classList.contains("popup")&&o(document.querySelector(".popup_is-opened"))}function a(e,t,n,o,r){var c=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),a=c.querySelector(".card__delete-button"),i=c.querySelector(".card__like-button"),u=c.querySelector(".card__likes-amount"),l=c.querySelector(".card__image");return u.textContent=e.likes,l.src=e.link,l.alt=e.name,l.addEventListener("click",o),c.querySelector(".card__title").textContent=e.name,e.ownerId!==r&&(a.style.display="none"),a.addEventListener("click",(function(){t(e.id,c)})),i.addEventListener("click",(function(t){n(t,e.id,u)})),c}function i(e,n,o){e.target.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(t.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))}))}(n).then((function(t){o.textContent=t.likes.length,e.target.classList.remove("card__like-button_is-active")})).catch((function(e){console.log(e)})):function(e){return fetch("".concat(t.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))}))}(n).then((function(t){o.textContent=t.likes.length,e.target.classList.add("card__like-button_is-active")})).catch((function(e){console.log(e)}))}function u(e,n){(function(e){return fetch("".concat(t.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))}))})(e).then((function(){n.remove()})).catch((function(e){console.log(e)}))}function l(e,t,n,o){e.classList.remove("".concat(n)),t.classList.remove("".concat(o)),t.textContent=""}function s(e,t,n){var o=!0;e.forEach((function(e){e.validity.valid||(o=!1)})),o?(t.disabled=!1,t.classList.remove("".concat(n))):(t.disabled=!0,t.classList.add("".concat(n)))}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}Promise.all([fetch("".concat(t.baseUrl,"/users/me"),{headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))})),fetch("".concat(t.baseUrl,"/cards"),{headers:t.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))}))]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=c.call(n)).done)&&(i.push(o.value),i.length!==t);u=!0);}catch(e){l=!0,r=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=o[0],c=o[1];A.textContent=r.name,x.textContent=r.about,w.style.backgroundImage="url(".concat(r.avatar,")"),c.forEach((function(e){var t=a({name:e.name,link:e.link,likes:e.likes.length,id:e._id,ownerId:e.owner._id},u,i,J,r._id);e.likes.some((function(e){return e._id===r._id}))&&t.querySelector(".card__like-button").classList.add("card__like-button_is-active"),f.append(t)}))})).catch((function(e){console.log(e)}));var p={formSelector:".popup__form",inputSelector:".popup__input",errorMessageSelector:".popup__error",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};!function(e){Array.from(document.querySelectorAll("".concat(e.formSelector))).forEach((function(t){for(var n=Array.from(t.querySelectorAll("".concat(e.inputSelector))),o=Array.from(t.querySelectorAll("".concat(e.errorMessageSelector))),r=t.querySelector("".concat(e.submitButtonSelector)),c=function(){var t=n[a],r=o[a];t.addEventListener("input",(function(){var n,o,c,a,i;o=r,c=e.inputErrorClass,a=e.errorClass,(n=t).validity.patternMismatch?n.setCustomValidity(n.dataset.errorMessage):n.setCustomValidity(""),n.validity.valid?l(n,o,c,a):(0===n.value.length?i="Вы пропустили это поле.":n.validity.patternMismatch?i=n.dataset.errorMessage:n.value.length<n.minLength&&(i="Минимальное количество символов: 2. \n                            Длина текста сейчас: ".concat(n.value.length," символов")),function(e,t,n,o,r){e.classList.add("".concat(o)),t.classList.add("".concat(r)),t.textContent=n}(n,o,i,c,a))}))},a=0;a<n.length;a++)c();t.addEventListener("input",(function(){s(n,r,e.inactiveButtonClass)}))}))}(p);var f=document.querySelector(".places__list"),m=document.querySelectorAll(".popup"),_=document.querySelector(".popup_type_edit"),v=document.querySelector(".popup_type_new-card"),y=document.querySelector(".popup_type_image"),h=document.querySelector(".popup_type_avatar"),b=y.querySelector(".popup__caption"),S=y.querySelector(".popup__image"),g=document.querySelector(".profile__edit-button"),k=document.querySelector(".profile__add-button"),q=document.forms["edit-profile"],L=q.elements.name,C=q.elements.description,E=q.querySelectorAll(".popup__input"),j=q.querySelector(".popup__button"),A=document.querySelector(".profile__title"),x=document.querySelector(".profile__description"),w=document.querySelector(".profile__image"),P=document.forms["new-place"],O=P.querySelectorAll(".popup__input"),U=P.elements["place-name"],I=P.elements.link,T=P.querySelectorAll(".popup__error"),M=P.querySelector(".popup__button"),B=document.forms.avatar,D=B.elements.avatar,N=B.querySelector(".popup__button");function J(e){b.textContent=e.target.alt,S.src=e.target.src,S.alt=e.target.alt,n(y)}function H(e,t){t?(e.textContent="Сохранение...",e.disabled=!0):(e.textContent="Сохранить",e.disabled=!1)}g.addEventListener("click",(function(){L.value=A.textContent,C.value=x.textContent,n(_)})),k.addEventListener("click",(function(){n(v),s(E,j,p.inactiveButtonClass),M.classList.add("".concat(p.inactiveButtonClass))})),w.addEventListener("click",(function(){n(h)})),B.addEventListener("submit",(function(e){var n;e.preventDefault(),H(N,!0),(n=D.value,fetch("".concat(t.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:t.headers,body:JSON.stringify({avatar:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))}))).then((function(){w.style.backgroundImage="url(".concat(D.value,")"),D.value="",o(h)})).catch((function(e){console.log(e)})).finally((function(){H(N,!1)}))})),m.forEach((function(e){var t=e.querySelector(".popup__close");e.classList.add("popup_is-animated"),t.addEventListener("click",(function(){return o(e)})),e.addEventListener("click",c)})),q.addEventListener("submit",(function(e){e.preventDefault(),H(j,!0),fetch("".concat(t.baseUrl,"/users/me"),{method:"PATCH",headers:t.headers,body:JSON.stringify({name:L.value,about:C.value})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))})).then((function(){A.textContent=L.value,x.textContent=C.value,o(_)})).catch((function(e){console.log(e)})).finally((function(){H(j,!1)}))})),P.addEventListener("submit",(function(e){e.preventDefault();var n,r={name:U.value,link:I.value};H(M,!0),(n=r,fetch("".concat(t.baseUrl,"/cards"),{method:"POST",headers:t.headers,body:JSON.stringify({name:n.name,link:n.link})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))}))).then((function(e){console.log(e);var t={name:e.name,link:e.link,likes:e.likes.length,id:e._id,ownerId:e.owner._id},n=a(t,u,i,J,t.ownerId);f.prepend(n),o(v),function(e,t,n,o){for(var r=0;r<e.length;r++){var c=e[r],a=t[r];c.value="",a.value="",l(c,a,n,o)}}(O,T,p.inputErrorClass,p.errorClass)})).catch((function(e){console.log(e)})).finally((function(){H(M,!1)}))}))})();