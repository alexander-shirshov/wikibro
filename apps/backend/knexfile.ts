import knex, { Knex } from "knex";
import { config } from "./src/config/env.js";

const knexConfig: Knex.Config = {
  client: "pg",
  connection: config.DATABASE_URL_LOCAL ?? config.DATABASE_URL,
  debug: config.NODE_ENV === "development",

  pool: {
    min: 2,
    max: 10,
  },

  migrations: {
    tableName: "knex_migrations",
    directory: "./src/db/migrations",
    extension: "ts",
  },

  seeds: {
    directory: "./src/db/seeds",
    extension: "ts",
  },
};

export default knexConfig;
