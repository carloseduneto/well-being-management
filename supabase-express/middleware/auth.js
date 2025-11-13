import { autenticar, getAccessToken } from "../config/config.js";

export async function ensureAuth(req, res, next) {
  let token = getAccessToken();
  if (!token) {
    await autenticar();
    token = getAccessToken();
  }

  if (!token) {
    return res
      .status(401)
      .json({ error: "Falha ao autenticar com o Supabase" });
  }

  req.access_token = token;
  next();
}
