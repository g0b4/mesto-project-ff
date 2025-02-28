import { patchUser } from "../api.js";
import { closePopup } from "../modal.js";
import {
  nameInput,
  jobInput,
  userJobElement,
  userNameElement,
} from "../constats.js";
import { handleSubmit } from "./utilsForms.js";

export function setInitialEditProfileFormValues() {
  nameInput.value = userNameElement.textContent;
  jobInput.value = userJobElement.textContent;
}

export function handleFormSubmit(evt) {
  function makeRequest() {
    const name = nameInput.value;
    const about = jobInput.value;
    return patchUser(name, about).then((dataUser) => {
      userNameElement.textContent = dataUser.name;
      userJobElement.textContent = dataUser.about;
      console.dir(name, about);
      setInitialEditProfileFormValues();
      closePopup(evt.target.closest(".popup_is-opened"));
    });
  }

  handleSubmit(makeRequest, evt);
}
