// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const places = document.querySelector(".places__list");

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
  deleteCardButton.addEventListener("click", onDelete);
  return cardElement;
}

// @todo: Функция удаления карточки
function onDelete(event) {
  event.target.closest('.card').remove()
}

// @todo: Вывести карточки на страницу
function renderCards() {
  initialCards.forEach((cardData, index) => {
    const cardElement = createCard(cardData.name, cardData.link, onDelete)
    places.appendChild(cardElement)
  })
}

renderCards();