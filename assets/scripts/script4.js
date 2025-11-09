const DUR = 560;
let historico = ["categories"];
let titleScreen = document.getElementById("titleScreen");

// Executa uma única vez quando a página carrega
function obterCategoriaTreinoOld(elemento) {
  const categoria = elemento.getAttribute("category");
  console.log("Categoria Nova:", categoria);
  return categoria;
}

function voltar() {
  if (historico.length < 2) return;
  const atual = historico.pop();
  const anterior = historico[historico.length - 1];
  history.pushState({ tela: anterior }, "", `#${anterior}`);

  const telaAnterior = document.getElementById(`tela-${anterior}`);
  const titleScreen = document.getElementById("titleScreen");

  // 🔹 Atualiza o título automaticamente
  const novoTitulo = telaAnterior?.getAttribute("name") || anterior;
  if (titleScreen) {
    titleScreen.textContent = novoTitulo;
  }

  animarTransicao(
    document.getElementById(`tela-${atual}`),
    document.getElementById(`tela-${anterior}`),
    "direita"
  );
}

// Função atualiza título
function atualizarTitulo() {
  const telaAtual = historico[historico.length - 1];
  const atual = document.getElementById(`tela-${telaAtual}`);
  // 🔹 Atualiza o título automaticamente
  const titleScreen = document.getElementById("titleScreen");
  const novoTitulo = atual.getAttribute("name");
  if (titleScreen) {
    titleScreen.textContent = novoTitulo;
  }
}

atualizarTitulo();

// 🔹 Slide animation
function animarTransicao(saindo, entrando, direcao) {
  const paraEsquerda = direcao === "esquerda";
  saindo.style.transition = "none";
  saindo.style.transform = "translateX(0)";
  entrando.style.transition = "none";
  entrando.style.transform = paraEsquerda
    ? "translateX(100%)"
    : "translateX(-100%)";
  entrando.classList.add("active");
  entrando.getBoundingClientRect();

  requestAnimationFrame(() => {
    saindo.style.transition = `transform ${DUR}ms cubic-bezier(.22,.9,.33,1)`;
    entrando.style.transition = `transform ${DUR}ms cubic-bezier(.22,.9,.33,1)`;
    saindo.style.transform = paraEsquerda
      ? "translateX(-100%)"
      : "translateX(100%)";
    entrando.style.transform = "translateX(0)";
  });

  setTimeout(() => {
    saindo.classList.remove("active");
    saindo.style.transition = "";
    saindo.style.transform = "";
    entrando.style.transition = "";
    entrando.style.transform = "";
  }, DUR + 30);
}

// 🔹 Dissolve animation
function animarDissolve(saindo, entrando) {
  entrando.style.transition = "none";
  entrando.style.opacity = 0;
  entrando.classList.add("active");

  requestAnimationFrame(() => {
    saindo.style.transition = `opacity ${DUR}ms ease-in-out`;
    entrando.style.transition = `opacity ${DUR}ms ease-in-out`;
    saindo.style.opacity = 0;
    entrando.style.opacity = 1;
  });

  setTimeout(() => {
    saindo.classList.remove("active");
    saindo.style.transition = "";
    saindo.style.opacity = "";
    entrando.style.transition = "";
    entrando.style.opacity = "";
  }, DUR + 30);
}

// 🔹 Suporte ao botão físico de voltar (mobile / navegador)
window.addEventListener("popstate", event => {
  if (event.state && event.state.tela) {
    const destino = event.state.tela;
    const efeito = event.state.efeito || "slide";
    const telaAtual = historico[historico.length - 1];
    const indiceDestino = historico.indexOf(destino);

    if (indiceDestino === -1) {
      historico.push(destino);
      efeito === "dissolve"
        ? animarDissolve(
            document.getElementById(`tela-${telaAtual}`),
            document.getElementById(`tela-${destino}`)
          )
        : animarTransicao(
            document.getElementById(`tela-${telaAtual}`),
            document.getElementById(`tela-${destino}`),
            "esquerda"
          );
    } else if (indiceDestino < historico.length - 1) {
      const atual = historico.pop();
      efeito === "dissolve"
        ? animarDissolve(
            document.getElementById(`tela-${atual}`),
            document.getElementById(`tela-${destino}`)
          )
        : animarTransicao(
            document.getElementById(`tela-${atual}`),
            document.getElementById(`tela-${destino}`),
            "direita"
          );
    }
  } else {
    irPara("categories");
  }
});

// Estado inicial
history.replaceState({ tela: "categories" }, "", "#categories");


