// assets/scripts/ui.js
let cardTemplate = null;
let headerTemplate = null;

export async function loadTemplates() {
  if (cardTemplate && headerTemplate) return; // cache
  const resp = await fetch("./assets/components/card.html");
  const text = await resp.text();
  const tempContainer = document.createElement("div");
  tempContainer.innerHTML = text;
  cardTemplate = tempContainer.querySelector("#card-template");

  const headerResp = await fetch("./assets/components/header_footer.html");
  const headerText = await headerResp.text();
  const headerTempContainer = document.createElement("div");
  headerTempContainer.innerHTML = headerText;
  headerTemplate = headerTempContainer.querySelector("#header-template");
}

export function renderHeader(container) {
  console.log("Renderizando header...");
  const clone = headerTemplate.content.cloneNode(true);
  container.appendChild(clone);
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

export function atualizarTitulo() {
  const telaAtual = historico[historico.length - 1];
  const atual = document.getElementById(`tela-${telaAtual}`);
  // 🔹 Atualiza o título automaticamente
  const titleScreen = document.getElementById("titleScreen");
  const novoTitulo = atual.getAttribute("name");
  if (titleScreen) {
    titleScreen.textContent = novoTitulo;
  }
}


export function mascaraKg() {
  const input = document.getElementById("weightInputCarga");
  const formatter = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  // Converte entrada "bruta" em número (ponto decimal internamente)
  function parseNumberRaw(raw) {
    if (!raw) return "";
    const cleaned = String(raw).replace(/[^\d,.\-]/g, "").replace(",", ".");
    const n = Number(cleaned);
    return isNaN(n) ? "" : n;
  }

  // Atualiza exibição: "12,5 kg" com formatação PT-BR, mantém valor numérico em dataset
  function updateDisplay(value) {
    if (value === "" || value == null) {
      input.value = "";
      input.dataset.value = "";
      return;
    }
    const num = Number(value);
    input.value = formatter.format(num) + " kg";
    input.dataset.value = String(num);
  }

  // Enquanto digita, permite só números, vírgula/ponto e sinal, mostra versão "crua" (sem 'kg')
  input.addEventListener("input", () => {
    const raw = input.value;
    const parsed = parseNumberRaw(raw);
    // Mostra o texto cru para facilitar edição (substitui por vírgula se veio com ponto)
    if (parsed === "") {
      input.value = raw.replace(/[^\d,.\-]/g, "");
      input.dataset.value = "";
    } else {
      // exibe sem sufixo enquanto o usuário digita
      const display = String(raw).replace(/[^\d,.\-]/g, "").replace(".", ",");
      input.value = display;
      input.dataset.value = String(parsed);
    }
  });

  // Ao perder foco, formata e adiciona " kg"
  input.addEventListener("blur", () => {
    const parsed = input.dataset.value || parseNumberRaw(input.value);
    if (parsed === "") {
      updateDisplay("");
    } else {
      updateDisplay(parsed);
    }
  });

  // Ao focar, remove o sufixo para facilitar edição
  input.addEventListener("focus", () => {
    const raw = input.dataset.value || "";
    input.value = raw === "" ? "" : String(raw).replace(".", ",");
  });
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
