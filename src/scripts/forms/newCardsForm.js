import { postCard } from "../api.js";
import { createCard } from "../card.js";
import { closePopup } from "../modal.js";
import {
  newCardForm,
  newPlaceNameInput,
  newLinkInput,
  placesList,
} from "../constats.js";
import { handleSubmit } from "./utilsForms.js";

export function handleNewCardFormSubmit(event, callbacksObject, userId) {
  function makeRequest() {
    return postCard(newPlaceNameInput.value, newLinkInput.value).then(
      (card) => {
        const newCardElement = createCard(card, callbacksObject, userId);
        placesList.prepend(newCardElement);
        closePopup(newCardForm);
      }
    );
  }

  handleSubmit(makeRequest, event);
}
