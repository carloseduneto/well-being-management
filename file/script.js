


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