// server.js
const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

const INSTANT_DB_KEY = process.env.INSTANT_DB_KEY;

app.get("/dados", async (req, res) => {
  try {
    const response = await fetch("https://api.instantdb.com/query", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${INSTANT_DB_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: "SELECT * FROM exercicios"
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
