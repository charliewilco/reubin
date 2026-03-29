package sqlite_test

import (
	"context"
	"database/sql"
	"path/filepath"
	"testing"
	"time"

	_ "modernc.org/sqlite"

	"github.com/reubin/reubin2/internal/domain"
	"github.com/reubin/reubin2/internal/store/sqlite"
)

func TestMigrateCreatesTrackedSchema(t *testing.T) {
	t.Parallel()

	dbPath := filepath.Join(t.TempDir(), "reubin2.db")
	store, err := sqlite.Open("file:" + dbPath)
	if err != nil {
		t.Fatalf("open store: %v", err)
	}
	t.Cleanup(func() { _ = store.Close() })

	if err := store.Migrate(context.Background()); err != nil {
		t.Fatalf("migrate: %v", err)
	}

	db, err := sql.Open("sqlite", "file:"+dbPath)
	if err != nil {
		t.Fatalf("open raw sqlite: %v", err)
	}
	t.Cleanup(func() { _ = db.Close() })

	var name string
	if err := db.QueryRow(`SELECT name FROM schema_migrations WHERE name = '0001_init.sql'`).Scan(&name); err != nil {
		t.Fatalf("query schema_migrations: %v", err)
	}
	if name != "0001_init.sql" {
		t.Fatalf("unexpected migration row %q", name)
	}
}

func TestCreateFeedRefreshAndPaginateEntries(t *testing.T) {
	t.Parallel()

	store := newStore(t)
	ctx := context.Background()

	feed, err := store.CreateFeed(ctx, "https://example.com/feed.xml")
	if err != nil {
		t.Fatalf("create feed: %v", err)
	}

	parsed := &domain.ParsedFeed{
		Title:       "Example",
		Description: "Desc",
		SiteURL:     "https://example.com",
		Items: []domain.ParsedEntry{
			{
				ExternalID:  "entry-1",
				URL:         "https://example.com/1",
				Title:       "One",
				Summary:     "One summary",
				ContentHTML: "<p>One</p>",
				ContentText: "One",
				PublishedAt: timePointer(time.Date(2025, 1, 1, 12, 0, 0, 0, time.UTC)),
			},
			{
				ExternalID:  "entry-2",
				URL:         "https://example.com/2",
				Title:       "Two",
				Summary:     "Two summary",
				ContentHTML: "<p>Two</p>",
				ContentText: "Two",
				PublishedAt: timePointer(time.Date(2025, 1, 2, 12, 0, 0, 0, time.UTC)),
			},
		},
	}

	count, err := store.RefreshFeed(ctx, feed.ID, parsed)
	if err != nil {
		t.Fatalf("refresh feed: %v", err)
	}
	if count != 2 {
		t.Fatalf("expected 2 upserted entries, got %d", count)
	}

	updated, err := store.GetFeed(ctx, feed.ID)
	if err != nil {
		t.Fatalf("get feed: %v", err)
	}
	if updated.Title != "Example" {
		t.Fatalf("expected updated feed title, got %q", updated.Title)
	}
	if updated.LastFetchedAt == nil {
		t.Fatal("expected last_fetched_at to be set")
	}

	pageOne, err := store.ListEntriesByFeed(ctx, feed.ID, domain.NormalizePagination(1, 0))
	if err != nil {
		t.Fatalf("list entries page one: %v", err)
	}
	if len(pageOne) != 1 || pageOne[0].ExternalID != "entry-2" {
		t.Fatalf("unexpected first page: %+v", pageOne)
	}

	pageTwo, err := store.ListEntriesByFeed(ctx, feed.ID, domain.NormalizePagination(1, 1))
	if err != nil {
		t.Fatalf("list entries page two: %v", err)
	}
	if len(pageTwo) != 1 || pageTwo[0].ExternalID != "entry-1" {
		t.Fatalf("unexpected second page: %+v", pageTwo)
	}
}

func TestRefreshFeedUpsertIsIdempotent(t *testing.T) {
	t.Parallel()

	store := newStore(t)
	ctx := context.Background()

	feed, err := store.CreateFeed(ctx, "https://example.com/feed.xml")
	if err != nil {
		t.Fatalf("create feed: %v", err)
	}

	parsed := &domain.ParsedFeed{
		Items: []domain.ParsedEntry{
			{
				ExternalID:  "entry-1",
				URL:         "https://example.com/1",
				Title:       "One",
				ContentHTML: "<p>One</p>",
				ContentText: "One",
			},
		},
	}

	if _, err := store.RefreshFeed(ctx, feed.ID, parsed); err != nil {
		t.Fatalf("first refresh: %v", err)
	}

	parsed.Items[0].Title = "One updated"
	if _, err := store.RefreshFeed(ctx, feed.ID, parsed); err != nil {
		t.Fatalf("second refresh: %v", err)
	}

	entries, err := store.ListEntriesByFeed(ctx, feed.ID, domain.NormalizePagination(10, 0))
	if err != nil {
		t.Fatalf("list entries: %v", err)
	}
	if len(entries) != 1 {
		t.Fatalf("expected 1 entry after upsert, got %d", len(entries))
	}
	if entries[0].Title != "One updated" {
		t.Fatalf("expected updated title, got %q", entries[0].Title)
	}
}

func newStore(t *testing.T) *sqlite.Store {
	t.Helper()

	dbPath := filepath.Join(t.TempDir(), "reubin2.db")
	store, err := sqlite.Open("file:" + dbPath)
	if err != nil {
		t.Fatalf("open store: %v", err)
	}
	t.Cleanup(func() { _ = store.Close() })

	if err := store.Migrate(context.Background()); err != nil {
		t.Fatalf("migrate: %v", err)
	}

	return store
}

func timePointer(v time.Time) *time.Time {
	return &v
}
