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
        allExercises += '<a href="./exercicio-detalhes.html">' +
              '<div class="exerciseCard">'+
               '<div class="card" data-progress="60">'+
                  '<div class="box">'+
                    '<div class="percent">'+
                      '<svg>'+
                        '<circle cx="29" cy="29" r="29"></circle>'+
                        '<circle cx="29" cy="29" r="29"></circle>'+
                      '</svg>'+
                      '<div class="num">'+
                        '<h2>5</h2>'+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '<div class="exerciseInfo">'+
                  `<span class="exerciseInfoTitle">${element.exercicio.nome}</span>`+
                  `<span>${element.exercicio.grupos_musculares.nome}</span>`+
                '</div>'+
              '</div>'+
            '</a>';
        
          });
          
          const exerciseID = document.getElementById("exerciseData");
          exerciseID.innerHTML = allExercises;    
          console.log("Teste");
          animateProgressCircles();
}
getExerciseData();

function animateProgressCircles() {
document.querySelectorAll(".card").forEach(card => {
        console.log(card); 
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
