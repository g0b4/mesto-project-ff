const cardTemplate = document.querySelector("#card-template").content;
const imagePopup = document.querySelector(".popup_type_image");
const places = document.querySelector(".places__list");

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
    }
];

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
