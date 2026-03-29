# SaaS Evolution

## What changes later

- Add a Postgres store adapter behind the same store contract
- Introduce durable jobs and worker mode
- Add concrete user, subscription, and entry-state behavior when multi-user requirements are real

## What should not change

- Domain models stay transport-agnostic
- REST and GraphQL keep sharing the same application services
- Extraction remains separate from feed-native content
