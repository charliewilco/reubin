import { IFeed, IItem } from "../types";

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
