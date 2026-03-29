package domain

import "time"

type Feed struct {
	ID          int64     `json:"id"`
	URL         string    `json:"url"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	SiteURL     string    `json:"site_url"`
	LastFetched time.Time `json:"last_fetched"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type Entry struct {
	ID          int64      `json:"id"`
	FeedID      int64      `json:"feed_id"`
	ExternalID  string     `json:"external_id"`
	URL         string     `json:"url"`
	Title       string     `json:"title"`
	Summary     string     `json:"summary"`
	Content     string     `json:"content"`
	Author      string     `json:"author"`
	PublishedAt *time.Time `json:"published_at,omitempty"`
	CreatedAt   time.Time  `json:"created_at"`
	UpdatedAt   time.Time  `json:"updated_at"`
}

type ParsedFeed struct {
	Title       string
	Description string
	SiteURL     string
	Items       []ParsedEntry
}

type ParsedEntry struct {
	ExternalID  string
	URL         string
	Title       string
	Summary     string
	Content     string
	Author      string
	PublishedAt *time.Time
}
