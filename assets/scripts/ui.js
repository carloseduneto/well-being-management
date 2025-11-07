// assets/scripts/ui.js
let cardTemplate = null;

export async function loadTemplates() {
  if (cardTemplate) return; // cache
  const resp = await fetch("/assets/components/card.html");
  const text = await resp.text();
  const tempContainer = document.createElement("div");
  tempContainer.innerHTML = text;
  cardTemplate = tempContainer.querySelector("#card-template");
}

export function renderCard(container, item) {
  const clone = cardTemplate.content.cloneNode(true);
  clone.querySelector(".card__title").textContent = item.title;
  clone.querySelector(".card__body").textContent = item.body;
  // exemplo: evento no botão
  clone.querySelector(".card__action").addEventListener("click", () => {
    console.log("Ação:", item.id);
  });
  container.appendChild(clone);
}
