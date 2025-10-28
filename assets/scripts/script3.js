async function getExerciseData() { 

    const resposta = await fetch("http://localhost:3000/treino", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const resultado = await resposta.json();
    console.log(resultado);

    let allExercises = "";
    
    resultado.forEach(element => {
      console.log(element.exercicio.nome);


      var amoutSeriesStandardJSON = element?.series_repeticoes?.nome || "0x0";
      var amoutSeriesStandard = parseInt(amoutSeriesStandardJSON.split('x')[0]);

      var recomendedSeriesJSON = element?.series_recomendadas?.valor || "0";
      var recomendedSeries = parseInt(recomendedSeriesJSON);
      console.log(amoutSeriesStandard + recomendedSeries);
      var totalSeries = amoutSeriesStandard + recomendedSeries;
      
const hoje = new Date().toISOString().split("T")[0]; // pega AAAA-MM-DD de hoje

const qtdHistoricoHoje = element?.exercicio.treino_historico.filter(h => 
  h.created_at.startsWith(hoje)
).length;
      var qtdHistorico = qtdHistoricoHoje;
      const percentage = totalSeries > 0 ? Math.round((qtdHistorico / totalSeries) * 100) : 0;
      if (qtdHistorico <= 0) {
        allExercises += '<a href="./exercicio-detalhes.html">' +
          '<div class="exerciseCard">' +
          '<div class="card" data-progress="0">' +
          '<div class="box">' +
          '<div class="percent">' +
          '<svg>' +
          '<circle cx="29" cy="29" r="29"></circle>' +
          '<circle cx="29" cy="29" r="29"></circle>' +
          '</svg>' +
          '<div class="num">' +
          `<h2>${totalSeries}</h2>` +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '<div class="exerciseInfo">' +
          `<span class="exerciseInfoTitle">${element.exercicio.nome}</span>` +
          `<span>${element.exercicio.grupos_musculares.nome}</span>` +
          '</div>' +
          '</div>' +
          '</a>';
      } else {
                allExercises += '<a href="./exercicio-detalhes.html">' +
          '<div class="exerciseCard">' +
          `<div class="card" data-progress="${percentage}">` +
          '<div class="box">' +
          '<div class="percent">' +
          '<svg>' +
          '<circle cx="29" cy="29" r="29"></circle>' +
          '<circle cx="29" cy="29" r="29"></circle>' +
          '</svg>' +
          '<div class="num">' +
          `<h2>${qtdHistorico}<span>/${totalSeries}</span></h2>` +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '<div class="exerciseInfo">' +
          `<span class="exerciseInfoTitle">${element.exercicio.nome}</span>` +
          `<span>${element.exercicio.grupos_musculares.nome}</span>` +
          '</div>' +
          '</div>' +
          '</a>';
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

function animateProgressCircles() {
document.querySelectorAll(".card").forEach(card => {
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
