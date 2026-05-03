import knex, { Knex } from "knex";
import { config } from "../config/env.js";

const knexConfig: Knex.Config = {
  client: "pg",
  connection: config.DATABASE_URL,
  debug: config.NODE_ENV === "development",

  pool: {
    min: 2,
    max: 10,
  },

  migrations: {
    tableName: "knex_migrations",
    directory: "./src/db/migrations",
  },
};

export const db = knex(knexConfig);

export async function closeDb() {
  await db.destroy();
}
