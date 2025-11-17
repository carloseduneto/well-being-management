// ============================================
// 🔥 CONFIGURAÇÃO
// ============================================
const CACHE_KEY = "exerciseHistoryCache";
const CACHE_TIME_KEY = "exerciseHistoryCacheTime";
const CACHE_DURATION = 60 * 60 * 1000; // 60 minutos em ms

// Cache em memória (mais rápido)
let exerciseHistoryCache = null;
let exerciseHistoryCacheTime = null;

// ============================================
// 🔧 Funções auxiliares (localStorage)
// ============================================
function loadCache() {
  const data = localStorage.getItem(CACHE_KEY);
  const time = localStorage.getItem(CACHE_TIME_KEY);

  exerciseHistoryCache = data ? JSON.parse(data) : null;
  exerciseHistoryCacheTime = time ? Number(time) : null;
}

function saveCache(data) {
  exerciseHistoryCache = data;
  exerciseHistoryCacheTime = Date.now();

  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  localStorage.setItem(CACHE_TIME_KEY, String(exerciseHistoryCacheTime));
}

function isCacheValid() {
  if (!exerciseHistoryCache || !exerciseHistoryCacheTime) return false;

  const now = Date.now();
  return now - exerciseHistoryCacheTime < CACHE_DURATION;
}

// Carrega cache salvo na inicialização
loadCache();

// ========================================================
// 🔥 Função principal (usa cache com expiração de 60min)
// ========================================================
export async function getExerciseHistoryDataFetch() {
  // Se o cache existe e ainda está válido → usa
  if (isCacheValid()) {
    return exerciseHistoryCache;
  }

  // Se expirou → atualiza
  return await refreshExerciseHistoryData();
}

// ========================================================
// 🔄 Atualização manual (força consulta ao backend)
// ========================================================
export async function refreshExerciseHistoryData() {
  const resposta = await fetch("http://localhost:3000/treino_historico", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await resposta.json();

  // salva no cache
  saveCache(data);

  return data;
}
