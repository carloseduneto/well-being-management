import axios from "axios";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../config.js"; // ajuste se necessário

export const updateExample = async (req, res) => {
  try {
    const { id } = req.params;

    const { data } = await axios.patch(
      `${SUPABASE_URL}/rest/v1/example?id=eq.${id}`,
      req.body,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
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
