import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../errors/app-error.js";
import type { ApiErrorResponse } from "../types/api-response.js";

export function errorHandler(
  error: FastifyError | AppError,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  request.log.error(error);

  if ("validation" in error) {
    return reply.status(400).send({
      status: "error",
      code: "VALIDATION_ERROR",
      message: "Invalid request data",
    });
  }

  if (error instanceof AppError) {
    const response: ApiErrorResponse = {
      status: "error",
      code: error.code,
      message: error.message,
    };

    return reply.status(error.statusCode).send(response);
  }

  const statusCode = error.statusCode ?? 500;

  const response: ApiErrorResponse = {
    status: "error",
    code: "INTERNAL_ERROR",
    message:
      error.statusCode && error.statusCode < 500
        ? error.message
        : "Internal Server Error",
  };

  reply.status(statusCode).send(response);
}
