import dotenv from "dotenv";
dotenv.config();

import axios from "axios";

export const SUPABASE_URL = process.env.SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
export const EMAIL = process.env.SUPABASE_EMAIL;
export const PASSWORD = process.env.SUPABASE_PASSWORD;

let access_token = null;

export async function autenticar() {
  try {
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
  } catch (err) {
    console.error("❌ Erro ao autenticar:", err.message);
  }
}

export function getAccessToken() {
  return access_token;
}
