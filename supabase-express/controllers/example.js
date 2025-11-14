import axios from "axios";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../config/config.js";

export const updateExample = async (req, res) => {
  try {
    const { id } = req.params;
    const { access_token } = req;

    const { data } = await axios.patch(
      `${SUPABASE_URL}/rest/v1/example?id=eq.${id}`,
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
    console.error("Erro no updateExample:", err.message);
    res.status(500).json({ error: err.message });
  }
};


export const getExample = async (req, res) => {
  try {
    const { access_token } = req;

    const { data } = await axios.get(
      `${SUPABASE_URL}/rest/v1/example?select=*`,
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

