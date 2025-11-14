import axios from "axios";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../config/config.js";

export const updateRecomendacoes = async (req, res) => {
  try {
    const { id } = req.params;
    const { access_token } = req;

    const { data } = await axios.patch(
      `${SUPABASE_URL}/rest/v1/treino_recomendacoes?id=eq.${id}`,
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
    console.error("Erro no updateRecomendacoes:", err.message);
    res.status(500).json({ error: err.message });
  }
};


export const getRecomendacoes = async (req, res) => {
  try {
    const { access_token } = req;

    const { data } = await axios.get(
      `${SUPABASE_URL}/rest/v1/treino_recomendacoes?select=*`,
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

export const deleteRecomendacoes = async (req, res) => {
  try {
    const { id } = req.params;
    const { access_token } = req;
    const { data } = await axios.delete(
      `${SUPABASE_URL}/rest/v1/treino_recomendacoes?id=eq.${id}`,
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

export const createRecomendacoes = async (req, res) => {
  try {
    const { access_token } = req;
    const { data } = await axios.post(
      `${SUPABASE_URL}/rest/v1/treino_recomendacoes`,
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
