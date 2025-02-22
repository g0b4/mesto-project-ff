// @todo: Попап

let currentPopup;

export function registerModal(popup) {
  popup
    .querySelector(".popup__close")
    .addEventListener("click", () => closeModal(popup));

  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) closeModal(popup);
  });
}

export function openModal(popup) {
  currentPopup = popup;
  popup.classList.add("popup_is-opened", "popup_is-animated");
  document.body.addEventListener("keyup", registerModalEscape);
}

function registerModalEscape(evt) {
  if (evt.key === "Escape") closeModal(currentPopup);
}

export function closeModal(popup) {
  currentPopup = null;
  popup.classList.remove("popup_is-opened");
  document.body.removeEventListener("keyup", registerModalEscape);
}
