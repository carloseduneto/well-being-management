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
  // pegamos a raiz do card dentro do fragment antes de anexar ao DOM
  const cardEl = clone.querySelector(".card") || clone.firstElementChild;
  const actionButton = cardEl.querySelector(".card__action");
  const resultEl = cardEl.querySelector(".card__result");
  actionButton.addEventListener("click", () => {
    resultEl.innerHTML = `<p>Ação executada no item ${item.id}!</p>`;
    console.log("Ação:", item.id);
  });
  container.appendChild(clone);
}

export function renderCard2(container, item) {
  const clone = cardTemplate.content.cloneNode(true);
  clone.querySelector(".card__title").textContent = item.title;
  clone.querySelector(".card__body").textContent = item.body;
  // exemplo: evento no botão
  const actionButton = clone.querySelector(".card__action");
  const resultEl = clone.querySelector(".card__result");
  if (actionButton && resultEl) {
    actionButton.addEventListener("click", () => {
      resultEl.textContent = "cliclado";
      console.log("Ação:", item.id);
    });
  }
  container.appendChild(clone);
}

export function renderCard3(container, item) {
  // clona o template
  const clone = cardTemplate.content.cloneNode(true);

  // busca o elemento raiz do card (flexível se mudar a estrutura)
  const cardEl = clone.querySelector(".card") || clone.firstElementChild;

  // preenche dados
  cardEl.querySelector(".card__title").textContent = item.title;
  cardEl.querySelector(".card__body").textContent = item.body;

  // busca os elementos interativos
  const actionButton = cardEl.querySelector(".card__action");
  const resultEl = cardEl.querySelector(".card__result");

  // adiciona listener, se existir
  if (actionButton && resultEl) {
    actionButton.addEventListener("click", () => {
      resultEl.textContent = `Ação executada no item ${item.id}`;
      console.log(`Ação no item: ${item.id}`);
    });
  }

  // insere no container
  container.appendChild(clone);
}
