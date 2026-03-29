package domain

import "time"

type Entry struct {
	ID           int64      `json:"id"`
	FeedID       int64      `json:"feed_id"`
	ExternalID   string     `json:"external_id"`
	URL          string     `json:"url"`
	CanonicalURL string     `json:"canonical_url"`
	Title        string     `json:"title"`
	Summary      string     `json:"summary"`
	ContentHTML  string     `json:"content_html"`
	ContentText  string     `json:"content_text"`
	Author       string     `json:"author"`
	Fingerprint  string     `json:"fingerprint"`
	PublishedAt  *time.Time `json:"published_at,omitempty"`
	CreatedAt    time.Time  `json:"created_at"`
	UpdatedAt    time.Time  `json:"updated_at"`
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
	ContentHTML string
	ContentText string
	Author      string
	PublishedAt *time.Time
}
