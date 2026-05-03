FROM node:22-alpine AS base

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/frontend/package.json ./apps/frontend/package.json

RUN pnpm install --filter @wikibro/frontend --frozen-lockfile

COPY apps/frontend ./apps/frontend

WORKDIR /app/apps/frontend

EXPOSE 5173

CMD ["pnpm", "dev", "--host", "0.0.0.0"]