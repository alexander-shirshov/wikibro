import type { FastifyInstance } from "fastify";
import { db } from "../../db/knex.js";

export default async function healthRoutes(app: FastifyInstance) {
  app.get("/health", async () => {
    return { status: "ok" };
  });

  app.get("/health/db", async (_, reply) => {
    await db.raw("select 1");
    return { status: "ok" };
  });
}
