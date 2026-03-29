# Reubin

Reubin is now centered on Reubin 2, the Go-only RSS engine incubated in [`/Users/charliewilco/Developer/Reubin/reubin2`](/Users/charliewilco/Developer/Reubin/reubin2).

## Current Product

Reubin 2 is an RSS backend focused on:

- feed ingestion
- normalized entry storage
- REST-first API design
- SQLite-first self-hosting
- a clear path to extraction, jobs, GraphQL, and later Postgres

The previous TypeScript applications and packages have been retired from this repository.

## Run

```bash
cd reubin2
go run ./cmd/reubin2
```

## Checks

```bash
cd reubin2
go test ./...
go build ./...
go vet ./...
```

## Docs

- [`reubin2/README.md`](/Users/charliewilco/Developer/Reubin/reubin2/README.md)
- [`reubin2/docs/VISION.md`](/Users/charliewilco/Developer/Reubin/reubin2/docs/VISION.md)
- [`reubin2/docs/PLAN.md`](/Users/charliewilco/Developer/Reubin/reubin2/docs/PLAN.md)
- [`reubin2/docs/architecture.md`](/Users/charliewilco/Developer/Reubin/reubin2/docs/architecture.md)
- [`reubin2/docs/api-rest.md`](/Users/charliewilco/Developer/Reubin/reubin2/docs/api-rest.md)
- [`reubin2/docs/api-graphql.md`](/Users/charliewilco/Developer/Reubin/reubin2/docs/api-graphql.md)
- [`reubin2/docs/extraction.md`](/Users/charliewilco/Developer/Reubin/reubin2/docs/extraction.md)
- [`reubin2/docs/self-hosting.md`](/Users/charliewilco/Developer/Reubin/reubin2/docs/self-hosting.md)
- [`reubin2/docs/saas-evolution.md`](/Users/charliewilco/Developer/Reubin/reubin2/docs/saas-evolution.md)
