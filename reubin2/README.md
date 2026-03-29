# Reubin 2

Reubin 2 is the Go-only reboot of Reubin: an RSS backend focused on ingestion, normalization, and article processing rather than a frontend.

## Current status

The repository currently implements the first backend slice:

- SQLite-backed feed storage
- Feed creation and listing
- Feed refresh with RSS/Atom parsing
- Entry upsert by `(feed_id, external_id)`
- REST endpoints for health, feeds, and entries

This slice is intentionally narrow while the product architecture, storage seams, and docs are established.

## Run

```bash
cd reubin2
go run ./cmd/reubin2
```

Environment variables:

- `REUBIN2_ADDR` default `:8080`
- `REUBIN2_DATABASE_URL` preferred database DSN
- `REUBIN2_SQLITE_DSN` default `file:reubin2.db`

The process runs migrations automatically at startup.

## Docs

- [`docs/VISION.md`](/Users/charliewilco/Developer/Reubin/reubin2/docs/VISION.md)
- [`docs/PLAN.md`](/Users/charliewilco/Developer/Reubin/reubin2/docs/PLAN.md)
- [`docs/architecture.md`](/Users/charliewilco/Developer/Reubin/reubin2/docs/architecture.md)
- [`docs/api-rest.md`](/Users/charliewilco/Developer/Reubin/reubin2/docs/api-rest.md)
- [`docs/api-graphql.md`](/Users/charliewilco/Developer/Reubin/reubin2/docs/api-graphql.md)
- [`docs/extraction.md`](/Users/charliewilco/Developer/Reubin/reubin2/docs/extraction.md)
- [`docs/self-hosting.md`](/Users/charliewilco/Developer/Reubin/reubin2/docs/self-hosting.md)
- [`docs/saas-evolution.md`](/Users/charliewilco/Developer/Reubin/reubin2/docs/saas-evolution.md)
