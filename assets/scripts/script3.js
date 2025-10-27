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
               ' <div class="card">'+
                  '<div class="box">'+
                    '<div class="percent">'+
                      '<svg>'+
                        '<circle cx="29" cy="29" r="29"></circle>'+
                        '<circle cx="29" cy="29" r="29"></circle>'+
                      '</svg>'+
                      '<div class="num">'+
                        '<h2>3<span>/5</span></h2>'+
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
}

getExerciseData();