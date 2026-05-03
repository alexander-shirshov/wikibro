import cors from "@fastify/cors";
import Fastify from "fastify";
import healthRoutes from "./modules/health/health.routes.js";
import { errorHandler } from "./plugins/error-handler.js";
import { notFoundHandler } from "./plugins/not-found-handler.js";
import { config } from "./config/env.js";

export async function buildApp() {
  const app = Fastify({ logger: true });

  await app.register(cors, {
    origin: config.APP_URL,
    credentials: true,
  });

  app.setErrorHandler(errorHandler);
  app.setNotFoundHandler(notFoundHandler);

  app.register(healthRoutes, { prefix: "/api" });

  return app;
}
