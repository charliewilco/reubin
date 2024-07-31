#!/usr/bin/env just --justfile

bootstrap:
  pnpm install; pnpm dlx turbo dev

clean:
  pnpm dlx tsx ./scripts/clean.mjs

build:
  pnpm run build

test:
  pnpm dlx turbo test

db:
  pnpm dlx prisma studio --schema apps/web/prisma/schema.prisma