package app_test

import (
	"context"
	"errors"
	"path/filepath"
	"testing"

	"github.com/reubin/reubin2/internal/app"
	"github.com/reubin/reubin2/internal/domain"
	"github.com/reubin/reubin2/internal/store/sqlite"
)

type fakeParser struct {
	parsed *domain.ParsedFeed
	err    error
}

func (f fakeParser) ParseURL(context.Context, string) (*domain.ParsedFeed, error) {
	if f.err != nil {
		return nil, f.err
	}
	return f.parsed, nil
}

func TestRefreshFeedSuccess(t *testing.T) {
	t.Parallel()

	store := newTestStore(t)
	service := app.NewFeedService(store, fakeParser{
		parsed: &domain.ParsedFeed{
			Title:       "Example",
			Description: "Desc",
			SiteURL:     "https://example.com",
			Items: []domain.ParsedEntry{
				{ExternalID: "entry-1", URL: "https://example.com/1", Title: "One", ContentHTML: "<p>One</p>", ContentText: "One"},
				{ExternalID: "entry-2", URL: "https://example.com/2", Title: "Two", ContentHTML: "<p>Two</p>", ContentText: "Two"},
			},
		},
	})

	feed, err := service.CreateFeed(context.Background(), "https://example.com/feed.xml")
	if err != nil {
		t.Fatalf("create feed: %v", err)
	}

	updated, count, err := service.RefreshFeed(context.Background(), feed.ID)
	if err != nil {
		t.Fatalf("refresh feed: %v", err)
	}
	if count != 2 {
		t.Fatalf("expected 2 processed items, got %d", count)
	}
	if updated.Title != "Example" {
		t.Fatalf("expected updated feed title, got %q", updated.Title)
	}
}

func TestRefreshFeedReturnsParseError(t *testing.T) {
	t.Parallel()

	store := newTestStore(t)
	service := app.NewFeedService(store, fakeParser{err: domain.ErrParseFailed})

	feed, err := service.CreateFeed(context.Background(), "https://example.com/feed.xml")
	if err != nil {
		t.Fatalf("create feed: %v", err)
	}

	_, _, err = service.RefreshFeed(context.Background(), feed.ID)
	if !errors.Is(err, domain.ErrParseFailed) {
		t.Fatalf("expected parse failure, got %v", err)
	}
}

func TestRefreshFeedMissingFeed(t *testing.T) {
	t.Parallel()

	service := app.NewFeedService(newTestStore(t), fakeParser{})
	_, _, err := service.RefreshFeed(context.Background(), 999)
	if !errors.Is(err, domain.ErrNotFound) {
		t.Fatalf("expected not found, got %v", err)
	}
}

func newTestStore(t *testing.T) *sqlite.Store {
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
