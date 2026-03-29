package rest_test

import (
	"bytes"
	"context"
	"encoding/json"
	"log"
	"net/http"
	"net/http/httptest"
	"path/filepath"
	"testing"

	"github.com/reubin/reubin2/internal/app"
	"github.com/reubin/reubin2/internal/domain"
	"github.com/reubin/reubin2/internal/store/sqlite"
	"github.com/reubin/reubin2/internal/transport/rest"
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

func TestFeedsEntriesAndReadyHandlers(t *testing.T) {
	t.Parallel()

	handler, _ := newHandler(t, fakeParser{
		parsed: &domain.ParsedFeed{
			Title:       "Example",
			Description: "Desc",
			SiteURL:     "https://example.com",
			Items: []domain.ParsedEntry{
				{ExternalID: "entry-1", URL: "https://example.com/1", Title: "One", ContentHTML: "<p>One</p>", ContentText: "One"},
			},
		},
	})

	rec := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodGet, "/ready", nil)
	handler.ServeHTTP(rec, req)
	if rec.Code != http.StatusOK {
		t.Fatalf("expected ready 200, got %d", rec.Code)
	}

	body, _ := json.Marshal(map[string]string{"url": "https://example.com/feed.xml"})
	rec = httptest.NewRecorder()
	req = httptest.NewRequest(http.MethodPost, "/v1/feeds", bytes.NewReader(body))
	handler.ServeHTTP(rec, req)
	if rec.Code != http.StatusCreated {
		t.Fatalf("expected create 201, got %d", rec.Code)
	}

	rec = httptest.NewRecorder()
	req = httptest.NewRequest(http.MethodPost, "/v1/feeds/1/refresh", nil)
	handler.ServeHTTP(rec, req)
	if rec.Code != http.StatusOK {
		t.Fatalf("expected refresh 200, got %d", rec.Code)
	}

	rec = httptest.NewRecorder()
	req = httptest.NewRequest(http.MethodGet, "/v1/entries?feed_id=1&limit=10&offset=0", nil)
	handler.ServeHTTP(rec, req)
	if rec.Code != http.StatusOK {
		t.Fatalf("expected entries 200, got %d", rec.Code)
	}
}

func TestRefreshMapsParseErrorsTo422(t *testing.T) {
	t.Parallel()

	handler, service := newHandler(t, fakeParser{err: domain.ErrParseFailed})

	if _, err := service.CreateFeed(context.Background(), "https://example.com/feed.xml"); err != nil {
		t.Fatalf("create feed: %v", err)
	}

	rec := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/v1/feeds/1/refresh", nil)
	handler.ServeHTTP(rec, req)
	if rec.Code != http.StatusUnprocessableEntity {
		t.Fatalf("expected 422, got %d", rec.Code)
	}
}

func newHandler(t *testing.T, parser fakeParser) (http.Handler, *app.FeedService) {
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

	feedService := app.NewFeedService(store, parser)
	entryService := app.NewEntryService(store)
	handler := rest.NewServer(feedService, entryService, log.New(bytes.NewBuffer(nil), "", 0)).Handler()
	return handler, feedService
}
