import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";
import NodeCache from "node-cache";



dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const EMAIL = process.env.SUPABASE_EMAIL;
const PASSWORD = process.env.SUPABASE_PASSWORD;
const PORT = process.env.PORT || 3000;

import { createClient } from "@supabase/supabase-js";

const cache = new NodeCache({ stdTTL: 3600 }); // 1h (3600 segundos)
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

supabase
  .channel("treino-changes")
  .on("postgres_changes", { event: "*", schema: "public", table: "treino" }, () => {
    cache.del("treino_data");
    console.log("🌀 Cache 'treino_data' limpo por alteração no banco");
  })
  .subscribe();

  
let access_token = null;

// Função para autenticar e armazenar o token
async function autenticar() {
  const { data } = await axios.post(
    `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
    {
      email: EMAIL,
      password: PASSWORD,
    },
    {
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
      },
    }
  );

  access_token = data.access_token;
  console.log("🔑 Token obtido com sucesso");
}

// Middleware que garante que o token esteja disponível
async function ensureAuth(req, res, next) {
  if (!access_token) await autenticar();
  next();
}

// ===================== ROTAS =====================

app.get("/example", ensureAuth, async (req, res) => {
  try {
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
});


app.get("/treino", ensureAuth, async (req, res) => {
  try {
    const cacheKey = "treino_data";
    let data = cache.get(cacheKey);

    if (!data) {
      const response = await axios.get(
        `${SUPABASE_URL}/rest/v1/treino?select=id,exercicio(id,nome,grupos_musculares(nome)),categoria(nome)`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            apikey: SUPABASE_ANON_KEY,
          },
        }
      );
      data = response.data;
      cache.set(cacheKey, data);
      console.log("💾 Dados armazenados no cache");
    } else {
      console.log("⚡ Dados servidos do cache");
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post("/example", ensureAuth, async (req, res) => {
  try {
    const { data } = await axios.post(
      `${SUPABASE_URL}/rest/v1/example`,
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
});

app.patch("/example/:id", ensureAuth, async (req, res) => {
  try {
    const { data } = await axios.patch(
      `${SUPABASE_URL}/rest/v1/example?id=eq.${req.params.id}`,
      req.body,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          apikey: SUPABASE_ANON_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/example/:id", ensureAuth, async (req, res) => {
  try {
    const { data } = await axios.delete(
      `${SUPABASE_URL}/rest/v1/example?id=eq.${req.params.id}`,
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
});

// =================================================

app.listen(PORT, async () => {
  await autenticar();
  console.log(`Rodando na porta http://localhost:${PORT}`);
});
