import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, "../../../../.env");

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log(`✅ Loading .env from: ${envPath}`);
}

function required(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const config = {
  NODE_ENV: process.env.NODE_ENV ?? "development",

  BACKEND_PORT: Number(process.env.PORT) || 3000,
  BACKEND_HOST: process.env.HOST ?? "0.0.0.0",

  POSTGRES_DB: required(process.env.POSTGRES_DB, "POSTGRES_DB"),
  POSTGRES_USER: required(process.env.POSTGRES_USER, "POSTGRES_USER"),
  POSTGRES_PASSWORD: required(
    process.env.POSTGRES_PASSWORD,
    "POSTGRES_PASSWORD",
  ),
  POSTGRES_HOST: process.env.POSTGRES_HOST ?? "localhost",
  POSTGRES_PORT: Number(process.env.POSTGRES_PORT) || 5432,

  DATABASE_URL: required(process.env.DATABASE_URL, "DATABASE_URL"),
  DATABASE_URL_LOCAL: process.env.DATABASE_URL_LOCAL,
  SESSION_SECRET: required(process.env.SESSION_SECRET, "SESSION_SECRET"),
  APP_URL: required(process.env.APP_URL, "APP_URL"),
  UPLOADS_DIR: process.env.UPLOADS_DIR ?? "./uploads",
};
