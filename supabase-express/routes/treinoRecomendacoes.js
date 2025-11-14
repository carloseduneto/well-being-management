import express from "express";
import { updateRecomendacoes, getRecomendacoes, createRecomendacoes, deleteRecomendacoes } from "../controllers/treinoRecomendacoes.js";
import { ensureAuth } from "../middleware/auth.js";
const router = express.Router();

router.patch("/treino_recomendacoes/:id", ensureAuth, updateRecomendacoes);
router.get("/treino_recomendacoes", ensureAuth, getRecomendacoes);
router.delete("/treino_recomendacoes/:id", ensureAuth, deleteRecomendacoes);
router.post("/treino_recomendacoes", ensureAuth, createRecomendacoes);

export default router;
