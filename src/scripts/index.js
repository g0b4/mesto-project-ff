import "../pages/index.css";
import { initialCards } from "./cards";
import { registerModal, openModal, closeModal } from "./modal";

// @todo: Переменные
const editPopup = document.querySelector(".popup_type_edit");

registerModal(
  document.querySelector(".profile__add-button"),
  document.querySelector(".popup_type_new-card")
);
registerModal(
  document.querySelector(".profile__edit-button"),
  document.querySelector(".popup_type_edit")
);

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
