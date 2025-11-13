import express from "express";
import { updateExample, getExample } from "../controllers/example.js";
import { ensureAuth } from "../middleware/auth.js";
const router = express.Router();

router.patch("/example/:id", ensureAuth, updateExample);
router.get("/example", ensureAuth, getExample);

export default router;
