import express from "express";
import { updateExample } from "../controllers/exemplo.js";
import { ensureAuth } from "../middleware/auth.js";
const router = express.Router();

router.patch("/example/:id", ensureAuth, updateExample);

export default router;
