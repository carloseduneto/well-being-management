 function mascaraKg() {
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

mascaraKg();  

