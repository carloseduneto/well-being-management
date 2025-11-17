// ============================================
// 🔥 CONFIGURAÇÃO
// ============================================
const CACHE_KEY = "exerciseCache";
const CACHE_TIME_KEY = "exerciseCacheTime";
const CACHE_DURATION = 60 * 60 * 1000; // 60 minutos em ms

// Cache em memória (mais rápido)
let exerciseCache = null;
let exerciseCacheTime = null;

// ============================================
// 🔧 Funções auxiliares (localStorage)
// ============================================
function loadCache() {
  const data = localStorage.getItem(CACHE_KEY);
  const time = localStorage.getItem(CACHE_TIME_KEY);

  exerciseCache = data ? JSON.parse(data) : null;
  exerciseCacheTime = time ? Number(time) : null;
}

function saveCache(data) {
  exerciseCache = data;
  exerciseCacheTime = Date.now();

  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  localStorage.setItem(CACHE_TIME_KEY, String(exerciseCacheTime));
}

function isCacheValid() {
  if (!exerciseCache || !exerciseCacheTime) return false;

  const now = Date.now();
  return now - exerciseCacheTime < CACHE_DURATION;
}

// Carrega cache salvo na inicialização
loadCache();

// ========================================================
// 🔥 Função principal (usa cache com expiração de 60min)
// ========================================================
export async function getExerciseDataFetch() {
  // Se o cache existe e ainda está válido → usa
  if (isCacheValid()) {
    return exerciseCache;
  }

  // Se expirou → atualiza
  return await refreshExerciseData();
}

// ========================================================
// 🔄 Atualização manual (força consulta ao backend)
// ========================================================
export async function refreshExerciseData() {
  const resposta = await fetch("http://localhost:3000/treino/all", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await resposta.json();

  // salva no cache
  saveCache(data);

  return data;
}
