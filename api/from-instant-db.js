export default async function handler(req, res) {
  const API_KEY = process.env.INSTANTDB_API_KEY; // guarde no painel da Vercel
  const BASE_URL = "https://api.instantdb.com/v1/query";

  const query = {
    exercicios: {
      $: { limit: 50 },
      grupo_muscular: {},
    },
  };

  const resposta = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(query),
  });

  const data = await resposta.json();
  res.status(200).json(data);
}
