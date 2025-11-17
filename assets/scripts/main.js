// assets/scripts/main.js
import { fetchItems } from "./data.js";
import {
  loadTemplates,
  renderCard,
  renderHeader,
  atualizarTitulo,
} from "./ui.js";
import {
  getExerciseDataFetch,
  refreshExerciseData,
} from "./fetchdataexercises.js";
import {
  getExerciseHistoryDataFetch,
  refreshExerciseHistoryData,
} from "./fetchdatahistory.js";

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

  items.forEach((item) => renderCard(container, item));
}

init();

console.log("Dados de exercícios carregados:");
console.log("WWWWWW ");
const dados = await getExerciseDataFetch();
console.log(dados);
const dados2 = await getExerciseHistoryDataFetch();
console.log(dados2);

const treinoComHistorico = dados.map((item) => {
  const exercicioId = item.exercicio.id;

  // Filtra tudo do histórico que pertence a este exercício
  const historicoExercicio = dados2.filter((h) => h.exercicio === exercicioId);

  return {
    ...item,
    historico_exercicio: historicoExercicio,
  };
});
console.log("Treino com histórico:");
console.log(treinoComHistorico);


// Exemplo de como forçar atualização dos dados (ignora cache)
window.atualizarHistorico = function () {
  refreshExerciseHistoryData().then((dadosAtualizados) => {
    console.log("Dados de histórico atualizados:");
    console.log(dadosAtualizados);
  });
};

