package app

import (
	"context"
	"fmt"
	"strings"

	"github.com/reubin/reubin2/internal/domain"
	"github.com/reubin/reubin2/internal/feedparser"
	"github.com/reubin/reubin2/internal/store/sqlite"
)

type Service struct {
	store  *sqlite.Store
	parser *feedparser.Parser
}

func New(store *sqlite.Store, parser *feedparser.Parser) *Service {
	return &Service{store: store, parser: parser}
}

func (s *Service) CreateFeed(ctx context.Context, url string) (domain.Feed, error) {
	url = strings.TrimSpace(url)
	if url == "" {
		return domain.Feed{}, fmt.Errorf("url is required")
	}
	return s.store.CreateFeed(ctx, url)
}

func (s *Service) ListFeeds(ctx context.Context) ([]domain.Feed, error) {
	return s.store.ListFeeds(ctx)
}

func (s *Service) RefreshFeed(ctx context.Context, feedID int64) (domain.Feed, int, error) {
	feed, err := s.store.GetFeed(ctx, feedID)
	if err != nil {
		return domain.Feed{}, 0, err
	}

	parsed, err := s.parser.ParseURL(feed.URL)
	if err != nil {
		return domain.Feed{}, 0, err
	}
	if err := s.store.UpdateFeedMetadata(ctx, feedID, parsed); err != nil {
		return domain.Feed{}, 0, err
	}

	count := 0
	for _, item := range parsed.Items {
		if item.ExternalID == "" {
			continue
		}
		if err := s.store.UpsertEntry(ctx, feedID, item); err != nil {
			return domain.Feed{}, count, err
		}
		count++
	}

	updated, err := s.store.GetFeed(ctx, feedID)
	if err != nil {
		return domain.Feed{}, count, err
	}
	return updated, count, nil
}

func (s *Service) ListEntries(ctx context.Context, feedID int64) ([]domain.Entry, error) {
	if _, err := s.store.GetFeed(ctx, feedID); err != nil {
		return nil, err
	}
	return s.store.ListEntriesByFeed(ctx, feedID)
}
