package sqlite

import (
	"context"
	"database/sql"
	"embed"
	"errors"
	"fmt"
	"hash/fnv"
	"io/fs"
	"net/url"
	"path"
	"slices"
	"strings"
	"time"

	_ "modernc.org/sqlite"

	"github.com/reubin/reubin2/internal/domain"
)

//go:embed migrations/*.sql
var migrationsFS embed.FS

type Store struct {
	db *sql.DB
}

func Open(dsn string) (*Store, error) {
	if strings.TrimSpace(dsn) == "" {
		return nil, fmt.Errorf("%w: sqlite dsn is required", domain.ErrInvalidInput)
	}

	db, err := sql.Open("sqlite", dsn)
	if err != nil {
		return nil, fmt.Errorf("open sqlite: %w", err)
	}
	db.SetMaxOpenConns(1)
	db.SetMaxIdleConns(1)
	db.SetConnMaxLifetime(0)

	return &Store{db: db}, nil
}

func (s *Store) Ping(ctx context.Context) error {
	return s.db.PingContext(ctx)
}

func (s *Store) Close() error {
	return s.db.Close()
}

func (s *Store) Migrate(ctx context.Context) error {
	if _, err := s.db.ExecContext(ctx, `PRAGMA foreign_keys = ON;`); err != nil {
		return fmt.Errorf("enable foreign keys: %w", err)
	}

	if _, err := s.db.ExecContext(ctx, `
CREATE TABLE IF NOT EXISTS schema_migrations (
  name TEXT PRIMARY KEY,
  applied_at DATETIME NOT NULL
);`); err != nil {
		return fmt.Errorf("create schema_migrations: %w", err)
	}

	applied, err := s.appliedMigrations(ctx)
	if err != nil {
		return err
	}

	entries, err := fs.ReadDir(migrationsFS, "migrations")
	if err != nil {
		return fmt.Errorf("read migrations: %w", err)
	}

	names := make([]string, 0, len(entries))
	for _, entry := range entries {
		if entry.IsDir() || !strings.HasSuffix(entry.Name(), ".sql") {
			continue
		}
		names = append(names, entry.Name())
	}
	slices.Sort(names)

	for _, name := range names {
		if _, ok := applied[name]; ok {
			continue
		}
		body, err := migrationsFS.ReadFile(path.Join("migrations", name))
		if err != nil {
			return fmt.Errorf("read migration %s: %w", name, err)
		}
		if err := s.applyMigration(ctx, name, string(body)); err != nil {
			return err
		}
	}
	return nil
}

func (s *Store) appliedMigrations(ctx context.Context) (map[string]struct{}, error) {
	rows, err := s.db.QueryContext(ctx, `SELECT name FROM schema_migrations;`)
	if err != nil {
		return nil, fmt.Errorf("list schema_migrations: %w", err)
	}
	defer rows.Close()

	out := map[string]struct{}{}
	for rows.Next() {
		var name string
		if err := rows.Scan(&name); err != nil {
			return nil, fmt.Errorf("scan schema_migrations: %w", err)
		}
		out[name] = struct{}{}
	}
	return out, rows.Err()
}

func (s *Store) applyMigration(ctx context.Context, name, body string) error {
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return fmt.Errorf("begin migration %s: %w", name, err)
	}
	defer tx.Rollback()

	if _, err := tx.ExecContext(ctx, body); err != nil {
		return fmt.Errorf("apply migration %s: %w", name, err)
	}
	if _, err := tx.ExecContext(ctx, `INSERT INTO schema_migrations(name, applied_at) VALUES(?, ?);`, name, nowString()); err != nil {
		return fmt.Errorf("record migration %s: %w", name, err)
	}
	return tx.Commit()
}

func (s *Store) CreateFeed(ctx context.Context, rawURL string) (domain.Feed, error) {
	normalized, err := normalizeURL(rawURL)
	if err != nil {
		return domain.Feed{}, err
	}

	now := nowString()
	result, err := s.db.ExecContext(ctx, `
INSERT INTO feeds(
  url, normalized_url, title, description, site_url, etag, last_modified,
  refresh_interval, extraction_policy, status, created_at, updated_at
) VALUES(?, ?, '', '', '', '', '', 0, ?, ?, ?, ?);`,
		strings.TrimSpace(rawURL),
		normalized,
		domain.ExtractionPolicyOnDemand,
		domain.FeedStatusActive,
		now,
		now,
	)
	if err != nil {
		if strings.Contains(err.Error(), "UNIQUE constraint failed") {
			return domain.Feed{}, fmt.Errorf("%w: feed already exists", domain.ErrInvalidInput)
		}
		return domain.Feed{}, fmt.Errorf("create feed: %w", err)
	}
	id, err := result.LastInsertId()
	if err != nil {
		return domain.Feed{}, fmt.Errorf("create feed: %w", err)
	}
	return s.GetFeed(ctx, id)
}

