import express from "express";
import { updateTreinoHistorico, getTreinoHistorico, createTreinoHistorico, deleteTreinoHistorico } from "../controllers/treinoHistorico.js";
import { ensureAuth } from "../middleware/auth.js";
const router = express.Router();

router.patch("/treino_historico/:id", ensureAuth, updateTreinoHistorico);
router.get("/treino_historico", ensureAuth, getTreinoHistorico);
router.delete("/treino_historico/:id", ensureAuth, deleteTreinoHistorico);
router.post("/treino_historico", ensureAuth, createTreinoHistorico);

export default router;
