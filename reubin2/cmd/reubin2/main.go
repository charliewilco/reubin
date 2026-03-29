package main

import (
	"context"
	"errors"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/reubin/reubin2/internal/app"
	"github.com/reubin/reubin2/internal/ingest"
	"github.com/reubin/reubin2/internal/store/sqlite"
	"github.com/reubin/reubin2/internal/transport/rest"
)

func main() {
	logger := log.New(os.Stdout, "reubin2 ", log.LstdFlags|log.LUTC)

	dsn := envOrDefault("REUBIN2_DATABASE_URL", envOrDefault("REUBIN2_SQLITE_DSN", "file:reubin2.db"))
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

	parser := ingest.NewParser(nil)
	feedService := app.NewFeedService(store, parser)
	entryService := app.NewEntryService(store)
	handler := rest.NewServer(feedService, entryService, logger).Handler()

	httpSrv := &http.Server{
		Addr:              addr,
		Handler:           handler,
		ReadHeaderTimeout: 5 * time.Second,
	}

	logger.Printf("listening on %s", addr)
	if err := httpSrv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
		logger.Fatalf("serve: %v", err)
	}
}

func envOrDefault(key, fallback string) string {
	if val := strings.TrimSpace(os.Getenv(key)); val != "" {
		return val
	}
	return fallback
}
