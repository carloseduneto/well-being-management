


const APP_ID = "68b641c4-3eb6-4336-973f-862d6eda50ac";
const db = init({ appId: APP_ID });


const MINHA_CONSULTA = {
  exercicios: {
    $: {
      limit: 50,
    },
    grupo_muscular: {},
  },
};

async function buscarExercicios() {
  try {
    // 1. Chama o método de consulta do InstantDB (exemplo de sintaxe)
    const resultado = await db.query(MINHA_CONSULTA);

    // O InstantDB geralmente retorna um objeto com a chave da sua consulta
    const exercicios = resultado.exercicios;

    console.log("Exercícios carregados:", exercicios);

    // 2. Você pode iterar sobre 'exercicios' e exibir no DOM
    const container = document.getElementById("dados-container");
    container.innerHTML = `Foram encontrados ${exercicios.length} exercícios.`;
    // ... (lógica para criar <ul> e <li>) ...
  } catch (erro) {
    console.error("Erro ao realizar a consulta:", erro);
  }
}

buscarExercicios();


/**
 * Ajusta o tamanho da fonte de um elemento para caber em uma linha dentro do seu container.
 * Usa busca binária entre maxFont e minFont para encontrar o maior font-size que caiba.
 */
(function () {
  const SELECTOR = '.exerciseTitle';
  const MAX_FONT = 24; // px - tamanho inicial desejado
  const MIN_FONT = 10; // px - menor aceitável
  const PRECISION = 0.25; // px - precisão da busca binária

  function fits(el, fontSize) {
    el.style.fontSize = fontSize + 'px';
    // scrollWidth inclui conteúdo, clientWidth é a largura visível do elemento pai se o elemento for inline-block.
    // Usamos offsetWidth do parent para comparar com scrollWidth do elemento.
    const parent = el.parentElement;
    // Se o elemento é maior que o pai visível, não cabe.
    return el.scrollWidth <= parent.clientWidth + 0.5; // pequena folga para evitar problemas de sub-pixel
  }

  function computeBestFont(el, maxFont = MAX_FONT, minFont = MIN_FONT) {
    // Se já cabe com maxFont, retorna maxFont.
    if (fits(el, maxFont)) return maxFont;

    // Se nem com minFont cabe, retorna minFont (não vamos quebrar linha).
    if (!fits(el, minFont)) return minFont;

    // Busca binária para rapidez
    let low = minFont, high = maxFont, mid;
    while ((high - low) > PRECISION) {
      mid = (low + high) / 2;
      if (fits(el, mid)) low = mid;
      else high = mid;
    }
    return Math.max(minFont, Math.round(low * 100) / 100); // arredonda a 2 casas
  }

  function adjustOne(el) {
    // assegura display e white-space
    el.style.whiteSpace = 'nowrap';
    if (getComputedStyle(el).display === 'inline') el.style.display = 'inline-block';

    // calcula e aplica
    const best = computeBestFont(el, MAX_FONT, MIN_FONT);
    el.style.fontSize = best + 'px';
  }

  // Ajusta todos os elementos na página
  function adjustAll() {
    document.querySelectorAll(SELECTOR).forEach(el => adjustOne(el));
  }

  // Observadores: resize do parent e mudanças de texto
  const resizeObserver = new ResizeObserver(entries => {
    // debounce simples por RAF
    window.requestAnimationFrame(adjustAll);
  });

  const mutationObserver = new MutationObserver(muts => {
    window.requestAnimationFrame(adjustAll);
  });

  // inicia observadores para cada parent (para detectar mudança de largura do container)
  function observeRoots() {
    document.querySelectorAll(SELECTOR).forEach(el => {
      const parent = el.parentElement;
      if (parent) resizeObserver.observe(parent);
      mutationObserver.observe(el, { characterData: true, subtree: true, childList: true });
    });
  }

  // re-observar quando DOM mudar (ex.: elementos adicionados dinamicamente)
  const bodyObserver = new MutationObserver(() => {
    // desconecta para evitar duplicação e re-observa
    resizeObserver.disconnect();
    mutationObserver.disconnect();
    observeRoots();
  });
  bodyObserver.observe(document.body, { childList: true, subtree: true });

  // rodar inicialmente e no resize da janela
  window.addEventListener('load', () => {
    observeRoots();
    adjustAll();
  });
  window.addEventListener('resize', () => window.requestAnimationFrame(adjustAll));

  // export opcional (se quiser chamar manualmente)
  window.__fitExerciseTitle = adjustAll;
})();



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

            // Se precisar recuperar o valor numérico em outro script:
            // const numericValue = Number(document.getElementById('weightInputCarga').dataset.value)
