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
    // animateProgressCircles();
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

getExerciseData2().then((exerciseDataGlobal) => {
  console.log("exerciseDataGlobal in then():");

  let allCategoriesCards = document.getElementById("allCategoriesCards");
  let exercicesContainer = document.getElementById("exercicesContainer");

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
  ]
    // 🔹 Ordena alfabeticamente por nome (A → Z)
    .sort((a, b) =>
      a.nome.localeCompare(b.nome, "pt", { sensitivity: "base" })
    );

  categoriasUnicas.forEach((categoria) => {
    allCategoriesCards.innerHTML +=
      '<div class="categoryContainer">' +
      `<div class="categoryCard" onclick="irPara('treino', 'slide', this)" style='background-image: url("${categoria.image}");' data-category="${categoria.id}">` +
      `<span class="categoryTitle">${categoria.nome}</span>` +
      "</div>" +
      "</div>";
  });

  console.log(categoriasUnicas);
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


function obterCategoriaTreino(elemento) {
  console.log("Elemento recebido:", elemento);
  const categoria = elemento.dataset.category;
  const idName = elemento.dataset.idName;
  console.log("Categoria:", categoria, " | ID Name:", idName);
  return categoria;
}

function mudarTreino(categoria) {
  console.log("Categoria recebida em mudarTreino:", categoria);
  if (categoria != null || categoria != undefined) {
    let treinoTest = document.getElementById("treino-test");
    // treinoTest.innerHTML = `Categoria selecionada: ${categoria}<br><br><br>`;
    getExerciseData2().then((exerciseDataGlobal) => {
      exerciseDataGlobal.forEach((element) => {
        if (element.categoria.id == categoria) {
          treinoTest.innerHTML += `

                  <div class="exerciseCard">
          <div class="card" data-progress="100">
            <div class="box">
              <div class="percent">
                <svg>
                  <circle cx="29" cy="29" r="29"></circle>
                  <circle cx="29" cy="29" r="29"></circle>
                </svg>
                <div class="num">
                  <h2>4<span>/5</span></h2>
                </div>
              </div>
            </div>
          </div>
          <div class="exerciseInfo" onclick="irPara('exercicio-detalhes', 'slide', this)" data-exercise-id="${element.exercicio.id}">
            <span class="exerciseInfoTitle">${element.exercicio.nome}</span>
            <span>${element.exercicio.grupos_musculares.nome}</span>
          </div>
  
        </div>
        `;
        }
      });
    });
  }
}

mudarTreino("1");

function mudarExercicioDetalhes(exerciseId) {
  if (exerciseId != null || exerciseId != undefined) {
    let exercicioDetalhes = document.getElementById(
      "exercicio-detalhes-container"
    );
    // exercicioDetalhes.innerHTML = `Exercício selecionado no HTML: ${exerciseId}<br><br><br>`;
    getExerciseData2().then((exerciseDataGlobal) => {
      exerciseDataGlobal.forEach((element) => {
        if (element.exercicio.id == exerciseId) {
          let recomendadasHtml = "";
          if (
            element.series_recomendadas &&
            (element.series_recomendadas.nome ||
              element.series_recomendadas.valor)
          ) {
            const nomeRec = element.series_recomendadas.nome ?? "";
            const valorRec = element.series_recomendadas.valor ?? "";
            recomendadasHtml = `<span>${nomeRec}${
              nomeRec && valorRec
                ? ` (${valorRec})`
                : valorRec
                ? `(${valorRec})`
                : ""
            }</span>`;
          }

          let grupos_musculares =
            "          <p>Grupos Musculares: ${element.exercicio.grupos_musculares.nome}</p>";

          exercicioDetalhes.innerHTML = `
          <div class="exerciseDetail">
            <div class="exerciseDetailCard">
              <div class="swapExercise">
                <span class="material-symbols-rounded swapExerciseIcon">
                  arrow_back_ios
                </span>
                <span class="material-symbols-rounded swapExerciseIconRight">
                  arrow_back_ios
                </span>
              </div>
              <div class="swapExerciseDetail">
                <span class="exerciseTitle">${element.exercicio.nome}</span>

                <div class="progressExerciseDetail">
                  <div class="progressBarExerciseDetail"></div>
                  <span class="progressExerciseNumber">3/5</span>
                </div>
              </div>
            </div>
          </div>

          

          

                    <div class="contentDetails">
            <div class="recomendation">
              <span class="detalisTitleInput">Recomendações</span>
              <span class="detalisTitleInputRecomendation"
                >${recomendadasHtml}</span
              >
            </div>

            <div class="inputData">
              <label class="detalisTitleInput" for="weightInput"
                >Séries recomendadas</label
              >
              <select
                name=""
                id="recomendationSeries"
                class="inputDetails selectDetails"
              >
                <option value="" disabled selected>2x6a8</option>
                <option value="8">2x6a8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>

              <!-- Repetições e carga inputs -->
              <div class="shortInputContainer">
                <div class="inputData shortInputData">
                  <label class="detalisTitleInput" for="repetition"
                    >Repetições</label
                  >
                  <input
                    class="inputDetails"
                    type="number"
                    id="repetition"
                    placeholder=""
                  />
                </div>

                <div class="inputData shortInputData">
                  <label class="detalisTitleInput" for="weightInputCarga"
                    >Carga (kg)</label
                  >
                  <input
                    class="inputDetails weight-mask"
                    type="text"
                    id="weightInputCarga"
                    inputmode="decimal"
                    placeholder="Ex: 20"
                    aria-label="Carga em quilogramas"
                  />
                </div>
              </div>

              <div class="shortInputContainer">
                <div class="inputData shortInputData">
                  <label class="detalisTitleInput" for="repetition"
                    >Esforço (RPE)</label
                  >
                  <input
                    class="inputDetails"
                    type="number"
                    id="repetition"
                    placeholder=""
                  />
                </div>

                <div class="inputData shortInputData">
                  <label class="detalisTitleInput" for="weightInputCarga"
                    >Até a falha (RPI)</label
                  >
                  <input
                    class="inputDetails weight-mask"
                    type="text"
                    id="weightInputCarga2"
                    inputmode="decimal"
                    placeholder=""
                    aria-label="Carga em quilogramas"
                  />
                </div>
              </div>
            </div>

            <label class="detalisTitleInput" for="historico">Histórico</label>

            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Repetições</th>
                    <th>Carga (kg)</th>
                    <th>RPE</th>
                    <th>RPI</th>
                    <th>Intervalo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>10/06/2024</td>
                    <td>8</td>
                    <td>20</td>
                    <td>10</td>
                    <td>7</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td>12/06/2024</td>
                    <td>8</td>
                    <td>25</td>
                    <td>8</td>
                    <td>8</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td>14/06/2024</td>
                    <td>6</td>
                    <td>30</td>
                    <td>6</td>
                    <td>9</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>14/06/2024</td>
                    <td>6</td>
                    <td>30</td>
                    <td>6</td>
                    <td>9</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>14/06/2024</td>
                    <td>6</td>
                    <td>30</td>
                    <td>6</td>
                    <td>9</td>
                    <td>0</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <label class="detalisTitleInput" for="comentarios"
              >Comentários</label
            >
            <textarea
              class="inputDetails textAreaDetails"
              id="comentarios"
              placeholder="Escreva aqui seus comentários sobre o exercício..."
            ></textarea>

            <section class="commentsSection">
              <div class="commentsHistoryContainer">
                <div class="commentsHistory">
                  <span class="commentDate">segunda-feira - 10/06/2024</span>
                  <span class="commentText">
                    Senti que consegui aumentar a carga dessa vez, mas poderia
                    ter feito mais repetições.
                  </span>
                </div>

                <div class="commentsHistory">
                  <span class="commentDate">quarta-feira - 12/06/2024</span>
                  <span class="commentText">
                    Consegui completar todas as séries com a carga recomendada.
                    Me senti bem durante o exercício.
                  </span>
                </div>

                <div class="commentsHistory">
                  <span class="commentDate">sexta-feira - 14/06/2024</span>
                  <span class="commentText">
                    Tive dificuldade na última série, talvez precise ajustar a
                    carga para a próxima vez.
                  </span>
                </div>
              </div>

              <button class="seeMoreComments">
                <span>Ver mais comentários</span>
              </button>
            </section>

            <button class="primaryButtonAction">
              <span class="material-symbols-rounded primaryIconAction">
                check
              </span>
            </button>
          </div>




        `;
        }
      });
    });
  }
}

function irPara(destino, efeito = "slide", elemento = null) {
  // Só chama obterCategoriaTreino se um elemento foi realmente passado
  if (elemento) {
    obterCategoriaTreino(elemento);
    console.log("Elemento passado:", elemento);
    mudarTreino(obterCategoriaTreino(elemento));
    mudarExercicioDetalhes(elemento.dataset.exerciseId);
  }

  const telaAtual = historico[historico.length - 1];
  if (destino === telaAtual) return;

  const atual = document.getElementById(`tela-${telaAtual}`);
  const proxima = document.getElementById(`tela-${destino}`);
  if (!proxima) {
    console.warn(`Tela '${destino}' não encontrada!`);
    return;
  }

  // 🔹 Atualiza o título automaticamente
  const titleScreen = document.getElementById("titleScreen");
  const novoTitulo = proxima.getAttribute("name") || destino;
  if (titleScreen) titleScreen.textContent = novoTitulo;

  // Atualiza o histórico do navegador
  history.pushState({ tela: destino, efeito }, "", `#${destino}`);

  if (efeito === "dissolve") {
    historico.push(destino);
    animarDissolve(atual, proxima);
    return;
  }

  const indiceDestino = historico.indexOf(destino);
  const indoParaFrente = indiceDestino === -1;

  if (indoParaFrente) {
    historico.push(destino);
    animarTransicao(atual, proxima, "esquerda");
  } else {
    historico = historico.slice(0, indiceDestino + 1);
    animarTransicao(atual, proxima, "direita");
  }
}


