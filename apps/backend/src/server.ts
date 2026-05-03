import { buildApp } from "./app.js";
import { config } from "./config/env.js";
import { closeDb } from "./db/knex.js";

async function start() {
  const app = await buildApp();

  async function shutdown(signal: string) {
    app.log.info({ signal }, "Shutting down server");

    try {
      await app.close();
      await closeDb();

      app.log.info("Server and database connections closed");
      process.exit(0);
    } catch (err) {
      app.log.error(err, "Error during shutdown");
      process.exit(1);
    }
  }

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));

  try {
    await app.listen({
      port: config.BACKEND_PORT,
      host: config.BACKEND_HOST,
    });
  } catch (err) {
    app.log.error(err);
    await closeDb();
    process.exit(1);
  }
}

start();
