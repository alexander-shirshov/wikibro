import { buildApp } from "./app.js";
import { config } from "./config/env.js";

async function start() {
  const app = buildApp();

  try {
    await app.listen({
      port: config.PORT,
      host: config.HOST,
    });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
