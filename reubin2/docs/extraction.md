# Extraction

Extraction is a core subsystem, not a helper.

## Goals

- Fetch article pages safely
- Parse metadata such as title, byline, site name, and canonical URL
- Produce readable HTML and plain text
- Sanitize output before storage
- Version extraction output so re-processing is possible

## Policy model

- `off`: never auto-extract
- `on_demand`: extract only when explicitly requested
- `always`: extract after successful ingestion

## Content separation

- Feed-native content belongs on `entries`
- Readable article content belongs on `extractions`
- Extraction never overwrites the original feed payload
