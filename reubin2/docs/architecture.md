# Architecture

## Layers

- `internal/domain`: entities, paging, and shared errors
- `internal/app`: use-case orchestration
- `internal/ingest`: feed fetching and parsing
- `internal/store`: storage contracts and adapters
- `internal/transport/rest`: HTTP handlers

## Core rules

- REST is the first stable contract
- Future GraphQL must call the same application services
- SQLite is a real deployment target, not just a dev convenience
- Feed-native content and extracted article content are distinct records
- Jobs and scheduler come after synchronous ingestion is correct

## Current implementation focus

- Native SQLite via `database/sql`
- Ordered SQL-file migrations with `schema_migrations`
- Transactional refresh so metadata and entry upserts change together
- Pagination normalized in the domain layer and enforced at the transport boundary
