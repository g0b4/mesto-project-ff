// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const places = document.querySelector(".places__list");
const cards = [...initialCards];
const addButton = document.querySelector(".profile__add-button");


// @todo: Функция создания карточки
function addCard(name, link) {
  cards.push({ name, link });
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

addButton.addEventListener("click", function () {
  const index = Math.floor(Math.random() * initialCards.length);
  const cardInfo = initialCards[index];
 addCard(cardInfo.name, cardInfo.link)
});

// @todo: Функция удаления карточки
function deleteCard(index) {
  cards.splice(index, 1);
  renderCards();
}

// @todo: Вывести карточки на страницу
function renderCards() {
  clear();
  cards.forEach((cardData, index) => {
    function onDelete(){
      deleteCard(index);
    }
    const cardElement = createCard(cardData.name,cardData.link, onDelete);
    places.appendChild(cardElement);
  });
}

function clear(){
  places.innerHTML='';
};

renderCards();