func (s *Store) GetFeed(ctx context.Context, id int64) (domain.Feed, error) {
	row := s.db.QueryRowContext(ctx, feedSelect+` WHERE id = ? LIMIT 1;`, id)
	feed, err := scanFeed(row)
	if err != nil {
		return domain.Feed{}, err
	}
	return feed, nil
}

func (s *Store) ListFeeds(ctx context.Context, pagination domain.Pagination) ([]domain.Feed, error) {
	rows, err := s.db.QueryContext(ctx, feedSelect+` ORDER BY id DESC LIMIT ? OFFSET ?;`, pagination.Limit, pagination.Offset)
	if err != nil {
		return nil, fmt.Errorf("list feeds: %w", err)
	}
	defer rows.Close()

	feeds := make([]domain.Feed, 0, pagination.Limit)
	for rows.Next() {
		feed, err := scanFeed(rows)
		if err != nil {
			return nil, err
		}
		feeds = append(feeds, feed)
	}
	return feeds, rows.Err()
}

func (s *Store) RefreshFeed(ctx context.Context, feedID int64, parsed *domain.ParsedFeed) (int, error) {
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return 0, fmt.Errorf("begin refresh: %w", err)
	}
	defer tx.Rollback()

	now := nowString()
	result, err := tx.ExecContext(ctx, `
UPDATE feeds
SET title = ?, description = ?, site_url = ?, last_fetched_at = ?, last_success_at = ?, last_error = '', status = ?, updated_at = ?
WHERE id = ?;`,
		parsed.Title,
		parsed.Description,
		parsed.SiteURL,
		now,
		now,
		domain.FeedStatusActive,
		now,
		feedID,
	)
	if err != nil {
		return 0, fmt.Errorf("update feed metadata: %w", err)
	}
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return 0, fmt.Errorf("update feed metadata: %w", err)
	}
	if rowsAffected == 0 {
		return 0, domain.ErrNotFound
	}

	count := 0
	for _, item := range parsed.Items {
		if strings.TrimSpace(item.ExternalID) == "" {
			continue
		}
		if err := upsertEntry(ctx, tx, feedID, item, now); err != nil {
			return count, err
		}
		count++
	}

	if err := tx.Commit(); err != nil {
		return count, fmt.Errorf("commit refresh: %w", err)
	}
	return count, nil
}

func upsertEntry(ctx context.Context, tx *sql.Tx, feedID int64, item domain.ParsedEntry, now string) error {
	pub := nullableTime(item.PublishedAt)
	_, err := tx.ExecContext(ctx, `
INSERT INTO entries(
  feed_id, external_id, url, canonical_url, title, summary, content_html,
  content_text, author, fingerprint, published_at, created_at, updated_at
) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
ON CONFLICT(feed_id, external_id) DO UPDATE SET
  url = excluded.url,
  canonical_url = excluded.canonical_url,
  title = excluded.title,
  summary = excluded.summary,
  content_html = excluded.content_html,
  content_text = excluded.content_text,
  author = excluded.author,
  fingerprint = excluded.fingerprint,
  published_at = excluded.published_at,
  updated_at = excluded.updated_at;`,
		feedID,
		strings.TrimSpace(item.ExternalID),
		strings.TrimSpace(item.URL),
		strings.TrimSpace(item.URL),
		strings.TrimSpace(item.Title),
		strings.TrimSpace(item.Summary),
		strings.TrimSpace(item.ContentHTML),
		strings.TrimSpace(item.ContentText),
		strings.TrimSpace(item.Author),
		fingerprint(item),
		pub,
		now,
		now,
	)
	if err != nil {
		return fmt.Errorf("upsert entry: %w", err)
	}
	return nil
}

func (s *Store) ListEntriesByFeed(ctx context.Context, feedID int64, pagination domain.Pagination) ([]domain.Entry, error) {
	rows, err := s.db.QueryContext(ctx, `
SELECT id, feed_id, external_id, url, canonical_url, title, summary, content_html, content_text,
  author, fingerprint, published_at, created_at, updated_at
FROM entries
WHERE feed_id = ?
ORDER BY COALESCE(published_at, created_at) DESC, id DESC
LIMIT ? OFFSET ?;`, feedID, pagination.Limit, pagination.Offset)
	if err != nil {
		return nil, fmt.Errorf("list entries: %w", err)
	}
	defer rows.Close()

	entries := make([]domain.Entry, 0, pagination.Limit)
	for rows.Next() {
		entry, err := scanEntry(rows)
		if err != nil {
			return nil, err
		}
		entries = append(entries, entry)
	}
	return entries, rows.Err()
}

const feedSelect = `
SELECT id, url, normalized_url, title, description, site_url, etag, last_modified,
  refresh_interval, extraction_policy, status, last_fetched_at, last_success_at,
  last_error, created_at, updated_at
FROM feeds`

