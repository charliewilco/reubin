package app

import (
	"context"

	"github.com/reubin/reubin2/internal/domain"
	"github.com/reubin/reubin2/internal/store"
)

type EntryService struct {
	store store.FeedStore
}

func NewEntryService(feedStore store.FeedStore) *EntryService {
	return &EntryService{store: feedStore}
}

func (s *EntryService) ListEntries(ctx context.Context, feedID int64, limit, offset int) ([]domain.Entry, domain.Pagination, error) {
	if _, err := s.store.GetFeed(ctx, feedID); err != nil {
		return nil, domain.Pagination{}, err
	}
	page := domain.NormalizePagination(limit, offset)
	entries, err := s.store.ListEntriesByFeed(ctx, feedID, page)
	return entries, page, err
}
