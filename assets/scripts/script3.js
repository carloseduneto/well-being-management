async function getExerciseData() {
  const resposta = await fetch("http://localhost:3000/treino", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const resultado = await resposta.json();
  console.log(resultado);

  let allExercises = "";

  resultado.forEach((element) => {
    console.log(element.exercicio.nome);

    var amoutSeriesStandardJSON = element?.series_repeticoes?.nome || "0x0";
    var amoutSeriesStandard = parseInt(amoutSeriesStandardJSON.split("x")[0]);

    var recomendedSeriesJSON = element?.series_recomendadas?.valor || "0";
    var recomendedSeries = parseInt(recomendedSeriesJSON);
    console.log(amoutSeriesStandard + recomendedSeries);
    var totalSeries = amoutSeriesStandard + recomendedSeries;

    const hoje = new Date().toISOString().split("T")[0]; // pega AAAA-MM-DD de hoje

    const qtdHistoricoHoje = element?.exercicio.treino_historico.filter((h) =>
      h.created_at.startsWith(hoje)
    ).length;
    var qtdHistorico = qtdHistoricoHoje;
    const percentage =
      totalSeries > 0 ? Math.round((qtdHistorico / totalSeries) * 100) : 0;
    if (qtdHistorico <= 0) {
      allExercises +=
        '<a href="./exercicio-detalhes.html">' +
        '<div class="exerciseCard">' +
        '<div class="card" data-progress="0">' +
        '<div class="box">' +
        '<div class="percent">' +
        "<svg>" +
        '<circle cx="29" cy="29" r="29"></circle>' +
        '<circle cx="29" cy="29" r="29"></circle>' +
        "</svg>" +
        '<div class="num">' +
        `<h2>${totalSeries}</h2>` +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div class="exerciseInfo">' +
        `<span class="exerciseInfoTitle">${element.exercicio.nome}</span>` +
        `<span>${element.exercicio.grupos_musculares.nome}</span>` +
        "</div>" +
        "</div>" +
        "</a>";
    } else {
      allExercises +=
        '<a href="./exercicio-detalhes.html">' +
        '<div class="exerciseCard">' +
        `<div class="card" data-progress="${percentage}">` +
        '<div class="box">' +
        '<div class="percent">' +
        "<svg>" +
        '<circle cx="29" cy="29" r="29"></circle>' +
        '<circle cx="29" cy="29" r="29"></circle>' +
        "</svg>" +
        '<div class="num">' +
        `<h2>${qtdHistorico}<span>/${totalSeries}</span></h2>` +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div class="exerciseInfo">' +
        `<span class="exerciseInfoTitle">${element.exercicio.nome}</span>` +
        `<span>${element.exercicio.grupos_musculares.nome}</span>` +
        "</div>" +
        "</div>" +
        "</a>";
    }
  });

  const exerciseID = document.getElementById("exerciseData");
  exerciseID.innerHTML = allExercises;
  console.log("Teste");
  setTimeout(() => {
    console.log("Waited for 3 seconds");
    animateProgressCircles();
  }, 250); // Delay of 3000 milliseconds (3 seconds)
}
getExerciseData();

async function getExerciseData2() {
  const resposta = await fetch("http://localhost:3000/treino", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const exerciseDataGlobal = await resposta.json();
  console.log("exerciseDataGlobal:");
  console.log(exerciseDataGlobal);
  return exerciseDataGlobal;
}

// async function init() {
//   const exerciseDataGlobal = await getExerciseData2();
//   console.log("exerciseDataGlobal in init():");
//   console.log(exerciseDataGlobal);
// }

// init();

getExerciseData2().then((exerciseDataGlobal) => {
  console.log("exerciseDataGlobal in then():");

  let allCategoriesCards = document.getElementById("allCategoriesCards");
  
  const categoriasUnicas = [
    ...new Map(
      exerciseDataGlobal.map((exercise) => [
        exercise.categoria.nome,
        {
          id: exercise.categoria.id,
          nome: exercise.categoria.nome,
          image: exercise.categoria.image,
        },
      ])
    ).values(),
  ];

  categoriasUnicas.forEach((categoria) => {
    allCategoriesCards.innerHTML +=
      '<div class="categoryContainer">' +
      `<div class="categoryCard"  onclick="irPara('treino') value='${categoria.id}' " style='background-image: url("${categoria.image}");'>` +
      `<span class="categoryTitle">${categoria.nome}</span>` +
      "</div>" +
      "</div>"; 
  });

  console.log(categoriasUnicas);

  // console.log(exerciseDataGlobal.id);
});

function animateProgressCircles() {
  document.querySelectorAll(".card").forEach((card) => {
    const circle = card.querySelector("circle:nth-child(2)");
    const progress = card.dataset.progress;
    if (progress != 0) {
      const dashoffset = 180 - (180 * progress) / 100;

      // força o início da animação (0%)
      circle.style.strokeDashoffset = 180;
      requestAnimationFrame(() => {
        circle.style.strokeDashoffset = dashoffset;
      });
    } else {
      circle.style.stroke = "#E3E3E3";
    }
  });
}

animateProgressCircles();

// const DUR = 560;
// let historico = ["home"];

// function irPara(destino, efeito = "slide") {
//   const telaAtual = historico[historico.length - 1];
//   if (destino === telaAtual) return;

//   const atual = document.getElementById(`tela-${telaAtual}`);
//   const proxima = document.getElementById(`tela-${destino}`);
//   if (!proxima) {
//     console.warn(`Tela '${destino}' não encontrada!`);
//     return;
//   }

//   // Atualiza o histórico do navegador
//   history.pushState({ tela: destino, efeito }, "", `#${destino}`);

//   if (efeito === "dissolve") {
//     historico.push(destino);
//     animarDissolve(atual, proxima);
//     return;
//   }

//   const indiceDestino = historico.indexOf(destino);
//   const indoParaFrente = indiceDestino === -1;

//   if (indoParaFrente) {
//     historico.push(destino);
//     animarTransicao(atual, proxima, "esquerda");
//   } else {
//     historico = historico.slice(0, indiceDestino + 1);
//     animarTransicao(atual, proxima, "direita");
//   }
// }

// function voltar() {
//   if (historico.length < 2) return;
//   const atual = historico.pop();
//   const anterior = historico[historico.length - 1];
//   history.pushState({ tela: anterior }, "", `#${anterior}`);
//   animarTransicao(
//     document.getElementById(`tela-${atual}`),
//     document.getElementById(`tela-${anterior}`),
//     "direita"
//   );
// }

// // 🔹 Slide animation
// function animarTransicao(saindo, entrando, direcao) {
//   const paraEsquerda = direcao === "esquerda";
//   saindo.style.transition = "none";
//   saindo.style.transform = "translateX(0)";
//   entrando.style.transition = "none";
//   entrando.style.transform = paraEsquerda
//     ? "translateX(100%)"
//     : "translateX(-100%)";
//   entrando.classList.add("active");
//   entrando.getBoundingClientRect();

//   requestAnimationFrame(() => {
//     saindo.style.transition = `transform ${DUR}ms cubic-bezier(.22,.9,.33,1)`;
//     entrando.style.transition = `transform ${DUR}ms cubic-bezier(.22,.9,.33,1)`;
//     saindo.style.transform = paraEsquerda
//       ? "translateX(-100%)"
//       : "translateX(100%)";
//     entrando.style.transform = "translateX(0)";
//   });

//   setTimeout(() => {
//     saindo.classList.remove("active");
//     saindo.style.transition = "";
//     saindo.style.transform = "";
//     entrando.style.transition = "";
//     entrando.style.transform = "";
//   }, DUR + 30);
// }

// // 🔹 Dissolve animation
// function animarDissolve(saindo, entrando) {
//   entrando.style.transition = "none";
//   entrando.style.opacity = 0;
//   entrando.classList.add("active");

//   requestAnimationFrame(() => {
//     saindo.style.transition = `opacity ${DUR}ms ease`;
//     entrando.style.transition = `opacity ${DUR}ms ease`;
//     saindo.style.opacity = 0;
//     entrando.style.opacity = 1;
//   });

//   setTimeout(() => {
//     saindo.classList.remove("active");
//     saindo.style.transition = "";
//     saindo.style.opacity = "";
//     entrando.style.transition = "";
//     entrando.style.opacity = "";
//   }, DUR + 30);
// }

// // 🔹 Suporte ao botão físico de voltar (mobile / navegador)
// window.addEventListener("popstate", (event) => {
//   if (event.state && event.state.tela) {
//     const destino = event.state.tela;
//     const efeito = event.state.efeito || "slide";
//     const telaAtual = historico[historico.length - 1];
//     const indiceDestino = historico.indexOf(destino);

//     if (indiceDestino === -1) {
//       historico.push(destino);
//       efeito === "dissolve"
//         ? animarDissolve(
//             document.getElementById(`tela-${telaAtual}`),
//             document.getElementById(`tela-${destino}`)
//           )
//         : animarTransicao(
//             document.getElementById(`tela-${telaAtual}`),
//             document.getElementById(`tela-${destino}`),
//             "esquerda"
//           );
//     } else if (indiceDestino < historico.length - 1) {
//       const atual = historico.pop();
//       efeito === "dissolve"
//         ? animarDissolve(
//             document.getElementById(`tela-${atual}`),
//             document.getElementById(`tela-${destino}`)
//           )
//         : animarTransicao(
//             document.getElementById(`tela-${atual}`),
//             document.getElementById(`tela-${destino}`),
//             "direita"
//           );
//     }
//   } else {
//     irPara("home");
//   }
// });

// // Estado inicial
// history.replaceState({ tela: "home" }, "", "#home");

function generateCategories() {
  console.log("Generating categories...");
  console.log(exerciseDataGlobal);
}

generateCategories();
