// assets/scripts/main.js
import { fetchItems } from "./data.js";
import { loadTemplates, renderCard } from "./ui.js";

async function init() {
  await loadTemplates();
  const items = await fetchItems();
  const container =
    document.getElementById("exercicesContainer");
    //  || document.body;
  if (!container) {
    console.error("❌ Container #exercicesContainer não encontrado!");
    return;
  }
  items.forEach((item) => renderCard(container, item));
}

init();
