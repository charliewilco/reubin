# Reubin 2 REST API (vertical slice)

Base URL: `http://localhost:8080`

## Create feed

`POST /v1/feeds`

```bash
curl -sS -X POST http://localhost:8080/v1/feeds \
  -H 'content-type: application/json' \
  -d '{"url":"https://example.com/feed.xml"}'
```

## List feeds

`GET /v1/feeds`

```bash
curl -sS http://localhost:8080/v1/feeds
```

## Refresh feed

`POST /v1/feeds/{id}/refresh`

```bash
curl -sS -X POST http://localhost:8080/v1/feeds/1/refresh
```

## List entries for a feed

`GET /v1/entries?feed_id={id}`

```bash
curl -sS 'http://localhost:8080/v1/entries?feed_id=1'
```

## Notes

- RSS and Atom are both parsed via the same parser and normalized into one entry model.
- Refresh upserts entries by `(feed_id, external_id)`.
- This slice uses SQLite only and has no auth.
