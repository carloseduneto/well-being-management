// assets/scripts/main.js
import { fetchItems } from "./data.js";
import { loadTemplates, renderCard, renderHeader, atualizarTitulo } from "./ui.js";

async function init() {
  await loadTemplates();
  const items = await fetchItems();
  const container = document.getElementById("exercicesContainer");
  const headerContainer = document.getElementById("headerContainer");
  //  || document.body;
  renderHeader(headerContainer);
  atualizarTitulo();

  //Tomar cuidado com containers nulos se não existir no HTML, se não existir, não tenta renderizar
  if (!container) {
    console.error("❌ Container #exercicesContainer não encontrado!");
    return;
  }

  if (!headerContainer) {
    console.error("❌ Container #headerContainer não encontrado!");
    return;
  }

  items.forEach(item => renderCard(container, item));
}

init();
