import type { FastifyReply, FastifyRequest } from "fastify";
import type { ApiErrorResponse } from "../types/api-response.js";

export function notFoundHandler(request: FastifyRequest, reply: FastifyReply) {
  const response: ApiErrorResponse = {
    status: "error",
    code: "ROUTE_NOT_FOUND",
    message: `Route ${request.method} ${request.url} not found`,
  };

  return reply.status(404).send(response);
}
