# Vision

## What Reubin 2 is

Reubin 2 is a Go-only RSS backend for ingestion, normalization, and article processing. It is an engine first: transports sit over shared application services, not the other way around.

## Who it is for

- Developers who want a serious RSS primitive they can deploy quickly
- Self-hosters who want a single binary and SQLite
- Future operators who want a path to Postgres and worker processes without redesigning the core

## Problems it solves

- Reliable feed ingestion with a boring operational model
- Normalized entry storage independent of UI concerns
- Clear separation between feed-native content and extracted article content
- A stable REST API with room for GraphQL on top of the same domain logic

## What v1 includes

- Feed registration and refresh
- Normalized entry persistence
- SQLite-first storage
- REST as the first stable public contract
- Extraction designed as a first-class subsystem, even if implemented after ingestion hardening
- Docker-friendly deployment

## Out of scope

- Frontend-first product work
- Full multi-user SaaS auth in the initial release
- Complex rules before ingestion and extraction are proven
- Premature Postgres-only complexity
