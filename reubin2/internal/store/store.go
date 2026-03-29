package store

import (
	"context"

	"github.com/reubin/reubin2/internal/domain"
)

type FeedStore interface {
	CreateFeed(ctx context.Context, url string) (domain.Feed, error)
	GetFeed(ctx context.Context, id int64) (domain.Feed, error)
	ListFeeds(ctx context.Context, pagination domain.Pagination) ([]domain.Feed, error)
	RefreshFeed(ctx context.Context, feedID int64, parsed *domain.ParsedFeed) (int, error)
	ListEntriesByFeed(ctx context.Context, feedID int64, pagination domain.Pagination) ([]domain.Entry, error)
	Ping(ctx context.Context) error
	Migrate(ctx context.Context) error
	Close() error
}
