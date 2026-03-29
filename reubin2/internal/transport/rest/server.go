package rest

import (
	"context"
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/reubin/reubin2/internal/app"
	"github.com/reubin/reubin2/internal/domain"
)

type Server struct {
	feeds   *app.FeedService
	entries *app.EntryService
	logger  *log.Logger
}

func NewServer(feeds *app.FeedService, entries *app.EntryService, logger *log.Logger) *Server {
	return &Server{feeds: feeds, entries: entries, logger: logger}
}

func (s *Server) Handler() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("/health", s.handleHealth)
	mux.HandleFunc("/ready", s.handleReady)
	mux.HandleFunc("/v1/feeds", s.handleFeeds)
	mux.HandleFunc("/v1/feeds/", s.handleFeedActions)
	mux.HandleFunc("/v1/entries", s.handleEntries)
	return loggingMiddleware(s.logger, mux)
}

func (s *Server) handleHealth(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

func (s *Server) handleReady(w http.ResponseWriter, _ *http.Request) {
	if s.feeds != nil {
		if err := s.feeds.Ping(context.Background()); err != nil {
			writeError(w, http.StatusServiceUnavailable, "store not ready")
			return
		}
	}
	writeJSON(w, http.StatusOK, map[string]string{"status": "ready"})
}

func (s *Server) handleFeeds(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodPost:
		var req struct {
			URL string `json:"url"`
		}
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			writeError(w, http.StatusBadRequest, "invalid json")
			return
		}
		feed, err := s.feeds.CreateFeed(r.Context(), req.URL)
		if err != nil {
			writeDomainError(w, err)
			return
		}
		writeJSON(w, http.StatusCreated, feed)
	case http.MethodGet:
		limit, offset, ok := parsePagination(w, r)
		if !ok {
			return
		}
		feeds, page, err := s.feeds.ListFeeds(r.Context(), limit, offset)
		if err != nil {
			writeError(w, http.StatusInternalServerError, "failed to list feeds")
			return
		}
		writeJSON(w, http.StatusOK, map[string]any{
			"items":  feeds,
			"limit":  page.Limit,
			"offset": page.Offset,
		})
	default:
		w.Header().Set("Allow", "GET, POST")
		writeError(w, http.StatusMethodNotAllowed, "method not allowed")
	}
}

func (s *Server) handleFeedActions(w http.ResponseWriter, r *http.Request) {
	path := strings.TrimPrefix(r.URL.Path, "/v1/feeds/")
	parts := strings.Split(strings.Trim(path, "/"), "/")
	switch {
	case len(parts) == 1 && r.Method == http.MethodGet:
		id, ok := parseID(w, parts[0], "feed id")
		if !ok {
			return
		}
		feed, err := s.feeds.GetFeed(r.Context(), id)
		if err != nil {
			writeDomainError(w, err)
			return
		}
		writeJSON(w, http.StatusOK, feed)
	case len(parts) == 2 && parts[1] == "refresh" && r.Method == http.MethodPost:
		id, ok := parseID(w, parts[0], "feed id")
		if !ok {
			return
		}
		feed, count, err := s.feeds.RefreshFeed(r.Context(), id)
		if err != nil {
			writeDomainError(w, err)
			return
		}
		writeJSON(w, http.StatusOK, map[string]any{"feed": feed, "upserted_entries": count})
	default:
		writeError(w, http.StatusNotFound, "not found")
	}
}

func (s *Server) handleEntries(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.Header().Set("Allow", "GET")
		writeError(w, http.StatusMethodNotAllowed, "method not allowed")
		return
	}

	idRaw := strings.TrimSpace(r.URL.Query().Get("feed_id"))
	if idRaw == "" {
		writeError(w, http.StatusBadRequest, "feed_id is required")
		return
	}
	feedID, err := strconv.ParseInt(idRaw, 10, 64)
	if err != nil {
		writeError(w, http.StatusBadRequest, "invalid feed_id")
		return
	}

	limit, offset, ok := parsePagination(w, r)
	if !ok {
		return
	}

	entries, page, err := s.entries.ListEntries(r.Context(), feedID, limit, offset)
	if err != nil {
		writeDomainError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{
		"items":   entries,
		"feed_id": feedID,
		"limit":   page.Limit,
		"offset":  page.Offset,
	})
}

func parsePagination(w http.ResponseWriter, r *http.Request) (int, int, bool) {
	limit := 0
	offset := 0
	var err error
	if raw := strings.TrimSpace(r.URL.Query().Get("limit")); raw != "" {
		limit, err = strconv.Atoi(raw)
		if err != nil {
			writeError(w, http.StatusBadRequest, "invalid limit")
			return 0, 0, false
		}
	}
	if raw := strings.TrimSpace(r.URL.Query().Get("offset")); raw != "" {
		offset, err = strconv.Atoi(raw)
		if err != nil {
			writeError(w, http.StatusBadRequest, "invalid offset")
			return 0, 0, false
		}
	}
	return limit, offset, true
}

func parseID(w http.ResponseWriter, raw, label string) (int64, bool) {
	id, err := strconv.ParseInt(strings.TrimSpace(raw), 10, 64)
	if err != nil {
		writeError(w, http.StatusBadRequest, "invalid "+label)
		return 0, false
	}
	return id, true
}

func writeDomainError(w http.ResponseWriter, err error) {
	switch {
	case errors.Is(err, domain.ErrInvalidInput):
		writeError(w, http.StatusBadRequest, strings.TrimPrefix(err.Error(), domain.ErrInvalidInput.Error()+": "))
	case errors.Is(err, domain.ErrNotFound):
		writeError(w, http.StatusNotFound, "feed not found")
	case errors.Is(err, domain.ErrFetchFailed):
		writeError(w, http.StatusBadGateway, "failed to fetch feed")
	case errors.Is(err, domain.ErrParseFailed):
		writeError(w, http.StatusUnprocessableEntity, "failed to parse feed")
	default:
		writeError(w, http.StatusInternalServerError, "internal server error")
	}
}

func writeError(w http.ResponseWriter, status int, msg string) {
	writeJSON(w, status, map[string]any{"error": msg})
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}

func loggingMiddleware(logger *log.Logger, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		if logger != nil {
			logger.Printf("%s %s (%s)", r.Method, r.URL.String(), time.Since(start).Round(time.Millisecond))
		}
	})
}
