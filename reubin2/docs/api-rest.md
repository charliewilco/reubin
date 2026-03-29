# REST API

Base URL: `http://localhost:8080`

## Current endpoints

- `GET /health`
- `GET /ready`
- `POST /v1/feeds`
- `GET /v1/feeds?limit=&offset=`
- `GET /v1/feeds/{id}`
- `POST /v1/feeds/{id}/refresh`
- `GET /v1/entries?feed_id=&limit=&offset=`

## Error semantics

- `400` invalid input or pagination
- `404` feed not found
- `422` feed fetched successfully but could not be parsed
- `502` upstream feed fetch failed
- `500` internal storage or application failure

## Near-term additions

- `PATCH /v1/feeds/{id}`
- extraction endpoints
- OPML import and export
- search and admin stats
