//@todo: Импорта
import "../pages/index.css";
import {
  initialCards,
  createCard,
  onDelete,
  places,
  handleLike,
  imagePopup,
} from "./cards";
import { registerModal, openModal, closeModal } from "./modal";

// @todo: Переменные
const editPopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");

// @todo: Регистрируем модальные окна
registerModal(editPopup);
registerModal(addCardPopup);

// @todo: Обработчики для кнопок открытия модальных окон
document.querySelector(".profile__add-button").addEventListener("click", () => {
  openModal(addCardPopup);
});

function handleImageClick(name, link) {
  imagePopup.querySelector(".popup__image").setAttribute("src", link);
  imagePopup.querySelector(".popup__image").setAttribute("alt", name);
  imagePopup.querySelector(".popup__caption").textContent = name;
  openModal(imagePopup);
}

// @todo: Функция изменения профиля

const formElement = document.querySelector(".popup_type_edit");
const nameDisplay = document.querySelector(".profile__title");
const nameInput = document.querySelector(".popup__input_type_name");
const jobDisplay = document.querySelector(".profile__description");
const jobInput = document.querySelector(".popup__input_type_description");
const editorButton = document.querySelector(".profile__edit-button");

function updateProfileContent(name, job) {
  nameDisplay.textContent = name;
  jobDisplay.textContent = job;
}

editorButton.addEventListener("click", () => {
  nameInput.value = nameDisplay.textContent;
  jobInput.value = jobDisplay.textContent;
  openModal(editPopup);
});

function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  updateProfileContent(nameInput.value, jobInput.value);
  closeModal(editPopup);
}
formElement.addEventListener("submit", handleFormSubmitEdit);

// @todo: Функция добавления карточки пользователем

const addCardForm = addCardPopup.querySelector(".popup__form");
const cardNameInput = addCardPopup.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInput = addCardPopup.querySelector(".popup__input_type_url");

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;
  const newCard = createCard(
    cardName,
    cardLink,
    onDelete,
    handleLike,
    handleImageClick
  );
  places.prepend(newCard);
  addCardForm.reset();
  closeModal(addCardPopup);
}

addCardForm.addEventListener("submit", handleAddCardFormSubmit);

//@todo: Рендер карточек

function renderCards() {
  initialCards.forEach((cardData) => {
    const cardElement = createCard(
      cardData.name,
      cardData.link,
      onDelete,
      handleLike,
      handleImageClick
    );
    places.appendChild(cardElement);
  });
}

renderCards();
