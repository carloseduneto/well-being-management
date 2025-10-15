export default async function handler(req, res) {
  const API_KEY = process.env.INSTANTDB_API_KEY;
  const BASE_URL = "https://api.instantdb.com/v1/query";

  const query = {
    exercicios: {
      grupo_muscular: {}
    }
  };

  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(query)
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: err.message });
  }
}
