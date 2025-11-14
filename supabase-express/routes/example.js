import express from "express";
import { updateExample, getExample, createExample, deleteExample } from "../controllers/example.js";
import { ensureAuth } from "../middleware/auth.js";
const router = express.Router();

router.patch("/example/:id", ensureAuth, updateExample);
router.get("/example", ensureAuth, getExample);
router.delete("/example/:id", ensureAuth, deleteExample);
router.post("/example", ensureAuth, createExample);

export default router;
