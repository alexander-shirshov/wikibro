import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, "../../../../.env");

if (!fs.existsSync(envPath)) {
  console.error(`❌ .env file not found at: ${envPath}`);
  console.log(`📁 Current __dirname: ${__dirname}`);
  process.exit(1);
}

console.log(`✅ Loading .env from: ${envPath}`);

dotenv.config({
  path: envPath,
});

function required(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const config = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: Number(process.env.PORT) || 3000,
  HOST: process.env.HOST ?? "0.0.0.0",

  DATABASE_URL: required(process.env.DATABASE_URL, "DATABASE_URL"),
  SESSION_SECRET: required(process.env.SESSION_SECRET, "SESSION_SECRET"),
  APP_URL: required(process.env.APP_URL, "APP_URL"),
  UPLOADS_DIR: process.env.UPLOADS_DIR ?? "./uploads",
};
