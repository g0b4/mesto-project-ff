// @todo: Переменные
const cardTemplate = document.querySelector("#card-template").content;
export const imagePopup = document.querySelector(".popup_type_image");
import { openModal, closeModal, registerModal } from "./modal";
export const places = document.querySelector(".places__list");


export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

registerModal(imagePopup);

// @todo: Функция создания карточки
export function createCard(name, link, onDelete, handleLike, handleImageClick) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;
  cardElement.querySelector(".card__title").textContent = name;

  const deleteCardButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  deleteCardButton.addEventListener("click", onDelete);
  likeButton.addEventListener("click", handleLike); // Передаем handleLike как аргумент

  // @todo: Обработчик клика по изображению
  cardElement.querySelector(".card__image").addEventListener("click", () => {
    handleImageClick(name, link); // Передаем handleImageClick как аргумент
  });

  return cardElement;
}

// @todo: Функция лайка карточки
export function handleLike(event) {
  event.stopPropagation();
  event.target.classList.toggle("card__like-button_is-active");
}

// @todo: Функция удаления карточки
export function onDelete(event) {
  event.stopPropagation();
  event.target.closest(".card").remove();
}
