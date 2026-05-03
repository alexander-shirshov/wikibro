FROM node:22-alpine AS base

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/package.json

RUN pnpm install --filter @wikibro/backend... --frozen-lockfile

COPY apps/backend ./apps/backend

WORKDIR /app/apps/backend

RUN pnpm build

EXPOSE 3000

CMD ["node", "dist/server.js"]