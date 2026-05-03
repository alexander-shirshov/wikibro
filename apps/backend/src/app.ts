import Fastify from "fastify";
import healthRoutes from "./modules/health/health.routes.js";
import { errorHandler } from "./plugins/error-handler.js";
import { notFoundHandler } from "./plugins/not-found-handler.js";

export function buildApp() {
  const app = Fastify({ logger: true });

  app.setErrorHandler(errorHandler);
  app.setNotFoundHandler(notFoundHandler);

  app.register(healthRoutes, { prefix: "/api" });

  return app;
}
