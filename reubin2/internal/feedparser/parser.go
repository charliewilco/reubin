package feedparser

import (
	"encoding/xml"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"

	"github.com/reubin/reubin2/internal/domain"
)

type Parser struct {
	client *http.Client
}

type atomLink struct {
	Href string `xml:"href,attr"`
	Rel  string `xml:"rel,attr"`
}

func New() *Parser {
	return &Parser{client: &http.Client{Timeout: 15 * time.Second}}
}

func (p *Parser) ParseURL(url string) (*domain.ParsedFeed, error) {
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		return nil, fmt.Errorf("build request: %w", err)
	}
	req.Header.Set("User-Agent", "Reubin2/0.1")

	resp, err := p.client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("fetch feed: %w", err)
	}
	defer resp.Body.Close()
	if resp.StatusCode < 200 || resp.StatusCode > 299 {
		return nil, fmt.Errorf("fetch feed: status %d", resp.StatusCode)
	}

	body, err := io.ReadAll(io.LimitReader(resp.Body, 10<<20))
	if err != nil {
		return nil, fmt.Errorf("read body: %w", err)
	}

	if looksLikeAtom(body) {
		return parseAtom(body)
	}
	return parseRSS(body)
}

func looksLikeAtom(body []byte) bool {
	preview := strings.ToLower(string(body[:min(512, len(body))]))
	return strings.Contains(preview, "<feed") && strings.Contains(preview, "http://www.w3.org/2005/atom")
}

func parseRSS(body []byte) (*domain.ParsedFeed, error) {
	var rss struct {
		Channel struct {
			Title       string `xml:"title"`
			Description string `xml:"description"`
			Link        string `xml:"link"`
			Items       []struct {
				GUID        string `xml:"guid"`
				Link        string `xml:"link"`
				Title       string `xml:"title"`
				Description string `xml:"description"`
				Content     string `xml:"encoded"`
				PubDate     string `xml:"pubDate"`
				Author      string `xml:"author"`
			} `xml:"item"`
		} `xml:"channel"`
	}
	if err := xml.Unmarshal(body, &rss); err != nil {
		return nil, fmt.Errorf("parse rss: %w", err)
	}
	out := &domain.ParsedFeed{Title: strings.TrimSpace(rss.Channel.Title), Description: strings.TrimSpace(rss.Channel.Description), SiteURL: strings.TrimSpace(rss.Channel.Link), Items: make([]domain.ParsedEntry, 0, len(rss.Channel.Items))}
	for _, it := range rss.Channel.Items {
		pub := parseTime(it.PubDate)
		content := strings.TrimSpace(it.Content)
		if content == "" {
			content = strings.TrimSpace(it.Description)
		}
		entry := domain.ParsedEntry{ExternalID: firstNonEmpty(it.GUID, it.Link, it.Title), URL: strings.TrimSpace(it.Link), Title: strings.TrimSpace(it.Title), Summary: strings.TrimSpace(it.Description), Content: content, Author: strings.TrimSpace(it.Author), PublishedAt: pub}
		if entry.ExternalID != "" {
			out.Items = append(out.Items, entry)
		}
	}
	return out, nil
}

func parseAtom(body []byte) (*domain.ParsedFeed, error) {
	var atom struct {
		Title    string     `xml:"title"`
		Subtitle string     `xml:"subtitle"`
		Links    []atomLink `xml:"link"`
		Entries  []struct {
			ID      string `xml:"id"`
			Title   string `xml:"title"`
			Summary string `xml:"summary"`
			Content string `xml:"content"`
			Updated string `xml:"updated"`
			Pub     string `xml:"published"`
			Author  struct {
				Name string `xml:"name"`
			} `xml:"author"`
			Links []atomLink `xml:"link"`
		} `xml:"entry"`
	}
	if err := xml.Unmarshal(body, &atom); err != nil {
		return nil, fmt.Errorf("parse atom: %w", err)
	}
	out := &domain.ParsedFeed{Title: strings.TrimSpace(atom.Title), Description: strings.TrimSpace(atom.Subtitle), SiteURL: pickLink(atom.Links), Items: make([]domain.ParsedEntry, 0, len(atom.Entries))}
	for _, it := range atom.Entries {
		url := pickLink(it.Links)
		pub := parseTime(firstNonEmpty(it.Pub, it.Updated))
		content := strings.TrimSpace(it.Content)
		if content == "" {
			content = strings.TrimSpace(it.Summary)
		}
		entry := domain.ParsedEntry{ExternalID: firstNonEmpty(it.ID, url, it.Title), URL: url, Title: strings.TrimSpace(it.Title), Summary: strings.TrimSpace(it.Summary), Content: content, Author: strings.TrimSpace(it.Author.Name), PublishedAt: pub}
		if entry.ExternalID != "" {
			out.Items = append(out.Items, entry)
		}
	}
	return out, nil
}

func parseTime(v string) *time.Time {
	v = strings.TrimSpace(v)
	if v == "" {
		return nil
	}
	for _, f := range []string{time.RFC3339, time.RFC1123Z, time.RFC1123, time.RFC822Z, time.RFC822} {
		if t, err := time.Parse(f, v); err == nil {
			return &t
		}
	}
	return nil
}

func pickLink(links []atomLink) string {
	for _, l := range links {
		if strings.TrimSpace(l.Rel) == "alternate" && strings.TrimSpace(l.Href) != "" {
			return strings.TrimSpace(l.Href)
		}
	}
	for _, l := range links {
		if strings.TrimSpace(l.Href) != "" {
			return strings.TrimSpace(l.Href)
		}
	}
	return ""
}

func firstNonEmpty(values ...string) string {
	for _, v := range values {
		if t := strings.TrimSpace(v); t != "" {
			return t
		}
	}
	return ""
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}
