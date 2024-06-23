#!/usr/bin/env just --justfile

# hello is recipe's name
hello:
  echo "Hello World!"

bootstrap:
  bun install; bunx turbo dev

clean:
  bun ./scripts/clean.mts