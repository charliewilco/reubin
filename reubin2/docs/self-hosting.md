# Self Hosting

## Target mode

- Single binary
- SQLite database file
- In-process HTTP API
- In-process scheduler later

## Environment variables

- `REUBIN2_ADDR`
- `REUBIN2_DATABASE_URL`
- `REUBIN2_SQLITE_DSN`

## Startup flow

1. Load config
2. Open SQLite
3. Run migrations
4. Build services
5. Start HTTP server
