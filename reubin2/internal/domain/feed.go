package domain

import "time"

type ExtractionPolicy string

const (
	ExtractionPolicyOff      ExtractionPolicy = "off"
	ExtractionPolicyOnDemand ExtractionPolicy = "on_demand"
	ExtractionPolicyAlways   ExtractionPolicy = "always"
)

type FeedStatus string

const (
	FeedStatusActive FeedStatus = "active"
	FeedStatusPaused FeedStatus = "paused"
	FeedStatusError  FeedStatus = "error"
)

type Feed struct {
	ID               int64            `json:"id"`
	URL              string           `json:"url"`
	NormalizedURL    string           `json:"normalized_url"`
	Title            string           `json:"title"`
	Description      string           `json:"description"`
	SiteURL          string           `json:"site_url"`
	ETag             string           `json:"etag"`
	LastModified     string           `json:"last_modified"`
	RefreshInterval  int              `json:"refresh_interval"`
	ExtractionPolicy ExtractionPolicy `json:"extraction_policy"`
	Status           FeedStatus       `json:"status"`
	LastFetchedAt    *time.Time       `json:"last_fetched_at,omitempty"`
	LastSuccessAt    *time.Time       `json:"last_success_at,omitempty"`
	LastError        string           `json:"last_error"`
	CreatedAt        time.Time        `json:"created_at"`
	UpdatedAt        time.Time        `json:"updated_at"`
}
