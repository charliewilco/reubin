# GraphQL

GraphQL is planned as a first-class transport, but it should land only after the REST-backed services are stable.

## Direction

- Queries: `feeds`, `feed`, `entries`, `entry`, `extraction`, `search`
- Mutations: `createFeed`, `refreshFeed`, `updateFeed`, `extractEntry`, `markEntryState`, `importOPML`

## Constraint

Resolvers must call the same application services used by REST handlers. GraphQL adds query flexibility; it does not own business logic.
