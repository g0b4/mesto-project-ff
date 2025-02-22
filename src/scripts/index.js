import "../pages/index.css";
import { initialCards } from "./cards";
import { registerModal, openModal, closeModal } from "./modal";

// @todo: Переменные
const cardTemplate = document.querySelector("#card-template").content;
const places = document.querySelector(".places__list");
const imagePopup = document.querySelector(".popup_type_image");
const editPopup = document.querySelector(".popup_type_edit");

registerModal(
  document.querySelector(".profile__add-button"),
  document.querySelector(".popup_type_new-card")
);
registerModal(
  document.querySelector(".profile__edit-button"),
  document.querySelector(".popup_type_edit")
);

// @todo: Функция создания карточки
function addCard(name, link) {
  initialCards.push({ name, link });
  renderCards();
}

function createCard(name, link, onDelete) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  cardElement.querySelector(".card__title").textContent = name;
  const deleteCardButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  deleteCardButton.addEventListener("click", onDelete);
  likeButton.addEventListener("click", handleLike);
  cardElement.addEventListener("click", () => {
    openModal(imagePopup);
    imagePopup.querySelector(".popup__image").setAttribute("src", link);
    imagePopup.querySelector(".popup__image").setAttribute("alt", name);
    imagePopup.querySelector(".popup__caption").textContent = name;
  });
  imagePopup
    .querySelector(".popup__close")
    .addEventListener("click", () => closeModal(imagePopup));
  imagePopup.addEventListener("click", (evt) => {
    if (evt.target === imagePopup) closeModal(imagePopup);
  });
  return cardElement;
}

// @todo: Функция изменения профиля

let name = "Жак-Ив Кусто";
let job = "Исследователь океана";
const formElement = document.querySelector(".popup__form");
const nameDisplay = document.querySelector(".profile__title");
const nameInput = document.querySelector(".popup__input_type_name");
const jobDisplay = document.querySelector(".profile__description");
const jobInput = document.querySelector(".popup__input_type_description");
const editorButton = document.querySelector(".profile__edit-button");
function updateContent() {
  nameDisplay.textContent = name;
  nameInput.value = name;
  jobDisplay.textContent = job;
  jobInput.value = job;
}
function updateJob(newJob) {
  job = newJob;
}
function updateName(newName) {
  name = newName;
}
editorButton.addEventListener("click", () => {
  openModal(editPopup);
  updateContent();
});
function handleFormSubmit(evt) {
  evt.preventDefault();
  updateName(nameInput.value);
  updateJob(jobInput.value);
  updateContent();
  closeModal(editPopup);
}
formElement.addEventListener("submit", handleFormSubmit);

// @todo: Функция добавления карточки пользователем

const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardForm = addCardPopup.querySelector(".popup__form");
const cardNameInput = addCardPopup.querySelector(".popup__input_type_card-name");
const cardLinkInput = addCardPopup.querySelector(".popup__input_type_url");

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;
  const newCard = createCard(cardName, cardLink, onDelete);
  places.prepend(newCard);
  addCardForm.reset();
  closeModal(addCardPopup);
}

addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// @todo: Функция лайка карточки
function handleLike(event) {
  event.stopPropagation();
  if (event.target.classList.contains("card__like-button_is-active")) {
    event.target.classList.remove("card__like-button_is-active");
  } else {
    event.target.classList.add("card__like-button_is-active");
  }
}

// @todo: Функция удаления карточки
function onDelete(event) {
  event.stopPropagation();
  event.target.closest(".card").remove();
}

// @todo: Вывести карточки на страницу
function renderCards() {
  initialCards.forEach((cardData, index) => {
    const cardElement = createCard(cardData.name, cardData.link, onDelete);
    places.appendChild(cardElement);
  });
}

renderCards();
