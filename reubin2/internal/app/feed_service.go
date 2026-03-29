package app

import (
	"context"
	"errors"
	"fmt"
	"strings"

	"github.com/reubin/reubin2/internal/domain"
	"github.com/reubin/reubin2/internal/store"
)

type FeedParser interface {
	ParseURL(ctx context.Context, url string) (*domain.ParsedFeed, error)
}

type FeedService struct {
	store  store.FeedStore
	parser FeedParser
}

func NewFeedService(feedStore store.FeedStore, parser FeedParser) *FeedService {
	return &FeedService{store: feedStore, parser: parser}
}

func (s *FeedService) Ping(ctx context.Context) error {
	return s.store.Ping(ctx)
}

func (s *FeedService) CreateFeed(ctx context.Context, url string) (domain.Feed, error) {
	url = strings.TrimSpace(url)
	if url == "" {
		return domain.Feed{}, fmt.Errorf("%w: url is required", domain.ErrInvalidInput)
	}
	return s.store.CreateFeed(ctx, url)
}

func (s *FeedService) GetFeed(ctx context.Context, feedID int64) (domain.Feed, error) {
	return s.store.GetFeed(ctx, feedID)
}

func (s *FeedService) ListFeeds(ctx context.Context, limit, offset int) ([]domain.Feed, domain.Pagination, error) {
	page := domain.NormalizePagination(limit, offset)
	feeds, err := s.store.ListFeeds(ctx, page)
	return feeds, page, err
}

func (s *FeedService) RefreshFeed(ctx context.Context, feedID int64) (domain.Feed, int, error) {
	feed, err := s.store.GetFeed(ctx, feedID)
	if err != nil {
		return domain.Feed{}, 0, err
	}

	parsed, err := s.parser.ParseURL(ctx, feed.URL)
	if err != nil {
		if errors.Is(err, domain.ErrFetchFailed) || errors.Is(err, domain.ErrParseFailed) {
			return domain.Feed{}, 0, err
		}
		return domain.Feed{}, 0, fmt.Errorf("%w: %v", domain.ErrFetchFailed, err)
	}

	count, err := s.store.RefreshFeed(ctx, feedID, parsed)
	if err != nil {
		return domain.Feed{}, count, err
	}

	updated, err := s.store.GetFeed(ctx, feedID)
	if err != nil {
		return domain.Feed{}, count, err
	}
	return updated, count, nil
}
