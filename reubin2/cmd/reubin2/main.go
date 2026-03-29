package main

import (
	"context"
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/reubin/reubin2/internal/app"
	"github.com/reubin/reubin2/internal/feedparser"
	"github.com/reubin/reubin2/internal/store/sqlite"
)

type server struct {
	service *app.Service
	logger  *log.Logger
}

func main() {
	logger := log.New(os.Stdout, "reubin2 ", log.LstdFlags|log.LUTC)

	dsn := envOrDefault("REUBIN2_SQLITE_DSN", "file:reubin2.db")
	addr := envOrDefault("REUBIN2_ADDR", ":8080")

	store, err := sqlite.Open(dsn)
	if err != nil {
		logger.Fatalf("open store: %v", err)
	}
	defer store.Close()

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := store.Migrate(ctx); err != nil {
		logger.Fatalf("migrate: %v", err)
	}

	svc := app.New(store, feedparser.New())
	srv := &server{service: svc, logger: logger}

	mux := http.NewServeMux()
	mux.HandleFunc("/health", srv.handleHealth)
	mux.HandleFunc("/v1/feeds", srv.handleFeeds)
	mux.HandleFunc("/v1/feeds/", srv.handleFeedActions)
	mux.HandleFunc("/v1/entries", srv.handleEntries)

	httpSrv := &http.Server{
		Addr:              addr,
		Handler:           loggingMiddleware(logger, mux),
		ReadHeaderTimeout: 5 * time.Second,
	}

	logger.Printf("listening on %s", addr)
	if err := httpSrv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
		logger.Fatalf("serve: %v", err)
	}
}

func (s *server) handleHealth(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

func (s *server) handleFeeds(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		var req struct {
			URL string `json:"url"`
		}
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			writeError(w, http.StatusBadRequest, "invalid json")
			return
		}
		feed, err := s.service.CreateFeed(r.Context(), req.URL)
		if err != nil {
			writeError(w, http.StatusBadRequest, err.Error())
			return
		}
		writeJSON(w, http.StatusCreated, feed)
	case http.MethodGet:
		feeds, err := s.service.ListFeeds(r.Context())
		if err != nil {
			writeError(w, http.StatusInternalServerError, "failed to list feeds")
			return
		}
		writeJSON(w, http.StatusOK, map[string]any{"items": feeds})
	default:
		w.Header().Set("Allow", "GET, POST")
		writeError(w, http.StatusMethodNotAllowed, "method not allowed")
	}
}

func (s *server) handleFeedActions(w http.ResponseWriter, r *http.Request) {
	path := strings.TrimPrefix(r.URL.Path, "/v1/feeds/")
	parts := strings.Split(strings.Trim(path, "/"), "/")
	if len(parts) != 2 || parts[1] != "refresh" || r.Method != http.MethodPost {
		writeError(w, http.StatusNotFound, "not found")
		return
	}

	id, err := strconv.ParseInt(parts[0], 10, 64)
	if err != nil {
		writeError(w, http.StatusBadRequest, "invalid feed id")
		return
	}

	feed, count, err := s.service.RefreshFeed(r.Context(), id)
	if err != nil {
		if errors.Is(err, sqlite.ErrNotFound) {
			writeError(w, http.StatusNotFound, "feed not found")
			return
		}
		writeError(w, http.StatusBadGateway, "failed to refresh feed")
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"feed": feed, "upserted_entries": count})
}

func (s *server) handleEntries(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.Header().Set("Allow", "GET")
		writeError(w, http.StatusMethodNotAllowed, "method not allowed")
		return
	}
	idRaw := r.URL.Query().Get("feed_id")
	if idRaw == "" {
		writeError(w, http.StatusBadRequest, "feed_id is required")
		return
	}
	id, err := strconv.ParseInt(idRaw, 10, 64)
	if err != nil {
		writeError(w, http.StatusBadRequest, "invalid feed_id")
		return
	}
	entries, err := s.service.ListEntries(r.Context(), id)
	if err != nil {
		if errors.Is(err, sqlite.ErrNotFound) {
			writeError(w, http.StatusNotFound, "feed not found")
			return
		}
		writeError(w, http.StatusInternalServerError, "failed to list entries")
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"items": entries})
}

func writeError(w http.ResponseWriter, status int, msg string) {
	writeJSON(w, status, map[string]any{"error": msg})
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}

func envOrDefault(key, fallback string) string {
	if val := strings.TrimSpace(os.Getenv(key)); val != "" {
		return val
	}
	return fallback
}

func loggingMiddleware(logger *log.Logger, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		logger.Printf("%s %s (%s)", r.Method, r.URL.String(), time.Since(start).Round(time.Millisecond))
	})
}
