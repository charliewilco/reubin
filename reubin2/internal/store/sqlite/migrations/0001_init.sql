PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS feeds (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  url TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  site_url TEXT NOT NULL DEFAULT '',
  last_fetched DATETIME,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  feed_id INTEGER NOT NULL,
  external_id TEXT NOT NULL,
  url TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  summary TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  author TEXT NOT NULL DEFAULT '',
  published_at DATETIME,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY(feed_id) REFERENCES feeds(id) ON DELETE CASCADE,
  UNIQUE(feed_id, external_id)
);

CREATE INDEX IF NOT EXISTS idx_entries_feed_id ON entries(feed_id);
CREATE INDEX IF NOT EXISTS idx_entries_published_at ON entries(published_at);
