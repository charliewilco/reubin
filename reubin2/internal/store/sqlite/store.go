package sqlite

import (
	"context"
	_ "embed"
	"encoding/json"
	"errors"
	"fmt"
	"os/exec"
	"strconv"
	"strings"
	"time"

	"github.com/reubin/reubin2/internal/domain"
)

//go:embed migrations/0001_init.sql
var migrationSQL string

var ErrNotFound = errors.New("not found")

type Store struct {
	dbPath string
}

func Open(dsn string) (*Store, error) {
	if dsn == "" {
		return nil, fmt.Errorf("sqlite dsn is required")
	}
	return &Store{dbPath: strings.TrimPrefix(dsn, "file:")}, nil
}

func (s *Store) Close() error { return nil }

func (s *Store) Migrate(ctx context.Context) error {
	_, err := s.exec(ctx, migrationSQL)
	return err
}

func (s *Store) CreateFeed(ctx context.Context, url string) (domain.Feed, error) {
	now := time.Now().UTC().Format(time.RFC3339Nano)
	_, err := s.exec(ctx, fmt.Sprintf(`INSERT INTO feeds(url,created_at,updated_at) VALUES(%s,%s,%s);`, q(url), q(now), q(now)))
	if err != nil {
		return domain.Feed{}, err
	}
	return s.getFeedByURL(ctx, url)
}

func (s *Store) getFeedByURL(ctx context.Context, url string) (domain.Feed, error) {
	rows, err := s.queryFeeds(ctx, fmt.Sprintf(`SELECT id,url,title,description,site_url,last_fetched,created_at,updated_at FROM feeds WHERE url=%s LIMIT 1;`, q(url)))
	if err != nil {
		return domain.Feed{}, err
	}
	if len(rows) == 0 {
		return domain.Feed{}, ErrNotFound
	}
	return rows[0], nil
}

func (s *Store) GetFeed(ctx context.Context, id int64) (domain.Feed, error) {
	rows, err := s.queryFeeds(ctx, fmt.Sprintf(`SELECT id,url,title,description,site_url,last_fetched,created_at,updated_at FROM feeds WHERE id=%d LIMIT 1;`, id))
	if err != nil {
		return domain.Feed{}, err
	}
	if len(rows) == 0 {
		return domain.Feed{}, ErrNotFound
	}
	return rows[0], nil
}

func (s *Store) ListFeeds(ctx context.Context) ([]domain.Feed, error) {
	return s.queryFeeds(ctx, `SELECT id,url,title,description,site_url,last_fetched,created_at,updated_at FROM feeds ORDER BY id DESC;`)
}

func (s *Store) queryFeeds(ctx context.Context, sql string) ([]domain.Feed, error) {
	out, err := s.queryJSON(ctx, sql)
	if err != nil {
		return nil, err
	}
	var raw []map[string]any
	if err := json.Unmarshal([]byte(out), &raw); err != nil {
		return nil, err
	}
	feeds := make([]domain.Feed, 0, len(raw))
	for _, r := range raw {
		f := domain.Feed{ID: toInt64(r["id"]), URL: toString(r["url"]), Title: toString(r["title"]), Description: toString(r["description"]), SiteURL: toString(r["site_url"]), CreatedAt: parseTS(toString(r["created_at"])), UpdatedAt: parseTS(toString(r["updated_at"]))}
		if ts := toString(r["last_fetched"]); ts != "" {
			f.LastFetched = parseTS(ts)
		}
		feeds = append(feeds, f)
	}
	return feeds, nil
}

func (s *Store) UpdateFeedMetadata(ctx context.Context, feedID int64, parsed *domain.ParsedFeed) error {
	now := time.Now().UTC().Format(time.RFC3339Nano)
	_, err := s.exec(ctx, fmt.Sprintf(`UPDATE feeds SET title=%s,description=%s,site_url=%s,last_fetched=%s,updated_at=%s WHERE id=%d;`, q(parsed.Title), q(parsed.Description), q(parsed.SiteURL), q(now), q(now), feedID))
	return err
}

func (s *Store) UpsertEntry(ctx context.Context, feedID int64, item domain.ParsedEntry) error {
	now := time.Now().UTC().Format(time.RFC3339Nano)
	pub := "NULL"
	if item.PublishedAt != nil {
		pub = q(item.PublishedAt.UTC().Format(time.RFC3339Nano))
	}
	_, err := s.exec(ctx, fmt.Sprintf(`INSERT INTO entries(feed_id,external_id,url,title,summary,content,author,published_at,created_at,updated_at)
VALUES(%d,%s,%s,%s,%s,%s,%s,%s,%s,%s)
ON CONFLICT(feed_id,external_id)
DO UPDATE SET url=excluded.url,title=excluded.title,summary=excluded.summary,content=excluded.content,author=excluded.author,published_at=excluded.published_at,updated_at=excluded.updated_at;`,
		feedID, q(item.ExternalID), q(item.URL), q(item.Title), q(item.Summary), q(item.Content), q(item.Author), pub, q(now), q(now)))
	return err
}

func (s *Store) ListEntriesByFeed(ctx context.Context, feedID int64) ([]domain.Entry, error) {
	out, err := s.queryJSON(ctx, fmt.Sprintf(`SELECT id,feed_id,external_id,url,title,summary,content,author,published_at,created_at,updated_at FROM entries WHERE feed_id=%d ORDER BY COALESCE(published_at,created_at) DESC,id DESC;`, feedID))
	if err != nil {
		return nil, err
	}
	var raw []map[string]any
	if err := json.Unmarshal([]byte(out), &raw); err != nil {
		return nil, err
	}
	entries := make([]domain.Entry, 0, len(raw))
	for _, r := range raw {
		e := domain.Entry{ID: toInt64(r["id"]), FeedID: toInt64(r["feed_id"]), ExternalID: toString(r["external_id"]), URL: toString(r["url"]), Title: toString(r["title"]), Summary: toString(r["summary"]), Content: toString(r["content"]), Author: toString(r["author"]), CreatedAt: parseTS(toString(r["created_at"])), UpdatedAt: parseTS(toString(r["updated_at"]))}
		if ts := toString(r["published_at"]); ts != "" {
			t := parseTS(ts)
			e.PublishedAt = &t
		}
		entries = append(entries, e)
	}
	return entries, nil
}

func (s *Store) queryJSON(ctx context.Context, sql string) (string, error) {
	cmd := exec.CommandContext(ctx, "sqlite3", "-json", s.dbPath, sql)
	out, err := cmd.CombinedOutput()
	if err != nil {
		return "", fmt.Errorf("sqlite query: %v: %s", err, strings.TrimSpace(string(out)))
	}
	return string(out), nil
}

func (s *Store) exec(ctx context.Context, sql string) (string, error) {
	cmd := exec.CommandContext(ctx, "sqlite3", s.dbPath, sql)
	out, err := cmd.CombinedOutput()
	if err != nil {
		return "", fmt.Errorf("sqlite exec: %v: %s", err, strings.TrimSpace(string(out)))
	}
	return string(out), nil
}

func q(v string) string { return "'" + strings.ReplaceAll(v, "'", "''") + "'" }

func toInt64(v any) int64 {
	s := toString(v)
	i, _ := strconv.ParseInt(strings.SplitN(s, ".", 2)[0], 10, 64)
	return i
}

func toString(v any) string {
	s, _ := v.(string)
	if s != "" {
		return s
	}
	if v == nil {
		return ""
	}
	return fmt.Sprint(v)
}

func parseTS(v string) time.Time {
	t, _ := time.Parse(time.RFC3339Nano, v)
	return t
}
