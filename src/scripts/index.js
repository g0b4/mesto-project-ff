import "../pages/index.css";
import {
  handleOverlayClick,
  openPopup,
  handleCloseButtonClick,
} from "./modal.js";
import { createCard, handleLikes } from "./card.js";
import {
  popupsArray,
  placesList,
  editForm,
  editFormElement,
  profileEditButton,
  userNameElement,
  userJobElement,
  newCardForm,
  profileAddButton,
  avatarForm,
  avatarImage,
  deleteCardForm,
} from "./constats.js";
import { validation, clearValidation, validationConfig } from "./validation.js";
import { getCards, getUser } from "./api.js";
import { handleCardDelete, openPopupDelete } from "./forms/deleteForm.js";
import { handleAvatarFormSubmit } from "./forms/avatarForm.js";
import { handleNewCardFormSubmit } from "./forms/newCardsForm.js";
import {
  handleFormSubmit,
  setInitialEditProfileFormValues,
} from "./forms/editForm.js";

// Инициализация валидации
validation(validationConfig);

function openImagePopup(cardImg, popupImage, popupImageCaption, popupType) {
  popupImage.src = cardImg.src;
  popupImage.alt = cardImg.alt;
  popupImageCaption.textContent = cardImg.alt;
  openPopup(popupType);
}

const callbacksObject = {
  deleteCardCallback: openPopupDelete,
  openImageCallback: openImagePopup,
  handleLikesCallback: handleLikes,
};

// Обработчик открытия попапа редактирования профиля
profileEditButton.addEventListener("click", () => {
  clearValidation(editFormElement, validationConfig);
  setInitialEditProfileFormValues();
  openPopup(editForm);
});

// Обработчик открытия попапа добавления новой карточки
profileAddButton.addEventListener("click", () => {
  clearValidation(newCardForm, validationConfig);
  openPopup(newCardForm);
});

// Обработчик открытия попапа обновления аватара
avatarImage.addEventListener("click", () => {
  clearValidation(avatarForm, validationConfig);
  openPopup(avatarForm);
});

// Добавление обработчиков закрытия попапов
popupsArray.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  popup.addEventListener("click", handleOverlayClick);
  closeButton.addEventListener("click", handleCloseButtonClick);
});

// Инициализация данных пользователя
let userId = "";
function setUserInfo(user) {
  userNameElement.textContent = user.name;
  userJobElement.textContent = user.about;
  avatarImage.setAttribute("style", `background-image: url('${user.avatar}')`);
  userId = user._id;
}

// Функция для отрисовки карточек
export function renderCards(cards, callbacksObject, userId) {
  placesList.innerHTML = "";
  cards.forEach((card) => {
    const cardElement = createCard(card, callbacksObject, userId);
    placesList.appendChild(cardElement);
  });
}

// Обработчики отправки форм
editForm.addEventListener("submit", handleFormSubmit);
newCardForm.addEventListener("submit", (event) => {
  handleNewCardFormSubmit(event, callbacksObject, userId);
});
avatarForm.addEventListener("submit", handleAvatarFormSubmit);
deleteCardForm.addEventListener("submit", handleCardDelete);

// Загрузка данных пользователя и карточек
Promise.all([getUser(), getCards()])
  .then(([user, cards]) => {
    setUserInfo(user);
    renderCards(cards, callbacksObject, user._id);
  })
  .catch((err) => {
    console.error("Ошибка при загрузке данных:", err);
  });