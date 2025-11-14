import axios from "axios";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../config/config.js";

export const updateTreino = async (req, res) => {
  try {
    const { id } = req.params;
    const { access_token } = req;

    const { data } = await axios.patch(
      `${SUPABASE_URL}/rest/v1/treino?id=eq.${id}`,
      req.body,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(data);
  } catch (err) {
    console.error("Erro no updateTreino:", err.message);
    res.status(500).json({ error: err.message });
  }
};


export const getTreino = async (req, res) => {
  try {
    const { access_token } = req;

    const { data } = await axios.get(
      `${SUPABASE_URL}/rest/v1/treino?select=*`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          apikey: SUPABASE_ANON_KEY,
        },
      }
    );

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTreino = async (req, res) => {
  try {
    const { id } = req.params;
    const { access_token } = req;
    const { data } = await axios.delete(
      `${SUPABASE_URL}/rest/v1/treino?id=eq.${id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          apikey: SUPABASE_ANON_KEY,
        },
      }
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createTreino = async (req, res) => {
  try {
    const { access_token } = req;
    const { data } = await axios.post(
      `${SUPABASE_URL}/rest/v1/treino`,
      req.body,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          apikey: SUPABASE_ANON_KEY,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
      }
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//TODO : Separar o getTreinos de getHistoricoTreinos, para que essa função fique apenas com a lógica de buscar os treinos e não o histórico, e tenha uma  função que mapeie o histórico dentro dos treinos no front-end para evitar chamadas desnecessárias :)

export const getAllTreinos = async (req, res) => {
  try {
    const { access_token } = req;

    const [treinoRes, historicoRes] = await Promise.all([
      axios.get(
        `${SUPABASE_URL}/rest/v1/treino?select=id,order,exercicio(id,nome,grupos_musculares(nome)),categoria(id,nome,image),series_repeticoes(nome),series_recomendadas(nome,valor)&order=order.asc`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            apikey: SUPABASE_ANON_KEY,
          },
        }
      ),
      axios.get(
        `${SUPABASE_URL}/rest/v1/treino_historico?select=exercicio,carga,repeticoes,rpe,rir,created_at`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            apikey: SUPABASE_ANON_KEY,
          },
        }
      ),
    ]);

    // Agrupa historicos dentro dos respectivos exercícios
    const treinoComHistorico = treinoRes.data.map((t) => ({
      ...t,
      exercicio: {
        ...t.exercicio,
        treino_historico: historicoRes.data.filter(
          (h) => h.exercicio === t.exercicio.id
        ),
      },
    }));

    res.json(treinoComHistorico);
  } catch (err) {
    console.error("Erro no getAllTreinos:", err.message);
    res.status(500).json({ error: err.message });
  }
};
