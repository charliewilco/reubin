# Plan

## Milestone 0

- Write core docs
- Split domain, app, ingest, transport, and store boundaries
- Keep the existing REST slice working while the internals improve

## Milestone 1

- Replace shell-based SQLite access with `database/sql`
- Add tracked SQL migrations
- Make feed refresh transactional
- Add pagination to list endpoints
- Add tests for store, services, and handlers
- Distinguish fetch failures from parse failures

## Milestone 2

- Add feed detail and update endpoints
- Persist refresh metadata such as ETag and Last-Modified
- Improve readiness and admin visibility

## Milestone 3

- Add extraction storage and extraction policy behavior
- Implement safe fetch, metadata parsing, readability extraction, and sanitization

## Milestone 4

- Introduce durable jobs and worker mode
- Move refresh and extraction behind job orchestration

## Milestone 5+

- Add entry state and OPML
- Add search, tags, and rules
- Add GraphQL over the same services
- Add a Postgres adapter and SaaS evolution path