type scanner interface {
	Scan(dest ...any) error
}

func scanFeed(row scanner) (domain.Feed, error) {
	var feed domain.Feed
	var normalizedURL sql.NullString
	var title sql.NullString
	var description sql.NullString
	var siteURL sql.NullString
	var etag sql.NullString
	var lastModified sql.NullString
	var extractionPolicy sql.NullString
	var status sql.NullString
	var lastFetched sql.NullString
	var lastSuccess sql.NullString
	var lastError sql.NullString
	var createdAt string
	var updatedAt string

	if err := row.Scan(
		&feed.ID,
		&feed.URL,
		&normalizedURL,
		&title,
		&description,
		&siteURL,
		&etag,
		&lastModified,
		&feed.RefreshInterval,
		&extractionPolicy,
		&status,
		&lastFetched,
		&lastSuccess,
		&lastError,
		&createdAt,
		&updatedAt,
	); err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return domain.Feed{}, domain.ErrNotFound
		}
		return domain.Feed{}, fmt.Errorf("scan feed: %w", err)
	}

	feed.NormalizedURL = normalizedURL.String
	feed.Title = title.String
	feed.Description = description.String
	feed.SiteURL = siteURL.String
	feed.ETag = etag.String
	feed.LastModified = lastModified.String
	feed.ExtractionPolicy = domain.ExtractionPolicy(extractionPolicy.String)
	if feed.ExtractionPolicy == "" {
		feed.ExtractionPolicy = domain.ExtractionPolicyOnDemand
	}
	feed.Status = domain.FeedStatus(status.String)
	if feed.Status == "" {
		feed.Status = domain.FeedStatusActive
	}
	feed.LastFetchedAt = parseNullableTime(lastFetched)
	feed.LastSuccessAt = parseNullableTime(lastSuccess)
	feed.LastError = lastError.String
	feed.CreatedAt = parseTime(createdAt)
	feed.UpdatedAt = parseTime(updatedAt)
	return feed, nil
}

func scanEntry(row scanner) (domain.Entry, error) {
	var entry domain.Entry
	var canonicalURL sql.NullString
	var summary sql.NullString
	var contentHTML sql.NullString
	var contentText sql.NullString
	var author sql.NullString
	var fingerprint sql.NullString
	var publishedAt sql.NullString
	var createdAt string
	var updatedAt string

	if err := row.Scan(
		&entry.ID,
		&entry.FeedID,
		&entry.ExternalID,
		&entry.URL,
		&canonicalURL,
		&entry.Title,
		&summary,
		&contentHTML,
		&contentText,
		&author,
		&fingerprint,
		&publishedAt,
		&createdAt,
		&updatedAt,
	); err != nil {
		return domain.Entry{}, fmt.Errorf("scan entry: %w", err)
	}

	entry.CanonicalURL = canonicalURL.String
	entry.Summary = summary.String
	entry.ContentHTML = contentHTML.String
	entry.ContentText = contentText.String
	entry.Author = author.String
	entry.Fingerprint = fingerprint.String
	entry.PublishedAt = parseNullableTime(publishedAt)
	entry.CreatedAt = parseTime(createdAt)
	entry.UpdatedAt = parseTime(updatedAt)
	return entry, nil
}

func normalizeURL(raw string) (string, error) {
	trimmed := strings.TrimSpace(raw)
	if trimmed == "" {
		return "", fmt.Errorf("%w: url is required", domain.ErrInvalidInput)
	}
	parsed, err := url.Parse(trimmed)
	if err != nil || parsed.Scheme == "" || parsed.Host == "" {
		return "", fmt.Errorf("%w: invalid url", domain.ErrInvalidInput)
	}
	parsed.Host = strings.ToLower(parsed.Host)
	if parsed.Path == "" {
		parsed.Path = "/"
	}
	parsed.Fragment = ""
	return parsed.String(), nil
}

func fingerprint(item domain.ParsedEntry) string {
	h := fnv.New64a()
	_, _ = h.Write([]byte(strings.TrimSpace(item.ExternalID)))
	_, _ = h.Write([]byte{0})
	_, _ = h.Write([]byte(strings.TrimSpace(item.URL)))
	return fmt.Sprintf("%x", h.Sum64())
}

func parseTime(raw string) time.Time {
	t, _ := time.Parse(time.RFC3339Nano, raw)
	return t
}

func parseNullableTime(raw sql.NullString) *time.Time {
	if !raw.Valid || strings.TrimSpace(raw.String) == "" {
		return nil
	}
	t := parseTime(raw.String)
	return &t
}

func nullableTime(t *time.Time) any {
	if t == nil {
		return nil
	}
	return t.UTC().Format(time.RFC3339Nano)
}

func nowString() string {
	return time.Now().UTC().Format(time.RFC3339Nano)
}
