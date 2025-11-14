import express from "express";
import { updateTreino, getTreino, createTreino, deleteTreino, getAllTreinos } from "../controllers/treino.js";
import { ensureAuth } from "../middleware/auth.js";
const router = express.Router();

router.patch("/treino/:id", ensureAuth, updateTreino);
router.get("/treino", ensureAuth, getTreino);
router.get("/treino/all", ensureAuth, getAllTreinos);
router.delete("/treino/:id", ensureAuth, deleteTreino);
router.post("/treino", ensureAuth, createTreino);

export default router;
