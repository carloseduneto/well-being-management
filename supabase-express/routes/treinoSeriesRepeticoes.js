import express from "express";
import { updateSeriesRepeticoes, getSeriesRepeticoes, createSeriesRepeticoes, deleteSeriesRepeticoes } from "../controllers/treinoSeriesRepeticoes.js";
import { ensureAuth } from "../middleware/auth.js";
const router = express.Router();

router.patch("/series_repeticoes/:id", ensureAuth, updateSeriesRepeticoes);
router.get("/series_repeticoes", ensureAuth, getSeriesRepeticoes);
router.delete("/series_repeticoes/:id", ensureAuth, deleteSeriesRepeticoes);
router.post("/series_repeticoes", ensureAuth, createSeriesRepeticoes);

export default router;
