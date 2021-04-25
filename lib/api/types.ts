export interface IFeed {
  url: string;
  site: string;
  name: string;
  id: string;
  feed_id: number;
}

export interface IItem {
  id: string;
  feed_id: number;
  title: string;
  author?: string | null;
  summary?: string | null;
  content: string;
  url: string;
  extracted_content_url: string;
  published: string;
  created_at?: string | null;
}

export interface IFeedService {
  favorites: Set<string>;
  unread: Set<string>;
  getTags?(): Promise<string[]>;
  getAllFeeds(): Promise<IFeed[]>;
  getFeedItems(
    options: IHandlerOptions,
    page?: number | null
  ): Promise<IItem[]>;
  getFeedItems(url: string, page?: number | null): Promise<IItem[]>;
  getFeedDetails(url: string): Promise<IFeed>;
}

export interface IHandlerOptions {
  authorization: string;
}

export type HTMLParseHanlder = (sourceHTML: string) => string;

/**
 * API Caller
 * ---
 *
 * validateCredentials
 * extractPageNumber
 * importOPML
 * retrieveOPMLImportResult
 * retrieveTags
 * retrieveTaggings
 * createTagging
 * deleteTagging
 * renameTag
 * retrieveSubscriptions
 * createSubscription
 * renameSubscription
 * deleteSubscription
 * retrieveEntries
 * retrieveUnreadEntries
 * createUnreadEntries
 * deleteUnreadEntries
 * retrieveStarredEntries
 * createStarredEntries
 * deleteStarredEntries
 */
